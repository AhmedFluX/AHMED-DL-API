const { ok, fail } = require("./response");
const { authenticate } = require("./auth");
const { categories, getCatalog } = require("./catalog");

async function handle(req, res, parts = []) {
  try {
    if (req.method !== "GET") {
      return fail(res, 405, "METHOD_NOT_ALLOWED", "Only GET requests are allowed.");
    }

    const path = parts.map(part => String(part).toLowerCase());
    const [category, action] = path;

    if (!category || category === "api") {
      return ok(res, {
        name: "AHMED-MD API",
        version: "1.0.0",
        owner: "AHMED",
        totalCategories: Object.keys(categories).length,
        documentation: "/docs",
        categories: getCatalog()
      });
    }

    if (category === "docs") {
      return ok(res, {
        message: "Read the project README for API usage.",
        authentication: "Use the x-api-key header.",
        example: {
          endpoint: "/api/movie/search?q=example",
          header: "x-api-key: YOUR_API_KEY"
        }
      });
    }

    if (!categories[category]) {
      return fail(res, 404, "CATEGORY_NOT_FOUND", "This API category does not exist.");
    }

    if (!action || !categories[category].includes(action)) {
      return fail(res, 400, "INVALID_ACTION", "Please provide a valid action.");
    }

    if (!authenticate(req, res)) return;

    return fail(
      res,
      501,
      "PROVIDER_NOT_CONFIGURED",
      "This endpoint is registered, but its authorized data provider has not been configured yet."
    );
  } catch (error) {
    console.error("AHMED-MD API Error:", error);

    return fail(
      res,
      500,
      "INTERNAL_ERROR",
      "An unexpected server error occurred."
    );
  }
}

module.exports = { handle };
