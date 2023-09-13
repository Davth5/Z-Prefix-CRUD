const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

app.use(express.json());

const usersRoutes = require("./users");
const userInventoryRouter = require("./userInventory");
const itemsRoutes = require("./items");

app.use("/", usersRoutes);
app.use("/users/:userId/items", userInventoryRouter);
app.use("/items", itemsRoutes);

app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});
