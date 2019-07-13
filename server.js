// const express = require("express");
// const app = express();
// const bodyParser = require("body-parser");
// app.use(bodyParser.json());

// app.listen(3000, () => {
//   console.log("my app is runing");
// });
// app.get("/albums", (req, res) => {
//   res.send(albumsData);
// });
// app.get("/albums/:albumId", (req, res) => {
//   console.log(req.params);
//   var id = req.params.albumId;
//   var album = albumsData.filter(album => album.albumId === id);
//   res.send(album);
// });
// app.post("/albums", (req, res) => {
//   console.log(req.body);
//   albumsData.push(req.body);
//   res.send("this is the post");
// });
// const albumsData = [
//   {
//     albumId: "10",
//     artistName: "Beyoncé",
//     collectionName: "Lemonade",
//     artworkUrl100:
//       "http://is1.mzstatic.com/image/thumb/Music20/v4/23/c1/9e/23c19e53-783f-ae47-7212-03cc9998bd84/source/100x100bb.jpg",
//     releaseDate: "2016-04-25T07:00:00Z",
//     primaryGenreName: "Pop",
//     url:
//       "https://www.youtube.com/embed/PeonBmeFR8o?rel=0&amp;controls=0&amp;showinfo=0"
//   },
//   {
//     albumId: "11",
//     artistName: "Beyoncé",
//     collectionName: "Dangerously In Love",
//     artworkUrl100:
//       "http://is1.mzstatic.com/image/thumb/Music/v4/18/93/6d/18936d85-8f6b-7597-87ef-62c4c5211298/source/100x100bb.jpg",
//     releaseDate: "2003-06-24T07:00:00Z",
//     primaryGenreName: "Pop",
//     url:
//       "https://www.youtube.com/embed/ViwtNLUqkMY?rel=0&amp;controls=0&amp;showinfo=0"
//   }
// ];

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//npm install --save cors
const cors = require("cors");
app.use(cors());

const albumsData = [
  {
    albumId: "10",
    artistName: "Beyoncé",
    collectionName: "Lemonade",
    artworkUrl100:
      "http://is1.mzstatic.com/image/thumb/Music20/v4/23/c1/9e/23c19e53-783f-ae47-7212-03cc9998bd84/source/100x100bb.jpg",
    releaseDate: "2016-04-25T07:00:00Z",
    primaryGenreName: "Pop",
    url:
      "https://www.youtube.com/embed/PeonBmeFR8o?rel=0&amp;controls=0&amp;showinfo=0"
  },
  {
    albumId: "11",
    artistName: "Beyoncé",
    collectionName: "Dangerously In Love",
    artworkUrl100:
      "http://is1.mzstatic.com/image/thumb/Music/v4/18/93/6d/18936d85-8f6b-7597-87ef-62c4c5211298/source/100x100bb.jpg",
    releaseDate: "2003-06-24T07:00:00Z",
    primaryGenreName: "Pop",
    url:
      "https://www.youtube.com/embed/ViwtNLUqkMY?rel=0&amp;controls=0&amp;showinfo=0"
  }
];

app.use(bodyParser.json());

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is listening");
});

app.get("/", (req, res) => {
  res.send("Request received.");
});

app.get("/albums", (req, res) => {
  if (req.query.genre) {
    const filteredAlbums = albumsData.filter(
      album =>
        album.primaryGenreName.toLowerCase() === req.query.genre.toLowerCase()
    );
    res.send(filteredAlbums);
  } else {
    res.send(albumsData);
  }
});

app.get("/albums/:id", (req, res) => {
  const album = albumsData.find(album => album.albumId === req.params.id);
  res.send(album);
});

app.post("/albums", (req, res) => {
  const newAlbum = req.body;
  albumsData.push(newAlbum);
  res.send(newAlbum);
});

app.delete("/albums/:id", (req, res) => {
  const albumToDelete = albumsData.find(
    album => album.albumId === req.params.id
  );
  albumsData.splice(albumsData.indexOf(albumToDelete), 1);
  res.send("Deleted album " + req.params.id);
});

app.put("/albums/:id", (req, res) => {
  const index = albumsData.findIndex(album => album.albumId === req.params.id);
  albumsData[index] = { ...albumsData[index], ...req.body };
  res.send(albumsData[index]);
});
