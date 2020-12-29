const fs = require("fs");

function filterMovieDataFromTxt() {
  const movieIntheaters = fs
    .readFileSync("moviesIntheaters.txt", "utf-8")
    .split(",")
    .map((movie) => {
      return movie.replace(/\r/, "");
    });
  const movieThisWeek = fs
    .readFileSync("moviesThisWeek.txt", "utf-8")
    .split(",")
    .map((movie) => {
      return movie.replace(/\r/, "");
    });

  return {
    movieIntheaters,
    movieThisWeek,
  };
}

module.exports = {
  filterMovieDataFromTxt,
};
