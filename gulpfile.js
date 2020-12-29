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
  done();
}

function getMovieTrailerInTheaters(done) {
  getMovieTrailer(theater);

  done();
}
function getMovieTrailerThisWeek(done) {
  getMovieTrailer(thisweek);
  done();
}

exports.default = series(
  getMovieIntheaterList,
  getMovieThisWeekList,
  filterMovieData,
  getMovieTrailerInTheaters,
  getMovieTrailerThisWeek
);
