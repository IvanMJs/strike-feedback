#!/bin/bash

echo "🚀 Starting deployment..."

# Check if we're in the right directory
echo "📁 Current directory: $(pwd)"
echo "📋 Files in current directory:"
ls -la

# Check environment variables
echo "🔍 Checking environment variables..."
echo "NODE_ENV: $NODE_ENV"
echo "FRONTEND_URL: $FRONTEND_URL"

if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL is not set!"
    echo "🔍 Available environment variables:"
    env | grep -E "(DATABASE|DB)" || echo "No database-related env vars found"
    exit 1
else
    echo "✅ DATABASE_URL is configured (length: ${#DATABASE_URL})"
    echo "📝 DATABASE_URL starts with: ${DATABASE_URL:0:20}..."
fi

# Generate Prisma client
echo "📦 Generating Prisma client..."
if npx prisma generate; then
    echo "✅ Prisma client generated successfully"
else
    echo "❌ Failed to generate Prisma client"
    exit 1
fi

# Run migrations
echo "🗄️ Running database migrations..."
if npx prisma migrate deploy; then
    echo "✅ Migrations completed successfully"
else
    echo "❌ Failed to run migrations"
    exit 1
fi

# Seed database
echo "🌱 Seeding database..."
if npx prisma db seed; then
    echo "✅ Database seeded successfully"
else
    echo "⚠️ Failed to seed database (continuing anyway)"
fi

# Start the application
echo "🚀 Starting application..."
exec npm start
