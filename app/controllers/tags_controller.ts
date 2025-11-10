import type { HttpContext } from '@adonisjs/core/http'
import Tag from '#models/tag'

export default class TagsController {
  async index({ response }: HttpContext) {
    const tags = await Tag.query().orderBy('created_at', 'desc')
    return response.json({
      message: 'Tags retrieved successfully',
      count: tags.length,
      tags,
    })
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['name'])

    const tag = await Tag.create(data)

    return response.created({
      message: 'Tag created successfully',
      tag,
    })
  }

  async show({ params, response }: HttpContext) {
    try {
      const tag = await Tag.findOrFail(params.id)
      return response.json({ tag })
    } catch (error) {
      return response.notFound({ error: 'Tag not found' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const tag = await Tag.findOrFail(params.id)
      const data = request.only(['name'])

      tag.merge(data)
      await tag.save()

      return response.json({
        message: 'Tag updated successfully',
        tag,
      })
    } catch (error) {
      return response.notFound({ error: 'Tag not found' })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const tag = await Tag.findOrFail(params.id)
      await tag.delete()

      return response.json({ message: 'Tag deleted successfully' })
    } catch (error) {
      return response.notFound({ error: 'Tag not found' })
    }
  }
}
