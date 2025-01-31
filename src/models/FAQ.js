const mongoose = require("mongoose");

const FAQSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true }, // Rich Text
    translations: {
      en: { question: String, answer: String },
      hi: { question: String, answer: String },
      bn: { question: String, answer: String },
    },
  },
  { timestamps: true }
);

FAQSchema.methods.getTranslatedFAQ = function (lang) {
  return this.translations[lang] || this.translations["en"];
};

const FAQ = mongoose.model("FAQ", FAQSchema);

module.exports = FAQ;
