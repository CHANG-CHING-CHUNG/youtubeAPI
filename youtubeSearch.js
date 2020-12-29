const { CREDENTIALS } = require("./credentials");
const axios = require("axios");
const EMBEDURL = "https://www.youtube.com/embed/";
const APIURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&&maxResults=20&key=${CREDENTIALS}&q=`;
const { movieIntheaters, movieThisWeek } = require("./movieList");
const fs = require("fs");
const dbController = require("./dbController");
const { clearInterval } = require("timers");

// EMBEDURL + res.data.items[0].id.videoId
// .snippet.title.match(/預告/g)

async function getMovieTrailer(movieList) {
  let count = 1;
  const interval = setInterval(async () => {
    try {
      if (!movieList[count]) {
        clearInterval(interval);
      }
      let hasTrailer = false;
      const res = await axios({
        method: "get",
        url: APIURL + encodeURI(movieList[count]),
      });
      res.data.items.forEach((movie) => {
        if (movie.snippet.title.match(/預告/g)) {
          hasTrailer = true;
          console.log("2", movie.snippet.title);
          return;
        }
      });
      if (hasTrailer) {
        movieName = movieList[count];
        thumbnails = res.data.items[0].snippet.thumbnails;
        embVideoUrl = EMBEDURL + res.data.items[0].id.videoId;
        const trailer = {
          trailer: embVideoUrl,
          thumbnails,
        };
        console.log(movieName);
        await dbController.updateMovieTrailer(movieName, trailer);
      }
      count++;
    } catch (error) {
      console.log(error);
      clearInterval(interval);
    }
  }, 2000);
}

// fs.writeFile("trailer.json", JSON.stringify(trailerArr), (err) => {
//   if (err) {
//     return console.log(err);
//   }
//   console.log("data 寫入成功");
// });

module.exports = getMovieTrailer;
