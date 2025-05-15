const { Badge } = require("../models");

class BadgeService {
  static async getAllBadges() {
    return await Badge.findAll();
  }

  static async getBadgeById(id) {
    return await Badge.findByPk(id);
  }

  static async createBadge(data) {
    return await Badge.create(data);
  }

  static async updateBadge(id, data) {
    const badge = await Badge.findByPk(id);
    if (!badge) throw new Error("Badge not found");
    await badge.update(data);
    return badge;
  }

  static async deleteBadge(id) {
    const badge = await Badge.findByPk(id);
    if (!badge) throw new Error("Badge not found");
    await badge.destroy();
    return true;
  }
}

module.exports = BadgeService;
