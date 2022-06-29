const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
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
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));             // Nos da traza de las peticiones, y nos da algo de protección
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
  });


// blog routes
app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
  });


app.get('/blogs', (req, res) => {
Blog.find().sort({ createdAt: -1 })  // Recupera todos, ordenados descendentemente
    .then(result => {
    res.render('index', { blogs: result, title: 'All blogs' });
    })
    .catch(err => {
    console.log(err);
    });
});

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err);
        });
});



app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
      .then(result => {
        res.render('details', { blog: result, title: 'Blog Details' });
      })
      .catch(err => {
        console.log(err);
      });
});

app.delete('/blogs/:id', (req, res) => {
const id = req.params.id;

Blog.findByIdAndDelete(id)
    .then(result => {
    res.json({ redirect: '/blogs' });
    })
    .catch(err => {
    console.log(err);
    });
});


// 404 page. Se ha de poner siempre al final
app.use((req, res) => { 
    res.status(404).render("404", { title : "Titulo de 404" });
});
