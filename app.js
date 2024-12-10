//
import express from "express";
import cors from "cors";
import routes from "./routes/routes.js";

const app = express();
// CORS setup in Express.js
app.use(cors({
    origin: "http://localhost:3000", // Replace with your frontend"s origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    exposedHeaders: ["Content-Length", "X-Foo", "X-Bar"],
}));

app.options("*", cors());
app.use(express.json());


//known routes
app.use(routes);
//HERE FOR HANDLING UNCAUGHT ROUTES
app.all("*", (req, res) => {
    return res.status(200).json({
        message: `Can"t find ${req.originalUrl} on this server😕, ensure the URL exists and try again.`,
        status: 404
    });
});


export default app;