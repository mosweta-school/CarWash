# 🚗 Car Ng'ara Car Wash Management System

A web-based car wash management system designed to streamline booking, staff operations, and payment processing. The system provides role-based access for **users, staff, and administrators**, ensuring efficient workflow from booking to payment.

---

## 📌 Overview

Car Ng'ara is a digital solution that modernizes traditional car wash operations. It allows customers to book services online, staff to manage wash processes, and administrators to oversee the entire system.

The platform simulates a real-world workflow similar to dispatch systems (e.g., Uber-style task assignment), ensuring accountability and efficiency.

---

## 🎯 Features

### 👤 User Features

* Create an account and log in
* Book car wash appointments
* View booking status in real-time:

  * Pending
  * Approved
  * In Progress
  * Completed

---

### 👨‍🔧 Staff Features

* View only relevant bookings (approved & active)
* Start a wash (automatically assigns the staff member)
* Complete only washes assigned to them
* Record payments after completion
* Auto-filled payment form based on service selected
* Search bookings by car plate number

---

### 🛠️ Admin Features

* View all bookings in the system
* Approve or reject booking requests
* Monitor system activity

---

## 🔄 Workflow

1. User creates a booking → **Status: Pending**
2. Admin reviews:

   * Approves → **Status: Approved**
   * Rejects → **Hidden from staff**
3. Staff starts job → **Status: In Progress**

   * Staff is assigned to the job
4. Staff completes job → **Status: Completed**
5. Staff records payment:

   * Payment saved to database
   * Wash marked as **Paid**

---

## 💰 Service Pricing

| Service | Price |
| ------- | ----- |
| Basic   | $10   |
| Premium | $20   |
| Deluxe  | $35   |

---

## 🧠 Key Concepts Implemented

* Role-Based Access Control (RBAC)
* State Management (Booking lifecycle)
* REST API integration using Fetch
* Dynamic DOM manipulation
* Event-driven UI updates
* Data filtering and search functionality

---

## 🏗️ Tech Stack

* **Frontend:** HTML, CSS (Tailwind), JavaScript
* **Backend (Mock API):** JSON Server (`http://localhost:5000`)
* **Storage:** LocalStorage (session handling)

---

## 📂 Project Structure

```
/project-root
│
├── index.html
├── script.js
├── Data/ db.json (JSON Server database)
└── assets/
```

---

## ⚙️ Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/mosweta-school/CarWash.git
   cd project-folder
   ```

2. Install JSON Server:

   ```bash
   npm install -g json-server
   ```

3. Start backend server:

   ```bash
   cd Data
   json-server --watch db.json --port 5000
   ```

4. Open the project:

   * Run `index.html` in your browser by clicking on Go Live if you have live server

---

## 🔐 System Rules & Logic

* Staff cannot see rejected bookings
* Staff can only complete jobs they started
* Booking must be approved before work begins
* Payments are only recorded after completion
* Payment status updates the wash record

---

## 🚀 Future Improvements

* Real-time updates using WebSockets (Socket.io)
* GPS validation for staff location
* Secure authentication (JWT)
* Online payment integration (M-Pesa API)
* Analytics dashboard for admins

---

## 📸 Screenshots 
* Home
<img width="1888" height="1006" alt="image" src="https://github.com/user-attachments/assets/6311cdca-c6d4-4ff4-8650-19a6750698b5" />
* Login
<img width="919" height="511" alt="image" src="https://github.com/user-attachments/assets/96826202-0ed2-431c-8db3-ea419e339190" />

* Staff Dashboard
  <img width="1866" height="863" alt="image" src="https://github.com/user-attachments/assets/409b0661-e62b-44a6-aab4-2bf001d3b0c1" />

* User Dashboard
  <img width="1873" height="994" alt="image" src="https://github.com/user-attachments/assets/e80a3b69-287c-46f7-8574-c675e19c6cbf" />

* Admin Dashboard
  <img width="1884" height="985" alt="image" src="https://github.com/user-attachments/assets/21348d79-eb7b-45a9-9df1-04fe340e9a5e" />



---

## 👨‍💻 Author

**Deogracious Morias**
Student at Moringa school

---

## 📜 License

This project is for demonstration purposes.
