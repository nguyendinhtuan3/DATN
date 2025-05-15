const { Role } = require("../models");

class RoleService {
  static async getAllRoles() {
    return await Role.findAll();
  }

  static async getRoleById(id) {
    return await Role.findByPk(id);
  }

  static async createRole(name) {
    const allowedRoles = ["admin", "teacher", "student"];
    if (!allowedRoles.includes(name)) {
      throw new Error("Tên role không hợp lệ.");
    }

    return await Role.create({ name });
  }

  static async deleteRole(id) {
    const role = await Role.findByPk(id);
    if (!role) throw new Error("Role không tồn tại.");
    await role.destroy();
    return true;
  }
}

module.exports = RoleService;
