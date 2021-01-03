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

async function getMovieTrailer(type, movieList) {
  let count = 0;
  console.log("list", movieList);
  console.log("type", type);
  const interval = setInterval(async () => {
    try {
      if (!movieList[count]) {
        clearInterval(interval);
      }
      let hasTrailer = false;
      const res = await axios({
        method: "get",
        url: APIURL + encodeURI(`${movieList[count]}預告`),
      });
      res.data.items.forEach((movie) => {
        let regexMovieName = new RegExp(movieList[count]);
        if (
          movie.snippet.title.match(/預告/g) &&
          movie.snippet.title.match(regexMovieName) &&
          movie.snippet.title.match(regexMovieName)[0] === movieList[count]
        ) {
          console.log("title", movie.snippet.title);
          hasTrailer = true;
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
        if (type === "theater") {
          await dbController.updateMovieTrailer(movieName, trailer);
        } else if (type === "thisweek") {
          await dbController.updateTrailerForMovieThisweek(movieName, trailer);
        }
      } else {
        console.log(`${movieList[count]} 電影沒有預告`);
      }
      count++;
    } catch (error) {
      console.log(error);
      clearInterval(interval);
    }
  }, 2000);
}

module.exports = getMovieTrailer;
