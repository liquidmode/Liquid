document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/products')
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById('product-list');
            products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('col-md-4');
                productDiv.innerHTML = `
                    <div class="card mb-4">
                        <img src="${product.image}" class="card-img-top" alt="${product.name}">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">$${product.price}</p>
                            <a href="#" class="btn btn-primary">Add to Cart</a>
                        </div>
                    </div>
                `;
                productList.appendChild(productDiv);
            });
        })
        .catch(error => console.error('Error fetching products:', error));
});
document.addEventListener('DOMContentLoaded', () => {
    // Product data
    const products = [
        { id: 1, name: 'Product 1', price: 10.99, image: '3.png', color: '#f8d7da' },
        { id: 2, name: 'Product 2', price: 20.99, image: '4.png', color: '#d4edda' },
        // Add other products here...
    ];

    // Populate products
    const productList = document.getElementById('product-list');
    products.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('col-md-4', 'mb-4', 'fade-in');
        productDiv.style.animationDelay = `${index * 100}ms`;
        productDiv.innerHTML = `
            <div class="card" style="background-color: ${product.color};">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">$${product.price.toFixed(2)}</p>
                    <a href="product.html?id=${product.id}" class="btn btn-primary">View Details</a>
                    <button class="btn btn-secondary mt-2" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                </div>
            </div>
        `;
        productList.appendChild(productDiv);
    });
});

// Function to add a product to the cart
function addToCart(productId) {
    const products = [
        { id: 1, name: 'Product 1', price: 10.99 },
        { id: 2, name: 'Product 2', price: 20.99 },
        // Add other products here...
    ];

    const product = products.find(p => p.id === productId);
    if (!product) {
        alert('Product not found!');
        return;
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to Cart');
}
