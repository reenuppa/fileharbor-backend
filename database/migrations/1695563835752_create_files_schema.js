'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateFilesSchema extends Schema {
  up () {
    this.create('create_files', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('create_files')
  }
}

module.exports = CreateFilesSchema
