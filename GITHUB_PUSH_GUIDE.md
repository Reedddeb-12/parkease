# Push ParkEase to GitHub - Quick Guide

## Step 1: Create GitHub Repository

1. Go to [https://github.com/new](https://github.com/new)
2. Fill in the details:
   - **Repository name**: `parkease` (or your preferred name)
   - **Description**: "Smart parking solution website with real-time availability tracking"
   - **Visibility**: Choose Public or Private
   - **Important**: Do NOT check any boxes (no README, .gitignore, or license)
3. Click "Create repository"

## Step 2: Copy Repository URL

After creating the repository, you'll see a setup page. Copy the HTTPS URL that looks like:
```
https://github.com/yourusername/parkease.git
```

## Step 3: Push Your Code

### Option A: Use the Automated Script (Easiest)

Run the script with your repository URL:
```bash
push-to-github.bat https://github.com/yourusername/parkease.git
```

### Option B: Manual Commands

Run these commands one by one:
```bash
git remote add origin https://github.com/yourusername/parkease.git
git branch -M main
git push -u origin main
```

## Troubleshooting

### Error: "remote origin already exists"
```bash
git remote remove origin
```
Then try pushing again.

### Error: "Authentication failed"
You may need to use a Personal Access Token instead of your password:
1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `repo` scope
3. Use the token as your password when prompted

### Error: "Permission denied"
Make sure you're logged into the correct GitHub account and have permission to push to the repository.

## After Successful Push

Your code is now on GitHub! You can:
- View it at: `https://github.com/yourusername/parkease`
- Share the repository with your team
- Set up GitHub Pages for free hosting (if public repo)
- Enable GitHub Actions for CI/CD

## Important Security Note

The `.env` file with your MongoDB credentials is NOT pushed to GitHub (it's in .gitignore). 
Team members will need to:
1. Copy `.env.example` to `.env`
2. Add their own MongoDB Atlas credentials
3. Follow the setup guide in `MONGODB_SETUP_GUIDE.md`

## Next Steps

Consider setting up:
- GitHub Pages for hosting the frontend
- GitHub Actions for automated deployment
- Branch protection rules
- Collaborator access for your team members
