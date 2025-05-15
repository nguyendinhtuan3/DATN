const { Transaction, Item, User } = require("../models");
const { sequelize } = require("../config/mysql");

class TransactionService {
  // Mua item
  static async buyItem(userId, itemId, quantity) {
    const transaction = await sequelize.transaction();

    try {
      // Kiểm tra sự tồn tại của item
      const item = await Item.findByPk(itemId, { transaction });
      if (!item || item.status !== "active") {
        throw new Error("Item không tồn tại hoặc không hoạt động.");
      }

      // Kiểm tra người dùng
      const user = await User.findByPk(userId, { transaction });
      if (!user) throw new Error("Người dùng không tồn tại.");

      // Tính tổng giá trị của giao dịch
      const totalPrice = parseFloat(item.price) * quantity;

      // Kiểm tra người dùng có đủ coin để mua item không
      if (user.coin < totalPrice) {
        throw new Error("Không đủ coin để mua item.");
      }

      // Trừ coin của người dùng
      await User.update(
        { coin: user.coin - totalPrice },
        { where: { id: userId }, transaction }
      );

      // Tạo giao dịch
      const transactionRecord = await Transaction.create(
        {
          userId,
          itemId,
          number: quantity,
          totalPrice,
          status: "COMPLETED",
          paymentStatus: "PAID",
        },
        { transaction }
      );

      // Cập nhật số lượng item sau khi giao dịch
      await Item.update(
        { quantity: item.quantity - quantity },
        { where: { id: itemId }, transaction }
      );

      // Commit giao dịch
      await transaction.commit();

      return {
        message: "Đã mua item thành công.",
        transaction: transactionRecord,
      };
    } catch (error) {
      // Rollback nếu có lỗi
      await transaction.rollback();
      throw error;
    }
  }

  // Lịch sử giao dịch của người dùng
  static async getTransactionHistory(userId, limit = 10, offset = 0) {
    try {
      const transactions = await Transaction.findAll({
        where: { userId },
        limit,
        offset,
        order: [["createdAt", "DESC"]], // Sắp xếp theo thời gian tạo giao dịch mới nhất
      });

      return transactions;
    } catch (error) {
      throw new Error("Không thể lấy lịch sử giao dịch.");
    }
  }

  // Kiểm tra số dư của người dùng
  static async checkUserBalance(userId) {
    try {
      const user = await User.findByPk(userId);
      if (!user) throw new Error("Người dùng không tồn tại.");
      return { balance: user.coin };
    } catch (error) {
      throw new Error("Không thể kiểm tra số dư.");
    }
  }

  // Hoàn tiền giao dịch
  static async refundTransaction(transactionId) {
    const transaction = await sequelize.transaction();

    try {
      // Lấy thông tin giao dịch
      const trans = await Transaction.findByPk(transactionId, { transaction });
      if (!trans || trans.paymentStatus !== "PAID") {
        throw new Error("Giao dịch không hợp lệ hoặc đã hoàn thành.");
      }

      // Kiểm tra người dùng và item
      const user = await User.findByPk(trans.userId, { transaction });
      const item = await Item.findByPk(trans.itemId, { transaction });

      if (!user || !item) {
        throw new Error("Người dùng hoặc item không tồn tại.");
      }

      // Cập nhật lại số dư của người dùng
      await User.update(
        { coin: user.coin + trans.totalPrice },
        { where: { id: user.id }, transaction }
      );

      // Hoàn lại số lượng item
      await Item.update(
        { quantity: item.quantity + trans.number },
        { where: { id: item.id }, transaction }
      );

      // Cập nhật trạng thái giao dịch thành 'REFUNDED'
      await trans.update({ paymentStatus: "REFUNDED" }, { transaction });

      // Commit giao dịch
      await transaction.commit();

      return { message: "Giao dịch đã được hoàn tiền thành công." };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = TransactionService;
