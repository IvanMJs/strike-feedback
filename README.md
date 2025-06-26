# Strike Feedback

A modern vulnerability management system built with Next.js, designed to follow real-world UI/UX patterns from products like Jira and Trello.

## 🚀 Live Demo

- **Frontend**: [https://strike-feedback.vercel.app](https://strike-feedback.vercel.app) (Deployed on Vercel)
- **Backend API**: [https://strike-feedback.onrender.com](https://strike-feedback.onrender.com) (Deployed on Render)

## Features

- 🔒 **Vulnerability Management**: Create, edit, delete, and track security vulnerabilities
- 📊 **Real-time Dashboard**: Live stats with automatic updates
- 🎯 **Smart CWE Selector**: Searchable database of 50+ common CWEs with descriptions
- 🚀 **Modern UI/UX**: Modal-based creation, card interface, and responsive design
- ⚡ **Optimistic Updates**: Instant UI feedback with React Query
- 🎨 **Professional Design**: Built with shadcn/ui and Tailwind CSS
- 🌐 **Production Ready**: Deployed with professional CI/CD pipeline

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety throughout the application
- **React Query** - Data fetching, caching, and state management
- **React Hook Form** - Performant form handling with validation
- **shadcn/ui** - Modern UI components built on Radix UI
- **Tailwind CSS** - Utility-first CSS framework
- **Zod** - Schema validation
- **Vercel** - Deployment platform

### Backend
- **Express.js** - Node.js web framework
- **Prisma** - Type-safe ORM for database operations
- **PostgreSQL** - Production database (Render managed)
- **TypeScript** - Full-stack type safety
- **Render** - Deployment platform

## Architecture

```
┌─────────────────┐    HTTP/REST API    ┌─────────────────┐
│   Frontend      │ ◄─────────────────► │    Backend      │
│   (Vercel)      │                     │   (Render)      │
│                 │                     │                 │
│ • Next.js 14    │                     │ • Express.js    │
│ • React Query   │                     │ • Prisma ORM    │
│ • shadcn/ui     │                     │ • PostgreSQL    │
└─────────────────┘                     └─────────────────┘
```

## Getting Started

### Quick Start (Using Live Demo)
Simply visit [https://strike-feedback.vercel.app](https://strike-feedback.vercel.app) to use the live application.

### Local Development

#### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL (for production-like setup) or SQLite (for quick development)

#### Installation

1. **Clone and install dependencies:**
```bash
git clone https://github.com/IvanMJs/strike-feedback.git
cd strike-feedback
npm install
```

2. **Set up environment variables:**
```bash
# Copy environment example
cp .env.local.example .env.local

# Edit .env.local with your API URL
# For local development:
NEXT_PUBLIC_API_URL=http://localhost:3001

# For production:
NEXT_PUBLIC_API_URL=https://strike-feedback.onrender.com
```

3. **Set up the backend:**
```bash
# Navigate to the API directory
cd api

# Install API dependencies
npm install

# Set up database URL in api/.env
echo "DATABASE_URL=your-database-url-here" > .env

# Generate Prisma client and run migrations
npx prisma generate
npx prisma db push

# Seed the database with sample data
npm run seed
```

4. **Start the development servers:**

**Backend (Terminal 1):**
```bash
cd api
npm run dev
```
The API will be available at `http://localhost:3001`

**Frontend (Terminal 2):**
```bash
# From the root directory
npm run dev
```

5. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
├── app/                    # Next.js app directory
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── vulnerability-*   # Feature-specific components
│   ├── cwe-selector.tsx  # Smart CWE selection component
│   └── stats-cards.tsx   # Dashboard statistics
├── lib/                  # Utility libraries
│   ├── api.ts           # API client functions
│   ├── cwe-database.ts  # CWE database with search
│   └── validations.ts   # Zod schemas
├── hooks/               # Custom React hooks
├── types/              # TypeScript type definitions
└── api/               # Backend Express.js application
    ├── src/          # API source code
    ├── prisma/       # Database schema and migrations
    └── package.json  # API dependencies
```

## Key Features Explained

### Modal-Based Creation
Following patterns from Jira and Trello, vulnerabilities are created through modals rather than always-visible forms.

### Smart CWE Selection
The CWE selector addresses the real-world problem of managing 950+ CWE types by providing:
- Searchable interface by name or code
- Categorized common CWEs with descriptions
- Custom entry for unlisted CWEs

### Modern State Management
Uses React Query for:
- Intelligent caching and background updates
- Optimistic updates for better UX
- Automatic cache invalidation after mutations

## API Endpoints

The backend API provides the following endpoints:

### Vulnerabilities
- `GET /api/vulnerabilities` - List all vulnerabilities with filtering and pagination
- `POST /api/vulnerabilities` - Create a new vulnerability
- `PUT /api/vulnerabilities/:id` - Update an existing vulnerability
- `DELETE /api/vulnerabilities/:id` - Delete a vulnerability

### Query Parameters (GET /api/vulnerabilities)
- `search` - Search in title and description
- `status` - Filter by status (PENDING_FIX, IN_PROGRESS, SOLVED, FALSE_POSITIVE)
- `severity` - Filter by severity (CRITICAL, HIGH, MEDIUM, LOW)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)

### Example API Usage
```bash
# Get all vulnerabilities
curl https://strike-feedback.onrender.com/api/vulnerabilities

# Search vulnerabilities
curl "https://strike-feedback.onrender.com/api/vulnerabilities?search=XSS&severity=HIGH"

# Get specific vulnerability
curl https://strike-feedback.onrender.com/api/vulnerabilities/[id]
```

## Key Features Explained

### Real-World UI/UX Patterns
- **Modal-based creation** - Following Jira/Trello patterns for better workflow
- **Card-based interface** - Easy to scan and manage multiple vulnerabilities
- **Instant feedback** - Optimistic updates provide immediate visual response
- **Professional design** - Clean, modern interface suitable for enterprise use

### Smart CWE Integration
- **Searchable database** - Find CWEs by name, code, or description
- **Common vulnerabilities** - Pre-populated with 50+ most common CWEs
- **Custom entries** - Support for unlisted or internal vulnerability types
- **Rich descriptions** - Helpful context for each CWE type

### Production Features
- **Type safety** - Full TypeScript coverage from database to UI
- **Validation** - Comprehensive input validation with Zod schemas
- **Error handling** - Graceful error states and user feedback
- **Responsive design** - Works seamlessly on desktop and mobile
- **Performance optimized** - Built-in caching and optimizations

## Deployment

### Frontend (Vercel)
The frontend is automatically deployed to Vercel on every push to the main branch.

**Environment Variables Required:**
- `NEXT_PUBLIC_API_URL=https://strike-feedback.onrender.com`

### Backend (Render)
The backend is deployed on Render with a managed PostgreSQL database.

**Environment Variables Required:**
- `DATABASE_URL` - PostgreSQL connection string (auto-configured by Render)
- `NODE_ENV=production`

### Manual Deployment

**Frontend:**
```bash
# Deploy to Vercel
npm run build
npx vercel --prod
```

**Backend:**
```bash
cd api
# Build and deploy to Render
npm run build
# Render auto-deploys from GitHub
```

## Development

### Available Scripts

**Frontend (Root Directory):**
- `npm run dev` - Start development server
- `npm run build` - Build for production  
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler check

**Backend (api/ Directory):**
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript
- `npm run start` - Start production server
- `npm run seed` - Seed database with sample data

### Database Management

```bash
# Generate Prisma client after schema changes
cd api
npx prisma generate

# Push schema changes to database
npx prisma db push

# Run migrations (production)
npx prisma migrate deploy

# Open Prisma Studio to view/edit data
npx prisma studio
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Screenshots

### Dashboard View
The main dashboard provides an overview of all vulnerabilities with filtering and search capabilities.

### Vulnerability Creation
Modal-based creation form with smart CWE selection and comprehensive validation.

### Real-time Updates
Changes are reflected immediately across the interface with optimistic updates.

## Current Features

- [x] **Vulnerability Management** - Complete CRUD operations for security vulnerabilities
- [x] **Real-time Dashboard** - Live statistics and data updates with React Query
- [x] **Smart CWE Integration** - Searchable database with 50+ common vulnerability types
- [x] **Advanced Filtering** - Search by title, description, CWE, status, and severity
- [x] **Modal-based UI** - Professional Jira/Trello-inspired interface patterns
- [x] **Optimistic Updates** - Instant UI feedback for better user experience
- [x] **Responsive Design** - Works seamlessly on desktop and mobile devices
- [x] **Type Safety** - Full TypeScript coverage from database to UI
- [x] **Form Validation** - Comprehensive input validation with Zod schemas
- [x] **Error Handling** - Graceful error states and user feedback
- [x] **Production Deployment** - Live on Vercel (frontend) and Render (backend)
- [x] **Database Management** - PostgreSQL with Prisma ORM and migrations