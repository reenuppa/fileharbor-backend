'use strict';

const File = use('App/Models/File');
const { validate } = use('Validator');

class FileController {
  async index({ response }) {
    try {
      const files = await File.all();
      return response.json(files);
    } catch (error) {
      return response.status(500).json({ error: 'Internal server error' });
    }
  }

  async store({ request, response }) {
    const { name, path } = request.only(['name', 'path']);

    try {
      const validation = await validate(request.all(), {
        name: 'required|string|max:255',
        path: 'required|string|max:255',
      });

      if (validation.fails()) {
        return response.status(400).json(validation.messages());
      }

      const file = await File.create({ name, path });
      return response.status(201).json(file);
    } catch (error) {
      return response.status(400).json({ error: 'File creation failed' });
    }
  }

  async show({ params, response }) {
    try {
      const file = await File.find(params.id);
      if (!file) {
        return response.status(404).json({ error: 'File not found' });
      }
      return response.json(file);
    } catch (error) {
      return response.status(500).json({ error: 'Internal server error' });
    }
  }

  async destroy({ params, response }) {
    try {
      const file = await File.find(params.id);
      if (!file) {
        return response.status(404).json({ error: 'File not found' });
      }
      await file.delete();
      return response.status(204).json();
    } catch (error) {
      return response.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = FileController;
