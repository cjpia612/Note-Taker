const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require("./db/db.json");
const { runInNewContext } = require("vm");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'))


// ROUTES

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "db/db.json"));
});

app.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json","utf8", (err, data) => {
        if (err) {
            throw err;
        } else {
            return res.json(data);
        }
    })
});

app.post("/api/notes", (req, res) => {
    const notes = req.body;
    notes.id = req.body.title;
  
    let notesData = fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) throw err;
        const parse = JSON.parse(data);
        parse.push(notes);
        
        fs.writeFile("./db/db.json",JSON.stringify(parse), err => {
            if (err) throw err;
             res.json(notes);
     
         });
 
    });
});

app.delete('/api/notes/:id', (req, res) => {
    // Read all notes in the db.json file
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        if (err) throw err;

        const jsonParse = JSON.parse(data);
        const deleteID = jsonParse.find(newNote => newNote.id === req.params.id);

        const idIndex = jsonParse.indexOf(deleteID);
        jsonParse.splice(idIndex, 1);
        fs.writeFile("./db/db.json", JSON.stringify(jsonParse), (err, data) => {
            if (err) throw err;
            res.json(jsonParse);
        });
    })        
});   








app.listen(PORT, function() {
console.log("App listening on PORT " + PORT);
});