const express = require("express");
const router = express.Router();
const knex = require("knex");
const config = require("../knexfile")[process.env.NODE_ENV || "development"];
const db = knex(config);

router.post("/", async (req, res) => {
  const { userId, itemName, description, quantity } = req.body;
  try {
    const newItem = await db("items")
      .insert({
        userId,
        itemName,
        description,
        quantity,
      })
      .returning("*");
    res.json(newItem[0]);
  } catch (err) {
    console.error("Error adding item:", err.message);
    res.status(400).json("Error adding item.");
  }
});

router.get("/all", async (req, res) => {
  try {
    const items = await db("items").select();
    items.forEach((item) => {
      if (item.description.length > 100) {
        item.description = item.description.substring(0, 100) + "...";
      }
    });
    res.json(items);
  } catch (err) {
    console.error("Error fetching all items:", err.message);
    res.status(400).json("Error fetching all items.");
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const items = await db("items")
      .where({ userId: req.params.userId })
      .select();
    res.json(items);
  } catch (err) {
    console.error("Error fetching items:", err.message);
    res.status(400).json("Error fetching items.");
  }
});

router.patch("/:itemId", async (req, res) => {
  try {
    const updatedItem = await db("items")
      .where({ id: req.params.itemId })
      .update(req.body)
      .returning("*");
    if (updatedItem.length) {
      res.json(updatedItem[0]);
    } else {
      res.status(404).json("Item not found");
    }
  } catch (err) {
    console.error("Error updating item:", err.message);
    res.status(400).json("Error updating item.");
  }
});

router.delete("/:itemId", async (req, res) => {
  try {
    await db("items").where({ id: req.params.itemId }).del();
    res.json({ success: true });
  } catch (err) {
    console.error("Error deleting item:", err.message);
    res.status(400).json("Error deleting item.");
  }
});

module.exports = router;
