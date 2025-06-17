# 🌍 Wanderlust

🔗 **Live Demo**: [https://wanderlust-1fu6.onrender.com](https://wanderlust-1fu6.onrender.com)

Wanderlust is a full-stack web application that allows users to explore, create, and review beautiful campgrounds. Built using **Node.js**, **Express**, **MongoDB**, and **EJS**, it follows the MVC architecture and provides a real-world platform to practice full-stack development skills.

## ✨ Features

- 🏕️ View a list of all campgrounds with image, price, and description  
- ➕ Create, edit, and delete your own campground listings  
- 📝 Add and delete reviews for campgrounds  
- 🔒 Secure user authentication and session handling with Passport.js  
- ☁️ Image uploads via Cloudinary  
- 🗺️ Campground locations displayed using Leaflet.js and OpenStreetMap  
- ✅ Server-side validation and clean error handling  
- 📱 Responsive and clean UI using Bootstrap 5  

## 🧰 Technologies Used

- **Backend:** Node.js, Express.js  
- **Templating Engine:** EJS  
- **Database:** MongoDB (Mongoose)  
- **Authentication:** Passport.js (Local Strategy)  
- **File Upload:** Multer + Cloudinary  
- **Maps:** Leaflet.js + OpenStreetMap  
- **Styling:** Bootstrap 5 + Custom CSS  
- **Flash Messages & Validation:** connect-flash, express-validator  

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/samarthdhoble/wanderlust.git
cd wanderlust
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set up Environment Variables

Create a `.env` file in the root directory and add the following:

```env
DB_URL=your_mongodb_uri
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET=your_cloudinary_secret
SECRET=your_session_secret
```

> Replace the values with your actual credentials from MongoDB Atlas and Cloudinary.

### 4. Run the App

```bash
npm start
```

## 📁 Folder Structure

```
wanderlust/
├── models/           # Mongoose models (User, Campground, Review)
├── public/           # Static assets (CSS, JS, images)
│   ├── css/
│   ├── js/
├── routes/           # Express route files
├── views/            # EJS templates
│   ├── campgrounds/
│   ├── reviews/
│   ├── users/
│   ├── partials/
├── app.js            # Main application file
├── .env              # Environment variables
├── package.json
```

## 👨‍💻 Author

**Samarth Dhoble**

- 🔗 [LinkedIn](https://www.linkedin.com/in/samarthdhoble)  
- 💻 [GitHub](https://github.com/samarthdhoble)  
- 🧠 [LeetCode](https://leetcode.com/samarthdhoble)

## 📄 License

This project is licensed under the [MIT License](LICENSE)

## 🙏 Acknowledgements

- Inspired by **Colt Steele’s Web Developer Bootcamp**  
- Thanks to [Cloudinary](https://cloudinary.com/) for image hosting  
- Thanks to [Leaflet.js](https://leafletjs.com/) and [OpenStreetMap](https://www.openstreetmap.org/) for map integration  
