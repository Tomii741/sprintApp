const express = require("express");
require("dotenv").config();
const path = require("path");
const hbs = require("hbs");
const mysql = require("mysql2");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
hbs.registerPartials(path.join(__dirname, "views/partials"));

// Conexion a la Base de Datos
const conexion = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

conexion.connect((err) => {
    if (err) {
        console.error(`Error en el la conexion: ${err.stack}`);
        return;
    }
    console.log(`Conectado a la base de datos ${process.env.DATABASE}`);
})

app.get("/",(req, res) => {
    res.render("index", {
        title: "Inicio",
        personajes:[
            {numPic: "01", picDesc: "Imagen de Vecna"},
            {numPic: "02", picDesc: "Imagem ilustrativa de los amigos de Eleven"},
            {numPic: "03", picDesc: "Imagen Eleven asustada"}
        ]
    })
    
});

app.post("/", (req, res) => {
    const {txtName, txtEstado, txtCharacter, txtUrl} = req.body;
    console.log(txtName, txtEstado, txtCharacter, txtUrl);
    if(txtName == "" || txtEstado == "" || txtCharacter == "" || txtUrl == "" ) {

        res.render("/", {
            title: "Inicio",
            validacion,
        })
    } else {
        let datos = {
            /*nombre de la columna en la tabla: nombre del id */ 
            personaje_nombre: txtName,
            personaje_estado: txtEstado,
            personaje_url: txtUrl,
            personaje_character: txtCharacter

        };

        let sql = "INSERT INTO personajes SET ?"

        conexion.query(sql, datos, (err, result) => {
            if (err) throw err;
            res.render("postSucces", {
                title: "Inicio"
            })
        })

    }
})


app.get("/creadores", (req, res) => {
    let sql = "SELECT * FROM personajes";

    conexion.query(sql, (err, result) => {
        if(err) throw err;
        res.render("creadores", {
            title: "Creadores",
            results: result
        })
    })
})


app.listen(PORT, () => {
    console.log(`Servidor Funcionando en el puerto ${PORT}`);
});


//crear una ruta para es post del index