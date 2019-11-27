"use strict";

const Course = use("App/Models/Course");

class CourseController {
  async index({ response, auth }) {
    // A regra de negócio diz que o adm irá visualizar uma lista de cursos com um count de todos os seus integrantes.
    // A regra de negócio diz que o User irá visualizar o mesmo que o adm, mas com o acréscimo da informação de estar vinculado ao curso ou não

    // ADM
    if (auth.user.profile === 1) {
      const courses = await Course.query()
        .select("id", "name", "description", "created_at")
        .fetch();

      return courses;
    }

    // User
    const courses = await Course.query().select("id", "name", "description");

    return courses;
  }

  async store({ request, auth }) {
    // A regra de negócio diz que apenas o adm pode criar um curso
    const data = request.only(["name", "description"]);

    if (auth.user.profile === 1) {
      const course = await Course.create(data);

      return course;
    }

    return response.status(401).json({ message: "Not authorized" });
  }

  async show({ response, params, auth }) {
    // A regra de negócio diz que o adm visualizará o curso e verá todos os usuários que estão vinculados à esse curso
    // A regra de negócio diz que o user visualizará o curso, com todos os usuários vinculados exceto si mesmo
    const { id } = params;

    // Valida se o curso existe
    let course = await Course.find(id);
    if (!course) {
      return response.status(404).json({ message: "Not found" });
    }

    // ADM
    if (auth.user.profile === 1) {
      course = await Course.query()
        .where({ id })
        .select("id", "name", "description", "created_at")
        .first();
      return course;
    }

    // USER
    course = await Course.query()
      .where({ id })
      .select("id", "name", "description")
      .first();

    return course;
  }

  async update({ request, response, params, auth }) {
    // A regra de negócio diz que apenas o ADM terá acesso ao update de um curso
    const { id } = params;
    const data = request.only(["id", "name", "description"]);

    // Valida se o curso existe
    const course = await Course.find(id);
    if (!course) {
      return response.status(404).json({ message: "Not Found" });
    }

    // Se o requisitante for o adm, realia o update
    if (auth.user.profile === 1) {
      course.merge(data);
      await course.save();

      return course;
    }
  }

  async destroy({ response, auth, params }) {
    // A regra de negócio diz que apenas o adm poderá apagar um curso
    const { id } = params;

    // Valida se o curso existe
    const course = await Course.find(id);
    if (!course) {
      return response.status(404).json({ message: "Not found" });
    }

    // Se o requisitante for um adm, apago o curso
    if (auth.user.profile === 1) {
      await course.delete();
      return response.status(200).json({ message: "Deleted" });
    }

    return response.status(401).json({ message: "Not authorized" });
  }
}

module.exports = CourseController;
