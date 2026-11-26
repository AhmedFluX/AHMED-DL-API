
const { ok, fail } = require("./response");
const { authenticate } = require("./auth");
const { categories, getCatalog } = require("./catalog");
const providers = require("./providers");

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
        message: "Read README.md for API documentation.",
        authentication: "Use x-api-key header."
      });
    }

    if (!categories[category]) {
      return fail(res, 404, "CATEGORY_NOT_FOUND", "Category not found.");
    }

    if (!action || !categories[category].includes(action)) {
      return fail(res, 400, "INVALID_ACTION", "Invalid API action.");
    }

    if (!authenticate(req, res)) return;

    if (category === "movie") {
      if (action === "search") {
        const query = req.query.q;
        const page = Math.max(1, Number(req.query.page) || 1);

        const result = await providers.movie.searchMovies(query, page);
        return ok(res, result);
      }

      if (action === "info") {
        const result = await providers.movie.getMovie(req.query.id);
        return ok(res, result);
      }
    }

    return fail(
      res,
      501,
      "PROVIDER_NOT_CONFIGURED",
      "This category provider is not configured yet."
    );

  } catch (error) {
    console.error("AHMED-MD API Error:", error);

    return fail(
      res,
      500,
      "INTERNAL_ERROR",
      error.message || "Unexpected server error."
    );
  }
}

module.exports = { handle };
