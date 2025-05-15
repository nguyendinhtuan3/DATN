const TransactionService = require("../services/transactionService");

const transactionResolver = {
  Query: {
    // Lấy lịch sử giao dịch của người dùng
    getTransactionHistory: async (_, { userId, limit = 10, offset = 0 }) => {
      try {
        // Kiểm tra userId
        if (!userId) throw new Error("userId không hợp lệ.");

        // Trả về lịch sử giao dịch của người dùng
        return await TransactionService.getTransactionHistory(
          userId,
          limit,
          offset
        );
      } catch (error) {
        console.error("Lỗi khi lấy lịch sử giao dịch:", error);
        throw new Error(`Không thể lấy lịch sử giao dịch: ${error.message}`);
      }
    },

    // Kiểm tra số dư của người dùng
    checkUserBalance: async (_, { userId }) => {
      try {
        // Kiểm tra userId
        if (!userId) throw new Error("userId không hợp lệ.");

        // Trả về số dư của người dùng
        return await TransactionService.checkUserBalance(userId);
      } catch (error) {
        console.error("Lỗi khi kiểm tra số dư:", error);
        throw new Error(`Không thể kiểm tra số dư: ${error.message}`);
      }
    },
  },

  Mutation: {
    // Mua item
    buyItem: async (_, { userId, itemId, quantity }) => {
      try {
        // Kiểm tra dữ liệu đầu vào
        if (!userId || !itemId || quantity <= 0) {
          throw new Error("Dữ liệu đầu vào không hợp lệ.");
        }

        // Gọi service để mua item
        return await TransactionService.buyItem(userId, itemId, quantity);
      } catch (error) {
        console.error("Lỗi khi mua item:", error);
        throw new Error(`Mua item thất bại: ${error.message}`);
      }
    },

    // Hoàn tiền giao dịch
    refundTransaction: async (_, { transactionId }) => {
      try {
        // Kiểm tra transactionId
        if (!transactionId) throw new Error("transactionId không hợp lệ.");

        // Gọi service để hoàn tiền giao dịch
        return await TransactionService.refundTransaction(transactionId);
      } catch (error) {
        console.error("Lỗi khi hoàn tiền giao dịch:", error);
        throw new Error(`Hoàn tiền giao dịch thất bại: ${error.message}`);
      }
    },
  },
};

module.exports = transactionResolver;
