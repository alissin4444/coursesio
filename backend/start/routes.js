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
