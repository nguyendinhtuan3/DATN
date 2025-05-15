const fs = require("fs");
const path = require("path");

const Query = {};
const Mutation = {};
const Subscription = {};
const typeResolvers = {};

fs.readdirSync(__dirname).forEach((file) => {
  if (file === "index.js" || !file.endsWith("Resolver.js")) return;

  const resolvers = require(path.join(__dirname, file));

  for (const [key, value] of Object.entries(resolvers)) {
    if (key === "Query") {
      Object.assign(Query, value);
    } else if (key === "Mutation") {
      Object.assign(Mutation, value);
    } else if (key === "Subscription") {
      Object.assign(Subscription, value);
    } else {
      // Type resolvers như User, Course, etc.
      if (!typeResolvers[key]) {
        typeResolvers[key] = {};
      }
      Object.assign(typeResolvers[key], value);
    }
  }
});

module.exports = {
  Query,
  Mutation,
  Subscription,
  ...typeResolvers,
};
