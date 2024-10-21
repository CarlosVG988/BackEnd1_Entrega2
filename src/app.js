import express from "express";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import viewsRouter from "./views/views.router.js";
import { Server } from "socket.io";
import fs from "fs/promises";

const app = express();

// Configuración de Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));

app.use("/", viewsRouter);

const httpServer = app.listen(8080, () => console.log("Escuchando puerto 8080"));
const io = new Server(httpServer); // Socket server

// Funciones para manejar productos
const getProducts = async () => {
    try {
        const data = await fs.readFile(__dirname + "/data/productos.json");
        return JSON.parse(data);
    } catch (error) {
        console.log("Error al leer los productos");
        return [];
    }
};

const saveProducts = async (products) => {
    try {
        await fs.writeFile(__dirname + "/data/productos.json", JSON.stringify(products, null, 2));
    } catch (error) {
        console.log("Error al guardar los productos");
    }
};

io.on("connection", async (socket) => {
    console.log("Nuevo cliente conectado");

    let products = await getProducts();
    socket.emit("productList", products);

    // Recibir nuevo producto y guardar
    socket.on("newProduct", async (product) => {
        products.push(product);
        await saveProducts(products);
        io.emit("productList", products);
    });

    // Eliminar producto por nombre
    socket.on("deleteProduct", async (name) => {
        products = products.filter(product => product.title !== name);
        await saveProducts(products);
        io.emit("productList", products);
    });
});
