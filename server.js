const express = require("express");
const mongoose = require("mongoose");
const usermodel = require("./models/user");
const user = require("./models/user");
const app = express();
const PORT = 8002;

// middlewares
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection

mongoose
  .connect("mongodb://127.0.0.1:27017/necnappdb")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.error("Error connecting to MongoDB", err));

// routes

app.get("/", (req, res) => {
  res.render("firstpage");
});
app.get("/home", (req, res) => {
  res.send("hello sham");
});

// student page
app.get("/studentlogin", (req, res) => {
  return res.render("studentlogin");
});
app.get("/student-page", (req, res) => {
  return res.render("studentsignup");
});

app.post("/student-page", async (req, res) => {
  const { username, rollnumber, email, password } = req.body;
  try {
    const newuser = await usermodel.create({
      username,
      rollnumber,
      email,
      password,
    });
    res.send("user created sucessfully");
  } catch (err) {
    console.error("error creating user", err);
  }
});

// incharege page
app.get("/incharge-page", (req, res) => {
  res.render("inchargesignup");
});
app.get("/incharge-login", (req, res) => {
  res.render("inchargelogin");
});

// admin page
app.get("/admin-page", (req, res) => {
  res.render("adminsignup");
});
app.get("/admin-login", (req, res) => {
  res.render("adminlogin");
});

app.get("/display", async (req, res) => {
  try {
    const users = await usermodel.find({});
    res.render("display", { users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Error fetching users");
  }
});

app.listen(PORT, () => {
  console.log(`server listening at port ${PORT}`);
});
