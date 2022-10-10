import "dotenv/config";
import mongodb from "mongodb";
const MongoClient = mongodb.MongoClient;

export const home = (req, res) => {
    res.render("home", {
        personajes:[
            {numPic: "01", picDesc: "Imagen de Vecna"},
            {numPic: "02", picDesc: "Imagem ilustrativa de los amigos de Eleven"},
            {numPic: "03", picDesc: "Imagen Eleven asustada"}
        ]
    })
}



export const datoGuardado = (req, res) => {
    MongoClient.connect(process.env.MONGOLOCAL, (error,db) =>{
        const database = db.db(process.env.DATABASE)

        if (error) {
            console.log("Error en la conexion");
        } else {
            const { txtName, txtEstado, /*txtUrl ,*/ txtCharacter } = req.body;

            database.collection("userStrangerThings").insertOne({txtName, txtEstado, /*txtUrl ,*/ txtCharacter}, (error, result) => {
                if (error) {
                    console.log("Error en la conexion");
                } else {
                    console.log("Dato Guardado correctamente " + JSON.stringify(req.body));
                    // res.json(result);
                    res.render("postSucces");
                }
            })

        }
    });
}

export const creadores = (req, res) => {
    MongoClient.connect(process.env.MONGOLOCAL, (error,db) =>{
        const database = db.db(process.env.DATABASE)

        if (error) {
            console.log("Error en la conexion");
        } else {
            console.log(`Base de Datos Conectada a ${database}`);   
            database.collection("userStrangerThings").find({}).toArray((error, result) => {
                if (error) {
                    console.log("Error en la conexion");
                } else {
                    // res.json(result);
                    res.render("creadores", {result})
                }
            })

        }
    });
}

export const eliminarUser = (req, res) => {
    MongoClient.connect(process.env.MONGOLOCAL, (error,db) =>{
        const database = db.db(process.env.DATABASE)

        if (error) {
            console.log("Error en la conexion");
        } else {
            const id = req.params.id;
            const ObjectId = mongodb.ObjectId

            database.collection("userStrangerThings").deleteOne({_id: ObjectId(id)}, (error, result) => {
                if (error) {
                    console.log("Error en la conexion");
                } else {
                    console.log("Documento eliminado");
                    res.json(result);
                }
            })

        }
    });
}
// export const datoGuardado = (req, res) => {
//     res.render("postSucces")
// }
