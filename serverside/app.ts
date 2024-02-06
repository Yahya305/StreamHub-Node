import "reflect-metadata";

import dotenv from "dotenv";
import Middlewares from "./src/middlewares/Middlewares";
import ErrorMiddleware from "./src/middlewares/ErrorMiddleware";
import TestRouter from "./src/routers/TestRouter";

dotenv.config();
const PORT = 8000;

// Middlewares
const app = Middlewares();

// Config

// Routers
app.use("/test/", TestRouter);
app.use("/api/health", (_,res)=>res.status(200).send("Server is Up and Running!"));

// Handle Error After Controller
app.use(ErrorMiddleware);

// Run application
app.listen(PORT, () => {
    console.log("listening to port ", PORT);
});
