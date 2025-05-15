const Seed = require("../models/mysql/Seed");

async function checkSeeded(name) {
  const existing = await Seed.findOne({ where: { name } });
  return !!existing;
}

async function markSeeded(name) {
  await Seed.create({ name });
}

module.exports = { checkSeeded, markSeeded };
