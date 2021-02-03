const dbController = require("./dbController");
const fs = require("fs");

async function getAllmovieList() {
  let movies = await dbController.getAllMoviesInTheaters();
  let newMovieList = [];
  movies.forEach((movie) => {
    if (movie.trailer == "") {
      newMovieList.push(movie);
    }
  });
  newMovieList = newMovieList.map((movie) => {
    return "\r" + movie.name;
  });
  console.log("moviesIntheaters line 15");
  fs.writeFileSync("moviesIntheaters.txt", newMovieList.toString());
  console.log("moviesIntheaters data 寫入成功");
}
async function getAllmovieThisWeekList() {
  let movies = await dbController.getAllMoviesThisWeek();
  let newMovieList = [];
  movies.forEach((movie) => {
    if (movie.trailer == "") {
      newMovieList.push(movie);
    }
  });
  newMovieList = newMovieList.map((movie) => {
    return "\r" + movie.name;
  });
  console.log("moviesThisWeek line 29");
  fs.writeFileSync("moviesThisWeek.txt", newMovieList.toString());
  console.log("moviesThisWeek data 寫入成功");
}
module.exports = {
  getAllmovieList,
  getAllmovieThisWeekList,
};
// dbController.updateMovieTrailer();
