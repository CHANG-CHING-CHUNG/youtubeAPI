const { CREDENTIALS } = require("./credentials");
const axios = require("axios");
const EMBEDURL = "https://www.youtube.com/embed/";
const APIURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&&maxResults=20&key=${CREDENTIALS}&q=`;

// EMBEDURL + res.data.items[0].id.videoId
// .snippet.title.match(/預告/g)

async function getSingleMovieTrailer(movieName) {
  let hasTrailer = false;
  const res = await axios({
    method: "get",
    url: APIURL + encodeURI(movieName),
  });
  res.data.items.forEach((movie) => {
    if (movie.snippet.title.match(/預告/g)) {
      hasTrailer = true;
      console.log("2", movie.snippet.title);
      return;
    }
  });
  if (hasTrailer) {
    thumbnails = res.data.items[0].snippet.thumbnails;
    embVideoUrl = EMBEDURL + res.data.items[0].id.videoId;
    const trailer = {
      trailer: embVideoUrl,
      thumbnails,
    };
    console.log(trailer);
  }
}
