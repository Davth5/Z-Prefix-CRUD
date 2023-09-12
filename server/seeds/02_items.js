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
      description: "Macbook Pro",
      quantity: 1,
    },
    {
      userId: 2,
      itemName: "Phone",
      description: "iPhone 12",
      quantity: 1,
    },
  ]);
};
