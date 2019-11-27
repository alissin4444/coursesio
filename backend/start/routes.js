"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

// Cria um user
Route.post("/users", "UserController.store");
// Faz a autentifação via JWT
Route.post("/authenticate", "AuthController.authenticate");

Route.group(() => {
  Route.resource("users", "UserController")
    .apiOnly()
    .except(["store"]);
  Route.resource("courses", "CourseController").apiOnly();

  Route.get("subscription/courses", "SubscriptionController.index");
  Route.get("subscription/courses/:id", "SubscriptionController.show");
  Route.post("subscription/courses/:id", "SubscriptionController.store");
  Route.delete("subscription/courses/:id", "SubscriptionController.destroy");
}).middleware("auth");

// Fazer um get de todos os user trazendo apenas sua row na database OK
// Mostrando à quantos cursos ele está vinculado

// Fazer um get de um único user trasendo apenas sua linha na database OK
// Mostrando à quais cursos ele está vinculado

// Fazer um update de um user OK

// Fazer um delete de um user OK

// Fazer o store de um curso, caso o user seja o adm OK

// Fazer um index de cursos trazendo apenas sua row OK
// Mostrar quantos usuários estão viculados à esse curso

// Fazer um get de um curso trazendo apenas sua row OK
// Trazer todos os usuários que estão vinculados à ele

// Fazer um update de um curso OK

// Fazer um delete de um curso OK

// Fazer a rota que liga um user à um curso OK
