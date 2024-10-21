const socket = io();
const productContainer = document.getElementById("productContainer");
const refreshBtn = document.getElementById("refreshBtn");

// Función para renderizar productos en el HTML
const renderProducts = (products) => {
    productContainer.innerHTML = ""; // Limpiar el contenedor antes de renderizar

    products.forEach(product => {
        const productCard = `
            <div>
                <h3>${product.title}</h3>
                <p>${product.descripcion}</p>
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

// Evento del botón para refrescar la lista de productos
refreshBtn.addEventListener("click", () => {
    socket.emit("refreshProducts");
});
