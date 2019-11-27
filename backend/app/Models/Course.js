"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Course extends Model {
  users() {
    this.belongsToMany("App/Models/User").pivotTable("user_course");
  }
}

module.exports = Course;
