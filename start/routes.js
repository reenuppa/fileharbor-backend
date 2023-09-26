'use strict'

const Route = use('Route')

// Register route
Route.post('api/register', 'AuthController.register');

// Login route
Route.post('api/login', 'AuthController.login')
//Route.get('api/csrf-token', 'CsrfController.generateToken').middleware(['guest']);

// User routes
Route.group(() => {
  Route.get('api/users', 'UserController.index')
  Route.get('api/users/:id', 'UserController.show')
  Route.post('api/users', 'UserController.store')
  Route.delete('api/users/:id', 'UserController.destroy')
}).middleware[('auth')]// Protect these routes with authentication

// File routes
Route.group(() => {
  Route.get('api/files', 'FileController.index')
  Route.get('api/files/:id', 'FileController.show')
  Route.post('api/files', 'FileController.store')
  Route.delete('api/files/:id', 'FileController.destroy')
}).middleware('auth') // Protect these routes with authentication
