const ShoppingCart = require('./pageObjects/cart');

async function main() {
  const cart = new ShoppingCart();

  try {
    // Add products to cart
    await cart.addProduct('cornflakes', 2);
    await cart.addProduct('weetabix', 1);
    await cart.addProduct('shreddies', 3);

    cart.applyDiscount(10); // apply discount of 10%

    // Get the cart status
    const state = cart.getCartState();
    console.log('Cart State: ', state);

    cart.saveCart(); // save cart into a json file

  } catch (error) {
    console.error('Error:', error.message);
  }
  
}

main();