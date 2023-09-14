/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("items").del();
  await knex("items").insert([
    {
      userId: 1,
      itemName: "Laptop",
      description: "Macbook Pro 16-inch with M1 chip, 32GB RAM, 1TB SSD",
      quantity: 1,
    },
    {
      userId: 2,
      itemName: "Phone",
      description: "iPhone 13 Pro Max with 256GB storage, Graphite color",
      quantity: 1,
    },
    {
      userId: 1,
      itemName: "Headphones",
      description:
        "Sony WH-1000XM4 Wireless Noise-Canceling Over-Ear Headphones",
      quantity: 2,
    },
    {
      userId: 2,
      itemName: "Camera",
      description: "Canon EOS R6 Full-Frame Mirrorless Camera with 4K Video",
      quantity: 1,
    },
    {
      userId: 1,
      itemName: "Smartwatch",
      description:
        "Apple Watch Series 7, 45mm, GPS + Cellular, Midnight Aluminum Case",
      quantity: 1,
    },
    {
      userId: 2,
      itemName: "Tablet",
      description:
        "Samsung Galaxy Tab S7+ with 12.4-inch display, 128GB storage, Mystic Black",
      quantity: 1,
    },
  ]);
};
