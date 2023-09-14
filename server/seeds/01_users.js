const bcrypt = require("bcrypt");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();

  const johnPassword = await bcrypt.hash("12345", 10);
  const janePassword = await bcrypt.hash("4321", 10);
  const alicePassword = await bcrypt.hash("alice123", 10);
  const bobPassword = await bcrypt.hash("bob123", 10);
  const charliePassword = await bcrypt.hash("charlie123", 10);

  await knex("users").insert([
    {
      firstName: "John",
      lastName: "Doe",
      userName: "john.doe",
      password: johnPassword,
    },
    {
      firstName: "Jane",
      lastName: "Doe",
      userName: "jane.doe",
      password: janePassword,
    },
    {
      firstName: "Alice",
      lastName: "Smith",
      userName: "alice.smith",
      password: alicePassword,
    },
    {
      firstName: "Bob",
      lastName: "Johnson",
      userName: "bob.johnson",
      password: bobPassword,
    },
    {
      firstName: "Charlie",
      lastName: "Brown",
      userName: "charlie.brown",
      password: charliePassword,
    },
  ]);
};
