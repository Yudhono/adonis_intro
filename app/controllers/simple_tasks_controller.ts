import type { HttpContext } from '@adonisjs/core/http'
import Task from '#models/task'

/**
 * Simple Tasks Controller (No Authentication)
 * This is a simplified version for learning purposes.
 * In production, you should use the authenticated version.
 */
export default class SimpleTasksController {
  /**
   * GET /api/simple/tasks
   * Display a list of all tasks
   */
  async index({ response }: HttpContext) {
    const tasks = await Task.query().orderBy('created_at', 'desc')
    return response.json({
      message: 'Tasks retrieved successfully',
      count: tasks.length,
      tasks,
    })
  }

  /**
   * POST /api/simple/tasks
   * Create a new task
   */
  async store({ request, response }: HttpContext) {
    const data = request.only(['title', 'description'])

    // For demo purposes, use a default user_id (you'd need a user in DB)
    const task = await Task.create({
      ...data,
      userId: 1, // Default user - make sure user with ID 1 exists!
      isCompleted: false,
    })

    return response.created({
      message: 'Task created successfully',
      task,
    })
  }

  /**
   * GET /api/simple/tasks/:id
   * Show a specific task
   */
  async show({ params, response }: HttpContext) {
    try {
      const task = await Task.findOrFail(params.id)
      return response.json({ task })
    } catch (error) {
      return response.notFound({ error: 'Task not found' })
    }
  }

  /**
   * PUT /api/simple/tasks/:id
   * Update a task
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const task = await Task.findOrFail(params.id)
      const data = request.only(['title', 'description', 'isCompleted'])

      task.merge(data)
      await task.save()

      return response.json({
        message: 'Task updated successfully',
        task,
      })
    } catch (error) {
      return response.notFound({ error: 'Task not found' })
    }
  }

  /**
   * DELETE /api/simple/tasks/:id
   * Delete a task
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const task = await Task.findOrFail(params.id)
      await task.delete()

      return response.json({
        message: 'Task deleted successfully',
      })
    } catch (error) {
      return response.notFound({ error: 'Task not found' })
    }
  }

  /**
   * PATCH /api/simple/tasks/:id/toggle
   * Toggle task completion status
   */
  async toggle({ params, response }: HttpContext) {
    try {
      const task = await Task.findOrFail(params.id)
      task.isCompleted = !task.isCompleted
      await task.save()

      return response.json({
        message: `Task marked as ${task.isCompleted ? 'completed' : 'incomplete'}`,
        task,
      })
    } catch (error) {
      return response.notFound({ error: 'Task not found' })
    }
  }

  /**
   * GET /api/simple/tasks/stats
   * Get task statistics
   */
  async stats({ response }: HttpContext) {
    const total = await Task.query().count('* as total')
    const completed = await Task.query().where('is_completed', true).count('* as total')
    const pending = await Task.query().where('is_completed', false).count('* as total')

    return response.json({
      stats: {
        total: total[0].$extras.total,
        completed: completed[0].$extras.total,
        pending: pending[0].$extras.total,
      },
    })
  }
}
