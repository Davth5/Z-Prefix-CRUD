const express = require("express");
const app = express();
const knex = require("knex"); 

const PORT = process.env.PORT || 8080;

const environment = process.env.NODE_ENV || "development";
const config = require("./knexfile")[environment];
const db = knex(config); 

app.use(express.json());

// Registration
app.post("/register", async (req, res) => {
  const { firstName, lastName, userName, password } = req.body;
  const knex = require("knex")(
    require("./knexfile.js")[process.env.NODE_ENV || "development"]
  );

  try {
    const newUser = await db("users")
      .insert({
        firstName,
        lastName,
        userName,
        password, // consider hashing the password for security
      })
      .returning("*");

    res.json(newUser[0]);
  } catch (err) {
    res.status(400).json("Error registering user.");
  }
});

// Login (just a simple check for now)
app.post("/login", async (req, res) => {
  const { userName, password } = req.body;

  try {
    const user = await db("users")
      .where({
        userName,
        password,
      })
      .select("id", "userName");

    if (user.length) {
      res.json(user[0]);
    } else {
      res.status(401).json("Invalid credentials");
    }
  } catch (err) {
    res.status(400).json("Error logging in.");
  }
});

// Create a new item
app.post("/items", async (req, res) => {
  const { userId, itemName, description, quantity } = req.body;

  try {
    const newItem = await db("items")
      .insert({
        user_id: userId,
        item_name: itemName,
        description,
        quantity,
      })
      .returning("*");

    res.json(newItem[0]);
  } catch (err) {
    res.status(400).json("Error adding item.");
  }
});

// Read all items for a user
app.get("/items/:userId", async (req, res) => {
  try {
    const items = await db("items")
      .where({ user_id: req.params.userId })
      .select();
    res.json(items);
  } catch (err) {
    res.status(400).json("Error fetching items.");
  }
});

// Update an item
app.put("/items/:itemId", async (req, res) => {
  const { itemName, description, quantity } = req.body;

  try {
    const updatedItem = await db("items")
      .where({ id: req.params.itemId })
      .update({
        item_name: itemName,
        description,
        quantity,
      })
      .returning("*");

    res.json(updatedItem[0]);
  } catch (err) {
    res.status(400).json("Error updating item.");
  }
});

// Delete an item
app.delete("/items/:itemId", async (req, res) => {
  try {
    await db("items").where({ id: req.params.itemId }).del();
    res.json({ success: true });
  } catch (err) {
    res.status(400).json("Error deleting item.");
  }
});

app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});
