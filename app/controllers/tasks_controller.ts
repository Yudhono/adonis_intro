import type { HttpContext } from '@adonisjs/core/http'
import Task from '#models/task'

export default class TasksController {
  /**
   * Display a list of all tasks
   */
  async index({ auth, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.unauthorized({ error: 'Please login first' })
    }

    const tasks = await Task.query().where('user_id', user.id).orderBy('created_at', 'desc')
    return response.json({ tasks })
  }

  /**
   * Display form to create a new task
   */
  async create({ view }: HttpContext) {
    return view.render('tasks/create')
  }

  /**
   * Handle form submission to create a new task
   */
  async store({ auth, request, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.unauthorized({ error: 'Please login first' })
    }

    const data = request.only(['title', 'description'])

    const task = await Task.create({
      ...data,
      userId: user.id,
      isCompleted: false,
    })

    return response.created({ message: 'Task created successfully', task })
  }

  /**
   * Show a specific task
   */
  async show({ auth, params, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.unauthorized({ error: 'Please login first' })
    }

    const task = await Task.query().where('id', params.id).where('user_id', user.id).firstOrFail()

    return response.json({ task })
  }

  /**
   * Edit a task
   */
  async edit({ auth, params, view, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.unauthorized({ error: 'Please login first' })
    }

    const task = await Task.query().where('id', params.id).where('user_id', user.id).firstOrFail()

    return view.render('tasks/edit', { task })
  }

  /**
   * Handle form submission to update a task
   */
  async update({ auth, params, request, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.unauthorized({ error: 'Please login first' })
    }

    const task = await Task.query().where('id', params.id).where('user_id', user.id).firstOrFail()

    const data = request.only(['title', 'description', 'isCompleted'])
    task.merge(data)
    await task.save()

    return response.json({ message: 'Task updated successfully', task })
  }

  /**
   * Delete a task
   */
  async destroy({ auth, params, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.unauthorized({ error: 'Please login first' })
    }

    const task = await Task.query().where('id', params.id).where('user_id', user.id).firstOrFail()

    await task.delete()

    return response.json({ message: 'Task deleted successfully' })
  }

  /**
   * Toggle task completion status
   */
  async toggle({ auth, params, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.unauthorized({ error: 'Please login first' })
    }

    const task = await Task.query().where('id', params.id).where('user_id', user.id).firstOrFail()

    task.isCompleted = !task.isCompleted
    await task.save()

    return response.json({ message: 'Task status toggled', task })
  }
}
