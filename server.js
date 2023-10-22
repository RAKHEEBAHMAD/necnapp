const express = require("express");
const mongoose = require("mongoose");
const student = require("./models/student.js");
const app = express();
const PORT = 8002;

// middlewares
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/necnappdb")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.error("Error connecting to MongoDB", err));


// routes
app.get("/", (req, res) => {
  return res.render("firstpage");
});
app.get("/home", (req, res) => {
  return res.send("hello sham");
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
    const newuser = await student.create({
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

app.get('/student-profile',(req,res)=>{
    return res.render('studentprofile');
})

// incharege page
app.get("/incharge-page", (req, res) => {
  res.render("inchargesignup");
});
app.get("/incharge-login", (req, res) => {
  res.render("inchargelogin");
});
app.get("/incharge-profile", (req, res) => {
  res.render("inchargeprofile");
});

app.get("/incharge-profile/createevent", (req, res) => {
  res.render("createevent");
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
    const users = await student.find({});
    res.render("display", { users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Error fetching users");
  }
});

app.listen(PORT, () => {
  console.log(`server listening at port ${PORT}`);
});
