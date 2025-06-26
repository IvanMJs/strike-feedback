#!/bin/bash
echo "🚀 Starting deployment process..."

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
  echo "❌ DATABASE_URL is not set!"
  exit 1
fi

echo "✅ DATABASE_URL is configured"

# Generate Prisma client
echo "📦 Generating Prisma client..."
npx prisma generate

# Run migrations
echo "🗄️ Running database migrations..."
npx prisma migrate deploy

# Seed database
echo "🌱 Seeding database..."
npx prisma db seed

# Start the application
echo "🚀 Starting application..."
npm start
