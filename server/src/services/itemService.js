const { Item, User, Land, Garden } = require("../models");
const sequelize = require("../config/mysql");

class ItemService {
  // Sử dụng vật phẩm
  static async useItem(userId, itemId) {
    const transaction = await sequelize.transaction();
    try {
      // Kiểm tra sự tồn tại của vật phẩm
      const item = await Item.findByPk(itemId, { transaction });
      if (!item || item.status !== "ACTIVE") {
        throw new Error("Vật phẩm không hợp lệ hoặc không thể sử dụng.");
      }

      // Kiểm tra người dùng
      const user = await User.findByPk(userId, { transaction });
      if (!user) {
        throw new Error("Người dùng không tồn tại.");
      }

      // Kiểm tra vườn của người dùng
      const garden = await Garden.findOne({
        where: { userId: userId },
        transaction,
      });
      if (!garden) {
        throw new Error("Vườn không tồn tại.");
      }

      // Thực hiện hành động tương ứng với loại vật phẩm
      switch (item.effectType) {
        case "XP":
          // Tăng điểm XP cho người dùng
          user.xp += item.effectValue;
          break;
        case "TIME":
          // Giảm thời gian phát triển cho đất trồng
          const lands = await Land.findAll({
            where: { gardenId: garden.id },
            transaction,
          });
          lands.forEach((land) => {
            if (land.lastPlantedAt) {
              land.lastPlantedAt = new Date(
                land.lastPlantedAt.getTime() - item.effectValue
              ); // Giảm thời gian
            }
          });
          break;
        case "FERTILITY":
          // Tăng độ màu mỡ của đất
          const land = await Land.findOne({
            where: { gardenId: garden.id },
            transaction,
          });
          if (land) {
            land.fertility = Math.min(land.fertility + item.effectValue, 100); // Đảm bảo độ màu mỡ không vượt quá 100
          }
          break;
        default:
          throw new Error("Loại hiệu ứng không hợp lệ.");
      }

      // Cập nhật người dùng và đất
      await user.save({ transaction });
      if (land) {
        await land.save({ transaction });
      }

      // Đánh dấu vật phẩm là đã sử dụng hoặc xóa vật phẩm
      await item.update({ status: "DELETED" }, { transaction });

      // Commit giao dịch
      await transaction.commit();

      return { message: "Vật phẩm đã được sử dụng thành công." };
    } catch (error) {
      // Rollback nếu có lỗi
      await transaction.rollback();
      throw error;
    }
  }

  // Hàm kiểm tra tính hợp lệ của vật phẩm và người dùng
  static async validateItemUsage(userId, itemId) {
    // Kiểm tra sự tồn tại của vật phẩm
    const item = await Item.findByPk(itemId);
    if (!item || item.status !== "ACTIVE") {
      throw new Error("Vật phẩm không hợp lệ hoặc không thể sử dụng.");
    }

    // Kiểm tra người dùng
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("Người dùng không tồn tại.");
    }

    return { item, user };
  }
}

module.exports = ItemService;
