const ShoppingCart = require('../src/pageObjects/cart');
const { getProductPrice } = require('../src/api/priceApi');


describe('ShoppingCart', () => { 
  let cart;

  beforeEach(() => {
    cart = new ShoppingCart();
  });

  it('Add products to the cart', async () => { // test add cart feature
    await cart.addProduct('cornflakes', 2); // add 2 cornflakes to cart
    await cart.addProduct('weetabix', 1); // Add 1 weetabix to cart

    const state = cart.getCartState(); // get cart value
    expect(state.items.length).toBe(2);
    expect(state.subTotal).toBe(17.27);
    expect(state.tax).toBe(2.16);
    expect(state.total).toBe(19.43);
  });

  it('Should apply discounts correctly', async () => { // test discounts feature
    await cart.addProduct('cornflakes', 2); // add 2 cornflakes to cart
    await cart.addProduct('weetabix', 1); // Add 1 weetabix to cart

    cart.applyDiscount(10); // Apply 10% discount

    const state = cart.getCartState(); // get cart value
    expect(state.discount).toBe(10);
    expect(state.subTotal).toBe(17.27);
    expect(state.discountAmount).toBe(1.73);
    expect(state.subtotalAfterDiscount).toBe(15.54);
    expect(state.tax).toBe(1.94);
    expect(state.total).toBe(17.48);
  })

  // Negative cases

  it('should throw an error for invalid quantity', async () => { // Neative case to test for invalid product quantity
    await expect(cart.addProduct('cornflakes', 0)).rejects.toThrow('Quantity must be greater than 0.');
  });

  it('should throw an error for invalid discount', () => { // Neative case to test for invalid discount percentage
      expect(() => cart.applyDiscount(110)).toThrow('Discount percentage must be between 0 and 100.');
  });

 })