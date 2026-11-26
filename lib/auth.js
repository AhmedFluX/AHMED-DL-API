const { fail } = require("./response");

function getApiKey(req) {
  const auth = req.headers.authorization || "";
  const bearer = auth.startsWith("Bearer ")
    ? auth.slice(7).trim()
    : "";

  const headerKey = req.headers["x-api-key"];

  return bearer || headerKey || "";
}

function authenticate(req, res) {
  const requiredKey = process.env.API_KEY;

  if (!requiredKey) {
    fail(res, 500, "SERVER_CONFIG_ERROR", "API_KEY is not configured.");
    return false;
  }

  const providedKey = getApiKey(req);

  if (providedKey !== requiredKey) {
    fail(res, 401, "UNAUTHORIZED", "A valid API key is required.");
    return false;
  }

  return true;
}

module.exports = { authenticate };
