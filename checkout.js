document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cartItems');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        renderCartItems(cart);
    }

    document.getElementById('checkoutBtn').addEventListener('click', () => {
        alert('Proceeding to payment');
        // Implement payment handling here
    });

    document.getElementById('clearCartBtn').addEventListener('click', () => {
        clearCart();
    });

    // Function to render cart items
    function renderCartItems(cart) {
        let totalPrice = 0;
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">Price: $${item.price.toFixed(2)}</p>
                    <div class="form-group">
                        <label for="quantity${item.id}">Quantity</label>
                        <input type="number" id="quantity${item.id}" class="form-control quantity-input" value="${item.quantity}" min="1">
                    </div>
                </div>
            </div>
        `).join('');

        // Update total price
        totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
        document.getElementById('totalPrice').textContent = totalPrice.toFixed(2);

        // Add event listeners for quantity inputs
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const productId = parseInt(e.target.id.replace('quantity', ''), 10);
                const newQuantity = parseInt(e.target.value, 10);
                updateCartQuantity(productId, newQuantity);
            });
        });
    }

    // Function to update cart quantity and recalculate total price
    function updateCartQuantity(productId, quantity) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const product = cart.find(item => item.id === productId);
        if (product) {
            if (quantity <= 0) {
                // Remove item if quantity is zero or less
                cart = cart.filter(item => item.id !== productId);
            } else {
                product.quantity = quantity;
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCartItems(cart);
        }
    }

    // Function to update cart display
    function updateCartDisplay() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        renderCartItems(cart);
    }

    // Function to clear the cart
    function clearCart() {
        localStorage.removeItem('cart');
        updateCartDisplay();
        alert('Cart has been cleared');
    }
});
