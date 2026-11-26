const { handle } = require("../lib/router");

module.exports = async (req, res) => {
  const raw = req.query.path;
  const parts = Array.isArray(raw) ? raw : (raw ? [raw] : []);

  return handle(req, res, parts);
};
