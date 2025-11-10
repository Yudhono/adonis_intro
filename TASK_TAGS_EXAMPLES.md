# Task-Tag Integration Examples

## 📊 Database Structure

```
tasks (id, title, description, priority, is_completed, user_id)
  ↕ many-to-many
tags (id, name)

Connected via pivot table:
task_tag (id, task_id, tag_id)
```

---

## 🎯 API Usage Examples

### 1. Create Tags First

```bash
# Create "work" tag
curl -X POST http://localhost:3333/api/simple/tags \
  -H "Content-Type: application/json" \
  -d '{"name": "work"}'

# Create "urgent" tag
curl -X POST http://localhost:3333/api/simple/tags \
  -H "Content-Type: application/json" \
  -d '{"name": "urgent"}'

# Create "personal" tag
curl -X POST http://localhost:3333/api/simple/tags \
  -H "Content-Type: application/json" \
  -d '{"name": "personal"}'
```

**Response:**

```json
{
  "message": "Tag created successfully",
  "tag": {
    "name": "work",
    "id": 1,
    "createdAt": "2025-11-10T..."
  }
}
```

---

### 2. Create Task with Tags

```bash
# Create task with tag_ids [1, 2] (work + urgent)
curl -X POST http://localhost:3333/api/simple/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete project documentation",
    "description": "Write comprehensive docs",
    "priority": 1,
    "tag_ids": [1, 2]
  }'
```

**Response:**

```json
{
  "message": "Task created successfully",
  "task": {
    "id": 1,
    "title": "Complete project documentation",
    "priority": 1,
    "tags": [
      { "id": 1, "name": "work" },
      { "id": 2, "name": "urgent" }
    ]
  }
}
```

---

### 3. Get All Tasks (with Tags)

```bash
curl http://localhost:3333/api/simple/tasks
```

**Response:**

```json
{
  "message": "Tasks retrieved successfully",
  "tasks": [
    {
      "id": 1,
      "title": "Complete project documentation",
      "tags": [
        { "id": 1, "name": "work" },
        { "id": 2, "name": "urgent" }
      ]
    }
  ]
}
```

---

### 4. Update Task Tags

```bash
# Update tags to only "personal" (tag_id: 3)
curl -X PUT http://localhost:3333/api/simple/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete project documentation",
    "tag_ids": [3]
  }'
```

**Response:**

```json
{
  "task": {
    "id": 1,
    "title": "Complete project documentation",
    "tags": [{ "id": 3, "name": "personal" }]
  }
}
```

---

### 5. Remove All Tags from Task

```bash
# Pass empty array to remove all tags
curl -X PUT http://localhost:3333/api/simple/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "tag_ids": []
  }'
```

---

## 💡 How It Works

### **Many-to-Many Methods in Controller:**

1. **`attach(tagIds)`** - Add tags (doesn't remove existing)

   ```typescript
   await task.related('tags').attach([1, 2])
   ```

2. **`sync(tagIds)`** - Replace all tags

   ```typescript
   await task.related('tags').sync([3]) // Removes 1,2 and adds 3
   ```

3. **`detach(tagIds)`** - Remove specific tags

   ```typescript
   await task.related('tags').detach([1]) // Removes only tag 1
   ```

4. **`preload('tags')`** - Load tags with query
   ```typescript
   await Task.query().preload('tags')
   ```

---

## 🔄 Workflow Example

```bash
# 1. Create user (if needed)
node ace db:seed

# 2. Create some tags
curl -X POST http://localhost:3333/api/simple/tags \
  -H "Content-Type: application/json" \
  -d '{"name": "work"}'

curl -X POST http://localhost:3333/api/simple/tags \
  -H "Content-Type: application/json" \
  -d '{"name": "urgent"}'

# 3. Create task with tags
curl -X POST http://localhost:3333/api/simple/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Fix production bug",
    "priority": 1,
    "tag_ids": [1, 2]
  }'

# 4. View task with tags
curl http://localhost:3333/api/simple/tasks/1

# 5. Update tags
curl -X PUT http://localhost:3333/api/simple/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"tag_ids": [1]}'
```

---

## 📝 Key Points

✅ **Tags are reusable** - Create once, use on multiple tasks
✅ **Many-to-many** - A task can have multiple tags, a tag can be on multiple tasks
✅ **Pivot table** - `task_tag` stores the relationships
✅ **No duplicates** - The `unique(['task_id', 'tag_id'])` constraint prevents duplicates

---

## 🎓 Database Diagram

```
┌─────────┐         ┌──────────┐         ┌──────┐
│  tasks  │◄───────►│ task_tag │◄───────►│ tags │
└─────────┘         └──────────┘         └──────┘
    id                task_id               id
    title             tag_id                name
    ...
```
