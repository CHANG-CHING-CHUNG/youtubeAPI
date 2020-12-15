const fs = require("fs");

const data = fs
  .readFileSync("movieName.txt", "utf-8")
  .split(",")
  .map((movie) => {
    return movie.replace(/\r/, "");
  });

module.exports = data;
