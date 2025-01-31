Multilingual FAQ Admin Panel
A simple FAQ management system with an Admin Panel built using Node.js, Express, MongoDB, and EJS. It allows admins to add, delete, and manage FAQs with multilingual support for English, Spanish, and French.

📌 Features
✅ Add & Delete FAQs: Admins can add and remove FAQs easily.
✅ Multilingual Support: View FAQs in English, Spanish, or French.
✅ Dynamic Language Switching: Choose language via a dropdown menu.
✅ Modern UI: Uses a clean card-based design with inline CSS.
✅ Database Integration: FAQs are stored in MongoDB.
✅ Easy Setup & Deployment.

⚡ Installation & Setup
1️⃣ Clone the Repository
sh
Copy
Edit
git clone https://github.com/OmkarTuptewar/Bharat_fd_project.git
cd multilingual-faq
2️⃣ Install Dependencies
sh
Copy
Edit
npm install
3️⃣ Setup Environment Variables
Create a .env file in the root directory and add:

env
Copy
Edit
PORT=5000
MONGO_URI=your-mongodb-connection-string
REDIS_URI=your-redis-connection-string
4️⃣ Start the Application
sh
Copy
Edit
npm start
This will start the server on http://localhost:5000.


![image](https://github.com/user-attachments/assets/c651e8ad-abb5-4580-a692-19a2ec8659a6)

🚀 Running the Application

Open http://localhost:5000/admin in your browser.
Use the "Add New FAQ" form to create FAQs.
View and manage FAQs in English, Spanish, or French.
Click Delete to remove an FAQ.
🔹 API Endpoints
Method	Endpoint	Description
GET	/admin	Render Admin Panel
POST	/admin/add	Add a new FAQ
POST	/admin/delete/:id	Delete an FAQ
📌 Screenshots
Admin Panel



🌟 Future Enhancements
✅ Search functionality
✅ Pagination for large FAQs
✅ User authentication for secure access
