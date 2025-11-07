# AdonisJS Learning Project

A complete **Task Management API** built with AdonisJS to demonstrate core framework concepts.

## 🎯 What's This?

This is a fully functional learning project that demonstrates:

- ✅ RESTful API design
- ✅ Database models and migrations
- ✅ Controllers and routing
- ✅ User authentication
- ✅ Relationships (User has many Tasks)
- ✅ CRUD operations

## 🚀 Quick Start

```bash
# Install dependencies (if needed)
npm install

# Start development server
npm run dev

# Server runs at: http://localhost:3333
```

## 📚 Documentation

- **[GETTING_STARTED.md](./GETTING_STARTED.md)** - Start here! Quick setup and first steps
- **[TUTORIAL.md](./TUTORIAL.md)** - Complete guide to AdonisJS concepts
- **[CHEATSHEET.md](./CHEATSHEET.md)** - Quick reference for common tasks
- **[api-examples.http](./api-examples.http)** - Test the API endpoints

## 🧪 Test the API

```bash
# Create a task
curl -X POST http://localhost:3333/api/simple/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "My first task", "description": "Learning AdonisJS"}'

# Get all tasks
curl http://localhost:3333/api/simple/tasks

# Get statistics
curl http://localhost:3333/api/simple/tasks/stats
```

## 📁 Project Structure

```
├── app/
│   ├── controllers/        # HTTP request handlers
│   │   ├── tasks_controller.ts
│   │   └── simple_tasks_controller.ts
│   └── models/             # Database models
│       ├── user.ts
│       └── task.ts
├── database/
│   ├── migrations/         # Database schema
│   └── seeders/            # Sample data
├── start/
│   └── routes.ts           # API routes
├── GETTING_STARTED.md      # 👈 Start here
├── TUTORIAL.md             # Complete guide
├── CHEATSHEET.md           # Quick reference
└── api-examples.http       # API tests
```

## 🎓 Learning Path

1. Read **[GETTING_STARTED.md](./GETTING_STARTED.md)** - Setup and first API call
2. Test the API using **[api-examples.http](./api-examples.http)**
3. Read **[TUTORIAL.md](./TUTORIAL.md)** - Understand the concepts
4. Explore the code in `app/` folder
5. Try modifying something
6. Use **[CHEATSHEET.md](./CHEATSHEET.md)** as reference

## 🛠️ Available Commands

```bash
npm run dev              # Start dev server
npm run build            # Build for production
node ace migration:run   # Run database migrations
node ace db:seed         # Seed database
node ace list:routes     # List all routes
```

## 📖 Key Concepts Covered

### Models (`app/models/`)

Database representations with Lucid ORM

### Controllers (`app/controllers/`)

Business logic and HTTP handling

### Routes (`start/routes.ts`)

API endpoint definitions

### Migrations (`database/migrations/`)

Database version control

### Relationships

User → has many → Tasks

## 🔗 Resources

- **Official Docs**: https://docs.adonisjs.com
- **Discord**: https://discord.gg/vDcEjq6
- **GitHub**: https://github.com/adonisjs/core

## 💡 What's Included

- ✅ Full CRUD API for tasks
- ✅ User authentication setup
- ✅ Database migrations
- ✅ Sample data seeder
- ✅ Two controller variants (with/without auth)
- ✅ Comprehensive documentation
- ✅ API test examples

---

**Happy Learning! 🎉**

Start with: `npm run dev` then visit http://localhost:3333
