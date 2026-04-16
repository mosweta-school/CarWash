const app = document.getElementById("app");

// Check session on page load
function initApp() {
    const user = JSON.parse(localStorage.getItem("user"));
    const currentPath = window.location.hash.slice(1) || "home";
    
    if (user) {
        updateNavBar(true);
        loadDashboard(user);
    } else {
        updateNavBar(false);
        navigate(currentPath);
    }
}

// Update navbar based on login state
function updateNavBar(isLoggedIn) {
    const navButtons = document.getElementById("nav-buttons");
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (isLoggedIn && user) {
        navButtons.innerHTML = `
            <span class="mr-3 text-gray-600">Welcome, ${user.firstName || user.email}</span>
            <button onclick="logout()" class="text-red-600 hover:bg-red-50 px-3 py-1 rounded">Logout</button>
        `;
    } else {
        navButtons.innerHTML = `
            <button onclick="navigate('login')" class="mr-2 text-blue-600 hover:bg-blue-50 px-3 py-1 rounded">Login</button>
            <button onclick="navigate('signup')" class="text-green-600 hover:bg-green-50 px-3 py-1 rounded">Sign Up</button>
        `;
    }
}

// Navigation function with history
function navigate(page) {
    window.location.hash = page;
    
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (page === "home") renderHome();
    else if (page === "about") renderAbout();
    else if (page === "contact") renderContact();
    else if (page === "login") renderLogin();
    else if (page === "signup") renderSignup();
    else if (user) {
        if (page === "user") renderUserDashboard();
        else if (page === "admin") renderAdminDashboard();
        else if (page === "staff") renderStaffDashboard();
        else loadDashboard(user);
    } else {
        renderHome();
    }
}

// Logout function
function logout() {
    localStorage.removeItem("user");
    updateNavBar(false);
    navigate("home");
    alert("Logged out successfully!");
}

// RENDER FUNCTIONS
function renderHome() {
    app.innerHTML = `
        <div class="max-w-6xl mx-auto">
            <div class="bg-[url('./Assets/car3.jpg')] bg-cover bg-center rounded-lg p-12 text-white mb-8">
                <h1 class="text-5xl font-bold mb-4">Welcome to Car Ng'ara Car Wash and Detailing</h1>
                <p class="text-xl mb-6">Premium Car Wash Management System</p>
                <button onclick="navigate('signup')" class="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100">
                    Get Started
                </button>
            </div>
            <section class="mb-8 text-center">
                <h2 class="text-3xl font-bold mb-4">Why Choose Car Ng'ara?</h2>
            <div class="grid md:grid-cols-3 gap-6">
                <div class="bg-white p-6 rounded-lg shadow">
                
                <i class="fa-solid fa-calendar"></i>
                
                    <h3 class="text-xl font-bold mb-2">Quick Booking</h3>
                    <p>Book your car wash in minutes</p>
                </div>
                <div class="bg-white p-6 rounded-lg shadow">
                <i class="fa-solid fa-line-chart"></i>
                    <h3 class="text-xl font-bold mb-2">Track Progress</h3>
                    <p>Real-time wash status updates</p>
                </div>
                <div class="bg-white p-6 rounded-lg shadow">
                <i class="fa-solid fa-credit-card"></i>
                    <h3 class="text-xl font-bold mb-2">Secure Payments</h3>
                    <p>Multiple payment options available</p>
                </div>
            </div>
            </section>
            <section class="mb-8 text-center">
                <h2 class="text-3xl font-bold mb-4">Our Services</h2>
            <div class="grid md:grid-cols-3 gap-6">
                <div class="bg-white p-6 rounded-lg shadow">
                    <h3 class="text-xl font-bold mb-2">Basic</h3>
                    <p>Book your car wash in minutes</p>
                </div>
                <div class="bg-white p-6 rounded-lg shadow">
                    <h3 class="text-xl font-bold mb-2">Premium</h3>
                    <p>Real-time wash status updates</p>
                </div>
                <div class="bg-white p-6 rounded-lg shadow">
                    <h3 class="text-xl font-bold mb-2">Deluxe</h3>
                    <p>Multiple payment options available</p>
                </div>
            </div>
            </section>
        </div>
    `;
}

function renderAbout() {
    app.innerHTML = `
        <div class="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
            <h1 class="text-3xl font-bold mb-4">About Car Ng'ara</h1>
            <p class="text-gray-700 mb-4">Founded in 2024, Car Ng'ara has been providing top-quality car wash services with modern technology integration.</p>
            <p class="text-gray-700">Our mission is to revolutionize car wash management through digital solutions, making it easier for customers to book services and for businesses to manage operations efficiently.</p>
        </div>
    `;
}

function renderContact() {
    app.innerHTML = `
        <div class="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
            <h1 class="text-3xl font-bold mb-4">Contact Us</h1>
            <div class="space-y-3">
                <p><strong>📍 Location:</strong> Nairobi, Kenya</p>
                <p><strong>📞 Phone:</strong> +254 700 000 000</p>
                <p><strong>✉️ Email:</strong> info@carngara.com</p>
                <p><strong>⏰ Hours:</strong> Mon-Sun: 8:00 AM - 8:00 PM</p>
            </div>
        </div>
    `;
}

function renderSignup() {
    app.innerHTML = `
        <div class="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
            <h2 class="text-2xl font-bold mb-6 text-center">Create Account</h2>
            <form onsubmit="event.preventDefault(); signup();">
                <input id="su_fName" required placeholder="First Name" class="w-full border p-2 rounded mb-3">
                <input id="su_lName" required placeholder="Last Name" class="w-full border p-2 rounded mb-3">
                <input id="su_email" required type="email" placeholder="Email" class="w-full border p-2 rounded mb-3">
                <input id="su_phone" required placeholder="Phone" type="tel" class="w-full border p-2 rounded mb-3">
                <input id="su_pass" required type="password" placeholder="Password" class="w-full border p-2 rounded mb-3">
                <select id="su_role" class="w-full border p-2 rounded mb-4">
                    <option value="user">Regular User</option>
                    <option value="staff">Staff Member</option>
                </select>
                <button type="submit" class="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    Create Account
                </button>
            </form>
        </div>
    `;
}

function renderLogin() {
    app.innerHTML = `
        <div class="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
            <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
            <form onsubmit="event.preventDefault(); login();">
                <input id="li_email" required type="email" placeholder="Email" class="w-full border p-2 rounded mb-3">
                <input id="li_pass" required type="password" placeholder="Password" class="w-full border p-2 rounded mb-4">
                <button type="submit" class="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Login
                </button>
            </form>
        </div>
    `;
}

// USER DASHBOARD
function renderUserDashboard() {
    const user = JSON.parse(localStorage.getItem("user"));
Promise.all([
        fetch(`http://localhost:5000/bookings?userId=${user.id}`).then(res => res.json()),
        fetch(`http://localhost:5000/washes?`).then(res => res.json())
    ])
    .then(([bookings, washes]) => {
    app.innerHTML = `
        <div class="max-w-6xl mx-auto">
            <div class="bg-white p-6 rounded-lg shadow mb-6">
                <h2 class="text-2xl font-bold mb-2">Welcome, ${user.firstName}! 👋</h2>
                <p class="text-gray-600">Manage your car wash appointments</p>
            </div>
            
            <div class="grid md:grid-cols-2 gap-6">
                <!-- Book Appointment -->
                <div class="bg-white p-6 rounded-lg shadow">
                    <h3 class="text-xl font-bold mb-4">Book New Appointment</h3>
                    <form onsubmit="event.preventDefault(); bookAppointment();">
                        <input id="booking_date" type="datetime-local" required class="w-full border p-2 rounded mb-3">
                        <select id="booking_service" required class="w-full border p-2 rounded mb-3">
                            <option value="">Select Service</option>
                            <option value="basic">Basic Wash - $10</option>
                            <option value="premium">Premium Wash - $20</option>
                            <option value="deluxe">Deluxe Wash - $35</option>
                        </select>
                        <input id="booking_car" placeholder="Car Plate Number" required class="w-full border p-2 rounded mb-3">
                        <button type="submit" class="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            Book Appointment
                        </button>
                    </form>
                </div>
                
                <!-- My Bookings -->
                <div class="bg-white p-6 rounded-lg shadow">
                    

                    <h2 class="text-2xl font-bold mb-4">My Bookings</h2>

                    <button onclick="renderUserDashboard()" 
                        class="mb-4 bg-gray-200 px-3 py-1 rounded">
                        Refresh
                    </button>

                    ${bookings.length === 0 
                        ? "<p>No bookings yet</p>" 
                        : bookings.map(b => `
                            <div class="border p-4 mb-3 rounded bg-white shadow">
                                <p><strong>Car:</strong> ${b.car}</p>
                                <p><strong>Service:</strong> ${b.service}</p>
                                <p><strong>Date:</strong> ${new Date(b.date).toLocaleString()}</p>
                                <p><strong>Booking Status:</strong> 
                                    <span class="
                                        px-2 py-1 rounded text-sm
                                        ${b.bookingStatus === "pending" ? "bg-yellow-200 " : ""}
                                        ${b.bookingStatus === "approved" ? "bg-green-200" : ""}
                                        ${b.bookingStatus === "rejected" ? "bg-red-200" : ""}
                                    ">
                                        ${b.bookingStatus}
                                    </span>
                                </p>
                                
                            </div>
                        `).join("")
                    }

                </div>
            `;
        })
        .catch(err => {
            console.error(err);
            alert("Error loading bookings");
        });
    }

// STAFF DASHBOARD
function renderStaffDashboard() {
    const user = JSON.parse(localStorage.getItem("user"));

    Promise.all([
        fetch(`http://localhost:5000/bookings`).then(res => res.json()),
        fetch(`http://localhost:5000/washes`).then(res => res.json()),
        fetch(`http://localhost:5000/payments`).then(res => res.json())
    ])
    .then(([bookings, washes, payments]) => {

        app.innerHTML = `
        <div class="max-w-7xl mx-auto p-4">

            <!-- Header -->
            <div class="bg-white p-6 rounded-xl shadow mb-6">
                <h2 class="text-2xl font-bold">Staff Dashboard 👨‍🔧</h2>
                <p class="text-gray-500">Manage washes, bookings and payments</p>
            </div>

            <!-- Forms -->
            <div class="grid md:grid-cols-2 gap-6">

                <!-- Record Wash -->
                <div class="bg-white p-6 rounded-xl shadow">
                    <h3 class="text-lg font-semibold mb-4">Record Wash</h3>
                    <form onsubmit="event.preventDefault(); recordWash();">
                        <input id="wash_car" placeholder="Car Plate" required
                            class="w-full border border-gray-300 p-2 rounded mb-3 focus:ring-2 focus:ring-green-400">

                        <select id="wash_service" required
                            class="w-full border border-gray-300 p-2 rounded mb-3">
                            <option value="basic">Basic</option>
                            <option value="premium">Premium</option>
                            <option value="deluxe">Deluxe</option>
                        </select>

                        <select id="wash_status" required
                            class="w-full border border-gray-300 p-2 rounded mb-3">
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>

                        <button class="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded">
                            Save Wash
                        </button>
                    </form>
                </div>

                <!-- Record Payment -->
                <div class="bg-white p-6 rounded-xl shadow">
                    <h3 class="text-lg font-semibold mb-4">Record Payment</h3>
                    <form onsubmit="event.preventDefault(); recordPayment();">
                        <input id="payment_car" placeholder="Car Plate" required
                            class="w-full border border-gray-300 p-2 rounded mb-3">

                        <select id="payment_method" required
                            class="w-full border border-gray-300 p-2 rounded mb-3">
                            <option value="cash">Cash</option>
                            <option value="mpesa">M-Pesa</option>
                            <option value="card">Card</option>
                        </select>

                        <input id="payment_ref" type="text" placeholder="Payment reference number"
                            class="w-full border border-gray-300 p-2 rounded mb-3">

                        <input id="payment_amount" type="number" placeholder="Amount" required
                            class="w-full border border-gray-300 p-2 rounded mb-3">

                        <button class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded">
                            Save Payment
                        </button>
                    </form>
                </div>
            </div>

            <!-- Bookings -->
<div class="bg-white p-6 rounded-xl shadow mt-6">
    <h3 class="text-lg font-semibold mb-4">Manage Bookings</h3>

    <div class="overflow-x-auto">
        <table class="min-w-full border border-gray-200">

            <!-- HEADER -->
            <thead class="bg-gray-100 text-gray-700 text-sm">
                <tr>
                    <th class="p-3 text-left">Car</th>
                    <th class="p-3 text-left">Service</th>
                    <th class="p-3 text-left">Date</th>
                    <th class="p-3 text-left">Status</th>
                    <th class="p-3 text-left">Actions</th>
                </tr>
            </thead>

            <!-- BODY -->
            <tbody>
                ${bookings.slice(-5).reverse().map(booking => `
                    <tr class="border-t hover:bg-gray-50">
                        <td class="p-3 font-medium">${booking.car}</td>
                        <td class="p-3 capitalize">${booking.service}</td>
                        <td class="p-3 text-sm text-gray-500">
                            ${new Date(booking.date).toLocaleString()}
                        </td>

                        <td class="p-3">
                            <span class="
                                px-2 py-1 rounded text-xs font-semibold
                                ${booking.bookingStatus === 'pending' ? 'bg-yellow-100 text-yellow-700' : ''}
                                ${booking.bookingStatus === 'approved' ? 'bg-blue-100 text-blue-700' : ''}
                                ${booking.bookingStatus === 'rejected' ? 'bg-red-100 text-red-700' : ''}
                                ${booking.bookingStatus === 'in-progress' ? 'bg-orange-100 text-orange-700' : ''}
                                ${booking.bookingStatus === 'completed' ? 'bg-green-100 text-green-700' : ''}
                            ">
                                ${booking.bookingStatus}
                            </span>
                        </td>

                         <td class="p-3 space-x-2">
                                            ${booking.bookingStatus === 'approved' ? `
                                                <button class="start-btn bg-yellow-400 text-white px-3 py-1 rounded text-xs hover:bg-yellow-500"
                                                        data-id="${booking.id}">
                                                    Start
                                                </button>
                                            ` : ''}

                                            ${booking.bookingStatus === 'in-progress' ? `
                                                <button class="complete-btn bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600"
                                                        data-id="${booking.id}">
                                                    Complete
                                                </button>
                                            ` : ''}
                                        </td>
                                    </tr>
                                `).join('')}
                        </tbody>

        </table>
    </div>
</div>

            <!-- Washes Table-->
            <div class="bg-white p-6 rounded-xl shadow mt-6">
                <h3 class="text-lg font-semibold mb-4">Recent Washes</h3>

                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="bg-gray-100 text-gray-600 text-sm">
                                <th class="p-3">Car</th>
                                <th class="p-3">Service</th>
                                <th class="p-3">Status</th>
                                <th class="p-3">Date</th>
                            </tr>
                        </thead>

                        <tbody>
                            ${washes.slice(-5).reverse().map(wash => `
                                <tr class="border-b hover:bg-gray-50">
                                    <td class="p-3 font-medium">${wash.car}</td>
                                    <td class="p-3 capitalize">${wash.service}</td>

                                    <td class="p-3">
                                        <span class="
                                            px-3 py-1 rounded-full text-xs font-semibold
                                            ${wash.status === 'completed'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-yellow-100 text-yellow-700'}
                                        ">
                                            ${wash.status}
                                        </span>
                                    </td>

                                    <td class="p-3 text-sm text-gray-500">
                                        ${new Date(wash.date).toLocaleString()}
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
        `;
    
    

     document.querySelectorAll(".start-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                updateBookingStatus(btn.dataset.id, "in-progress");
            });
        });

        document.querySelectorAll(".complete-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                updateBookingStatus(btn.dataset.id, "completed");
            });
        });
        })
        
    .catch(err => {
        console.error(err);
        alert("Error loading data");
    });
}

// ADMIN DASHBOARD
function renderAdminDashboard() {

    const payments = JSON.parse(localStorage.getItem("payments")) || [];
    Promise.all([
        fetch(`http://localhost:5000/users?`).then(res => res.json()),
        fetch(`http://localhost:5000/bookings?`).then(res => res.json()),
        fetch(`http://localhost:5000/washes?`).then(res => res.json()),
        fetch(`http://localhost:5000/payments?`).then(res => res.json())
    ])
    .then(([users, bookings, washes, payments ]) => {
    app.innerHTML = `
        <div class="max-w-6xl mx-auto">
            <div class="bg-white p-6 rounded-lg shadow mb-6">
                <h2 class="text-2xl font-bold mb-2">Admin Dashboard</h2>
                <p class="text-gray-600">Manage all bookings and payments</p>
            </div>
            
            <!-- Statistics -->
            <div class="grid md:grid-cols-3 gap-6 mb-6">
            <div class="bg-white p-4 rounded-lg shadow">
                    <h3 class="font-bold">Total Users</h3>
                    <p class="text-2xl">${users.length}</p>
                </div>
                <div class="bg-white p-4 rounded-lg shadow">
                    <h3 class="font-bold">Total Bookings</h3>
                    <p class="text-2xl">${bookings.length}</p>
                </div>
                <div class="bg-white p-4 rounded-lg shadow">
                    <h3 class="font-bold">Pending Approvals</h3>
                    <p class="text-2xl">${bookings.filter(b => b.bookingStatus === 'pending').length}</p>
                </div>
                <div class="bg-white p-4 rounded-lg shadow">
                    <h3 class="font-bold">Total Payments</h3>
                    <p class="text-2xl">$${payments.reduce((sum, p) => sum + parseFloat(p.amount || 0), 0)}</p>
                </div>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow">
    <h3 class="text-xl font-bold mb-4">Manage Bookings</h3>

    ${bookings.length === 0 ? '<p>No bookings yet</p>' : `
        <div class="overflow-x-auto">
            <table class="min-w-full border border-gray-200">
                
                <!-- TABLE HEADER -->
                <thead class="bg-gray-100">
                    <tr>
                        <th class="p-3 text-left">Car</th>
                        <th class="p-3 text-left">Service</th>
                        <th class="p-3 text-left">Date</th>
                        <th class="p-3 text-left">Status</th>
                        <th class="p-3 text-left">Actions</th>
                    </tr>
                </thead>

                <!-- TABLE BODY -->
                <tbody>
                    ${bookings.map(booking => `
                        <tr class="border-t">
                            <td class="p-3">${booking.car}</td>
                            <td class="p-3">${booking.service}</td>
                            <td class="p-3">${new Date(booking.date).toLocaleString()}</td>
                            
                            <td class="p-3">
                                <span class="
                                    px-2 py-1 rounded text-sm
                                    ${booking.bookingStatus === 'pending' ? 'bg-yellow-200' : ''}
                                    ${booking.bookingStatus === 'approved' ? 'bg-blue-200' : ''}
                                    ${booking.bookingStatus === 'rejected' ? 'bg-red-200' : ''}
                                    ${booking.bookingStatus === 'in-progress' ? 'bg-orange-200' : ''}
                                    ${booking.bookingStatus === 'completed' ? 'bg-green-200' : ''}
                                ">
                                    ${booking.bookingStatus}
                                </span>
                            </td>

                            <td class="p-3">
                                ${booking.bookingStatus === 'pending' ? `
                                    <button class="approve-btn bg-blue-200 text-white px-2 py-1 rounded mr-2 hover:bg-blue-300"
                                            data-id="${booking.id}">
                                        Approve
                                    </button>

                                    <button class="reject-btn bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                            data-id="${booking.id}">
                                        Reject
                                    </button>
                                                                    ` : '-'}
                            </td>
                        </tr>
                    `).join('')}
                </tbody>

            </table>

            
        </div>
        
    `}
     `;
     attachAdminBookingEvents();
        })
        .catch(err => {
            console.error(err);
            alert("Error loading bookings");
        });
    }


// API FUNCTIONS
function signup() {
    const firstName = document.getElementById("su_fName").value;
    const lastName = document.getElementById("su_lName").value;
    const email = document.getElementById("su_email").value.toLowerCase();
    const phone = document.getElementById("su_phone").value;
    const password = document.getElementById("su_pass").value;
    const role = document.getElementById("su_role").value;
    
    // Check if user exists
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find(u => u.email === email)) {
        alert("Email already exists!");
        return;
    }
    
    const newUser = {
        id: Date.now(),
        firstName,
        lastName,
        email,
        phone,
        password,
        role
    };
    
   fetch("http://localhost:5000/users",{
        method: "POST",
        headers:{
            "content-type": "application/json"
        },
        body: JSON.stringify(newUser)
    })
    .then(res => res.json())
    .then(data => {
        alert("Signup successfull! Please login.");
        renderLogin();
    })
    .catch(err => {
        console.error("Error creating user", err);
        alert("Failed to sign you up. Please try again.");
    });
}

function login() { 
    const email = (document.getElementById("li_email").value).toLowerCase(); 
    const password = document.getElementById("li_pass").value; 
    fetch(`http://localhost:5000/users?email=${email}&password=${password}`) 
    .then(res => res.json()) 
    .then(data => { 
        if (data.length > 0) { 
            const user = data[0]; // store user session 
            localStorage.setItem("user", JSON.stringify(user)); 
            alert("Login successful!");
             // next step: dashboards 
             console.log(user) 
             updateNavBar(true);
             loadDashboard(user); 
            } else { 
                alert("Invalid login"); } 
            }); 
        }

function loadDashboard(user) {
    if (!user) {
        navigate("login");
        return;
    }
    
    if (user.role === "admin") {
        renderAdminDashboard();
    } else if (user.role === "staff") {
        renderStaffDashboard();
    } else {
        renderUserDashboard();
    }
}

// Booking function
function bookAppointment() {
    const user = JSON.parse(localStorage.getItem("user"));
    const date = document.getElementById("booking_date").value;
    const service = document.getElementById("booking_service").value;
    const car = (document.getElementById("booking_car").value).toUpperCase();
    
    if (!date || !service || !car) {
        alert("Please fill all fields");
        return;
    }
    
    const newBooking = {
        id: Date.now(),
        userId: user.id,
        date,
        service,
        car,
        bookingStatus: "pending",
        
    };
    fetch("http://localhost:5000/bookings",{
        method: "POST",
        headers:{
            "content-type": "application/json"
        },
        body: JSON.stringify(newBooking)
    })
    .then(res => res.json())
    .then(data => {
        alert("Booking submitted for approval!");
        renderUserDashboard();
    })
    .catch(err => {
        console.error("Error booking appointment:", err);
        alert("Failed to submit booking. Please try again.");
    });
}

function recordWash() {
    const car = (document.getElementById("wash_car").value).toUpperCase();
    const service = document.getElementById("wash_service").value;
    const status = document.getElementById("wash_status").value;
    

 const washes ={
        id: Date.now(),
        car,
        service,
        status,
        date: new Date().toISOString()
    };


    fetch("http://localhost:5000/washes",{
        method: "POST",
        headers:{
            "content-type": "application/json"
        },
        body: JSON.stringify(washes)
    })
    .then(res => res.json())
    .then(data => {
        alert(`Car: ${car} wash status recorded successfully!`);
        renderStaffDashboard();
    })
    .catch(err => {
        console.error("Error recording wash status:", err);
        alert("Failed to submit record. Please try again.");
    });
    
    // alert("Wash recorded!");
    
}

function recordPayment() {
    const car = (document.getElementById("payment_car").value).toUpperCase();
    const method = document.getElementById("payment_method").value;
    const amount = document.getElementById("payment_amount").value;
    const paymentRef = (document.getElementById("payment_ref").value).toUpperCase() || null;
    
    
    const payments ={
        id: Date.now(),
        car,
        method,
        amount,
        paymentRef ,
        date: new Date().toISOString()
    };

    

    fetch("http://localhost:5000/payments",{
        method: "POST",
        headers:{
            "content-type": "application/json"
        },
        body: JSON.stringify(payments)
    })
    .then(res => res.json())
    .then(data => {
        alert(`Car: ${car} payment recorded successfully!`);
        renderStaffDashboard();
    })
    .catch(err => {
        console.error("Error recording payment", err);
        alert("Failed to submit payment. Please try again.");
    });
    
}

function updateBookingStatus(bookingId, status) {

    console.log(`Updating booking ${bookingId} to status: ${status}`);
    
    fetch(`http://localhost:5000/bookings/${bookingId}`,{
        method: "PATCH",
        headers:{
            "content-type": "application/json"
        },
        body: JSON.stringify({bookingStatus: status})
    })
    .then(res => res.json())
    .then(data => {
        alert(`Booking ${status}!`);
        renderAdminDashboard();
    })
    .catch(err => {
        console.error("Error recording wash status:", err);
        alert("Failed to submit record. Please try again.");
    });
    
    
    
}
function attachAdminBookingEvents() {

    document.querySelectorAll(".approve-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.id;
            updateBookingStatus(id, "approved");
        });
    });

    document.querySelectorAll(".reject-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.id;
            updateBookingStatus(id, "rejected");
        });
    });
    document.querySelectorAll(".start-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.id;
            updateBookingStatus(id, "in-progress");
        });
    });

    document.querySelectorAll(".complete-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.id;
            updateBookingStatus(id, "completed");
        });
    });
    
}

// Initialize app
initApp();

// Listen for hash changes
window.addEventListener("hashchange", () => {
    const page = window.location.hash.slice(1) || "home";
    navigate(page);
});

window.updateBookingStatus = updateBookingStatus;