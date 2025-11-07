# AdonisJS Tutorial - Complete Guide

Welcome to your AdonisJS learning project! This tutorial covers all the essential concepts with a practical **Task Management** example.

## 🚀 What You've Built

A RESTful API for managing tasks with user authentication, demonstrating:

- **Models & Migrations** - Database structure
- **Controllers** - Business logic
- **Routes** - API endpoints
- **Relationships** - User owns many tasks
- **Authentication** - Protected routes

## 📁 Project Structure

```
adonis_intro/
├── app/
│   ├── controllers/     # Handle HTTP requests
│   │   └── tasks_controller.ts
│   ├── models/          # Database models (ORM)
│   │   ├── user.ts
│   │   └── task.ts
│   ├── middleware/      # Request filters
│   └── validators/      # Input validation
├── database/
│   └── migrations/      # Database schema changes
├── start/
│   └── routes.ts        # Route definitions
├── config/              # Configuration files
└── resources/           # Views (Edge templates)
```

## 🎯 Key AdonisJS Concepts

### 1. **Models** (`app/models/`)

Models represent database tables using Lucid ORM.

```typescript
// app/models/task.ts
export default class Task extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare isCompleted: boolean

  // Relationship: Task belongs to User
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
```

**Key Features:**

- `@column()` - Define database columns
- Automatic timestamps (`createdAt`, `updatedAt`)
- Type-safe with TypeScript
- Built-in relationships

### 2. **Migrations** (`database/migrations/`)

Version control for your database schema.

```typescript
async up() {
  this.schema.createTable('tasks', (table) => {
    table.increments('id')
    table.string('title').notNullable()
    table.boolean('is_completed').defaultTo(false)
    table.integer('user_id').references('users.id')
    table.timestamps()
  })
}
```

**Commands:**

- `node ace migration:run` - Run migrations
- `node ace migration:rollback` - Undo last batch
- `node ace make:migration create_posts_table` - Create new migration

### 3. **Controllers** (`app/controllers/`)

Handle business logic and HTTP requests.

```typescript
// app/controllers/tasks_controller.ts
export default class TasksController {
  // List all tasks
  async index({ auth, response }: HttpContext) {
    const tasks = await Task.query().where('user_id', auth.user!.id).orderBy('created_at', 'desc')
    return response.json({ tasks })
  }

  // Create a task
  async store({ auth, request, response }: HttpContext) {
    const data = request.only(['title', 'description'])
    const task = await Task.create({
      ...data,
      userId: auth.user!.id,
    })
    return response.created({ task })
  }
}
```

**Key Methods:**

- `index()` - List resources
- `store()` - Create resource
- `show()` - Show single resource
- `update()` - Update resource
- `destroy()` - Delete resource

### 4. **Routes** (`start/routes.ts`)

Define your API endpoints.

```typescript
import router from '@adonisjs/core/services/router'

// RESTful routes
router
  .group(() => {
    router.get('/tasks', [TasksController, 'index'])
    router.post('/tasks', [TasksController, 'store'])
    router.get('/tasks/:id', [TasksController, 'show'])
    router.put('/tasks/:id', [TasksController, 'update'])
    router.delete('/tasks/:id', [TasksController, 'destroy'])
  })
  .prefix('api')
```

**Route Features:**

- Route groups
- Prefixes (`/api/tasks`)
- Parameters (`:id`)
- Middleware (authentication)

### 5. **Authentication**

Built-in session-based authentication.

```typescript
// In controller
async index({ auth, response }: HttpContext) {
  const user = auth.user
  if (!user) {
    return response.unauthorized()
  }
  // ... use user.id
}
```

### 6. **Database Queries** (Lucid ORM)

```typescript
// Find all
await Task.all()

// Find by ID
await Task.find(1)

// Find or fail (throws 404)
await Task.findOrFail(1)

// Query builder
await Task.query()
  .where('is_completed', false)
  .where('user_id', userId)
  .orderBy('created_at', 'desc')

// Create
await Task.create({
  title: 'Learn AdonisJS',
  userId: 1,
})

// Update
task.title = 'Updated title'
await task.save()

// Delete
await task.delete()
```

## 🔧 Available API Endpoints

| Method | Endpoint                | Description          |
| ------ | ----------------------- | -------------------- |
| GET    | `/api/tasks`            | Get all user's tasks |
| POST   | `/api/tasks`            | Create a new task    |
| GET    | `/api/tasks/:id`        | Get a specific task  |
| PUT    | `/api/tasks/:id`        | Update a task        |
| DELETE | `/api/tasks/:id`        | Delete a task        |
| PATCH  | `/api/tasks/:id/toggle` | Toggle completion    |

## 🧪 Testing the API

### Using curl:

```bash
# Create a task (requires authentication)
curl -X POST http://localhost:3333/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn AdonisJS", "description": "Complete the tutorial"}'

# Get all tasks
curl http://localhost:3333/api/tasks

# Update a task
curl -X PUT http://localhost:3333/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Task", "isCompleted": true}'

# Toggle task completion
curl -X PATCH http://localhost:3333/api/tasks/1/toggle

# Delete a task
curl -X DELETE http://localhost:3333/api/tasks/1
```

## 📚 Important Commands

```bash
# Development
npm run dev              # Start dev server with hot reload
npm run build            # Build for production
npm start                # Start production server

# Database
node ace migration:run        # Run migrations
node ace migration:rollback   # Rollback migrations
node ace migration:refresh    # Rollback + run
node ace db:seed             # Run seeders

# Generators
node ace make:model Post -m -c    # Model + migration + controller
node ace make:controller Post     # Controller only
node ace make:migration posts     # Migration only
node ace make:validator post      # Validator
node ace make:middleware auth     # Middleware

# List routes
node ace list:routes

# TypeScript
npm run typecheck        # Check types
```

## 🎓 Learning Path

1. ✅ **Project Structure** - Understand the folder layout
2. ✅ **Models & Migrations** - Database design
3. ✅ **Controllers** - Business logic
4. ✅ **Routes** - API endpoints
5. ⏭️ **Validators** - Input validation
6. ⏭️ **Middleware** - Request filtering
7. ⏭️ **Relationships** - Advanced queries
8. ⏭️ **Views (Edge)** - Server-side rendering
9. ⏭️ **Testing** - Write tests with Japa

## 🔍 Next Steps

### Add Validation

```bash
node ace make:validator task
```

```typescript
// app/validators/task.ts
import vine from '@vinejs/vine'

export const createTaskValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(3).maxLength(255),
    description: vine.string().optional(),
  })
)
```

### Add Middleware

```bash
node ace make:middleware auth
```

### Create More Features

- Add task categories
- Add due dates
- Add priorities
- Add task sharing
- Add search functionality

## 📖 Additional Resources

- **Official Docs**: https://docs.adonisjs.com
- **Discord Community**: https://discord.gg/vDcEjq6
- **GitHub**: https://github.com/adonisjs/core

## 💡 Pro Tips

1. Use `node ace list:routes` to see all routes
2. Check `.env` file for configuration
3. Use `logger.info()` for debugging
4. TypeScript provides excellent autocomplete
5. Read error messages carefully - they're helpful!

---

**Happy Learning! 🚀**

Your server is running at: http://localhost:3333
