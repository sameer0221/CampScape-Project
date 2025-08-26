# CampScape-Project

A full-stack web application that allows users to discover, create, edit, delete, and review campgrounds—perfect for camping enthusiasts or developers looking to learn authentication, CRUD operations, and rich data handling.

---

##  Live Demo

*(https://campscape-project.onrender.com/)*

##  Project Overview

CampScape-Project is organized into:

### Backend (Server & API)
- Built with **Node.js** and **Express.js** for handling routing, authentication, and data management.
- Implements **user authentication** (register/login), **authorization**, and secure access to CRUD operations.
- Supports **campground management**: creation, editing, deletion.
- Includes a **dynamic review system**—users can leave and remove reviews for campgrounds.
- Handles **file/image uploads** (e.g., campground photos), possibly using services like Cloudinary (if configured).
- Equipped with **middleware** for authentication, error handling, input validation, and security.

### Frontend (UI / Templating)
- Developed using **EJS** (Embedded JavaScript), enabling dynamic content rendering.
- Styled with **CSS**, potentially including frameworks like **Bootstrap** (if applicable).
- Maintains a clear layout for campsite listings, detail views, forms, and review interfaces.

##  Technologies Used

- **Runtime & Server**: Node.js, Express.js  
- **Templating**: EJS  
- **Database & ODM**: MongoDB with Mongoose  
- **Authentication**: (e.g. Passport.js or sessions)  
- **File Uploads**: Cloudinary or local storage (if configured)  
- **Validation & Flash Messages**: Joi, connect-flash (if present)  
- **Styling**: CSS, with optional Bootstrap inclusion

---

##  Installation & Setup

```bash
# 1. Clone the repo
git clone https://github.com/sameer0221/CampScape-Project.git
cd CampScape-Project

# 2. Install dependencies
npm install

# 3. Set up environment variables (create a .env file)
# Example .env:
# DB_URL=your_mongodb_connection_string
# CLOUDINARY_CLOUD_NAME=…
# CLOUDINARY_KEY=…
# CLOUDINARY_SECRET=…
# [Add any additional keys like API or session secrets]

# 4. Start the server
npm start
Usage
Navigate to http://localhost:3000 (or your configured port).

Register or log in to access full features.

Browse existing campgrounds or add your own.

Leave reviews on campgrounds or manage your own entries.

Edit or delete campgrounds and reviews, as permitted.

Features (Planned or Present)
 User authentication (register/login/logout)

 Campground CRUD (create, read, update, delete)

 Review system with dynamic rating functionality

 Secure image uploads for campgrounds

 Input validation and user-friendly flash messages

 Middleware for access control and error handling

 Responsive and clean UI using EJS templates

Contributing
Contributions are always welcome! To contribute:

Fork the repository

Create a branch: git checkout -b feature/YourFeature

Commit your changes: git commit -m "Add: new feature"

Push to branch: git push origin feature/YourFeature

Open a Pull Request explaining the additions or fixes

Contact
Feel free to open issues, leave suggestions, or reach out via GitHub for questions or collaboration!
