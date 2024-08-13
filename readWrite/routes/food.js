const express = require("express");
const fs = require('node:fs');
const router = express.Router();

router.get("/", (req, res) => {
    const favFood = req.query.favFood;
    let result = "<html><body><h2>NOBODY LIKES THAT FOOD...try another!<h2></body><html>"

    fs.readFile("favFoods.txt", "utf8", (err, data) => {
        if(err){
            console.error(err);
        }
        let rows = data.split("\n");
        let hits = rows.filter(row => row.includes(favFood));

        if(hits.length == 0){
            res.send(result);
        }
        else{

            result = "<html><head></head><body><h2>We love " + favFood + "!</h2><ul>";
            hits.forEach(person => {
                result += "<li>" + person + "</li>";
            });
            result += "</ul></body></html>";
            res.send(result);
        }

    });
});

router.get("/list", (req, res) => {
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

})

module.exports = router;
