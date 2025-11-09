🏕️ CampScape – Campground Booking Platform

A full-stack web application where users can discover, create, review, and manage campgrounds.
Built with Node.js, Express, MongoDB, and EJS, CampScape demonstrates secure authentication, CRUD operations, image uploads, and clean UI design — a perfect example of a scalable full-stack project.

🚀 Live Demo

🔗 Visit CampScape Live

🧩 Project Overview

CampScape allows authenticated users to:

🌍 Explore campgrounds with images, details, and reviews.

✍️ Create, edit, and delete their own campgrounds.

⭐ Leave reviews and ratings for other campsites.

🖼️ Upload images via Cloudinary integration.

🔐 Register & Login securely using sessions and middleware.

🧱 Validate inputs & handle errors gracefully.

| Layer                      | Technology                                    |
| -------------------------- | --------------------------------------------- |
| **Frontend**               | EJS Templates, HTML5, CSS3, Bootstrap         |
| **Backend**                | Node.js, Express.js                           |
| **Database**               | MongoDB, Mongoose ODM                         |
| **Authentication**         | Passport.js (Local Strategy), express-session |
| **File Uploads**           | Cloudinary + Multer                           |
| **Validation & Utilities** | Joi, connect-flash, method-override           |
| **Deployment**             | Render (Cloud Hosting)                        |

🏗️ Architecture Overview
Browser (EJS Views + CSS)
        │
        ▼
Express.js Server (Routes + Controllers)
        │
        ▼
MongoDB (Campgrounds, Users, Reviews)
        │
        ▼
Cloudinary (Image Storage)

🔄 Flow:

User registers/login → Session created.

Authorized user can create a campground → Image uploaded to Cloudinary, URL stored in MongoDB.

Other users can post reviews, visible on campground detail page.

Middleware ensures ownership before editing/deleting.

Error handling + flash messages guide user actions.

💡 Key Features

✅ User Authentication: Register/Login using Passport.js and session cookies.
✅ Campground CRUD: Create, read, update, delete campgrounds.
✅ Review System: Users can add or remove reviews with rating logic.
✅ Image Uploads: Integrated Cloudinary for secure image hosting.
✅ Authorization Middleware: Only owners can modify or delete their content.
✅ Data Validation: Used Joi for form validation.
✅ Error Handling: Centralized error middleware.
✅ Responsive Design: Clean, mobile-friendly EJS templates.

🧰 Installation & Setup
# 1. Clone the repository
git clone https://github.com/sameer0221/CampScape-Project.git
cd CampScape-Project

# 2. Install dependencies
npm install

# 3. Configure environment variables (.env file)
DB_URL=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_cloud_key
CLOUDINARY_SECRET=your_cloud_secret
SECRET=session_secret_key

# 4. Run the app
npm start

🧪 Usage

Register a new account.

Login to access campground creation features.

Create new campgrounds with title, image, price, and description.

Browse all campgrounds and view details.

Add or remove reviews on other campgrounds.

Edit/Delete only your own campgrounds.

🧠 Challenges & Learnings

Handling user authentication and session security efficiently.

Managing image uploads and deletions using Cloudinary APIs.

Structuring RESTful routes with Express Router.

Ensuring data validation & error handling throughout the workflow.

Designing ownership-based authorization using middleware logic.

🌱 Future Enhancements

🔍 Add search and filter options for campgrounds.

📍 Integrate Google Maps for location visualization.

💬 Add a real-time chat/forum for campers.

📱 Migrate frontend to React or Next.js.

🧾 Add automated test cases (Mocha/Chai).

👨‍💻 Contributing

Contributions are welcome!

Fork this repo

Create a new branch: git checkout -b feature/YourFeature

Commit changes: git commit -m "Add: new feature"

Push branch: git push origin feature/YourFeature

Create a Pull Request

📬 Contact

👤 Sameer Lonare
📧 lonaresameer7@gmail.com

🔗 LinkedIn

💻 GitHub
