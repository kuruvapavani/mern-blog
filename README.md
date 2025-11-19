
# 📝 MERN Blog

**MERN Blog** is a modern blog platform where users can create, edit, and manage blog posts. Users can upload images directly to Cloudinary, manage their profile, and explore posts by different authors and categories.

## 🌐 Live Demo

Check out the deployed version here: [MERN Blog Live Site](https://blog-eta-peach-46.vercel.app/)


## 🚀 Features

- 🔐 **User Authentication**
  - Register and login securely
  - Update username, email, and password
  - JWT-based authentication

- 📝 **Blog Management**
  - Create, edit, and delete blog posts
  - Upload images directly to Cloudinary without storing on the server
  - Preview descriptions automatically generated

- 🌐 **Explore Posts**
  - View posts by category or author
  - Sort posts by latest

- 🖼️ **Image Storage**
  - All post thumbnails and user avatars stored in **Cloudinary**
  - Old images automatically deleted when updated


## 🧑‍💻 Tech Stack

- **Frontend**: React.js, Bootstrap, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT
- **Image Storage**: Cloudinary

## 📦 Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/kuruvapavani/mern-blog.git


2. **Backend Setup**

   ```bash
   cd backend
   npm install
   npm run dev
   ```

3. **Frontend Setup**

   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Environment Variables**

   Create a `.env` file in the `backend` directory with your configuration:

   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

## 📷 Image Uploads

* Users can upload avatars and post thumbnails directly to **Cloudinary**
* Old images are automatically deleted when replaced
* Maximum avatar size: 1MB


## 📫 Contact

For questions or suggestions, feel free to reach out at **[pavanikuruva2109@gmail.com](mailto:pavanikuruva2109@gmail.com)**.

---

> Made with ❤️ by Pavani Kuruva


