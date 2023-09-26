'use strict';

const { csrfToken } = use('Adonis/Src/Helpers');

class CsrfController {
  async generateToken({ response }) {
    const token = csrfToken();
    return response.json({ csrfToken: token });
  }
}

module.exports = CsrfController;
