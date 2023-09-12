const express = require("express");
const router = express.Router();
const knex = require("knex");
const config = require("../knexfile")[process.env.NODE_ENV || "development"];
const db = knex(config);

router.get("/:userId/items", async (req, res) => {
  try {
    const items = await db("items")
      .where({ userId: req.params.userId })
      .select();
    items.forEach((item) => {
      if (item.description.length > 100) {
        item.description = item.description.substring(0, 100) + "...";
      }
    });
    res.json(items);
  } catch (err) {
    console.error("Error fetching user-specific items:", err.message);
    res.status(400).json("Error fetching user-specific items.");
  }
});

router.post("/:userId/add", async (req, res) => {
  const { itemName, description, quantity } = req.body;
  const userId = req.params.userId;

  try {
    const newItem = await db("items")
      .insert({
        itemName,
        description,
        quantity,
        userId, 
      })
      .returning("*");

    res.json(newItem[0]);
  } catch (err) {
    console.error("Error adding item:", err.message);
    res.status(400).json("Error adding item.");
  }
});

module.exports = router;
