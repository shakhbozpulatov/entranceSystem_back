const express = require("express");
const staffsRoute = require("./routes/staffs")
const usersRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const mongoose = require("mongoose");
const app = express();
const _ = require('dotenv')

if (!process.env.jwtPrivateKey) {
  console.error("Error in env var");
  process.exit(1)
}

mongoose
  .connect("mongodb://localhost/EntranceSystem", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDBga ulanish hosil qilindi...");
  })
  .catch((err) => {
    console.error("MongoDBga ulanish vaqtida xato ro'y berdi...", err);
  });
app.use(express.json());
app.use("/api/entrance", staffsRoute);
app.use("/api/users", usersRoute)
app.use("/api/auth", authRoute)

const port = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log(`${port}-portni eshitishni boshladim`);
})