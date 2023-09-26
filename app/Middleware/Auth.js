'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Auth {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ auth, response }, next) {
    try {
      // Verify if the user is authenticated
      await auth.check()

      // User is authenticated, proceed to the next middleware or route handler
      await next()
    } catch (error) {
      // User is not authenticated, return an unauthorized response
      return response.status(401).json({ error: 'Unauthorized' })
    }
  }
}

module.exports = Auth
