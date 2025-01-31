const request = require("supertest");
const app = require("../src/server"); // Import the Express app
const FAQ = require("../src/models/FAQ");

describe("FAQ API Tests", () => {
  let faqId;

  test("✅ Should create a new FAQ", async () => {
    const response = await request(app).post("/api/faqs").send({
      question: "What is Node.js?",
      answer: "Node.js is a runtime for JavaScript.",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");
    faqId = response.body._id;
  });

  test("✅ Should get all FAQs", async () => {
    const response = await request(app).get("/api/faqs?lang=en");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test("✅ Should update an FAQ", async () => {
    const response = await request(app).put(`/api/faqs/${faqId}`).send({
      question: "Updated Question?",
      answer: "Updated Answer.",
    });

    expect(response.status).toBe(200);
    expect(response.body.question).toBe("Updated Question?");
  });

  test("✅ Should delete an FAQ", async () => {
    const response = await request(app).delete(`/api/faqs/${faqId}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("FAQ deleted successfully");
  });
});
