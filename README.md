# Shopping Cart Application

A simple shopping cart application built with **Node.js** and **JavaScript**. It integrates with a Price API to fetch product prices dynamically and supports adding products, applying discounts, and calculating total price.

---

## Features

- Add products dynamically by name and quantity.
- Fetch product prices from the Price API.
- Apply percentage-based discounts.
- Save and load cart state to/from a JSON file.
- Calculate subtotal, tax, and total payable.

---

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/shopping-cart-app.git
   cd shopping-cart-app
2. Install dependencies:
   ```bash
   npm install
4. Start the Price API server:
   ```bash
   npm run serve-products

## Usage

1. Run the application:
   ```bash
   node src/index.js
2. Example output:
   ```bash
   Cart State: {
      items: [
         { name: 'cornflakes', quantity: 2, price: 2.52 },
         { name: 'weetabix', quantity: 1, price: 9.98 }
     ],
     subtotal: 15.02,
     discount: 10,
     discountAmount: 1.5,
     subtotalAfterDiscount: 13.52,
     tax: 1.69,
     total: 15.21
   }`
   
## Testing

Run unit tests with:
   ```bash
   npx jest
```

## Assumptions

* The Price API is running at `http://localhost:3001`.
* Totals are rounded to 2 decimal places.
* Cart state is saved to `cart.json`.
