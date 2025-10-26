#!/bin/bash

echo "🚀 Setting up ParkEase with MongoDB Atlas Integration"
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "⚠️  Please edit .env file with your MongoDB Atlas connection string"
else
    echo "✅ .env file already exists"
fi

# Create directories if they don't exist
mkdir -p models routes assets/images

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env file with your MongoDB Atlas connection string"
echo "2. Start the backend server: npm run dev"
echo "3. In another terminal, start frontend: python -m http.server 8000"
echo "4. Open http://localhost:8000 in your browser"
echo ""
echo "📚 See README.md for detailed setup instructions"