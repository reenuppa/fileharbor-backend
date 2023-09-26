'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class File extends Model {
     // Define the table name if different from the pluralized model name (optional)
  static get table() {
    return 'files';
  }

  // Define the fields that are fillable (can be mass-assigned)
  static fillable() {
    return ['name', 'path'];
  }

}

module.exports = File
