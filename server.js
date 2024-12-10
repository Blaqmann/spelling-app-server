// handling uncaught exceptions (should always be at the top)
process.on("uncaughtException", err => {
    console.log("UNCAUGHT EXCEPTION 💣! Shutting down...");
    console.log("errorName: ", err.name, "errorMessage: ", err.message);
    process.exit(1);
});


import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import app from "./app.js";

const port = 8000 || process.env.PORT;
const databaseURL = process.env.MONGODB_DATABASE_URL;


//use this to deal with some deprecation errors
mongoose.connect(databaseURL).then(() => console.log("Successfully connected to Mongo database!"));




const server = app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

// handling unhandled rejections
process.on("unhandledRejection", err => {
    console.log("UNHANDLED REJECTION 💣! Shutting down...");
    console.log("errorName: ", err.name, "errorMessage: ", err.message);
    server.close(() => {
        process.exit(1)
    });
});