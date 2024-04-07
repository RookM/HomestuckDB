const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const { createAllShips } = require("./setup");
const dotenv = require("dotenv").config();
const cors = require("cors");

connectDb();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/characters", require("./routes/characterRoutes"));
app.use("/api/ships", require("./routes/shipRoutes"));
app.use("/api/user", cors(), require("./routes/userRoutes"));
createAllShips();
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
