const express = require("express");
const router = express.Router();
const faqController = require("../controllers/faqController");

router.post("/", faqController.createFAQ); // Create FAQ
router.get("/", faqController.getFAQs); // Get FAQs (Supports ?lang=en/hi/bn)
router.put("/:id", faqController.updateFAQ); // Update FAQ
router.delete("/:id", faqController.deleteFAQ); // Delete FAQ

module.exports = router;
