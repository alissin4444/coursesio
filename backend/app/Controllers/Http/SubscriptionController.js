"use strict";

const User = use("App/Models/User");
const Course = use("App/Models/Course");

class SubscriptionController {
  /* 
    REGRA DE NEGÓCIO 
      Um usuário poderá visualizar todos os cursos que está vinculado
  */
  async index({ auth, response }) {
    const { id, profile } = auth.user;

    if (profile !== 1) {
      const user = await User.find(id);
      if (!user) {
        return response.status(404).json({ agent: "user" });
      }

      const courses = await user
        .courses()
        .where("user_id", id)
        .select(["id", "name", "description"])
        .fetch();

      return courses;
    }
  }

  async store({ params, auth, response }) {
    // Regra de negócio: Um usuário pode ser vinculado à um curso
    const { id } = params;
    const user = await User.find(auth.user.id);
    const course = await Course.find(id);

    if (!user) {
      return response.status(404).json({ agent: "user" });
    }
    if (!course) {
      return response.status(404).json({ agent: "course" });
    }

    if (auth.user.profile !== 1) {
      // Vinculo um user à um curso
      await user.courses().attach(id);
    }

    return response.status(401).json({ message: "Not authorized" });
  }

  async show({ auth, params, response }) {
    // Aqui eu mostro todos os users vinculado ao curso que o usuário está vinculado, com exceção dele
    const { id } = params;
    const { profile } = auth.user;

    if (profile !== 1) {
      const user = await User.find(auth.user.id);
      if (!user) {
        return response.status(404).json({ agent: "user" });
      }

      const course = await Course.find(id);
      if (!course) {
        return response.status(404).json({ agent: "course" });
      }
      const users = course
        .users()
        .whereNot("user_id", auth.user.id)
        .fetch();

      return users;
    }
  }

  async destroy({ params, auth, response }) {
    // Regra de negócio: Um usuário poderá desvincular-se de um curso
    const { id } = params;

    if (auth.user.profile !== 1) {
      const user = await User.find(auth.user.id);
      if (!user) {
        return response.status(404).json({ agent: "user" });
      }

      // Desvinculo um user de um curso
      await user
        .courses()
        .where("course_id", id)
        .delete();
    }

    return response.status(401).json({ message: "Not authorized" });
  }
}

module.exports = SubscriptionController;
