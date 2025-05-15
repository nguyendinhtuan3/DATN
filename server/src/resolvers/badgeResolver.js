const BadgeService = require("../services/badgeService");

const badgeResolvers = {
  Query: {
    getAllBadges: async () => {
      return await BadgeService.getAllBadges();
    },
    getBadge: async (_, { id }) => {
      return await BadgeService.getBadgeById(id);
    },
  },
  Mutation: {
    createBadge: async (_, args) => {
      return await BadgeService.createBadge(args);
    },
    updateBadge: async (_, { id, ...data }) => {
      return await BadgeService.updateBadge(id, data);
    },
    deleteBadge: async (_, { id }) => {
      return await BadgeService.deleteBadge(id);
    },
  },
};

module.exports = badgeResolvers;
