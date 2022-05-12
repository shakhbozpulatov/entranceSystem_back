const express = require("express");
const entranceRoute = require("./routes/staffs")
const usersRoute = require("./routes/user")
const mongoose = require("mongoose");
const app = express();

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
app.use("/api/entrance", entranceRoute);
app.use("/api/users", usersRoute)

const port = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log(`${port}-portni eshitishni boshladim`);
})