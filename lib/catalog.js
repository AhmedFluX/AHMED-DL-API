const categories = {
  anime: ["search", "info", "episodes"],
  manga: ["search", "info", "chapters"],
  novel: ["search", "info"],
  movie: ["search", "info"],
  drama: ["search", "info", "episodes"],
  cartoon: ["search", "info", "episodes"],
  books: ["search", "info"],
  documentary: ["search", "info"],
  music: ["search", "info"],
  podcast: ["search", "info", "episodes"],
  wallpaper: ["search"],
  subtitle: ["search"],
  livetv: ["channels", "info"],
  islamic: ["search", "prayer-times", "quran"],
  education: ["search"],
  game: ["search", "info"],
  webseries: ["search", "info", "episodes"],
  soundeffects: ["search"],
  trailer: ["search"],
  mediainfo: ["inspect"],
  ytmp3: ["info"],
  ytmp4: ["info"]
};

function getCatalog() {
  return Object.entries(categories).map(([name, actions]) => ({
    name,
    actions
  }));
}

module.exports = { categories, getCatalog };
