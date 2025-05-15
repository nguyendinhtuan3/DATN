const { ApolloServer } = require("apollo-server-express");
const { typeDefs } = require("../schema/index");
const { resolvers } = require("../resolvers/index");
const { getUserFromToken } = require("../utils/jwtHelper");

const createApolloServer = async (app, io) => {
  try {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req, res }) => {
        const authHeader = req.headers.authorization;
        const token =
          authHeader && authHeader.startsWith("Bearer ")
            ? authHeader.slice(7)
            : null;
        const user = getUserFromToken(token);
        return { req, res, user, io };
      },
      introspection: true,
      playground: true,
    });

    await server.start();
    server.applyMiddleware({ app, cors: false });

    return { server };
  } catch (error) {
    console.error("Error initializing Apollo Server:", error);
    throw error;
  }
};

module.exports = { createApolloServer };
