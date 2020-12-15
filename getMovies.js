const dbController = require("./dbController");
const fs = require("fs");

async function g() {
  let movies = await dbController.getAllMoviesInTheaters();
  movies = movies.map((movie) => {
    return "\r" + movie.name;
  });
  fs.writeFile("movieName.txt", movies, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log("data 寫入成功");
  });
}
g();
