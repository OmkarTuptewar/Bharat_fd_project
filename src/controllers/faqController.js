const FAQ = require("../models/FAQ");
const redis = require("../config/redis");
const translateService = require("../services/translationService");

// ✅ Create FAQ
exports.createFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ message: "Question and answer are required" });
    }

    // Generate translations using Google Translate API
    const translations = await translateService.generateTranslations(question, answer);

    const faq = await FAQ.create({ question, answer, translations });

    // Cache the newly created FAQ
    await redis.set(`faq:${faq._id}`, JSON.stringify(faq), "EX", 3600);

    res.status(201).json(faq);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Get All FAQs (with ?lang= support)
exports.getFAQs = async (req, res) => {
  try {
    const { lang = "en" } = req.query;

    // Check if FAQs are cached
    const cachedFAQs = await redis.get(`faqs:${lang}`);
    if (cachedFAQs) {
      return res.json(JSON.parse(cachedFAQs));
    }

    const faqs = await FAQ.find();

    // Translate FAQs dynamically
    const translatedFAQs = faqs.map((faq) => ({
      _id: faq._id,
      question: faq.getTranslatedFAQ(lang).question,
      answer: faq.getTranslatedFAQ(lang).answer,
    }));

    // Cache the response
    await redis.set(`faqs:${lang}`, JSON.stringify(translatedFAQs), "EX", 3600);

    res.json(translatedFAQs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Update FAQ
exports.updateFAQ = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer } = req.body;

    const faq = await FAQ.findById(id);
    if (!faq) {
      return res.status(404).json({ message: "FAQ not found" });
    }

    if (question) faq.question = question;
    if (answer) faq.answer = answer;

    // Update translations
    faq.translations = await translateService.generateTranslations(question || faq.question, answer || faq.answer);
    await faq.save();

    // Invalidate cache
    await redis.del(`faq:${id}`);
    await redis.del(`faqs:*`);

    res.json(faq);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Delete FAQ
exports.deleteFAQ = async (req, res) => {
  try {
    const { id } = req.params;
    const faq = await FAQ.findByIdAndDelete(id);

    if (!faq) {
      return res.status(404).json({ message: "FAQ not found" });
    }

    // Invalidate cache
    await redis.del(`faq:${id}`);
    await redis.del(`faqs:*`);

    res.json({ message: "FAQ deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
