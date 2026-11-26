const { handle } = require("../lib/router");

module.exports = async (req, res) => {
  return handle(req, res, []);
};
