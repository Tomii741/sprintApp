import "dotenv/config";
import mongodb from "mongodb";
const MongoClient = mongodb.MongoClient;

export const home = (req, res) => {
    res.render("index")
}