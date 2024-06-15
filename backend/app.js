require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connect.js");
const userRoutes = require("./routes/user.routes.js");
const app = express();

app.use(cors());

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// Mount the userRoutes on the "/api/users" path
app.use("/api/users", userRoutes);

// Connect to the MongoDB database and start the server
connectDB()
  .then(() => {
    // Start the server on the specified port
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    // If there is an error connecting to the database, log the error and exit the process
    console.log("MONGODB connection FAILED ", error);
    process.exit(1);
  });
