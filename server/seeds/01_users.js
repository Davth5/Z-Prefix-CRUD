/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      firstName: "John",
      lastName: "Doe",
      userName: "john.doe",
      password: "12345",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Doe",
      userName: "jane.doe",
      password: "4321",
    },
  ]);
};
