
const { ok, fail } = require("./response");
const { authenticate } = require("./auth");
const { categories, getCatalog } = require("./catalog");
const providers = require("./providers");

async function handle(req, res, parts = []) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-api-key, Authorization");
  res.setHeader("Access-Control-Max-Age", "86400");

  // Browser preflight
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    return res.end();
  }

  try {
    if (req.method !== "GET") {
      return fail(res, 405, "METHOD_NOT_ALLOWED", "Only GET requests are allowed.");
    }

    const path = parts.map(p => String(p).toLowerCase());
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
        message: "AHMED-MD API documentation",
        authentication: "x-api-key header required"
      });
    }

    if (!categories[category]) {
      return fail(res, 404, "CATEGORY_NOT_FOUND", "Category not found.");
    }

    if (!action || !categories[category].includes(action)) {
      return fail(res, 400, "INVALID_ACTION", "Invalid action.");
    }

    if (!authenticate(req, res)) return;

    // MOVIES
    if (category === "movie") {
      if (action === "search") {
        const result = await providers.movie.searchMovies(
          req.query.q,
          req.query.page
        );
        return ok(res, result);
      }

      if (action === "info") {
        const result = await providers.movie.getMovie(req.query.id);
        return ok(res, result);
      }
    }

    // ANIME
    if (category === "anime") {
      if (action === "search") {
        const result = await providers.anime.searchAnime(
          req.query.q,
          req.query.page
        );
        return ok(res, result);
      }

      if (action === "info") {
        const result = await providers.anime.getAnime(req.query.id);
        return ok(res, result);
      }
    }

    return fail(
      res,
      501,
      "PROVIDER_NOT_CONFIGURED",
      "This endpoint is not configured yet."
    );

  } catch (error) {
    console.error("API Error:", error);

    return fail(
      res,
      500,
      "INTERNAL_ERROR",
      error.message || "Server error."
    );
  }
}

module.exports = { handle };
