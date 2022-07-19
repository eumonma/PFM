// para llamar desde el navegador
// http://127.0.0.1:3000/blogs

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const dotenv = require("dotenv");

const blogRoutes = require("./routes/blogRoutes");
const playersRoutes = require("./routes/playersRoutes");

// Express app
const app = express();

dotenv.config({ path: "config.env" });
const PORTNODE = process.env.PORTNODE;

// Connect a MongoDB
const dbURI = "mongodb://localhost:27017/LOL";
//const dbURI = "mongodb+srv://<usuario>:<password>@servidor_remoto.mongodb.net/";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("Conectado a LOL");
    //listen for request
    app.listen(PORTNODE);
  })
  .catch((err) => {
    console.log(err);
  });

// Register view engine. Se indica que vamos a utilizar EJS en nuestras vistas. Por defecto utiliza la carpeta "views"
app.set("view engine", "ejs");

// Midelware & static files
app.use(express.static("public")); // public es el directorio donde se guardan los ficheres que pueden ser vistos en los clientes
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev")); // Nos da traza de las peticiones, y nos da algo de protección
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

//enrutamiento
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//blogs Routes
app.use("/blogs", blogRoutes);

// 404 page. Se ha de poner siempre al final
app.use((req, res) => {
  res.status(404).render("404", { title: "Titulo de 404" });
});
