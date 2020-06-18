const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// ROUTES

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});
app.get("/api/notes", (req, res) => {
    fs.readFile(__dirname +"db/db.json", "utf8", (err, data) => {
        if (err) {
            throw err;
        } else {
            return res.json(data);
        }
    });
});

// app.post("/api/notes", (req, res) => {
//     const notes = req.body;
  
//     notes.routeName = waitingTable.name.replace(/\s+/g, "").toLowerCase();
  
//     waitingList.push(waitingTable);
  
//     res.json(waitingTable);
// });









app.listen(PORT, function() {
console.log("App listening on PORT " + PORT);
});