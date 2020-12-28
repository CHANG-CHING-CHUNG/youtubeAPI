const { MongoClient } = require("mongodb");
const url = require("./dbConnector");
const dbName = "test";

const dbController = {
  async getMovieThisWeek() {
    const client = new MongoClient(url, { useUnifiedTopology: true });
    try {
      await client.connect();
      const db = client.db(dbName);
      const col = db.collection("movies_thisweek");
      const cursor = col.find();
      // print a message if no documents were found
      if ((await cursor.count()) === 0) {
        console.log("No documents found!");
      }
      return await cursor.toArray();
    } finally {
      await client.close();
    }
  },
  async getAllMoviesInTheaters() {
    const client = new MongoClient(url, { useUnifiedTopology: true });
    try {
      await client.connect();
      const db = client.db(dbName);
      const col = db.collection("movies");
      const cursor = col.find();
      // print a message if no documents were found
      if ((await cursor.count()) === 0) {
        console.log("No documents found!");
      }
      console.log("here");
      return await cursor.toArray();
    } finally {
      await client.close();
    }
  },
  async getOneLatestMovie(type) {
    const client = new MongoClient(url, { useUnifiedTopology: true });
    try {
      await client.connect();
      const db = client.db(dbName);
      const col =
        type === "current"
          ? db.collection("movies")
          : type === "future"
          ? db.collection("movies_thisweek")
          : null;
      const options = {
        sort: { releaseDate: -1 },
      };
      const cursor = await col.find(null, options);
      // print a message if no documents were found
      if ((await cursor.count()) === 0) {
        console.log("No documents found!");
      }
      const result = await cursor.toArray();
      // console.log(result.map((item) => item.name));
      return result;
    } finally {
      await client.close();
    }
  },
  async getLatestTenMoviesInTheaters() {
    const client = new MongoClient(url, { useUnifiedTopology: true });
    try {
      await client.connect();
      const db = client.db(dbName);
      const col = db.collection("movies");
      const options = {
        sort: { releaseDate: -1 },
      };
      const cursor = await col.find(null, options).limit(10);
      // print a message if no documents were found
      if ((await cursor.count()) === 0) {
        console.log("No documents found!");
      }
      return await cursor.toArray();
    } finally {
      await client.close();
    }
  },
  async getLatestTenMoviesThisWeek() {
    const client = new MongoClient(url, { useUnifiedTopology: true });
    try {
      await client.connect();
      const db = client.db(dbName);
      const col = db.collection("movies_thisweek");
      const options = {
        sort: { releaseDate: -1 },
      };
      const cursor = await col.find(null, options).limit(10);
      // print a message if no documents were found
      if ((await cursor.count()) === 0) {
        console.log("No documents found!");
      }
      return await cursor.toArray();
    } finally {
      await client.close();
    }
  },
  async updateMovieTrailer(movieName, trailer) {
    const client = new MongoClient(url, { useUnifiedTopology: true });
    try {
      await client.connect();
      const db = client.db(dbName);
      const col = db.collection("movies");
      const filter = { name: movieName };
      const updateDoc = {
        $set: trailer,
      };
      const result = await col.updateOne(filter, updateDoc);
      console.log(
        `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
      );
    } finally {
      await client.close();
    }
  },
};

module.exports = dbController;
