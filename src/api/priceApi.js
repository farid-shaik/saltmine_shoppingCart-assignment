const axios = require('axios');

const BASE_URL = 'http://localhost:3001'; // Api URL

async function getProductPrice(productName) { // function to fetch product price with product name from API.
  try {
    const response = await axios.get(`${BASE_URL}/products/${productName}`);
    if (!response.data || !response.data.price) {
      throw new Error(`Product ${productName} not found or invalid response from Api`);
    }
    return response.data.price;
  } catch (error) {
    throw new Error(`Failed to fetch price for ${productName}: ${error.message}`);
  }
}

module.exports = { getProductPrice };