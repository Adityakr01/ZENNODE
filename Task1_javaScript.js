// Product catalogue
const catalogue = [
  { name: "Product A", price: 20 },
  { name: "Product B", price: 40 },
  { name: "Product C", price: 50 }
];

// Discount rules
const discountRules = {
  flat_10_discount: { threshold: 200, discount: 10 },
  bulk_5_discount: { threshold: 10, discount: 5 },
  bulk_10_discount: { threshold: 20, discount: 10 },
  tiered_50_discount: { threshold: 30, discount: 50 }
};

// Fees
const giftWrapFee = 1;
const shippingFeePerPackage = 5;
const unitsPerPackage = 10;

// Function to calculate the total amount for a product
function ProductTotal(quantity, price) {
  return quantity * price;
}

// Function to calculate the discount amount based on the discount rule
function DiscountAmount(quantity, price, rule) {
  const { threshold, discount } = discountRules[rule];
  let discountAmount = 0;

  if (rule === "bulk_5_discount" && quantity > threshold) {
    discountAmount = (quantity * price * discount) / 100;
  } else if (rule === "tiered_50_discount" && quantity > threshold) {
    const discountedQuantity = quantity - threshold;
    discountAmount = (discountedQuantity * price * discount) / 100;
  } else if (rule === "bulk_10_discount" && quantity > threshold) {
    discountAmount = (quantity * price * discount) / 100;
  } else if (rule === "flat_10_discount" && price * quantity > threshold) {
    discountAmount = discount;
  }

  return discountAmount;
}

// Function to calculate the shipping fee
function ShippingFee(quantity) {
  const packages = Math.ceil(quantity / unitsPerPackage);
  return packages * shippingFeePerPackage;
}

// Function to calculate the total cost
function TotalCost(products) {
  let subtotal = 0;
  let discountName = "";
  let discountAmount = 0;
  let shippingFee = 0;

  for (const product of products) {
    const { name, quantity, giftWrap } = product;
    const { price } = catalogue.find((item) => item.name === name);

    const productTotal = ProductTotal(quantity, price);
    subtotal += productTotal;

    if (!discountName) {
      for (const rule in discountRules) {
        const ruleDiscountAmount = DiscountAmount(
          quantity,
          price,
          rule
        );
        if (ruleDiscountAmount > discountAmount) {
          discountName = rule;
          discountAmount = ruleDiscountAmount;
        }
      }
    }

    if (giftWrap) {
      subtotal += quantity * giftWrapFee;
    }

    shippingFee += ShippingFee(quantity);

    console.log(`Product: ${name}`);
    console.log(`Quantity: ${quantity}`);
    console.log(`Total: $${productTotal}`);
    console.log("------------------------");
  }

  console.log(`Subtotal: $${subtotal}`);
  console.log(`Discount: ${discountName} - $${discountAmount}`);
  console.log(`Shipping Fee: $${shippingFee}`);
  console.log("------------------------");
  console.log(`Total: $${subtotal - discountAmount + shippingFee}`);
}

// Example usage
const products = [
  { name: "Product A", quantity: 5, giftWrap: true },
  { name: "Product B", quantity: 15, giftWrap: false },
  { name: "Product C", quantity: 10, giftWrap: true }
];

TotalCost(products);
