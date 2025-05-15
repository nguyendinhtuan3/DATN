const { Land } = require("../models");

class LandService {
  // Phương thức để lấy trạng thái đất
  static getLandStatus(land) {
    if (land.fertility > 80) {
      return "FERTILE";
    } else if (land.fertility > 30) {
      return "NORMAL";
    } else {
      return "DEPLETED";
    }
  }

  // Phương thức tính toán thời gian không tương tác của đất
  static getInactiveDuration(land) {
    if (!land.lastPlantedAt) return null;
    const now = new Date();
    const lastPlantedAt = new Date(land.lastPlantedAt);
    const diffTime = Math.abs(now - lastPlantedAt);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Chuyển đổi thành số ngày
    return diffDays;
  }

  // Phương thức để tăng độ màu mỡ của đất
  static increaseFertility(land, amount) {
    land.fertility = Math.min(land.fertility + amount, 100);
    return land.save();
  }

  // Phương thức để giảm độ màu mỡ của đất
  static decreaseFertility(land, amount) {
    land.fertility = Math.max(land.fertility - amount, 0);
    return land.save();
  }
}

module.exports = LandService;
