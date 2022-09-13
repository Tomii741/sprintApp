const express = require("express");
require("dotenv").config();
const path = require("path");
const hbs = require("hbs");
const mysql = require("mysql2");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
hbs.registerPartials(path.join(__dirname, "views/partials"));

app.get("/",(req, res) => {
    res.render("index", {
        title: "Inicio"
    })
    
});


app.get("/creadores", (req, res) => {
    res.render("creadores", {
        title: "Creadores"
    })
})


app.listen(PORT, () => {
    console.log(`Servidor Funcionando en el puerto ${PORT}`);
});