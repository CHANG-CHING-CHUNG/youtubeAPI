const { getAllmovieList, getAllmovieThisWeekList } = require("./getMovies");
const { filterMovieDataFromTxt } = require("./movieList");
const getMovieTrailer = require("./youtubeSearch");

async function getMovieIntheaterList() {
  console.log("獲得 movies_intheaters 電影清單");
  await getAllmovieList();
}

async function getMovieThisWeekList() {
  console.log("獲得 movies_thisweek 電影清單");
  await getAllmovieThisWeekList();
}

async function getMovieTrailerInTheaters(movieIntheaters) {
  console.log("從 Youtube 抓取電影預告並放入 DB movies_intheaters");

  console.log("filterMovieDataFromTxt" + movieIntheaters);
  await getMovieTrailer("theater", movieIntheaters);
}
async function getMovieTrailerThisWeek(movieThisWeek) {
  console.log("從 Youtube 抓取電影預告並放入 DB movies_thisweek");
  console.log("filterMovieDataFromTxt" + movieThisWeek);
  await getMovieTrailer("thisweek", movieThisWeek);
}

async function runAsyncTasks() {
  await getMovieThisWeekList();
  await getMovieIntheaterList();
  let { movieIntheaters, movieThisWeek } = await filterMovieDataFromTxt();
  await getMovieTrailerThisWeek(movieThisWeek);
  await getMovieTrailerInTheaters(movieIntheaters);
}
module.exports = {
  runAsyncTasks,
};
