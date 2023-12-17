const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const ProductManager = require('./ProductManager');

const app = express();
const port = 8080;
const productsFilePath = 'products.json';

app.use(bodyParser.json());

const productManager = new ProductManager(productsFilePath);

const initializeProducts = async () => {
  try {
    // Read existing products from the file
    const data = await fs.readFile(productsFilePath, 'utf8');
    const existingProducts = JSON.parse(data);

    // If there are already ten or more products, do nothing
    if (existingProducts.length >= 10) {
      return;
    }

    // Otherwise, add more products to reach ten
    const additionalProducts = Array.from({ length: 10 - existingProducts.length }, (_, index) => ({
      id: existingProducts.length + index + 1,
      title: `Product ${existingProducts.length + index + 1}`,
      description: `Description for Product ${existingProducts.length + index + 1}`,
      price: Math.floor(Math.random() * 100) + 1, // Random price between 1 and 100
      thumbnail: `path/to/image${existingProducts.length + index + 1}.jpg`,
      code: `P00${existingProducts.length + index + 1}`,
      stock: Math.floor(Math.random() * 20) + 1, // Random stock between 1 and 20
    }));

    // Combine existing and additional products
    const allProducts = [...existingProducts, ...additionalProducts];

    // Write the updated products to the file
    await fs.writeFile(productsFilePath, JSON.stringify(allProducts, null, 2), 'utf8');
  } catch (error) {
    console.error('Error reading or writing products file:', error.message);
  }
};

initializeProducts();

// Get all products with optional limit
app.get('/products', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    const products = productManager.getProducts();

    if (!isNaN(limit) && limit > 0) {
      const limitedProducts = products.slice(0, limit);
      res.json({ products: limitedProducts, count: limitedProducts.length });
    } else {
      res.json({ products, count: products.length });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific product by ID
app.get('/products/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const product = await productManager.getProductById(productId);
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// ... (Other routes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

[
    {
      "id": 1,
      "title": "Product 1",
      "description": "Description for Product 1",
      "price": 100,
      "thumbnail": "path/to/image1.jpg",
      "code": "P001",
      "stock": 10
    },
    {
      "id": 2,
      "title": "Product 2",
      "description": "Description for Product 2",
      "price": 120,
      "thumbnail": "path/to/image2.jpg",
      "code": "P002",
      "stock": 15
    },
    {
      "id": 3,
      "title": "Product 3",
      "description": "Description for Product 3",
      "price": 80,
      "thumbnail": "path/to/image3.jpg",
      "code": "P003",
      "stock": 20
    },
    {
      "id": 4,
      "title": "Product 4",
      "description": "Description for Product 4",
      "price": 150,
      "thumbnail": "path/to/image4.jpg",
      "code": "P004",
      "stock": 5
    },
    {
      "id": 5,
      "title": "Product 5",
      "description": "Description for Product 5",
      "price": 90,
      "thumbnail": "path/to/image5.jpg",
      "code": "P005",
      "stock": 12
    },
    {
      "id": 6,
      "title": "Product 6",
      "description": "Description for Product 6",
      "price": 110,
      "thumbnail": "path/to/image6.jpg",
      "code": "P006",
      "stock": 18
    },
    {
      "id": 7,
      "title": "Product 7",
      "description": "Description for Product 7",
      "price": 130,
      "thumbnail": "path/to/image7.jpg",
      "code": "P007",
      "stock": 8
    },
    {
      "id": 8,
      "title": "Product 8",
      "description": "Description for Product 8",
      "price": 100,
      "thumbnail": "path/to/image8.jpg",
      "code": "P008",
      "stock": 25
    },
    {
      "id": 9,
      "title": "Product 9",
      "description": "Description for Product 9",
      "price": 120,
      "thumbnail": "path/to/image9.jpg",
      "code": "P009",
      "stock": 14
    },
    {
      "id": 10,
      "title": "Product 10",
      "description": "Description for Product 10",
      "price": 140,
      "thumbnail": "path/to/image10.jpg",
      "code": "P010",
      "stock": 7
    }
  ]
  