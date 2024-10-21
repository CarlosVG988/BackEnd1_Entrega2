const socket = io();

// Elementos del DOM
const productContainer = document.getElementById("productContainer");
const addProductForm = document.getElementById("addProductForm");
const deleteProductForm = document.getElementById("deleteProductForm");

// Función para renderizar productos en el HTML
const renderProducts = (products) => {
    productContainer.innerHTML = ""; // Limpiar el contenedor antes de renderizar

    products.forEach(product => {
        const productCard = `
            <div>
                <h3>${product.title}</h3>
                <p>${product.description}</p>
                <p>Precio: ${product.price}</p>
                <p>Categoría: ${product.category}</p>
            </div>
            <hr>
        `;
        productContainer.innerHTML += productCard;
    });
};

// Escuchar cuando se envíen los productos desde el servidor
socket.on("productList", (products) => {
    renderProducts(products);
});

// Agregar nuevo producto
addProductForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newProduct = {
        title: e.target.title.value,
        description: e.target.description.value,
        price: e.target.price.value,
        category: e.target.category.value
    };
    socket.emit("newProduct", newProduct);
    e.target.reset();
});

// Eliminar producto por nombre
deleteProductForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const productName = e.target.deleteName.value;
    socket.emit("deleteProduct", productName);
    e.target.reset();
});
