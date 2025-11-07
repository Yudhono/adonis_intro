# 🚀 Getting Started with Your AdonisJS Project

## What's Been Set Up

Your AdonisJS project is ready with a complete **Task Management API**! Here's what you have:

### ✅ Installed & Configured

- ✅ AdonisJS 6 (latest version)
- ✅ TypeScript
- ✅ Lucid ORM (database)
- ✅ SQLite database
- ✅ Session-based authentication
- ✅ Task CRUD API

### 📁 Project Files Created

```
app/
├── controllers/
│   ├── tasks_controller.ts          # Full controller with auth
│   └── simple_tasks_controller.ts   # Simple controller (no auth)
└── models/
    ├── user.ts                       # User model
    └── task.ts                       # Task model

database/
├── migrations/
│   ├── *_create_users_table.ts      # Users table
│   └── *_create_tasks_table.ts      # Tasks table
└── seeders/
    └── user_seeder.ts                # Default user (demo@example.com)

start/
└── routes.ts                         # API routes defined
```

## 🎯 Quick Start

### 1. Start the Server (if not already running)

```bash
npm run dev
```

The server will start at: **http://localhost:3333**

### 2. Test the API

#### Option A: Using curl (Terminal)

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

#### Option B: Using the HTTP file

Open `api-examples.http` and click on "Send Request" above each request (requires REST Client extension)

#### Option C: Using Postman or Insomnia

Import the endpoints from `api-examples.http`

## 📚 Available API Endpoints

### Simple API (No Authentication - For Learning)

Base URL: `http://localhost:3333/api/simple`

| Method | Endpoint            | Description       | Body Example                             |
| ------ | ------------------- | ----------------- | ---------------------------------------- |
| GET    | `/tasks`            | Get all tasks     | -                                        |
| GET    | `/tasks/stats`      | Get statistics    | -                                        |
| POST   | `/tasks`            | Create a task     | `{"title": "...", "description": "..."}` |
| GET    | `/tasks/:id`        | Get one task      | -                                        |
| PUT    | `/tasks/:id`        | Update a task     | `{"title": "...", "isCompleted": true}`  |
| PATCH  | `/tasks/:id/toggle` | Toggle completion | -                                        |
| DELETE | `/tasks/:id`        | Delete a task     | -                                        |

### Authenticated API (Production-Ready)

Base URL: `http://localhost:3333/api`

Same endpoints as above, but requires user authentication.

## 🎓 Learning the Code

### 1. Understanding Routes (`start/routes.ts`)

Routes connect URLs to controller methods:

```typescript
// This route:
router.get('/tasks', [SimpleTasksController, 'index'])

// Means: GET http://localhost:3333/api/simple/tasks
// Calls: SimpleTasksController.index() method
```

### 2. Understanding Controllers (`app/controllers/`)

Controllers handle the business logic:

```typescript
async index({ response }: HttpContext) {
  // Get all tasks from database
  const tasks = await Task.query().orderBy('created_at', 'desc')

  // Return JSON response
  return response.json({ tasks })
}
```

### 3. Understanding Models (`app/models/`)

Models represent database tables:

```typescript
export default class Task extends BaseModel {
  @column()
  declare title: string // Maps to 'title' column in database

  @column()
  declare isCompleted: boolean // Maps to 'is_completed' column
}
```

### 4. Understanding Migrations (`database/migrations/`)

Migrations define your database structure:

```typescript
table.string('title').notNullable() // Creates VARCHAR column
table.boolean('is_completed') // Creates BOOLEAN column
table.integer('user_id').references('users.id') // Foreign key
```

## 🔧 Useful Commands

```bash
# Development
npm run dev              # Start dev server (with hot reload)
npm run build            # Build for production
npm start                # Run production build

# Database
node ace migration:run        # Run migrations
node ace migration:rollback   # Undo last migration
node ace db:seed             # Run seeders

# Code Generation
node ace make:model Post -m -c    # Create model + migration + controller
node ace make:controller Users    # Create controller
node ace make:migration posts     # Create migration

# Utilities
node ace list:routes     # See all routes
npm run typecheck        # Check TypeScript errors
npm run lint             # Check code style
```

## 🎨 Customize Your Project

### Add a New Field to Tasks

1. **Create migration:**

```bash
node ace make:migration add_priority_to_tasks
```

2. **Edit the migration:**

```typescript
// database/migrations/*_add_priority_to_tasks.ts
async up() {
  this.schema.table('tasks', (table) => {
    table.string('priority').defaultTo('medium')
  })
}
```

3. **Run migration:**

```bash
node ace migration:run
```

4. **Update model:**

```typescript
// app/models/task.ts
@column()
declare priority: string
```

### Add a New Endpoint

1. **Add method to controller:**

```typescript
// app/controllers/simple_tasks_controller.ts
async completed({ response }: HttpContext) {
  const tasks = await Task.query().where('is_completed', true)
  return response.json({ tasks })
}
```

2. **Add route:**

```typescript
// start/routes.ts
router.get('/tasks/completed', [SimpleTasksController, 'completed'])
```

## 🐛 Troubleshooting

### Server won't start

```bash
# Kill any process on port 3333
lsof -ti:3333 | xargs kill -9

# Restart server
npm run dev
```

### Database errors

```bash
# Reset database
node ace migration:rollback
node ace migration:run
node ace db:seed
```

### Import errors

Make sure to use the `#` imports:

```typescript
import Task from '#models/task' // ✅ Correct
import Task from '../models/task' // ❌ Don't use relative paths
```

## 📖 Next Steps

1. **Try all API endpoints** - Use `api-examples.http`
2. **Read the code** - Understand how it works
3. **Modify something** - Change a controller response
4. **Add a feature** - Add task categories or tags
5. **Read documentation** - https://docs.adonisjs.com

## 💡 Tips

- Check the terminal for logs and errors
- Use `console.log()` for debugging
- TypeScript autocomplete is your friend
- Read error messages carefully
- The `.env` file has configuration settings

## 🆘 Need Help?

- **Tutorial**: See `TUTORIAL.md` for detailed explanations
- **API Examples**: See `api-examples.http` for all endpoints
- **Docs**: https://docs.adonisjs.com
- **Discord**: https://discord.gg/vDcEjq6

---

**Your server is running at: http://localhost:3333** 🎉

Try creating your first task:

```bash
curl -X POST http://localhost:3333/api/simple/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn AdonisJS", "description": "I am learning!"}'
```
