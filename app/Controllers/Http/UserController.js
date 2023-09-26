'use strict';

const User = use('App/Models/User');
const { validate } = use('Validator');

class UserController {
  async index({ response }) {
    try {
      const users = await User.all();
      return response.json(users);
    } catch (error) {
      return response.status(500).json({ error: 'Internal server error' });
    }
  }

  async store({ request, response }) {
    const { firstname, lastname, email, password } = request.only([
      'firstname',
      'lastname',
      'email',
      'password',
    ]);

    try {
      const validation = await validate(request.all(), {
        firstname: 'required|string|max:255',
        lastname: 'required|string|max:255',
        email: 'required|email|unique:users,email',
        password: 'required|string|min:6',
      });

      if (validation.fails()) {
        return response.status(400).json(validation.messages());
      }

      const user = await User.create({ firstname, lastname, email, password });
      return response.status(201).json(user);
    } catch (error) {
      return response.status(400).json({ error: 'User creation failed' });
    }
  }

  async show({ params, response }) {
    try {
      const user = await User.find(params.id);
      if (!user) {
        return response.status(404).json({ error: 'User not found' });
      }
      return response.json(user);
    } catch (error) {
      return response.status(500).json({ error: 'Internal server error' });
    }
  }

  async destroy({ params, response }) {
    try {
      const user = await User.find(params.id);
      if (!user) {
        return response.status(404).json({ error: 'User not found' });
      }
      await user.delete();
      return response.status(204).json();
    } catch (error) {
      return response.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = UserController;
