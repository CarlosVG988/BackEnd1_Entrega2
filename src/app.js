import express from "express";
import mongoose from "mongoose"; // Para conectar con MongoDB
import handlebars from "express-handlebars";
import viewsRouter from "./views/views.router.js";
import productsRouter from "./routes/products.router.js"; // Nuevo router de productos
import cartsRouter from "./routes/carts.router.js"; // Nuevo router de carritos
import { Server } from "socket.io";
import __dirname from "./utils.js";

const app = express();

// Configuración de Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));

// Conexión a MongoDB Atlas
mongoose.connect(
    "mongodb+srv://vcarlos988:lb0URK6QPSfeBSqt@cluster0.esfd5.mongodb.net/db?retryWrites=true&w=majority&appName=Cluster0",
    { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log("Conectado a MongoDB Atlas"))
.catch((error) => console.log("Error al conectar a MongoDB:", error));


// Rutas
app.use("/", viewsRouter);
app.use("/api/products", productsRouter); // Endpoints de productos
app.use("/api/carts", cartsRouter); // Endpoints de carritos

const httpServer = app.listen(8080, () => console.log("Escuchando puerto 8080"));
const io = new Server(httpServer);

