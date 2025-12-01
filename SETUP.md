# 🚀 CodeSpace Setup Guide

## ⚠️ IMPORTANT: Install Node.js First!

CodeSpace requires **Node.js** to run. Follow these steps:

### Step 1: Install Node.js

1. **Download Node.js**: Go to https://nodejs.org/
2. **Choose Version**: Download the **LTS version** (recommended)
3. **Install**: Run the installer and follow the prompts
4. **Verify Installation**: Open a new terminal and run:
   ```bash
   node --version
   npm --version
   ```

### Step 2: Install Dependencies

Once Node.js is installed, run:

```bash
cd C:\Users\SK\.gemini\antigravity\scratch\codespace
npm install
```

### Step 3: Start the Server

```bash
npm start
```

### Step 4: Open in Browser

Navigate to: **http://localhost:3000**

---

## 🎯 Features Included

### ✅ Core Features
- **Monaco Editor** - VS Code-like code editor
- **File Management** - Create, edit, delete files
- **Live Preview** - Real-time HTML/CSS/JS preview
- **AI Assistant** - Mistral AI integration (API key already configured!)
- **Dark/Light Theme** - Toggle between themes

### 🔥 Advanced Features (Beyond Replit!)
- **💻 Integrated Terminal** - Execute commands directly
- **📦 Package Manager** - Install npm/pip/yarn packages
- **🔧 Git Integration** - Clone, commit, push repositories
- **🔐 Admin Dashboard** - System monitoring & analytics (password: `admin123`)

### 🎨 6 Panels Available
1. **Preview** - Live code preview
2. **Terminal** - Command execution
3. **Packages** - Package installation
4. **Git** - Version control
5. **AI** - Coding assistant
6. **Admin** - Developer dashboard

---

## 🔐 Admin Access

**Password**: `admin123`

Features:
- Real-time system stats (uptime, users, projects, requests)
- System information viewer
- Auto-refresh every 5 seconds

---

## 🎨 Premium Design

- Modern dark theme with glassmorphism
- Smooth animations and transitions
- Gradient accents
- Responsive layout
- Professional UI/UX

---

## 🚀 Deployment to Railway.app

1. Create account at https://railway.app
2. Click "New Project" → "Deploy from GitHub repo"
3. Connect your GitHub repository
4. Railway will auto-detect the `Procfile` and deploy!
5. Add environment variable: `MISTRAL_API_KEY=4BQlDFelbTdTEruYPmHHOVMtYOBAtofZ`

Your app will be live 24/7 with a public URL!

---

## 💡 Keyboard Shortcuts

- **Ctrl/Cmd + S**: Save project
- **Ctrl/Cmd + Enter**: Run code

---

## 🎯 What Makes CodeSpace Better Than Replit?

### ✅ Advantages
1. **100% FREE** - No credit system, no hidden costs
2. **Open Source** - Full control over your code
3. **Self-Hosted** - Deploy anywhere (Railway, Vercel, your own server)
4. **No Vendor Lock-in** - Export projects anytime
5. **Better Performance** - Monaco Editor (VS Code engine)
6. **Secure** - No AI database wipes or hallucinations
7. **Admin Dashboard** - Monitor your platform (Replit doesn't have this!)
8. **Integrated Terminal** - Full command-line access
9. **Git Integration** - Built-in version control
10. **Package Manager** - Install any package

### 🔒 Security Features
- Command blocking for dangerous operations
- Sandboxed preview iframe
- Admin authentication
- Environment variable protection

---

## 🐛 Troubleshooting

### Issue: "npm is not recognized"
**Solution**: Install Node.js from https://nodejs.org/

### Issue: "Port 3000 already in use"
**Solution**: Change PORT in `.env` file or kill the process using port 3000

### Issue: "AI Assistant not working"
**Solution**: API key is already configured in `.env` file!

### Issue: "Terminal commands not working"
**Solution**: Some commands are blocked for security (rm -rf, format, shutdown, etc.)

---

## 📁 Project Structure

```
codespace/
├── server.js              # Express backend with all APIs
├── package.json           # Dependencies
├── Procfile              # Railway deployment
├── .env                  # Environment variables (API key configured!)
├── .gitignore            # Git ignore rules
├── README.md             # Documentation
└── public/
    ├── index.html        # Main HTML with 6 panels
    ├── style.css         # Premium CSS styling
    └── app.js            # Complete JavaScript logic
```

---

## 🎉 You're All Set!

Once Node.js is installed, just run:

```bash
npm install
npm start
```

Then open **http://localhost:3000** and enjoy your **FREE, POWERFUL, REPLIT-KILLER** code editor! 🚀

**Admin Password**: `admin123`  
**AI is Ready**: Mistral API key already configured!

---

**Made with ❤️ by SK**  
**Powered by: Express.js, Monaco Editor, Mistral AI**
