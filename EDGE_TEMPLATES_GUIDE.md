# 🎨 Edge Templates - Complete Learning Guide

## 🎯 What is Edge?

Edge is AdonisJS's templating engine for rendering HTML on the server. Think of it like:

- **JSP** for Java
- **Blade** for Laravel
- **EJS/Pug** for Node.js

---

## 🚀 Quick Start - See It in Action!

### **Your First Edge Template**

Visit: **http://localhost:3333/tasks/list**

This renders `resources/views/pages/tasks.edge` with real data from your database!

---

## 📁 File Structure

```
resources/
└── views/
    └── pages/
        ├── home.edge      ✅ Already exists
        └── tasks.edge     ✅ Just created
```

---

## 🎓 Edge Syntax - Learn by Example

### **1. Variables - Displaying Data**

```edge
{{ task.title }}
{{-- Output: "Buy groceries" --}}
{{ task.priority }}
{{-- Output: 1 --}}
{{ task.createdAt.toFormat('MMM dd, yyyy') }}
{{-- Output: "Nov 10, 2025" --}}
```

**Key Points:**

- `{{ }}` - Output variables (auto-escaped for security)
- `{{{ }}}` - Raw output (no escaping, use carefully!)

---

### **2. Comments**

```edge
{{-- This is a comment, won't appear in HTML --}}
{{--
  Multi-line comment
  Very useful for notes
--}}
```

---

### **3. Conditionals - @if/@else**

```edge
@if(task.isCompleted)
  <span class="text-green-600">✓ Done</span>
@else
  <span class="text-yellow-600">⏳ Pending</span>
@end

{{-- With else if --}}
@if(task.priority === 1)
  <span>High Priority</span>
@elseif(task.priority === 2)
  <span>Medium Priority</span>
@else
  <span>Low Priority</span>
@end

{{-- Check if exists --}}
@if(task.description)
  <p>
    {{ task.description }}
  </p>
@end
```

---

### **4. Loops - @each**

```edge
{{-- Loop through array --}}
@each(task in tasks)
  <div>
    {{ task.title }}
  </div>
@end

{{-- With index --}}
@each((task, index) in tasks)
  <div>
    {{ index + 1 }}. {{ task.title }}
  </div>
@end

{{-- Empty state --}}
@each(task in tasks)
  <div>
    {{ task.title }}
  </div>
@else
  <p>
    No tasks found
  </p>
@end
```

---

### **5. Inline JavaScript**

```edge
{{-- Filter array --}}
{{ tasks.filter(t => t.isCompleted).length }}
{{-- Ternary operator --}}
<h2 class="{{ task.isCompleted ? 'line-through' : 'font-bold' }}">
  {{ task.title }}
</h2>

{{-- Logical OR --}}
Priority: {{ task.priority || 0 }}
```

---

### **6. Components (Reusable Parts)**

Create `resources/views/components/task_card.edge`:

```edge
<div class="bg-white p-4 rounded shadow">
  <h3>
    {{ title }}
  </h3>
  <p>
    {{ description }}
  </p>
</div>
```

Use it:

```edge
@component('components/task_card', {
  title: 'My Task',
  description: 'Task description'
})
```

---

### **7. Layouts (Master Templates)**

Create `resources/views/layouts/main.edge`:

```edge
<!DOCTYPE html>
<html>
  <head>
    <title>
      @!section('title')
    </title>
  </head>
  <body>
    @!section('content')
  </body>
</html>
```

Use it in `tasks.edge`:

```edge
@layout('layouts/main')

  @set('title', 'My Tasks')

    @section('content')
      <h1>
        Tasks List
      </h1>
      {{-- Your content here --}}
    @end
```

---

## 🔧 Controller to View - How It Works

### **In Controller:**

```typescript
async list({ view }: HttpContext) {
  const tasks = await Task.query().preload('tags')

  // Pass data to view
  return view.render('pages/tasks', {
    tasks,                    // Available as 'tasks' in template
    pageTitle: 'My Tasks',    // Available as 'pageTitle'
    user: { name: 'John' }    // Available as 'user.name'
  })
}
```

### **In Edge Template:**

```edge
<h1>
  {{ pageTitle }}
</h1>
<p>
  Welcome, {{ user.name }}
</p>

@each(task in tasks)
  <div>
    {{ task.title }}
  </div>
@end
```

---

## 📝 Practical Examples

### **Example 1: Task Card with Tags**

```edge
<div class="task-card">
  <h2>
    {{ task.title }}
  </h2>

  @if(task.tags && task.tags.length > 0)
    <div class="tags">
      @each(tag in task.tags)
        <span class="tag">{{ tag.name }}</span>
      @end
    </div>
  @end
  
  <div class="status">
    @if(task.isCompleted)
      ✓ Completed
    @else
      ⏳ In Progress
    @end
  </div>
</div>
```

---

### **Example 2: Task Statistics**

```edge
<div class="stats">
  <div>
    <strong>{{ tasks.length }}</strong>
    <span>Total</span>
  </div>

  <div>
    <strong>{{ tasks.filter(t => t.isCompleted).length }}</strong>
    <span>Completed</span>
  </div>

  <div>
    <strong>{{ tasks.filter(t => !t.isCompleted).length }}</strong>
    <span>Pending</span>
  </div>
</div>
```

---

### **Example 3: Conditional Styling**

```edge
@each(task in tasks)
  <div class="task {{ task.isCompleted ? 'completed' : 'pending' }}">
    <h3 class="{{ task.priority === 1 ? 'text-red-600' : 'text-gray-800' }}">
      {{ task.title }}
    </h3>

    @if(task.priority === 1)
      <span class="badge urgent">URGENT</span>
    @end
  </div>
@end
```

---

## 🎯 Practice Exercises

### **Exercise 1: Create a Task Detail Page**

1. Create `resources/views/pages/task_detail.edge`
2. Add controller method to show single task
3. Display title, description, tags, created date

### **Exercise 2: Add a Navigation Bar**

1. Create `resources/views/components/navbar.edge`
2. Include it in your pages
3. Add links to home, tasks list, API docs

### **Exercise 3: Create a Tag List Page**

1. Create `resources/views/pages/tags.edge`
2. Display all tags
3. Show how many tasks each tag has

---

## 🔗 Routes for Edge Pages

```typescript
// In start/routes.ts

// Simple render (no data)
router.on('/about').render('pages/about')

// With controller (passes data)
router.get('/tasks/list', [TasksController, 'list'])

// With inline data
router.get('/hello', async ({ view }) => {
  return view.render('pages/hello', {
    name: 'World',
  })
})
```

---

## 📚 Edge vs JSON API

| Use Edge When             | Use JSON API When               |
| ------------------------- | ------------------------------- |
| ✅ Traditional web pages  | ✅ Mobile apps                  |
| ✅ SEO important          | ✅ Single Page Apps (React/Vue) |
| ✅ Server-side rendering  | ✅ Third-party integrations     |
| ✅ Simple CRUD interfaces | ✅ Decoupled frontend           |

**Your Project Has Both!** 🎉

- Edge: `/tasks/list` (web page)
- JSON: `/api/simple/tasks` (API)

---

## 🛠️ Helpful Edge Methods

### **Array Methods:**

```edge
{{ tasks.length }}
{{ tasks.filter(t => t.isCompleted) }}
{{ tasks.map(t => t.title) }}
{{ tasks.find(t => t.id === 1) }}
```

### **String Methods:**

```edge
{{ task.title.toUpperCase() }}
{{ task.description.substring(0, 100) }}
{{ task.title.length }}
```

### **Date Formatting (Luxon):**

```edge
{{ task.createdAt.toFormat('MMM dd, yyyy') }}
{{ task.createdAt.toRelative() }}
{{-- "2 days ago" --}}
{{ task.createdAt.toFormat('HH:mm') }}
```

---

## 🎨 Next Steps

1. ✅ Visit **http://localhost:3333/tasks/list** to see your Edge template
2. 📝 Modify `resources/views/pages/tasks.edge` and refresh
3. 🎯 Create a new page for tag management
4. 📖 Read official docs: https://edgejs.dev/

---

## 💡 Pro Tips

✅ **Hot Reload** - Edge templates reload automatically in dev mode  
✅ **Type Safety** - Use TypeScript in controllers, pass typed data to views  
✅ **Security** - `{{ }}` auto-escapes HTML (prevents XSS attacks)  
✅ **Performance** - Edge compiles templates to JavaScript

---

## 🔍 Debugging Edge

```edge
{{-- Dump variable to see structure --}}
{{ inspect(task) }}
{{-- Check type --}}
{{ typeof task.priority }}
{{-- Log to console (dev mode) --}}
{{ console.log(task) }}
```

---

**Ready to Practice?** Visit: **http://localhost:3333/tasks/list** 🚀
