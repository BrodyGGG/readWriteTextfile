const express = require("express");
const fs = require('node:fs');
const router = express.Router();

router.get("/", (req,res)=>{
    const firstName =req.query.firstname;
    const lastName = req.query.lastname;
    const food = req.query.favfood;
    const content = firstName +" " + lastName +" "+ food + "\n";

    fs.appendFileSync("favFoods.txt", content, err => {
        if (err){
            console.error(err);
        }
    }
    );

    fs.readFile("favFoods.txt", "utf8", (err, data) => {
        if(err){
            console.error(err);
        }
        let rows = data.split("\n");

        let content = "<html><body><table><th>Favorite Foods</th>";
        rows.forEach(row => {
            content += `<tr><td>${row}</td></tr><br>`;
        })
        content += "</table></body></html>";
        res.send(content);
    });
});

router.get("/search", (req, res) => {
    res.sendFile("userSearch.html", {root: "public"});
});

router.get("/form", (req, res) => {
    res.sendFile("userForm.html", {root: "public"});
});

module.exports = router;