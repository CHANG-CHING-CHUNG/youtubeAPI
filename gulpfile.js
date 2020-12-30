const { series } = require("gulp");
const { getAllmovieList, getAllmovieThisWeekList } = require("./getMovies");
const { filterMovieDataFromTxt } = require("./movieList");
const getMovieTrailer = require("./youtubeSearch");

let theater;
let thisweek;

function getMovieIntheaterList(done) {
  getAllmovieList();
  done();
}

function getMovieThisWeekList(done) {
  getAllmovieThisWeekList();
  done();
}

async function filterMovieData(done) {
  let { movieIntheaters, movieThisWeek } = filterMovieDataFromTxt();
  theater = movieIntheaters;
  thisweek = movieThisWeek;
  // console.log(theater);
  done();
}

function getMovieTrailerInTheaters(done) {
  // console.log(theater);
  getMovieTrailer("theater", theater);
  done();
}
function getMovieTrailerThisWeek(done) {
  getMovieTrailer("thisweek", thisweek);
  done();
}

exports.default = series(
  // getMovieIntheaterList,
  getMovieThisWeekList,
  filterMovieData,
  // getMovieTrailerInTheaters
  getMovieTrailerThisWeek
);
