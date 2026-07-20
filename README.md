# 🏠 Property Listing Portal

A full-stack Property Listing Portal built using **Next.js, Express.js, MongoDB, and Node.js**. The application allows users to register, verify their email, list properties, manage their listings, and enables administrators to review and approve property submissions before they become publicly visible.

---

## 🚀 Features

### 👤 Authentication

- User Registration
- Secure Login
- JWT Authentication
- Email Verification
- Forgot Password
- Reset Password

### 🏡 Property Management

- Create Property Listing
- Edit Property
- Delete Property
- Upload Property Images
- Property Gallery
- Property Details Page
- Public Property Listings
- Public Property Detail Page
- Property Enquiry Form

### 👨‍💼 User Dashboard

- Manage Personal Listings
- View Property Status
- Track Approved / Pending / Rejected Listings

### 🛡️ Admin Panel

- Dashboard Statistics
- Manage Users
- View All Properties
- Approve Properties
- Reject Properties with Reason
- Filter Properties by Status
  - Pending
  - Approved
  - Rejected

---

## 🛠️ Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Axios

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Multer
- Cloudinary
- Nodemailer

---

## 📂 Project Structure

```
property-listing-portal
│
├── backend
│   ├── src
│   ├── models
│   ├── controllers
│   ├── routes
│   ├── middleware
│   └── server.js
│
├── frontend
│   ├── app
│   ├── components
│   ├── services
│   ├── hooks
│   └── utils
│
└── README.md
```

---

## ⚙️ Environment Variables

### Backend

Create a `.env` file inside the `backend` folder.

```env
PORT=5000

MONGO_URI=

JWT_SECRET=

CLIENT_URL=http://localhost:3000

EMAIL_USER=

EMAIL_PASS=

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=
```

### Frontend

Create a `.env.local` file inside the `frontend` folder.

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## 💻 Installation

### Clone Repository

```bash
git clone https://github.com/your-username/property-listing-portal.git

cd property-listing-portal
```

---

### Backend

```bash
cd backend

npm install

npm run dev
```

---

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## 📡 API Endpoints

### Authentication

```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/verify-email/:token
POST /api/auth/forgot-password
POST /api/auth/reset-password/:token
```

### Properties

```
GET    /api/property
GET    /api/property/:id
POST   /api/property
PUT    /api/property/:id
DELETE /api/property/:id
```

### Admin

```
GET /api/admin/dashboard
GET /api/admin/users
GET /api/admin/properties
PUT /api/admin/approve/:id
PUT /api/admin/reject/:id
```

### Enquiries

```
POST /api/enquiry
GET  /api/enquiry
```

---

## 🔒 Security

- JWT Authentication
- Password Hashing using bcrypt
- Protected Routes
- Role-based Authorization
- Environment Variables
- Secure File Uploads
- Email Verification

---

## 🚀 Deployment

### Frontend

Vercel

### Backend

Render

### Database

MongoDB Atlas

---

## 📸 Screenshots

Add screenshots of:

- Home Page
- Login
- Register
- User Dashboard
- Property Details
- Admin Dashboard
- Property Approval
- Public Property Listing

---

## 👨‍💻 Author

**Dhruv Tiwari**

- GitHub: https://github.com/dhruvv26
- LinkedIn: https://linkedin.com/in/dhruv-tiwari-97891a280