# 🚀 CodeSpace - Online Code Editor Platform

A powerful, feature-rich online code editor similar to Replit, with AI assistant integration powered by Mistral AI. Built for developers who want a modern, fast, and intelligent coding experience.

![CodeSpace](https://img.shields.io/badge/CodeSpace-v1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 🎨 **Premium UI/UX**
- Modern dark theme with glassmorphism effects
- Smooth animations and transitions
- Responsive design for all screen sizes
- Light/Dark theme toggle

### 💻 **Code Editor**
- **Monaco Editor** (VS Code's editor)
- Multi-language syntax highlighting (HTML, CSS, JavaScript, Python, JSON, Markdown)
- IntelliSense and auto-completion
- Code formatting and linting
- Minimap for easy navigation

### 📁 **File Management**
- Create, edit, and delete files
- File explorer sidebar
- Multiple file support
- Auto-save functionality

### 👁️ **Live Preview**
- Real-time preview for HTML/CSS/JavaScript
- Instant updates as you type
- Sandboxed iframe for security

### 🤖 **AI Coding Assistant**
- Powered by **Mistral AI**
- Context-aware code suggestions
- Bug detection and fixes
- Code explanations
- Best practices recommendations

### ⚡ **Developer Experience**
- Keyboard shortcuts (Ctrl+S to save, Ctrl+Enter to run)
- Project save/load functionality
- Fast and responsive
- No installation required

## 🛠️ Tech Stack

- **Backend**: Node.js + Express
- **Frontend**: Vanilla JavaScript + Monaco Editor
- **AI**: Mistral AI API
- **Deployment**: Railway.app ready

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Mistral AI API key (optional, for AI features)

### Local Setup

1. **Clone or download the project**
```bash
cd codespace
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
# Copy the example file
copy .env.example .env

# Edit .env and add your Mistral AI API key
# MISTRAL_API_KEY=your_api_key_here
```

4. **Start the development server**
```bash
npm start
```

5. **Open in browser**
```
http://localhost:3000
```

## 🚂 Railway Deployment

### Step 1: Prepare Your Code

1. Initialize git repository (if not already done):
```bash
git init
git add .
git commit -m "Initial commit"
```

2. Push to GitHub:
```bash
git remote add origin https://github.com/yourusername/codespace.git
git push -u origin main
```

### Step 2: Deploy to Railway

1. Go to [Railway.app](https://railway.app)
2. Sign in with GitHub
3. Click **"New Project"**
4. Select **"Deploy from GitHub repo"**
5. Choose your `codespace` repository
6. Railway will auto-detect the Node.js project

### Step 3: Configure Environment Variables

1. In Railway dashboard, go to your project
2. Click on **"Variables"** tab
3. Add the following variables:
   - `MISTRAL_API_KEY`: Your Mistral AI API key
   - `PORT`: 3000 (optional, Railway sets this automatically)

### Step 4: Deploy

1. Railway will automatically deploy your app
2. Once deployed, you'll get a public URL like: `https://codespace-production.up.railway.app`
3. Your app is now live 24/7! 🎉

## 🔑 Getting Mistral AI API Key

1. Go to [Mistral AI](https://mistral.ai/)
2. Sign up for an account
3. Navigate to API section
4. Generate a new API key
5. Copy and paste it in your `.env` file or Railway environment variables

> **Note**: The platform works without AI features if you don't set the API key. Users will see a message that AI is not configured.

## 📖 Usage

### Creating Files
1. Click the **+** button in the file explorer
2. Enter filename (e.g., `app.js`, `style.css`)
3. Start coding!

### Running Code
1. Write your HTML/CSS/JavaScript code
2. Click the **Run** button (▶️) or press `Ctrl+Enter`
3. See live preview in the right panel

### Using AI Assistant
1. Switch to the **AI Assistant** tab
2. Ask questions about your code
3. Get instant help and suggestions

### Saving Projects
1. Enter a project name in the top bar
2. Click the **Save** button (💾) or press `Ctrl+S`
3. Your project is saved!

## ⌨️ Keyboard Shortcuts

- `Ctrl/Cmd + S` - Save project
- `Ctrl/Cmd + Enter` - Run code
- `Ctrl/Cmd + /` - Toggle comment (in editor)

## 🌟 Features Comparison

| Feature | CodeSpace | Replit |
|---------|-----------|--------|
| Monaco Editor | ✅ | ❌ |
| AI Assistant | ✅ (Mistral AI) | ✅ (Proprietary) |
| Live Preview | ✅ | ✅ |
| Free Deployment | ✅ (Railway) | ✅ |
| Premium UI | ✅ | ✅ |
| Multi-language | ✅ | ✅ |
| Open Source | ✅ | ❌ |

## 🎯 Roadmap

- [ ] Terminal integration
- [ ] Git integration
- [ ] Collaborative editing (multiplayer)
- [ ] More language support (Python execution, etc.)
- [ ] Project templates
- [ ] User authentication
- [ ] Database integration

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes!

## 💡 Tips

- **Performance**: The editor works best in Chrome/Edge
- **AI Usage**: Be specific in your questions for better AI responses
- **Saving**: Projects are saved in-memory by default. For production, connect a database.

## 🆘 Troubleshooting

### AI Assistant not working?
- Check if `MISTRAL_API_KEY` is set in environment variables
- Verify your API key is valid
- Check browser console for errors

### Preview not updating?
- Make sure you have `index.html` file
- Click the Run button to refresh
- Check browser console for JavaScript errors

### Deployment issues?
- Ensure all files are committed to git
- Check Railway logs for errors
- Verify environment variables are set

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Check the documentation
- Contact the developer

---

**Built with ❤️ for developers, by developers**

🚀 **Start coding now at your deployed URL!**
