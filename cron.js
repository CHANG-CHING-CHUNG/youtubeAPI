const cron = require("node-cron");
const {
  getMovieThisWeekList,
  getMovieIntheaterList,
  filterMovieData,
  getMovieTrailerThisWeek,
  getMovieTrailerInTheaters,
} = require("./tasks");

console.log("每天23:10定時抓 Youtube 電影預告排程已啟動...");
cron.schedule("10 23 * * *", async () => {
  console.log("抓 Youtube 電影預告開始");
  setTimeout(getMovieThisWeekList, 2000);
  setTimeout(getMovieIntheaterList, 4000);
  setTimeout(filterMovieData, 14000);
  setTimeout(getMovieTrailerThisWeek, 24000);
  setTimeout(getMovieTrailerInTheaters, 39000);
  console.log("抓 Youtube 電影預告結束");
});
