"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserCourseSchema extends Schema {
  up() {
    this.create("user_course", table => {
      table.increments();
      table
        .integer("user_id")
        .notNullable()
        .unsigned()
        .references("users.id")
        .onDelete("cascade")
        .onUpdate("cascade")
        .index("users_id");
      table
        .integer("course_id")
        .notNullable()
        .unsigned()
        .references("courses.id")
        .onDelete("cascade")
        .onUpdate("cascade")
        .index("courses_id");
    });
  }

  down() {
    this.drop("user_course");
  }
}

module.exports = UserCourseSchema;
