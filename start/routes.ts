/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const TasksController = () => import('#controllers/tasks_controller')
const SimpleTasksController = () => import('#controllers/simple_tasks_controller')

router.on('/').render('pages/home')

// Simple Task routes - NO authentication (for learning/testing)
router
  .group(() => {
    router.get('/tasks', [SimpleTasksController, 'index']) // List all tasks
    router.post('/tasks', [SimpleTasksController, 'store']) // Create a task
    router.get('/tasks/stats', [SimpleTasksController, 'stats']) // Get stats
    router.get('/tasks/:id', [SimpleTasksController, 'show']) // Show a task
    router.put('/tasks/:id', [SimpleTasksController, 'update']) // Update a task
    router.delete('/tasks/:id', [SimpleTasksController, 'destroy']) // Delete a task
    router.patch('/tasks/:id/toggle', [SimpleTasksController, 'toggle']) // Toggle completion
  })
  .prefix('api/simple')

// Task routes - WITH authentication (production-ready)
router
  .group(() => {
    router.get('/tasks', [TasksController, 'index']) // List all tasks
    router.post('/tasks', [TasksController, 'store']) // Create a task
    router.get('/tasks/:id', [TasksController, 'show']) // Show a task
    router.put('/tasks/:id', [TasksController, 'update']) // Update a task
    router.delete('/tasks/:id', [TasksController, 'destroy']) // Delete a task
    router.patch('/tasks/:id/toggle', [TasksController, 'toggle']) // Toggle completion
  })
  .prefix('api')
