const fs = require("fs");

async function filterMovieDataFromTxt() {
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

  console.log(movieThisWeek);
  return {
    movieIntheaters,
    movieThisWeek,
  };
}

module.exports = {
  filterMovieDataFromTxt,
};
