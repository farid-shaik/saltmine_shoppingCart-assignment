const { getProductPrice } = require('../api/priceApi');
const fs = require('fs');

class ShoppingCart { // Shopping Cart Class 

  items = []; // list of items added in cart
  discount = 0; // discount in percentage

  async addProduct(name, quantity) { // Add product to the cart along with the quantity
    if (quantity <= 0) { // Handle negative quantity
      throw new Error('Quantity must be greater than 0.');
    }
    const price = await getProductPrice(name); // fetch Api to get price of the product
    const existingItem = this.items.find(item => this.items.name === name);

    if (existingItem) { // Add/Increase item to the cart
      existingItem.quantity += quantity
    } else {
      this.items.push({name, quantity, price});
    }
  }

  applyDiscount(discountPercentage) { // set discount variaable if valid
    if (discountPercentage < 0 || discountPercentage > 100) {
        throw new Error('Discount percentage must be between 0 and 100.');
    }
    this.discount = discountPercentage;
  }

  getCartState() { // Calculate the discounts, tax and total price
    const subTotal = parseFloat(this.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2));
    const discountAmount = parseFloat(this.discount ? ((subTotal * this.discount) / 100).toFixed(2) : 0);
    const subtotalAfterDiscount = subTotal - discountAmount;
    const tax = parseFloat((subtotalAfterDiscount * 0.125).toFixed(2));
    const total = parseFloat((subtotalAfterDiscount + tax).toFixed(2));

    return {
      items: this.items,
      subTotal,
      discount: this.discount,
      discountAmount,
      subtotalAfterDiscount,
      tax,
      total
    };
  }

  saveCart() { // save cart to a json file
    fs.writeFileSync('src/cartDetails/cart.json', JSON.stringify(this.items, null, 2));
  }

  loadCart() { // load cart form the cart.json file
    if (fs.existsSync('src/cartDetails/cart.json')) {
        this.items = JSON.parse(fs.readFileSync('src/cartDetails/cart.json', 'utf-8'));
    }
  }
}

module.exports = ShoppingCart;