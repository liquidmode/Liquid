document.addEventListener('DOMContentLoaded', () => {
    // Sample product data for demonstration
    const products = [
        { id: 1, name: 'Product 1', price: 10.99, images: ['3.png', '2.png', '1.png'], description: 'This is a detailed description of Product 1.' },
        { id: 2, name: 'Product 2', price: 20.99, images: ['4.png', '5.png', '1.png'], description: 'This is a detailed description of Product 2.' },
        { id: 3, name: 'Product 3', price: 10.99, images: ['1.png', '2.png', '3.png'], description: 'This is a detailed description of Product 3.' },
        { id: 4, name: 'Product 4', price: 10.99, images: ['5.png', '4.png', '3.png'], description: 'This is a detailed description of Product 4.' },
        { id: 5, name: 'Product 5', price: 10.99, images: ['2.png', '1.png', '3.png'], description: 'This is a detailed description of Product 5.' },
        { id: 6, name: 'Product 6', price: 10.99, images: ['3.png', '5.png', '1.png'], description: 'This is a detailed description of Product 6.' },
        { id: 7, name: 'Product 7', price: 10.99, images: ['5.png', '3.png', '1.png'], description: 'This is a detailed description of Product 7.' },
        { id: 8, name: 'Product 8', price: 10.99, images: ['1.png', '2.png', '3.png'], description: 'This is a detailed description of Product 8.' },
        { id: 9, name: 'Product 9', price: 10.99, images: ['3.png', '2.png', '5.png'], description: 'This is a detailed description of Product 9.' },
        { id: 10, name: 'Product 10', price: 10.99, images: ['2.png', '5.png', '3.png'], description: 'This is a detailed description of Product 10.' },

        // Add other products here...
    ];

    // Get the product ID from URL
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id'), 10);

    // Find the product by ID
    const product = products.find(p => p.id === productId);
    if (product) {
        // Set product details on the page
        document.getElementById('productName').textContent = product.name;
        document.getElementById('productPrice').textContent = `$${product.price.toFixed(2)}`;
        document.getElementById('productDescription').textContent = product.description;

        // Setup carousel images
        const carouselInner = document.querySelector('.carousel-inner');
        carouselInner.innerHTML = product.images.map((img, index) => `
            <div class="carousel-item ${index === 0 ? 'active' : ''}">
                <img src="${img}" class="d-block w-100" alt="Product Image ${index + 1}">
            </div>
        `).join('');

        // Add event listeners for buttons
        document.getElementById('addToCartBtn').addEventListener('click', () => {
            addToCart(product);
        });

        document.getElementById('buyNowBtn').addEventListener('click', () => {
            buyNow(product);
        });
    } else {
        alert('Product not found!');
        window.location.href = 'index.html'; // Redirect to home if product not found
    }
});

// Function to add a product to the cart
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to Cart');
}

// Function to handle the "Buy Now" action
function buyNow(product) {
    addToCart(product);
    window.location.href = 'checkout.html'; // Redirect to a checkout page
}