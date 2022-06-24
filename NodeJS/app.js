const express = require("express");

// Express app
const app = express();

//listen for request
app.listen(3000);

app.get("/", (req, res) => {
    //res.send('<p>home page</p>');
    res.sendFile("./views/index.html", { root: __dirname});
});

app.get("/about", (req, res) => {
    //res.send('<p>home page</p>');
    res.sendFile("./views/about.html", { root: __dirname});
});

// Redirect
app.get("/about-me", (req, res) => {
    //res.send('<p>home page</p>');
    res.redirect("/about");
});

// 404 page. Se ha de poner siempre al final
app.use((req, res) => { 
    res.sendFile("./views/404.html", { root: __dirname}); 
});
