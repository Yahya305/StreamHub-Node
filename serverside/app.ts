import "reflect-metadata";

import dotenv from "dotenv";
import Middlewares from "./src/middlewares/Middlewares";
import ErrorMiddleware from "./src/middlewares/ErrorMiddleware";
import TestRouter from "./src/routers/TestRouter";
import { createServer } from "http";
import { Server } from "socket.io";
import { readFileSync } from "fs";
import RoomHandler from "./src/utils/EventHandlers/orderHandler";
dotenv.config();
const PORT = 8000;

// Middlewares
const app = Middlewares();

// Config
const httpServer = createServer()

// Routers
app.use("/test/", TestRouter);
app.use("/api/health", (_,res)=>res.status(200).send("Server is Up and Running!"));
const io = new Server(httpServer, { 
    cors:{
        origin:"http://localhost:3000"
    }
 });
io.on("connection", (socket) => {
    new RoomHandler(io,socket)
});

// Handle Error After Controller
app.use(ErrorMiddleware);

// Run application
httpServer.listen(PORT,"localhost",()=>console.log("listening to port",PORT));

// app.listen(PORT, () => {
//     console.log("listening to port ", PORT);
// });
