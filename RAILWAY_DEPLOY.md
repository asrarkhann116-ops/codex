# 🚀 Railway Deployment Guide for CodeSpace

## Step 1: GitHub Pe Code Upload Karo

### Option A: GitHub Desktop Use Karo (Easy)

1. **GitHub Desktop Download**: https://desktop.github.com/
2. Install karo
3. Open karo → "Add" → "Add Existing Repository"
4. Select folder: `C:\Users\SK\.gemini\antigravity\scratch\codespace`
5. "Publish repository" click karo
6. Repository name: `codespace`
7. **Uncheck** "Keep this code private" (ya private rakho, dono chalega)
8. Publish!

### Option B: Git Command Line (Advanced)

```bash
cd C:\Users\SK\.gemini\antigravity\scratch\codespace

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - CodeSpace platform"

# Create GitHub repo (browser mein)
# Then link it:
git remote add origin https://github.com/YOUR_USERNAME/codespace.git
git branch -M main
git push -u origin main
```

---

## Step 2: Railway.app Pe Deploy Karo

### 2.1 Account Banao

1. Go to: https://railway.app/
2. "Login" → "Login with GitHub"
3. GitHub se authorize karo

### 2.2 New Project Create Karo

1. Dashboard mein "New Project" click karo
2. "Deploy from GitHub repo" select karo
3. "Configure GitHub App" → Repositories access do
4. Apna `codespace` repo select karo

### 2.3 Environment Variables Add Karo

Railway automatically detect kar lega `Procfile`, but environment variables add karne hain:

1. Project mein jao
2. "Variables" tab click karo
3. Add karo:

```
MISTRAL_API_KEY=4BQlDFelbTdTEruYPmHHOVMtYOBAtofZ
ADMIN_PASSWORD=admin123
NODE_ENV=production
```

### 2.4 Deploy!

Railway **automatically deploy** kar dega! 🎉

- Build time: ~2-3 minutes
- Deployment: Automatic
- URL milega: `https://codespace-production-xxxx.up.railway.app`

---

## Step 3: Live URL Access Karo

1. Deployment complete hone ke baad
2. "Settings" → "Domains" → "Generate Domain"
3. Public URL milega!
4. Open karo browser mein

**Your CodeSpace is LIVE 24/7!** 🚀

---

## 📦 Backup/Download Kaise Kare

### Method 1: ZIP File Banao (Easiest)

1. Folder mein jao: `C:\Users\SK\.gemini\antigravity\scratch\codespace`
2. Right-click → "Send to" → "Compressed (zipped) folder"
3. `codespace.zip` ban jayega
4. Yeh file kahi bhi save karo (Google Drive, USB, etc.)

### Method 2: GitHub Se Download (After Upload)

1. GitHub repo pe jao
2. "Code" button → "Download ZIP"
3. Backup ready!

### Method 3: Copy Entire Folder

```bash
# Copy to another location
xcopy C:\Users\SK\.gemini\antigravity\scratch\codespace D:\Backup\codespace /E /I
```

---

## 🔧 Important Files Checklist

Make sure yeh files GitHub pe upload ho:

- ✅ `server.js`
- ✅ `package.json`
- ✅ `Procfile`
- ✅ `.env.example` (NOT .env - security!)
- ✅ `public/index.html`
- ✅ `public/style.css`
- ✅ `public/app.js`
- ✅ `README.md`
- ✅ `.gitignore`

**❌ DON'T upload:**
- `node_modules/` (already in .gitignore)
- `.env` (already in .gitignore - has API key!)

---

## 🎯 Railway Deployment Checklist

- [ ] GitHub account ready
- [ ] Code uploaded to GitHub
- [ ] Railway.app account created
- [ ] Project deployed from GitHub
- [ ] Environment variables added
- [ ] Deployment successful
- [ ] Public URL working
- [ ] Test all features:
  - [ ] Monaco Editor
  - [ ] Live Preview
  - [ ] AI Assistant
  - [ ] Terminal
  - [ ] Package Manager
  - [ ] Git Integration
  - [ ] Admin Dashboard (password: admin123)

---

## 💡 Pro Tips

### Free Tier Limits (Railway)

- **$5 free credit** per month
- **500 hours** execution time
- **100 GB** bandwidth
- **1 GB** RAM per service

**CodeSpace is lightweight** - easily fits in free tier! 🎉

### Custom Domain (Optional)

1. Railway dashboard → "Settings" → "Domains"
2. "Custom Domain" add karo
3. DNS settings update karo
4. Done! Your custom domain live!

### Auto-Deploy on Git Push

Railway automatically deploy karta hai jab tum GitHub pe code push karte ho!

```bash
# Make changes
git add .
git commit -m "Updated features"
git push

# Railway automatically deploys! 🚀
```

---

## 🐛 Troubleshooting

### Issue: Build Failed

**Solution**: Check logs in Railway dashboard. Usually missing environment variables.

### Issue: App Crashes

**Solution**: 
1. Check Railway logs
2. Verify `MISTRAL_API_KEY` is set
3. Check `Procfile` exists

### Issue: Can't Access URL

**Solution**: 
1. Check deployment status (should be "Active")
2. Wait 2-3 minutes after deployment
3. Try regenerating domain

---

## 📞 Need Help?

- Railway Docs: https://docs.railway.app/
- GitHub Docs: https://docs.github.com/
- CodeSpace README: Check `README.md` in project

---

**Your CodeSpace will be LIVE 24/7 on Railway for FREE!** 🎉

Public URL share kar sakte ho anyone with! No installation needed for users! 🚀
