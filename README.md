# Strike Feedback

A modern vulnerability management system built with Next.js, designed to follow real-world UI/UX patterns from products like Jira and Trello.

## Features

- 🔒 **Vulnerability Management**: Create, edit, delete, and track security vulnerabilities
- 📊 **Real-time Dashboard**: Live stats with automatic updates
- 🎯 **Smart CWE Selector**: Searchable database of 50+ common CWEs with descriptions
- 🚀 **Modern UI/UX**: Modal-based creation, card interface, and responsive design
- ⚡ **Optimistic Updates**: Instant UI feedback with React Query
- 🎨 **Professional Design**: Built with shadcn/ui and Tailwind CSS

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety throughout the application
- **React Query** - Data fetching, caching, and state management
- **React Hook Form** - Performant form handling with validation
- **shadcn/ui** - Modern UI components built on Radix UI
- **Tailwind CSS** - Utility-first CSS framework
- **Zod** - Schema validation

### Backend
- **Express.js** - Node.js web framework
- **Prisma** - Type-safe ORM for database operations
- **SQLite** - Lightweight database for development
- **TypeScript** - Full-stack type safety

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone and install dependencies:**
```bash
git clone <repository-url>
cd strike-feedback
npm install
```

2. **Set up the database:**
```bash
# Navigate to the API directory
cd api

# Install API dependencies
npm install

# Generate Prisma client and run migrations
npx prisma generate
npx prisma db push

# Seed the database with sample data
npm run seed
```

3. **Start the backend server:**
```bash
# From the api directory
npm run dev
```
The API will be available at `http://localhost:3001`

4. **Start the frontend development server:**
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

## Development

### Available Scripts

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

**Backend (from /api directory):**
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript
- `npm run seed` - Seed database with sample data

### Database Management

```bash
# Generate Prisma client after schema changes
npx prisma generate

# Push schema changes to database
npx prisma db push

# Open Prisma Studio to view/edit data
npx prisma studio
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
