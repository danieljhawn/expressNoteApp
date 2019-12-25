// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var note = require("note-taker");
var fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

var notesTaken = [];

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Basic route that sends the user first to the AJAX Page
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });
  
  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
  });
  
  // Displays all notes
  app.get("/api/notes", function(req, res) {
    return res.json(notes);
  });

  app.post("/api/notes", function (req, res) {
      var newNote = req.body;
      console.log(newNote);
      notesTaken.push(newNote);
      res.json(newNote);
  });

