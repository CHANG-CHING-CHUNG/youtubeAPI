const { getAllmovieList, getAllmovieThisWeekList } = require("./getMovies");
const { filterMovieDataFromTxt } = require("./movieList");
const getMovieTrailer = require("./youtubeSearch");

let theater;
let thisweek;

async function getMovieIntheaterList() {
  console.log("獲得 movies_intheaters 電影清單");
  await getAllmovieList();
}

async function getMovieThisWeekList() {
  console.log("獲得 movies_thisweek 電影清單");
  await getAllmovieThisWeekList();
}

async function filterMovieData() {
  let { movieIntheaters, movieThisWeek } = await filterMovieDataFromTxt();
  theater = movieIntheaters;
  thisweek = movieThisWeek;
  console.log("從 txt 抓取本週電影", thisweek);
  console.log("從 txt 抓取上映中電影", theater);
}

async function getMovieTrailerInTheaters() {
  console.log("從 Youtube 抓取電影預告並放入 DB movies_intheaters");
  await getMovieTrailer("theater", theater);
}
async function getMovieTrailerThisWeek() {
  console.log("從 Youtube 抓取電影預告並放入 DB movies_thisweek");
  await getMovieTrailer("thisweek", thisweek);
}

module.exports = {
  getMovieThisWeekList,
  getMovieIntheaterList,
  filterMovieData,
  getMovieTrailerThisWeek,
  getMovieTrailerInTheaters,
};
