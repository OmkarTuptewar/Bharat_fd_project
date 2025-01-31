const FAQ = require("./models/FAQ");

async function setupAdmin() {
  const { default: AdminJS } = await import("adminjs");
  const { buildRouter } = await import("@adminjs/express");
  const AdminJSMongoose = await import("@adminjs/mongoose");

  const { Database, Resource } = AdminJSMongoose; // Manually extract Database & Resource

  AdminJS.registerAdapter({ Database, Resource });

  const admin = new AdminJS({
    resources: [
      {
        resource: FAQ,
        options: {
          properties: {
            question: { type: "string", isTitle: true },
            answer: { type: "richtext" }, // WYSIWYG Editor
            translations: { type: "object", isVisible: false }, // Hide translations
          },
        },
      },
    ],
    rootPath: "/admin",
  });

  const adminRouter = buildRouter(admin);

  return { admin, adminRouter };
}

module.exports = setupAdmin;
