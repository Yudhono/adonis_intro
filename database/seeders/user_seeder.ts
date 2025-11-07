import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    // Create a default user for testing
    await User.updateOrCreate(
      { email: 'demo@example.com' },
      {
        fullName: 'Demo User',
        email: 'demo@example.com',
        password: 'password123',
      }
    )
  }
}
