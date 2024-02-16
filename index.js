const express = require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/userRouters");
const { noteRouter } = require("./routes/noteRouters");
const cors = require("cors");
const { UserModule } = require("./model/userModel");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
app.use("/notes", noteRouter);

app.get("/", async (req, res) => {
  const user = await UserModule.find();
  res.send(user);
});

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected o the mongodb");
    console.log(`server is running at ${process.env.port}`);
  } catch (error) {
    console.log("Error in connecting to the database ", error);
  }
});
