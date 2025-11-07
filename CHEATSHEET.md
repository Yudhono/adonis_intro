# AdonisJS Quick Reference Cheat Sheet

## 🚀 CLI Commands

### Project

```bash
npm init adonisjs@latest my-app    # Create new project
npm run dev                        # Start dev server
npm run build                      # Build for production
npm start                          # Run production server
```

### Code Generation

```bash
node ace make:model Post -m -c        # Model + Migration + Controller
node ace make:controller Users        # Controller
node ace make:model Post              # Model only
node ace make:migration create_posts  # Migration
node ace make:validator post          # Validator
node ace make:middleware auth         # Middleware
node ace make:service mail            # Service
```

### Database

```bash
node ace migration:run          # Run pending migrations
node ace migration:rollback     # Rollback last batch
node ace migration:refresh      # Rollback all + run all
node ace migration:reset        # Rollback all
node ace db:seed                # Run all seeders
node ace db:seed --files="./database/seeders/user_seeder.ts"
```

### Utilities

```bash
node ace list:routes            # List all routes
node ace --help                 # Show all commands
npm run typecheck               # TypeScript check
npm run lint                    # Lint code
```

## 📁 Project Structure

```
app/
├── controllers/     # HTTP request handlers
├── models/          # Database models (ORM)
├── middleware/      # Request/response filters
├── validators/      # Input validation schemas
├── services/        # Business logic
├── exceptions/      # Custom exceptions
└── policies/        # Authorization logic

database/
├── migrations/      # Database schema versions
└── seeders/         # Test/default data

start/
├── routes.ts        # Route definitions
└── kernel.ts        # Middleware registration

config/              # App configuration
resources/           # Views (Edge templates)
tests/               # Test files
```

## 🛣️ Routes

### Basic Routing

```typescript
import router from '@adonisjs/core/services/router'

router.get('/posts', [PostsController, 'index'])
router.post('/posts', [PostsController, 'store'])
router.get('/posts/:id', [PostsController, 'show'])
router.put('/posts/:id', [PostsController, 'update'])
router.delete('/posts/:id', [PostsController, 'destroy'])

// Closure route
router.get('/hello', async () => {
  return { message: 'Hello World' }
})

// Render view
router.on('/').render('pages/home')
```

### Route Groups

```typescript
router
  .group(() => {
    router.get('/posts', [PostsController, 'index'])
    router.post('/posts', [PostsController, 'store'])
  })
  .prefix('api') // /api/posts
  .middleware('auth') // Apply middleware
```

### Resource Routes

```typescript
router.resource('posts', PostsController)
// Creates: index, store, show, update, destroy
```

## 🎮 Controllers

### Basic Controller

```typescript
import type { HttpContext } from '@adonisjs/core/http'
import Post from '#models/post'

export default class PostsController {
  // GET /posts
  async index({ response }: HttpContext) {
    const posts = await Post.all()
    return response.json(posts)
  }

  // POST /posts
  async store({ request, response }: HttpContext) {
    const data = request.only(['title', 'content'])
    const post = await Post.create(data)
    return response.created(post)
  }

  // GET /posts/:id
  async show({ params, response }: HttpContext) {
    const post = await Post.findOrFail(params.id)
    return response.json(post)
  }

  // PUT /posts/:id
  async update({ params, request, response }: HttpContext) {
    const post = await Post.findOrFail(params.id)
    post.merge(request.only(['title', 'content']))
    await post.save()
    return response.json(post)
  }

  // DELETE /posts/:id
  async destroy({ params, response }: HttpContext) {
    const post = await Post.findOrFail(params.id)
    await post.delete()
    return response.noContent()
  }
}
```

### HttpContext Properties

```typescript
async method({ request, response, params, auth, session, view }: HttpContext) {
  request.all()              // All input
  request.only(['name'])     // Specific fields
  request.input('name')      // Single field
  request.file('avatar')     // File upload

  response.json(data)        // JSON response
  response.created(data)     // 201 Created
  response.noContent()       // 204 No Content
  response.unauthorized()    // 401
  response.notFound()        // 404

  params.id                  // Route parameters
  auth.user                  // Current user
  session.get('key')         // Session data
  view.render('home')        // Render view
}
```

## 💾 Models & Database

### Define Model

```typescript
import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, belongsTo } from '@adonisjs/lucid/orm'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare content: string

  @column()
  declare userId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relationships
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => Comment)
  declare comments: HasMany<typeof Comment>
}
```

### Query Database

```typescript
// Find all
await Post.all()

// Find by ID
await Post.find(1)
await Post.findOrFail(1) // Throws if not found

// Query builder
await Post.query()
  .where('status', 'published')
  .where('views', '>', 100)
  .orderBy('created_at', 'desc')
  .limit(10)

// Multiple conditions
await Post.query().where('status', 'published').orWhere('featured', true)

// Create
await Post.create({
  title: 'My Post',
  content: 'Content here',
  userId: 1,
})

// Update
const post = await Post.findOrFail(1)
post.title = 'Updated Title'
await post.save()

// Or use merge
post.merge({ title: 'Updated', content: 'New content' })
await post.save()

// Delete
await post.delete()

// Soft delete (requires setup)
await post.softDelete()

// Count
const count = await Post.query().count('* as total')

// Pagination
const posts = await Post.query().paginate(page, perPage)
```

### Relationships

```typescript
// Load relationship
const post = await Post.query().preload('user').first()
const post = await Post.query().preload('comments').first()

// Nested preload
await Post.query().preload('user', (query) => {
  query.preload('profile')
})

// Access relationship
console.log(post.user.name)
console.log(post.comments.length)
```

## 🗄️ Migrations

### Create Table

```typescript
export default class extends BaseSchema {
  protected tableName = 'posts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.text('content')
      table.boolean('is_published').defaultTo(false)
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
```

### Alter Table

```typescript
async up() {
  this.schema.alterTable('posts', (table) => {
    table.string('slug').unique()
    table.integer('views').defaultTo(0)
  })
}
```

### Column Types

```typescript
table.increments('id') // Auto-increment ID
table.string('name', 255) // VARCHAR
table.text('description') // TEXT
table.integer('count') // INTEGER
table.boolean('is_active') // BOOLEAN
table.decimal('price', 8, 2) // DECIMAL
table.date('birth_date') // DATE
table.datetime('created_at') // DATETIME
table.timestamp('updated_at') // TIMESTAMP
table.json('metadata') // JSON
table
  .enum('status', ['draft', 'published'])

  // Modifiers
  .notNullable()
  .nullable()
  .defaultTo(value)
  .unique()
  .unsigned()
  .index()
```

## ✅ Validation

### Create Validator

```typescript
import vine from '@vinejs/vine'

export const createPostValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(3).maxLength(255),
    content: vine.string().minLength(10),
    status: vine.enum(['draft', 'published']),
    tags: vine.array(vine.string()),
    email: vine.string().email(),
    age: vine.number().min(18).max(100),
  })
)
```

### Use in Controller

```typescript
import { createPostValidator } from '#validators/post'

async store({ request }: HttpContext) {
  const data = await request.validateUsing(createPostValidator)
  const post = await Post.create(data)
  return post
}
```

## 🔐 Authentication

### Check if Authenticated

```typescript
async index({ auth, response }: HttpContext) {
  if (!auth.user) {
    return response.unauthorized({ error: 'Not logged in' })
  }

  const user = auth.user
  // Use user data
}
```

### Login

```typescript
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

async login({ request, auth }: HttpContext) {
  const { email, password } = request.only(['email', 'password'])

  const user = await User.verifyCredentials(email, password)
  await auth.use('web').login(user)

  return { message: 'Logged in' }
}
```

## 🎨 Response Types

```typescript
response.json(data) // 200 OK
response.created(data) // 201 Created
response.accepted() // 202 Accepted
response.noContent() // 204 No Content
response.badRequest(message) // 400 Bad Request
response.unauthorized(message) // 401 Unauthorized
response.forbidden(message) // 403 Forbidden
response.notFound(message) // 404 Not Found
response.status(500).send(message) // Custom status
response.redirect('/path') // Redirect
response.download('path/to/file') // File download
```

## 🔗 Import Aliases

```typescript
import User from '#models/user'
import UsersController from '#controllers/users_controller'
import { createUserValidator } from '#validators/user'
import AuthMiddleware from '#middleware/auth'
import db from '#services/db'
```

## 📦 Common Packages

```bash
# Validation
npm install @vinejs/vine

# Authentication
npm install @adonisjs/auth

# Session
npm install @adonisjs/session

# Database
npm install @adonisjs/lucid

# Mail
npm install @adonisjs/mail

# Redis
npm install @adonisjs/redis
```

## 🐛 Debugging

```typescript
// Use logger
import logger from '@adonisjs/core/services/logger'

logger.info('Info message')
logger.error('Error message')
logger.debug('Debug message')

// Console log
console.log(data)

// Dump query
const query = Post.query().where('status', 'published').toSQL()
console.log(query)
```

---

**Documentation**: https://docs.adonisjs.com
**Discord**: https://discord.gg/vDcEjq6
