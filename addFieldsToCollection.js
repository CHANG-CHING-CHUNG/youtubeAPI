const dbController = require("./dbController");

dbController.getMoviesWithoutTrailer("movies").then(async (res) => {
  for (let movie of res) {
    await dbController.addTrailerAndthumbnailFields("movie", movie.name);
  }
});
dbController.getMoviesWithoutTrailer("movies_thisweek").then(async (res) => {
  for (let movie of res) {
    await dbController.addTrailerAndthumbnailFields(
      "movies_thisweek",
      movie.name
    );
  }
});
