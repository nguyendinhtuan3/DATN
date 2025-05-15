const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers.authorization || "";
    const tokenString = token.startsWith("Bearer ")
      ? token.split(" ")[1]
      : token;
    if (!tokenString) return {};

    try {
      const decoded = verifyToken(tokenString);
      const user = await User.findByPk(decoded.id, {
        include: [{ model: Role, as: "role" }],
      });

      if (!user) return {};

      return {
        user: {
          id: user.id,
          email: user.email,
          role: user.role.name,
        },
      };
    } catch (err) {
      console.error("Error verifying token:", err);
      return {};
    }
  },
});

server.applyMiddleware({ app });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(
    `Server running at http://localhost:${PORT}${server.graphqlPath}`
  );
});
