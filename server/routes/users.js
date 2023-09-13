const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const knex = require("knex");
const config = require("../knexfile")[process.env.NODE_ENV || "development"];
const db = knex(config);

router.post("/register", async (req, res) => {
  const { firstName, lastName, userName, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await db("users")
      .insert({
        firstName,
        lastName,
        userName,
        password: hashedPassword,
      })
      .returning("*");
    console.log("New user:", newUser); // Add this line
    res.status(200).json(newUser[0]);
  } catch (err) {
    console.error("Error registering user:", err.message);
    res.status(400).json("Error registering user.");
  }
});

router.post("/login", async (req, res) => {
  const { userName, password } = req.body;

  try {
    const user = await db("users").where({ userName }).first();

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({ id: user.id, userName: user.userName });
    } else {
      res.status(401).json("Invalid credentials");
    }
  } catch (err) {
    console.error("Error logging in:", err.message);
    res.status(400).json("Error logging in.");
  }
});

router.get("/users/:userId", async (req, res) => {
  try {
    const user = await db("users").where({ id: req.params.userId }).select();
    if (user.length) {
      res.json(user[0]);
    } else {
      res.status(404).json("User not found");
    }
  } catch (err) {
    console.error("Error fetching user:", err.message);
    res.status(400).json("Error fetching user.");
  }
});

// router.put("/:userId", async (req, res) => {
//   const { firstName, lastName, userName, password } = req.body;
//   try {
//     const updatedUser = await db("users")
//       .where({ id: req.params.userId })
//       .update({
//         firstName,
//         lastName,
//         userName,
//         password,
//       })
//       .returning("*");
//     if (updatedUser.length) {
//       res.json(updatedUser[0]);
//     } else {
//       res.status(404).json("User not found");
//     }
//   } catch (err) {
//     console.error("Error updating user:", err.message);
//     res.status(400).json("Error updating user.");
//   }
// });

router.patch("/users/:userId", async (req, res) => {
  try {
    const updatedUser = await db("users")
      .where({ id: req.params.userId })
      .update(req.body)
      .returning("*");
    if (updatedUser.length) {
      res.json(updatedUser[0]);
    } else {
      res.status(404).json("User not found");
    }
  } catch (err) {
    console.error("Error updating user:", err.message);
    res.status(400).json("Error updating user.");
  }
});

router.delete("/users/:userId", async (req, res) => {
  try {
    const deletedCount = await db("users")
      .where({ id: req.params.userId })
      .del();
    if (deletedCount) {
      res.json({ success: true });
    } else {
      res.status(404).json("User not found");
    }
  } catch (err) {
    console.error("Error deleting user:", err.message);
    res.status(400).json("Error deleting user.");
  }
});

module.exports = router;
