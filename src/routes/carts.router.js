import { Router } from "express";
import Cart from "../models/cart.js";

const router = Router();

// Eliminar producto del carrito
router.delete("/:cid/products/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    const cart = await Cart.findById(cid);
    cart.products = cart.products.filter(item => item.product.toString() !== pid);
    await cart.save();
    res.send(cart);
});

// Actualizar el carrito con un arreglo de productos
router.put("/:cid", async (req, res) => {
    const { cid } = req.params;
    const { products } = req.body;
    const cart = await Cart.findById(cid);
    cart.products = products;
    await cart.save();
    res.send(cart);
});

// Actualizar la cantidad de un producto en el carrito
router.put("/:cid/products/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const cart = await Cart.findById(cid);
    const product = cart.products.find(item => item.product.toString() === pid);
    product.quantity = quantity;
    await cart.save();
    res.send(cart);
});

// Eliminar todos los productos del carrito
router.delete("/:cid", async (req, res) => {
    const { cid } = req.params;
    const cart = await Cart.findById(cid);
    cart.products = [];
    await cart.save();
    res.send(cart);
});

export default router;
