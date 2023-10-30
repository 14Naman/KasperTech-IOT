const express = require("express");
const connectDB = require("./db");
const app = express();
const port = 8000;
const cors = require("cors");
const User= require("./models/UserModel");
// const ComplaintSave = require("./routes/ComplaintSave");
const bodyParser = require("body-parser");

connectDB();
app.use(express.json());


// Enable CORS middleware
// app.use(cors({credentials: true, origin: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const CookieSession= require('cookie-session');
// Enable CORS middleware (optional)

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true"); // Add this lin
  next();
});
app.use("/admin",require("../backend/routes/admin/user"));
app.use("/user",require("../backend/routes/user/room"));
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
