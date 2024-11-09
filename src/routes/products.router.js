import { Router } from "express";
import Product from "../models/product.js";

const router = Router();

// Endpoint para obtener productos con filtros, paginación y ordenamiento
router.get("/", async (req, res) => {
    try {
        const { limit = 10, page = 1, sort, query } = req.query;
        const filter = query ? { category: query } : {};

        const options = {
            limit: parseInt(limit),
            page: parseInt(page),
            sort: sort ? { price: sort === "asc" ? 1 : -1 } : {}
        };

        const products = await Product.paginate(filter, options);
        res.json({
            status: "success",
            payload: products.docs,
            totalPages: products.totalPages,
            prevPage: products.hasPrevPage ? products.page - 1 : null,
            nextPage: products.hasNextPage ? products.page + 1 : null,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: products.hasPrevPage ? `/api/products?limit=${limit}&page=${products.page - 1}` : null,
            nextLink: products.hasNextPage ? `/api/products?limit=${limit}&page=${products.page + 1}` : null
        });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

export default router;
