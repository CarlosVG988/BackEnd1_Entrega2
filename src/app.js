import express from "express";
import __dirname from "./utils.js"
import handlebars from "express-handlebars";
import viewsRouter from "./views/views.router.js";
import { Server } from "socket.io"

const app = express();

//Preparar la configuracion del servidor para recibir JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));



app.use("/", viewsRouter)





const httpServer = app.listen(8080, () => console.log("Escuchando puerto 8080"));
const io = new Server(httpServer); //servidor socketServer


let messages = [];
io.on("connection", socket => {
    console.log("Nuevo cliente conectado")


    socket.on("message", data => {
        messages.push(data)
        io.emit("messageLogs", messages)
    })
})