var express = require("express");
var path = require("path");
var fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;
var notesTaken = require("./db/db.json");
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Basic route that sends the user first to the AJAX Page
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// Displays all notes
app.get("/api/notes", function (req, res) {
  res.json(notesTaken);
});

app.post("/api/notes", function (req, res) {
  var newNote = req.body;
  newNote.id = Math.round(Math.random() * 99999);
  console.log(newNote);
  notesTaken.push(newNote);
  fs.writeFileSync("./db/db.json", JSON.stringify(notesTaken), "utf-8")
  res.json(newNote);
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.delete("/api/notes/:id", function (req, res) {
  var tempNotes = [];
  var notesTaken = require("./db/db.json");
      for (let i =0; i <notesTaken.length; i++) {
          if ( req.params.id !== notesTaken[i].id)
          {tempNotes.push(notesTaken[i])}
      };
  
      fs.writeFileSync("./db/db.json", JSON.stringify(tempNotes), "utf-8")
      res.json(true);
  });
 

app.listen(PORT, function () { console.log("listening on port 3000") });