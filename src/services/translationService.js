const translate = require('@vitalets/google-translate-api');

exports.generateTranslations = async (question, answer) => {
  try {
    // Languages you want to translate to
    const languages = ["en", "hi", "bn"];
    const translations = {};

    // Loop through each language and translate the question and answer
    for (const lang of languages) {
      if (lang === "en") {
        translations[lang] = { question, answer }; // Keep English as original
      } else {
        const translatedQ = await translate(question, { to: lang });
        const translatedA = await translate(answer, { to: lang });

        translations[lang] = {
          question: translatedQ.text,
          answer: translatedA.text,
        };
      }
    }

    return translations;
  } catch (error) {
    console.error("Translation Error:", error);
    return { en: { question, answer } }; // Fallback to English if error occurs
  }
};
