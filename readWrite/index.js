//Imports
const express = require("express");
const myCustomRoutes = require("./routes/user");
const foodRoutes = require("./routes/food")
//Initalizing
const app = express();
const port = 3000;

//Routes
app.use("/user/", myCustomRoutes);
app.use("/food/", foodRoutes);

//Simple root route 
app.get("/", (req, res) => {
    res.send("<html><body><h1>Directory</h1>" +
    "<h2>Favorite food form: http://localhost:3000/user/form<h2>"+
    "<h2>Favorite food search: http://localhost:3000/user/search <h2>" +
    "<h2>Favfood.txt : http://localhost:3000/food/list<h2>" +
    "</html></body></p>");
});

//Use the public folder
app.use(express.static('public'));

//Start server
app.listen(port, () => {
    console.log("server started on port: " + port);
});