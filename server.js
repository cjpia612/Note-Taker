const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require("./db/db.json");

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









app.listen(PORT, function() {
console.log("App listening on PORT " + PORT);
});