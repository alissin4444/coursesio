"use strict";

const User = use("App/Models/User");

class UserController {
  async index({ auth }) {
    // Se eu for o adm, busco por todos os usuários que não possuem perfil de adm e trago apenas o id e nome deles
    if (auth.user.profile === 1) {
      const users = await User.query()
        .where("profile", "!=", 1)
        .select("id", "name", "created_at")
        .withCount("courses as qtd_courses")
        .fetch();

      return users;
    }
  }

  async store({ request }) {
    const data = request.only(["email", "password", "name"]);
    // Forço o cadastro de um user, com o profile 2, ao invés de um adm (profile 1)
    data.profile = 2;
    const user = await User.create(data);

    return user;
  }

  async show({ auth, params }) {
    const { id } = params;
    // Se eu for um adm, busco por um usuário
    if (auth.user.profile === 1) {
      const user = await User.query()
        .where({ id, profile: 2 })
        .select("id", "name", "created_at")
        .withCount("courses as qtd_courses")
        .with("courses")
        .first();

      return user;
    }
  }

  async update({ auth, params, request, response }) {
    // A regra de negócio diz que nem o adm pode editar alguém que não seja ele
    const { id } = params;
    const data = request.only(["email", "password", "name"]);

    // Busco pelo user e verifico se o user que eu busquei existe e se sou eu.
    const user = await User.find(id);
    if (!user) {
      return response.status(404).json({ message: "Not found" });
    }
    if (user.id !== auth.user.id) {
      return response.status(401).json({ message: "Not Authorized" });
    }

    // Caso ele passe nas validações acima, posso fazer um update
    user.merge(data);
    await user.save();

    return user;
  }

  async destroy({ auth, params, response }) {
    /* A regra de negócio permite que o adm apague um user e um user possa apagar-se, mas não permite que
     um adm apaga a si mesmo */
    const { id } = params;
    const user = await User.find(id);

    // Valido se o user existe
    if (!user) {
      return response.status(404).json({ message: "Not found" });
    }

    // Valido se o user que está usando a rota é o adm. Se for, ele pode apagar qualquer user exceto si mesmo.
    if (auth.user.profile === 1) {
      if (user.id === auth.user.id) {
        return response.status(401).json({ message: "Not authorized" });
      }
      await user.delete();

      return response.status(200).json({ message: "Deleted" });
    }

    // Valido se o usuário que o requisitante está querendo apagar é ele mesmo. Se for, eu permito a exclusão
    if (user.id === auth.user.id) {
      await user.delete();

      return response.status(200).json({ message: "Deleted" });
    }

    return response.status(401).json({ message: "Not authorized" });
  }
}

module.exports = UserController;
