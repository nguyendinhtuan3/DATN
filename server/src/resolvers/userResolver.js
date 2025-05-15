const userService = require("../services/userService");

const userResolver = {
  Query: {
    getUser: async (_, { id }) => {
      return await userService.getUserById(id);
    },
    getUsers: async (_, { limit = 10, offset = 0 }) => {
      return await userService.getUsers(limit, offset);
    },
  },

  Mutation: {
    createUser: async (_, { input }) => {
      return await userService.register(input);
    },
    loginWithEmailAndPassword: async (_, { input }) => {
      return await userService.loginWithEmailAndPassword(input);
    },

    updateUser: async (_, { id, input }) => {
      return await userService.updateUser(id, input);
    },

    deleteUser: async (_, { id }) => {
      return await userService.deleteUser(id);
    },

    updateProfile: async (_, { id, input }) => {
      return await userService.updateProfile(id, input);
    },

    loginWithGoogle: async (_, { idToken }) => {
      return await authService.loginWithGoogle(idToken);
    },

    forgotPassword: async (_, { email }) => {
      return await userService.forgotPassword(email);
    },

    resetPassword: async (_, { token, newPassword }) => {
      return await userService.resetPassword(token, newPassword);
    },
    resetPassword: async (_, { token, newPassword }) => {
      return await userService.resetPassword(token, newPassword);
    },
  },

  User: {
    role: async (parent) => {
      return await parent.getRole();
    },
  },
};

module.exports = userResolver;
