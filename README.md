# 🛍 Product Inventory Management App

A full-stack **MERN** (MongoDB, Express, React, Node.js) application that allows users to manage a list of products. Users can **add, view, edit, and delete** products with form validations on both the frontend and backend.

---

## 🚀 Live Demo

🔗 Frontend: [https://your-frontend-url.vercel.app](https://your-frontend-url.vercel.app)  
🔗 Backend: [https://your-backend-url.vercel.app](https://your-backend-url.vercel.app)

---

## 📸 Screenshots

(Add screenshots of your product list, add/edit form here.)

---

## 📦 Features

- View all products in a sortable table
- Add new products with validation
- Edit existing product details
- Delete products with confirmation
- Form validation on both frontend and backend
- Auto timestamped creation date

---

## 🛠️ Tech Stack

- **Frontend**: React, Axios, Tailwind CSS, React Router
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Deployment**: Vercel

---

## 🔧 MongoDB Schema

```js
{
  name: { type: String, required: true, minlength: 3 },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true },
  stock: { type: Number, required: true, min: 0 },
  createdAt: { type: Date, default: Date.now }
}
