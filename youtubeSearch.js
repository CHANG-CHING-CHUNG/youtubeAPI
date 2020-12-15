const { CREDENTIALS } = require("./credentials");
const axios = require("axios");
const EMBEDURL = "https://www.youtube.com/embed/";
const APIURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&&maxResults=5&key=${CREDENTIALS}&q=`;
const movieList = require("./movieList");

// EMBEDURL + res.data.items[0].id.videoId
// .snippet.title.match(/預告/g)

async function getMovieTrailer() {
  setInterval(async () => {
    for (let i = 0; i < movieList.length; i++) {
      try {
        const res = await axios({
          method: "get",
          url: APIURL + encodeURI(movieList[i]),
        });

        if (res.data.items[0].snippet.title.match(/預告/g)) {
          result = res.data.items[0].snippet;
        }
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
  }, 1000);
}

getMovieTrailer();
