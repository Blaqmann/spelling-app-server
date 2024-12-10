//
import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });
import mongoose from "mongoose";
import fs from "fs";
import Image from "../../models/imageModel.js";


const databaseURL = process.env.MONGODB_DATABASE_URL;
mongoose.connect(databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Successfully connected to Mongo database!"));


//READ JSON FILE
const images = JSON.parse(
    fs.readFileSync("./image.json", "utf-8")
);

//IMPORT DATA INTO DB
const importData = async () => {
    try {
        await Image.create(images);
        console.log("Data successfully loaded!");
    } catch (err) {
        console.log(err);
    }
    process.exit();
}

//DELETE ALL DATA FROM DB
const deleteData = async () => {
    try {
        await Image.deleteMany();
        console.log("Data successfully deleted!");
    } catch (err) {
        console.log(err);
    }
    process.exit();
}


if (process.argv[2] === "--import") {
    importData();
} else if (process.argv[2] === "--delete") {
    deleteData();
}
