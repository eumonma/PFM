const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
//const { result } = require("lodash");

const Blog = require("./models/blog");

// Express app
const app = express();

// Connect a MongoDB
const dbURI = "mongodb://localhost:27017/LOL";
//const dbURI = "mongodb+srv://<usuario>:<password>@servidor_remoto.mongodb.net/";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {
        console.log("Conectado a LOL");
        //listen for request
        app.listen(3000);
    })
    .catch((err) => {
        console.log(err);
    });

// Register view engine. Se indica que vamos a utilizar EJS en nuestras vistas. Por defecto utiliza la carpeta "views"
app.set('view engine', 'ejs')



// Midelware & static files
app.use(express.static("public"));  // public es el directorio donde se guardan los ficheres que pueden ser vistos en los clientes
app.use(morgan("dev"));             // Nos da traza de las peticiones, y nos da algo de protección
/* app.use((req, res, next) => {
    console.log('New request made');
    console.log('host: ', req.hostname);
    console.log('path:', req.path);
    console.log('method: ', req.method);

    next();
});
 */

// Mongoose and Mongo sandbox routes
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: "nuevo blog 2",
        snippet: "Nuevo Snippet",
        body: "cuerpo del blog"
    });

    blog.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
             console.log(err);
        });
});

app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/single-blog', (req, res) => {
    Blog.findById('62b8b9e5e05f6f5d0099c5d5')
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log(err);
    });
});

app.get("/", (req, res) => {
    //res.send('<p>home page</p>');
    //res.sendFile("./views/index.html", { root: __dirname});

    const blogs = [
        {title: "titulo blog 1", snippet: "Asunto del Blog 1"},
        {title: "titulo blog 2", snippet: "Asunto del Blog 2"},
        {title: "titulo blog 3", snippet: "Asunto del Blog 3"}
    ]
    res.render("index", { title : "Titulo de Index", blogs });
});

app.get("/about", (req, res) => {
    //res.send('<p>home page</p>');
    //res.sendFile("./views/about.html", { root: __dirname});
    res.render("about", { title : "Titulo de About" });
});

// Redirect
//app.get("/about-me", (req, res) => {
//    //res.send('<p>home page</p>');
//    res.redirect("/about");
//});

app.get("/blogs/create", (req, res) => {
    res.render("create", { title : "Titulo de Create" });
})

// 404 page. Se ha de poner siempre al final
app.use((req, res) => { 
    //res.sendFile("./views/404.html", { root: __dirname}); 
    //res.status(404).sendFile("./views/404.html", { root: __dirname});
    res.status(404).render("404", { title : "Titulo de 404" });
});
