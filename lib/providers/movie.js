
const BASE_URL = "https://api.themoviedb.org/3";

function getApiKey() {
  const key = process.env.TMDB_API_KEY;

  if (!key) {
    throw new Error("TMDB_API_KEY is not configured.");
  }

  return key;
}

async function request(endpoint, params = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`);

  url.searchParams.set("api_key", getApiKey());

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, String(value));
    }
  }

  const response = await fetch(url, {
    headers: {
      Accept: "application/json"
    },
    signal: AbortSignal.timeout(10000)
  });

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status}`);
  }

  return response.json();
}

async function searchMovies(query, page = 1) {
  if (!query || !query.trim()) {
    throw new Error("Movie search query is required.");
  }

  const data = await request("/search/movie", {
    query: query.trim(),
    page
  });

  return {
    total: data.total_results,
    page: data.page,
    results: (data.results || []).map(movie => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      releaseDate: movie.release_date,
      rating: movie.vote_average,
      poster: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : null
    }))
  };
}

async function getMovie(id) {
  if (!id || !/^\d+$/.test(String(id))) {
    throw new Error("A valid movie ID is required.");
  }

  const movie = await request(`/movie/${id}`);

  return {
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    releaseDate: movie.release_date,
    rating: movie.vote_average,
    runtime: movie.runtime,
    genres: (movie.genres || []).map(genre => genre.name),
    poster: movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : null,
    backdrop: movie.backdrop_path
      ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
      : null,
    officialWebsite: movie.homepage || null
  };
}

module.exports = {
  searchMovies,
  getMovie
};
 
