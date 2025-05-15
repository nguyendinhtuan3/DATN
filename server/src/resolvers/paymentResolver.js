const PaymentService = require("../services/paymentService");

module.exports = {
  Mutation: {
    topUp: async (_, { amount, method }, { user }) => {
      if (!user) throw new Error("Authentication required.");

      try {
        const payment = await PaymentService.topUp(user.id, amount, method);
        return {
          message: "Nạp coin thành công.",
          payment,
        };
      } catch (error) {
        throw new Error(error.message || "Lỗi khi nạp coin.");
      }
    },

    buyCourse: async (_, { courseId, method }, { user }) => {
      if (!user) throw new Error("Authentication required.");

      try {
        const { payment } = await PaymentService.buyCourse(
          user.id,
          courseId,
          method
        );
        return {
          message: "Mua khóa học thành công.",
          payment,
        };
      } catch (error) {
        throw new Error(error.message || "Lỗi khi mua khóa học.");
      }
    },
  },

  Query: {
    getMyPayments: async (_, __, { user, models }) => {
      if (!user) throw new Error("Authentication required.");
      return models.Payment.findAll({
        where: { userId: user.id },
        order: [["createdAt", "DESC"]],
      });
    },
  },
};
