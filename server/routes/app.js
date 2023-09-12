const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());

const usersRoutes = require("./users");
const itemsRoutes = require("./items");

app.use("/users", usersRoutes);
app.use("/items", itemsRoutes);

app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});
