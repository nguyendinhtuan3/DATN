const RoleService = require("../services/roleService");

module.exports = {
  Query: {
    getAllRoles: () => RoleService.getAllRoles(),
    getRoleById: (_, { id }) => RoleService.getRoleById(id),
  },
  Mutation: {
    createRole: (_, { name }) => RoleService.createRole(name),
    deleteRole: (_, { id }) => RoleService.deleteRole(id),
  },
};
