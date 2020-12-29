const dbController = require("./dbController");
const fs = require("fs");

async function getAllmovieList() {
  let movies = await dbController.getAllMoviesInTheaters();
  let newMovieList = [];
  movies.forEach((movie) => {
    if (!movie.thumbnails) {
      newMovieList.push(movie);
    }
  });
  newMovieList = newMovieList.map((movie) => {
    return "\r" + movie.name;
  });
  console.log(newMovieList);
  fs.writeFile("moviesIntheaters.txt", newMovieList, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log("data 寫入成功");
  });
}
async function getAllmovieThisWeekList() {
  let movies = await dbController.getAllMoviesThisWeek();
  let newMovieList = [];
  movies.forEach((movie) => {
    if (!movie.thumbnails) {
      newMovieList.push(movie);
    }
  });
  newMovieList = newMovieList.map((movie) => {
    return "\r" + movie.name;
  });
  console.log(newMovieList);
  fs.writeFile("moviesThisWeek.txt", newMovieList, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log("data 寫入成功");
  });
}
module.exports = {
  getAllmovieList,
  getAllmovieThisWeekList,
};
// dbController.updateMovieTrailer();
