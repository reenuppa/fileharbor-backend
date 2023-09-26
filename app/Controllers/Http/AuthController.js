'use strict';

const User = use('App/Models/User');
const Joi = require('joi');

class AuthController {
  async register({ request, response }) {
    try {
      // Get the request data
      const data = request.only(['firstname', 'lastname', 'email', 'password']);

      // Define the validation schema
      const schema = Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
      });

      // Validate the request data against the schema
      const { error } = schema.validate(data);

      // If validation fails, return a 400 Bad Request response with validation error details
      if (error) {
        return response.status(400).json({ error: 'Validation failed', messages: error.details });
      }

      const user = new User();
      user.firstname = data.firstname;
      user.lastname = data.lastname;
      user.email = data.email;
      user.password = data.password;
      await user.save();

      return response.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      return response.status(500).json({ error: 'Registration failed' });
    }
  }

  async login({ request, response, auth }) {
    try {
      const { email, password } = request.all();
      const token = await auth.attempt(email, password);
      return response.json({ token });
    } catch (error) {
      return response.status(401).json({ error: 'Invalid credentials' });
    }
  }
}

module.exports = AuthController;
