const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const FAQ = require("./models/FAQ");

dotenv.config();
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up EJS for templating
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Serve static files
app.use(express.static(__dirname + "/public"));

// ✅ Render Admin Panel
app.get("/admin", async (req, res) => {
  const faqs = await FAQ.find();
  res.render("admin", { faqs });
});

// ✅ Handle New FAQ Submission
app.post("/admin/add", async (req, res) => {
  const { question, answer } = req.body;
  await FAQ.create({ question, answer });
  res.redirect("/admin");
});

// ✅ Handle FAQ Deletion
app.post("/admin/delete/:id", async (req, res) => {
  await FAQ.findByIdAndDelete(req.params.id);
  res.redirect("/admin");
});

// ✅ API Endpoint for FAQs
app.use("/api/faqs", require("./routes/faqRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

module.exports = app;
