import "dotenv/config";
import mongodb from "mongodb";
const mongoClient = mongodb.MongoClient;

export const home = (req, res) => {
    res.render("index")
}

export const agregarCreador = (req, res) => {
    
    const{ nombre, estado, foto, descripcion } = req.body;

    mongoClient.connect(process.env.MONGOLOCAL, (error, db) => {
        const database = db.db('stanger');
        if(error) {
            console.log(`No estamos conectados a la DB`);
        }else{

            console.log(`Conexion correcta a la DB`);
            database.collection('personaje').insertOne({nombre, estado, foto, descripcion}, (error, result) => {
                if (error) {
                    throw error;
                }else {
                    res.json(result);
                }
            });
        }
    })
}

/* export const dameCradores = (req, res) => {
    
    MongoClient.connect(process.env.MONGOLOCAL, (error, db) => {
        const database = db.db('stranger');
        if(error){
            console.log(`No estamos conectados a la DB`);
        }else{
            console.log(`Conexion correcta a la DB`);
            database.collection('personajes')
        }
    })
} */