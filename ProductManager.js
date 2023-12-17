// ProductManager.js

const fs = require('fs/promises');

class ProductManager {
  constructor() {
    this.products = [];
    this.loadProductsFromFile(); // Load products from file when the object is created
  }

  static id = 0;

  async addProduct(productData) {
    ProductManager.id++;
    const newProduct = {
      ...productData,
      id: ProductManager.id
    };

    this.products.push(newProduct);
    await this.writeToFile(); // Save products to file after adding a new product

    return newProduct; // Return the newly added product with the assigned id
  }

  async getProducts() {
    return this.products;
  }

  async getProductById(id) {
    const foundProduct = this.products.find((product) => product.id === id);

    if (!foundProduct) {
      throw new Error('Product not found');
    }

    return foundProduct;
  }

  async writeToFile() {
    try {
      await fs.writeFile('products.json', JSON.stringify(this.products, null, 2));
    } catch (error) {
      throw new Error('Error writing to file: ' + error.message);
    }
  }

  async loadProductsFromFile() {
    try {
      const data = await fs.readFile('products.json', 'utf-8');
      this.products = JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.log('File not found. Creating a new one.');
        await this.writeToFile(); // Create a new file if not found
      } else {
        throw new Error('Error reading from file: ' + error.message);
      }
    }
  }
}

module.exports = ProductManager;
