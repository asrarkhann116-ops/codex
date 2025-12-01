require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');
const os = require('os');
const simpleGit = require('simple-git');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'; // Change this!

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static('public'));

// In-memory storage
const projects = new Map();
const activeSessions = new Map();
const systemStats = {
    startTime: Date.now(),
    requests: 0,
    errors: 0,
    activeUsers: 0
};

// Middleware to track requests
app.use((req, res, next) => {
    systemStats.requests++;
    next();
});

// ============ PROJECT API ============

app.get('/api/projects', (req, res) => {
    const projectList = Array.from(projects.entries()).map(([id, project]) => ({
        id,
        name: project.name,
        lastModified: project.lastModified
    }));
    res.json(projectList);
});

app.get('/api/projects/:id', (req, res) => {
    const project = projects.get(req.params.id);
    if (!project) {
        return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
});

app.post('/api/projects', (req, res) => {
    const { id, name, files } = req.body;
    const projectId = id || Date.now().toString();

    const project = {
        id: projectId,
        name: name || 'Untitled Project',
        files: files || [],
        lastModified: new Date().toISOString()
    };

    projects.set(projectId, project);
    res.json(project);
});

app.delete('/api/projects/:id', (req, res) => {
    const deleted = projects.delete(req.params.id);
    if (!deleted) {
        return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ success: true });
});

// ============ AI ASSISTANT API ============

app.post('/api/ai/chat', async (req, res) => {
    const { message, code, language } = req.body;

    if (!process.env.MISTRAL_API_KEY) {
        return res.status(503).json({
            error: 'AI assistant is not configured. Please set MISTRAL_API_KEY environment variable.'
        });
    }

    try {
        const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.MISTRAL_API_KEY}`
            },
            body: JSON.stringify({
                model: 'mistral-tiny',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful coding assistant. Help users with their code, explain concepts, fix bugs, and provide suggestions. Be concise and practical.'
                    },
                    {
                        role: 'user',
                        content: code ? `${message}\n\nCurrent code (${language}):\n\`\`\`${language}\n${code}\n\`\`\`` : message
                    }
                ],
                temperature: 0.7,
                max_tokens: 1000
            })
        });

        if (!response.ok) {
            const error = await response.text();
            console.error('Mistral API error:', error);
            systemStats.errors++;
            return res.status(response.status).json({
                error: 'AI service error. Please check your API key.'
            });
        }

        const data = await response.json();
        res.json({
            response: data.choices[0].message.content
        });
    } catch (error) {
        console.error('AI chat error:', error);
        systemStats.errors++;
        res.status(500).json({
            error: 'Failed to communicate with AI service.'
        });
    }
});

// ============ TERMINAL & PACKAGE MANAGER API ============

app.post('/api/terminal/execute', async (req, res) => {
    const { command } = req.body;

    if (!command) {
        return res.status(400).json({ error: 'Command is required' });
    }

    // Security: Block dangerous commands
    const blockedCommands = ['rm -rf', 'format', 'del /f', 'shutdown', 'reboot'];
    if (blockedCommands.some(cmd => command.toLowerCase().includes(cmd))) {
        return res.status(403).json({ error: 'Command blocked for security reasons' });
    }

    try {
        const { stdout, stderr } = await execPromise(command, {
            timeout: 30000,
            maxBuffer: 1024 * 1024 // 1MB
        });
        res.json({
            output: stdout || stderr,
            success: !stderr
        });
    } catch (error) {
        systemStats.errors++;
        res.status(500).json({
            error: error.message,
            output: error.stdout || error.stderr || ''
        });
    }
});

app.post('/api/packages/install', async (req, res) => {
    const { packageName, manager } = req.body;

    if (!packageName || !manager) {
        return res.status(400).json({ error: 'Package name and manager are required' });
    }

    const commands = {
        npm: `npm install ${packageName}`,
        pip: `pip install ${packageName}`,
        yarn: `yarn add ${packageName}`
    };

    const command = commands[manager];
    if (!command) {
        return res.status(400).json({ error: 'Invalid package manager' });
    }

    try {
        const { stdout, stderr } = await execPromise(command, { timeout: 60000 });
        res.json({
            success: true,
            output: stdout || stderr
        });
    } catch (error) {
        systemStats.errors++;
        res.status(500).json({
            error: error.message,
            output: error.stdout || error.stderr || ''
        });
    }
});

// ============ GIT API ============

const git = simpleGit();

app.post('/api/git/clone', async (req, res) => {
    const { url, directory } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'Repository URL is required' });
    }

    try {
        await git.clone(url, directory || './cloned-repo');
        res.json({ success: true, message: 'Repository cloned successfully' });
    } catch (error) {
        systemStats.errors++;
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/git/commit', async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Commit message is required' });
    }

    try {
        await git.add('./*');
        await git.commit(message);
        res.json({ success: true, message: 'Changes committed successfully' });
    } catch (error) {
        systemStats.errors++;
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/git/push', async (req, res) => {
    try {
        await git.push();
        res.json({ success: true, message: 'Changes pushed successfully' });
    } catch (error) {
        systemStats.errors++;
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/git/status', async (req, res) => {
    try {
        const status = await git.status();
        res.json(status);
    } catch (error) {
        systemStats.errors++;
        res.status(500).json({ error: error.message });
    }
});

// ============ ADMIN API (For Developer) ============

// Simple auth middleware
const adminAuth = (req, res, next) => {
    const password = req.headers['x-admin-password'];
    if (password !== ADMIN_PASSWORD) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};

app.get('/api/admin/stats', adminAuth, (req, res) => {
    const uptime = Date.now() - systemStats.startTime;
    res.json({
        ...systemStats,
        uptime: uptime,
        uptimeFormatted: formatUptime(uptime),
        memory: process.memoryUsage(),
        cpu: process.cpuUsage(),
        platform: os.platform(),
        nodeVersion: process.version,
        totalProjects: projects.size,
        activeSessions: activeSessions.size
    });
});

app.get('/api/admin/projects', adminAuth, (req, res) => {
    const allProjects = Array.from(projects.entries()).map(([id, project]) => ({
        id,
        ...project,
        fileCount: Object.keys(project.files || {}).length
    }));
    res.json(allProjects);
});

app.get('/api/admin/system', adminAuth, (req, res) => {
    res.json({
        hostname: os.hostname(),
        platform: os.platform(),
        arch: os.arch(),
        cpus: os.cpus().length,
        totalMemory: os.totalmem(),
        freeMemory: os.freemem(),
        uptime: os.uptime(),
        loadAverage: os.loadavg()
    });
});

app.delete('/api/admin/projects/:id', adminAuth, (req, res) => {
    const deleted = projects.delete(req.params.id);
    res.json({ success: deleted });
});

// ============ WEBSOCKET FOR TERMINAL ============

wss.on('connection', (ws) => {
    const sessionId = Date.now().toString();
    activeSessions.set(sessionId, ws);
    systemStats.activeUsers++;

    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);

            if (data.type === 'terminal') {
                // Execute command and send output
                exec(data.command, (error, stdout, stderr) => {
                    ws.send(JSON.stringify({
                        type: 'terminal-output',
                        output: stdout || stderr || error?.message || ''
                    }));
                });
            }
        } catch (error) {
            console.error('WebSocket error:', error);
            systemStats.errors++;
        }
    });

    ws.on('close', () => {
        activeSessions.delete(sessionId);
        systemStats.activeUsers--;
    });

    ws.send(JSON.stringify({
        type: 'connected',
        message: 'Terminal connected successfully'
    }));
});

// ============ UTILITY FUNCTIONS ============

function formatUptime(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ${hours % 24}h`;
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
}

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: formatUptime(Date.now() - systemStats.startTime)
    });
});

// Start server
server.listen(PORT, () => {
    console.log(`🚀 CodeSpace server running on port ${PORT}`);
    console.log(`📝 Open http://localhost:${PORT} in your browser`);
    console.log(`🤖 AI Assistant: ${process.env.MISTRAL_API_KEY ? 'Enabled' : 'Disabled (set MISTRAL_API_KEY to enable)'}`);
    console.log(`🔐 Admin Password: ${ADMIN_PASSWORD}`);
    console.log(`💻 Terminal: Enabled`);
    console.log(`📦 Package Manager: Enabled`);
    console.log(`🔧 Git Integration: Enabled`);
});
