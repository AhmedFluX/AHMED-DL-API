
# AHMED-MD API

A multi-category REST API platform built with Node.js and Vercel.

## Project Information

- **Name:** AHMED-MD API
- **Owner:** AHMED
- **Version:** 1.0.0
- **Runtime:** Node.js
- **Hosting:** Vercel
- **Repository:** AHMED-MD-API

## Categories

1. Anime
2. Manga
3. Novel
4. Movie
5. Drama
6. Cartoon
7. Books
8. Documentary
9. Music
10. Podcast
11. Wallpaper
12. Subtitle
13. Live TV
14. Islamic
15. Education
16. Game
17. Web Series
18. Sound Effects
19. Trailer
20. Media Info
21. YouTube MP3
22. YouTube MP4

## Installation

```bash
npm install
npm install -g vercel
vercel dev
```

## Environment Variables

Create a `.env` file:

```env
API_KEY=your-long-random-secret
ALLOWED_ORIGINS=
```

Never publish your real API key.

## API Authentication

Send your API key using this header:

```http
x-api-key: YOUR_API_KEY
```

## Example Endpoints

```text
/api
/api/movie/search?q=example
/api/anime/search?q=example
/api/music/search?q=example
/api/islamic/quran
```

These are registered endpoint examples. Data providers must be configured before they return actual results.

## Response Format

Successful responses:

```json
{
  "status": true,
  "creator": "AHMED-MD",
  "version": "1.0.0",
  "result": {}
}
```

Error responses:

```json
{
  "status": false,
  "creator": "AHMED-MD",
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description"
  }
}
```

## Important

This project provides API routing and authentication scaffolding. It does not include configured third-party providers yet.

Only connect providers and media sources that you are authorized to use. Respect copyright, licensing, and platform access restrictions.

## License

MIT
 
