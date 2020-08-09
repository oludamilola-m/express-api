const { User, Project } = require("../db/models");

class Controller {
  static getRoot(req, res) {
    res.send("This is root!");
  }

  // CREATE USERS
  static async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      return res.status(201).json({
        user,
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // GET OR SHOW ALL USERS
  static async getAllUsers(req, res) {
    try {
      const users = await User.findAll({
        include: [
          {
            model: Project,
          },
        ],
      });
      return res.status(201).json({ users });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // GET OR SHOW A SPECIFIC  USER
  static async getUser(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findOne({
        where: { id: id },
        include: [
          {
            model: Project,
          },
        ],
      });

      if (user) {
        return res.status(201).json({ user });
      }
      return res.status(404).send("User with the specified ID does not exists");
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // UPDATE A SPECIFIC USER
  // static async updateUser(req, res) {
  //   try {
  //     const { id } = req.params;
  //     const [updated] = await User.update(req.body, {
  //       where: { id: id },
  //     });

  //     if (updated) {
  //       const updatedUser = await User.findOne({ where: { id: id } });
  //       return res.status(200).json({ user: updatedUser });
  //     }
  //     throw new Error("User not found");
  //   } catch (err) {
  //     return res.status(500).send(err.message);
  //   }
  // }

  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findOne({ where: { id: id } });
      if (!user) {
        throw new Error("User not found");
      }
      await user.update(req.body);

      return res.status(200).json({ user: user });
    } catch (err) {
      return res.status(500).send(err.message);
    }
  }

  // DELETE A SPECIFIC USER
  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findOne({ where: { id: id } });
      if (!user) {
        throw new Error("User not found");
      }
      await user.destroy(req.body);

      return res.status(200).json({ user: user });
    } catch (err) {
      return res.status(500).send(err.message);
    }
  }
}

module.exports = Controller;
