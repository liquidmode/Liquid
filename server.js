const express = require('express');
const app = express();
const port = 3000;

// Simulated product data
const products = [
    { id: 1, name: 'Product 1', price: 10.99, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Product 2', price: 20.99, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Product 3', price: 30.99, image: 'https://via.placeholder.com/150' }
];

// Serve static files from 'public' directory
app.use(express.static('public'));

// API endpoint to get products
app.get('/api/products', (req, res) => {
    res.json(products);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
