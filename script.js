//this is where I will be inserting my script
const app = document.getElementById("app");

// Check session on page load
function initApp() {
    //upon login user information stored in local storage hence this function checks for that user
    const user = JSON.parse(localStorage.getItem("user"));
    const currentPath = window.location.hash.slice(1) || "home";
    //this if checks if there is a user currently logged in and updates the navigation bar dynamically based on the logged in user
    if (user) {
        updateNavBar(true);
        loadDashboard(user);
    } else {
        updateNavBar(false);
        navigate(currentPath);
    }
}
//I saw a cool trick in a youtube project I thought I should add to make the navbar more professional
//this function gets the letters of your first name initial and applies a certain colour to the background just like I think google does
function getAvatarColor(letter) {
    const colors = [
        "bg-red-500",
        "bg-blue-500",
        "bg-green-500",
        "bg-yellow-500",
        "bg-purple-500",
        "bg-pink-500",
        "bg-indigo-500",
        "bg-teal-500"
    ];

    const index = letter.charCodeAt(0) % colors.length;
    return colors[index];
}

// Update navbar based on login state
function updateNavBar(isLoggedIn) {
    const navButtons = document.getElementById("nav-buttons");
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (isLoggedIn && user) {
    const name = user.firstName || user.email;
    const firstLetter = name.charAt(0).toUpperCase();
    const colorClass = getAvatarColor(firstLetter);

    navButtons.innerHTML = `
    <div class="flex items-center gap-3">
    <!-- This dashboard text on clicking takes you back to your dashboard when you press on home contact or about -->
    <!-- Dashboard -->
    <div class="flex items-center gap-1 cursor-pointer hover:text-green-500 hover:font-bold"
         onclick="navigate('dashboard')">
         <!-- icon treated as a text -->
        <i class="fa-solid fa-gauge"></i>
        <p>Dashboard</p>
    </div>

    <!-- Avatar -->
    <div class="w-10 h-10 rounded-full  flex items-center justify-center hover:bg-gray-200 transition">
        <div class="w-7 h-7 rounded-full ${colorClass} flex items-center justify-center text-white font-bold text-sm">
            ${firstLetter}
        </div>
    </div>

    <!-- Name -->
    <span class="text-gray-700 font-medium">
        ${name}
    </span>

    <!-- Logout -->
    <button onclick="logout()" 
        class="text-red-600 hover:bg-red-50 hover:font-bold px-3 py-1 rounded">
        Logout
    </button>

</div>
        
    `;
} else {
        //if no user is logged in only login and signup buttons are present
        navButtons.innerHTML = `
            <button onclick="navigate('login')" class="mr-2 text-blue-600 hover:bg-blue-50 hover:font-bold px-3 py-1 rounded">Login</button>
            <button onclick="navigate('signup')" class="text-green-600 hover:bg-green-50 hover:font-bold px-3 py-1 rounded">Sign Up</button>
        `;
    }
}

// Navigation function with history accepts an argument based on the button clicked or logged in user
function navigate(page) {
    // stores page history
    window.location.hash = page;
    
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (page === "home") renderHome();
    else if (page === "about") renderAbout();
    else if (page === "contact") renderContact();
    else if (page === "login") renderLogin();
    else if (page === "signup") renderSignup();
    else if (page === "dashboard") {
        if (user) {
            loadDashboard(user);
        } else {
            showToast("Please login first", "error");
            renderLogin();
        }
    }
    
    else if (user) {
        loadDashboard(user);
    } else {
        renderHome();
    }
    
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
        renderCustomerDashboard();
    }
}

// Logout function
function logout() {
    //remove logged in user from local storage, returns navbar to initial state and returns user to home page
    localStorage.removeItem("user");
    updateNavBar(false);
    navigate("home");
    showToast("Logged out successfully!", "success");
}

// Helper Functions for better UX (Expert level)
function showLoading() {
    app.innerHTML = `<div class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p class="ml-3 text-gray-600">Loading...</p>
    </div>`;
}

function showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.className = `fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-lg text-white z-50 transition-all duration-300 ${
        type === "success" ? "bg-green-500" : type === "error" ? "bg-red-500" : "bg-blue-500"
    }`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// RENDER FUNCTIONS
//displays home page info
function renderHome() {
    app.innerHTML = `
        <div class="max-w-6xl mx-auto max-h-200">
            <div class="bg-[url('./Assets/car3.jpg')] bg-cover bg-center rounded-lg p-12 text-white mb-8">
                <h1 class="text-5xl font-bold mb-4">Welcome to Car Ng'ara Car Wash and Detailing</h1>
                <p class="text-xl mb-6">Your one stop place for your car cleaning needs</p>
                <button onclick="navigate('signup')" class="bg-white text-blue-600 hover:font-bold px-6 py-2 rounded-lg font-semibold hover:bg-gray-100">
                    Get Started
                </button>
            </div>
            <section class="py-16 bg-blue-50/50">
    <div class="max-w-6xl mx-auto px-4">
        <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Why Choose Car Ng'ara?</h2>
            <div class="h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
            <!-- Quick Booking -->
            <div class="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 text-center border border-gray-100">
                <div class="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <i class="fa-solid fa-calendar text-2xl"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-800 mb-3">Quick Booking</h3>
                <p class="text-gray-600 leading-relaxed">Book your wash in under 60 seconds through our seamless online platform.</p>
            </div>

            <!-- Track Progress -->
            <div class="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 text-center border border-gray-100">
                <div class="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <i class="fa-solid fa-chart-line text-2xl"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-800 mb-3">Track Progress</h3>
                <p class="text-gray-600 leading-relaxed">View wash status in real time</p>
            </div>

            <!-- Secure Payments -->
            <div class="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 text-center border border-gray-100">
                <div class="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <i class="fa-solid fa-credit-card text-2xl"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-800 mb-3">Secure Payments</h3>
                <p class="text-gray-600 leading-relaxed">Pay conveniently via M-Pesa or Cash.</p>
            </div>
        </div>
    </div>
</section>

            <section class="py-12 bg-gray-50">
    <div class="max-w-6xl mx-auto px-4">
        <div class="text-center mb-12">
            <h2 class="text-4xl font-extrabold text-gray-900 mb-4">Our Services</h2>
            <p class="text-gray-600 max-w-2xl mx-auto">Professional car care for every budget. Choose the plan that fits your vehicle's needs.</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8 items-start">
            
            <!-- Basic Tier -->
            <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h3 class="text-2xl font-bold text-gray-800 mb-1">Basic</h3>
                <p class="text-gray-500 text-sm mb-6">The Quick Refresh</p>
                <div class="text-3xl font-bold text-blue-600 mb-6">Kes 500</div>
                
                <ul class="space-y-3 text-gray-600 text-sm mb-8">
                    <li class="flex items-center"><span class="mr-2 text-green-500">✔</span> Pressure wash exterior</li>
                    <li class="flex items-center"><span class="mr-2 text-green-500">✔</span> Wheel cleaning</li>
                    <li class="flex items-center"><span class="mr-2 text-green-500">✔</span> Quick interior vacuum</li>
                    <li class="flex items-center"><span class="mr-2 text-green-500">✔</span> Dashboard wiping</li>
                </ul>
                <button onClick="navigate('login')"  class="w-full py-3 px-4 bg-gray-100 text-gray-800 font-semibold rounded-lg hover:bg-gray-200 transition">Book Basic</button>
            </div>

            <!-- Deluxe Tier (Featured) -->
            <div class="bg-white p-8 rounded-2xl shadow-xl border-2 border-blue-500 relative transform md:-translate-y-4">
                <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    Most Popular
                </div>
                <h3 class="text-2xl font-bold text-gray-800 mb-1">Deluxe</h3>
                <p class="text-gray-500 text-sm mb-6">Deep Clean & Protect</p>
                <div class="text-3xl font-bold text-blue-600 mb-6">Kes 1,500</div>
                
                <ul class="space-y-3 text-gray-600 text-sm mb-8">
                    <li class="flex items-center"><span class="mr-2 text-green-500">✔</span> Everything in Basic</li>
                    <li class="flex items-center font-semibold text-gray-800"><span class="mr-2 text-blue-500">+</span> Engine wash</li>
                    <li class="flex items-center font-semibold text-gray-800"><span class="mr-2 text-blue-500">+</span> Undercarriage wash</li>
                    <li class="flex items-center"><span class="mr-2 text-green-500">✔</span> Cockpit shine</li>
                    <li class="flex items-center"><span class="mr-2 text-green-500">✔</span> Tire dressing</li>
                </ul>
                <button onClick="navigate('login')"  class="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-200 transition">Book Deluxe</button>
            </div>

            <!-- Premium Tier -->
            <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h3 class="text-2xl font-bold text-gray-800 mb-1">Premium</h3>
                <p class="text-gray-500 text-sm mb-6">The Mini Detail</p>
                <div class="text-3xl font-bold text-blue-600 mb-6">Kes 3,000</div>
                
                <ul class="space-y-3 text-gray-600 text-sm mb-8">
                    <li class="flex items-center"><span class="mr-2 text-green-500">✔</span> Everything in Deluxe</li>
                    <li class="flex items-center font-semibold text-gray-800"><span class="mr-2 text-purple-500">★</span> Machine waxing</li>
                    <li class="flex items-center font-semibold text-gray-800"><span class="mr-2 text-purple-500">★</span> Carpet shampooing</li>
                    <li class="flex items-center font-semibold text-gray-800"><span class="mr-2 text-purple-500">★</span> Seat scrubbing</li>
                    <li class="flex items-center"><span class="mr-2 text-green-500">✔</span> Interior scenting</li>
                </ul>
                <button onClick="navigate('login')" class="w-full py-3 px-4 bg-gray-800 text-white font-semibold rounded-lg hover:bg-black transition">Book Premium</button>
            </div>

        </div>
    </div>
</section>

        </div>
    `;
}
//displays about page info
function renderAbout() {
    app.innerHTML = `
        <div class="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
            <h1 class="text-3xl font-bold mb-4">About Car Ng'ara</h1>
            <p class="text-gray-700 mb-4">Founded in 2024, Car Ng'ara has been providing top-quality car wash services with modern technology integration.</p>
            <p class="text-gray-700">Our mission is to revolutionize car wash management through digital solutions, making it easier for customers to book services and for businesses to manage operations efficiently.</p>
        </div>
    `;
}
//displays contact page info
function renderContact() {
    app.innerHTML = `
        <div class="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
            <h1 class="text-3xl font-bold mb-4">Contact Us</h1>
            <div class="space-y-3">
                <p class="pr-2"><i class="fa fa-map-marker "></i><strong> Location:</strong> Nairobi, Kenya</p>
                <p><i class="fa fa-phone" aria-hidden="true"></i><strong>Phone:</strong> +254 700 000 000</p>
                <p><i class="fa fa-envelope" aria-hidden="true"></i><strong>Email:</strong> info@carngara.com</p>
                <p><i class="fa fa-clock" aria-hidden="true"></i> <strong>Hours:</strong> Mon-Sun: 8:00 AM - 8:00 PM</p>
            </div>
        </div>
    `;
}
//displays signup page
//displays signup page with car registration
function renderSignup() {
    app.innerHTML = `
        <div class="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
            <h2 class="text-2xl font-bold mb-6 text-center">Create Account</h2>
            <form onsubmit="event.preventDefault(); signupWithCar();">
                <!-- User Information -->
                <div class="border-b pb-3 mb-3">
                    <h3 class="font-semibold text-gray-700 mb-2">Personal Information</h3>
                    <input id="su_fName" required placeholder="First Name" class="w-full border p-2 rounded mb-3">
                    <input id="su_lName" required placeholder="Last Name" class="w-full border p-2 rounded mb-3">
                    <input id="su_email" required type="email" placeholder="Email" class="w-full border p-2 rounded mb-3">
                    <input id="su_phone" required placeholder="Phone" type="tel" class="w-full border p-2 rounded mb-3">
                    <input id="su_pass" required type="password" placeholder="Password" class="w-full border p-2 rounded mb-3">
                    <select id="su_role" class="w-full border p-2 rounded mb-3">
                        <option value="user">Regular User</option>
                        <option value="staff">Staff Member</option>
                    </select>
                </div>
                
                <!-- Car Information (NEW!) -->
                <div class="mb-3">
                    <h3 class="font-semibold text-gray-700 mb-2">Vehicle Information</h3>
                    <p class="text-sm text-gray-500 mb-2">Add your first car to start booking</p>
                    <input id="su_car_plate" required placeholder="Plate Number (e.g., KDA 123A)" class="w-full border p-2 rounded mb-3">
                    <input id="su_car_model" required placeholder="Model (e.g., Toyota Premio)" class="w-full border p-2 rounded mb-3">
                    <select id="su_car_type" class="w-full border p-2 rounded mb-3">
                        <option value="">Select Car Type</option>
                        <option>SUV</option>
                        <option>Saloon</option>
                        <option>Hatchback</option>
                        <option>Van / MPV</option>
                        <option>Pickup</option>
                        <option>Other</option>
                    </select>
                    <input id="su_car_color" placeholder="Color (e.g., Silver, Black)" class="w-full border p-2 rounded mb-3">
                </div>
                
                <div class="flex">
                    <p class="pr-2">Already have an account?</p>
                    <p class="text-green-500 hover:font-bold pb-2 cursor-pointer" onClick="goToLogin()">Login.</p>
                </div>
                <button type="submit" class="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    Create Account & Add Car
                </button>
            </form>
        </div>
    `;
}

// Updated signup function with car registration
async function signupWithCar() {
    const firstName = document.getElementById("su_fName").value;
    const lastName = document.getElementById("su_lName").value;
    const email = document.getElementById("su_email").value.toLowerCase();
    const phone = document.getElementById("su_phone").value;
    const password = document.getElementById("su_pass").value;
    const role = document.getElementById("su_role").value;
    
    // Car details
    const plateNumber = document.getElementById("su_car_plate").value.toUpperCase();
    const model = document.getElementById("su_car_model").value;
    const type = document.getElementById("su_car_type").value;
    const color = document.getElementById("su_car_color").value;
    
    // Validate car fields for regular users
    if (role === "user" && (!plateNumber || !model)) {
        showToast("Please add your car details to start booking", "error");
        return;
    }
    
    try {
        // Check if user exists
        const existingUsers = await fetch("http://localhost:5000/users").then(res => res.json());
        if (existingUsers.find(u => u.email === email)) {
            showToast("Email already exists!", "error");
            return;
        }
        
        // 1. Create user
        const newUser = {
            id: Date.now().toString(),
            firstName,
            lastName,
            email,
            phone,
            password,
            role,
            createdAt: new Date().toISOString()
        };
        
        const createdUser = await fetch("http://localhost:5000/users", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(newUser)
        }).then(res => res.json());
        
        // 2. If regular user, add their car
        if (role === "user" && plateNumber && model) {
            // Check if car already exists
            let cars = await fetch("http://localhost:5000/cars").then(res => res.json());
            let car = cars.find(c => c.plateNumber === plateNumber);
            
            if (!car) {
                // Create new car
                car = await fetch("http://localhost:5000/cars", {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({
                        id: Date.now().toString(),
                        plateNumber: plateNumber,
                        model: model,
                        type: type || "Not specified",
                        color: color || "Not specified",
                        createdAt: new Date().toISOString()
                    })
                }).then(res => res.json());
            }
            
            // Link car to user
            await fetch("http://localhost:5000/customer_cars", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    id: Date.now().toString(),
                    customerId: createdUser.id,
                    carId: car.id,
                    ownershipType: "primary",
                    createdAt: new Date().toISOString()
                })
            });
        }
        
        showToast("Account created successfully! Please login.", "success");
        renderLogin();
        
    } catch (err) {
        console.error("Error creating user:", err);
        showToast("Failed to create account. Please try again.", "error");
    }
}

//signup page api functions

//signup function takes in users input, checks if that user exists in storage and posts it to users endpoint in order to create the new user record
function signup() {
    const firstName = document.getElementById("su_fName").value;
    const lastName = document.getElementById("su_lName").value;
    const email = document.getElementById("su_email").value.toLowerCase();//converts input to lowercase for uniformity
    const phone = document.getElementById("su_phone").value;
    const password = document.getElementById("su_pass").value;
    const role = document.getElementById("su_role").value;
    
    // Check if user exists
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find(u => u.email === email)) {
        showToast("Email already exists!", "error");
        return;
    }
    
    const newUser = {
        id: Date.now().toString(),
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
        showToast("Signup successful! Please login.", "success");
        renderLogin();
    })
    .catch(err => {
        console.error("Error creating user", err);
        showToast("Failed to sign you up. Please try again.", "error");
    });
}

 function goToLogin(){
        renderLogin()
    }
//end of signup page functions

//displays login page
function renderLogin() {
    app.innerHTML = `
        <div class="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
            <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
            <form onsubmit="event.preventDefault(); login();">
                <input id="li_email" required type="email" placeholder="Email" class="w-full border p-2 rounded mb-3">
                <input id="li_pass" required type="password" placeholder="Password" class="w-full border p-2 rounded mb-4">
                <div class="flex">
                <p class="pr-2">Don't have an account?</p>
                <p class="text-blue-600 pb-2" onClick="goToRegister()">Register. </p>
                </div>
                <button type="submit" class="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Login
                </button>
            </form>
        </div>
    `;
}

//login API functions
function login() { 
    const email = (document.getElementById("li_email").value).toLowerCase(); 
    const password = document.getElementById("li_pass").value; 
    fetch(`http://localhost:5000/users?email=${email}&password=${password}`) 
    .then(res => res.json()) 
    .then(data => { 
        if (data.length > 0) { 
            const user = data[0]; // store user session 
            localStorage.setItem("user", JSON.stringify(user)); 
            showToast("Login successful!", "success");
             // next step: dashboards 
             console.log(user) 
             updateNavBar(true);
             loadDashboard(user); 
            } else { 
                showToast("Invalid email or password", "error"); 
            } 
        }); 
    }

   
    function goToRegister(){
        renderSignup()
    }

// Customer DASHBOARD
/// Customer DASHBOARD (with car check)
function renderCustomerDashboard() {
    const user = JSON.parse(localStorage.getItem("user"));
    
    showLoading();
    
    Promise.all([
        fetch("http://localhost:5000/bookings").then(r => r.json()),
        fetch("http://localhost:5000/cars").then(r => r.json()),
        fetch("http://localhost:5000/services").then(r => r.json()),
        fetch("http://localhost:5000/washes").then(r => r.json()),
        fetch("http://localhost:5000/payments").then(r => r.json()),
        fetch("http://localhost:5000/customer_cars").then(r => r.json())
    ])
    .then(([bookings, cars, services, washes, payments, customerCars]) => {
        
        // Get user's cars
        const userCarRelations = customerCars.filter(cc => cc.customerId === user.id);
        const userCars = userCarRelations.map(rel => cars.find(c => c.id === rel.carId)).filter(c => c);
        const userHasCars = userCars.length > 0;
        
        const currentWashes = washes.filter(w => 
            w.customerId === user.id &&
            (w.status === "started" || w.status === "completed") &&
            w.paymentStatus === "unpaid");
        
        const myWashes = washes.filter(w => w.customerId === user.id && w.status === "completed");
        const userWashes = washes.filter(w => w.customerId === user.id && w.paymentStatus === "paid");
        const userBookings = bookings.filter(b => b.customerId === user.id);
        
        const joinedBookings = joinBookings(userBookings, cars, services);
        const joinedCurrentWashes = joinWashes(currentWashes, cars, services);
        const joinedMyWashes = joinWashes(myWashes, cars, services);
        const joinedMyPayments = joinPaymentsByWash(userWashes, payments, cars, services);
        
        app.innerHTML = `
            <div class="max-w-6xl mx-auto">
                <div class="bg-white p-6 rounded-lg shadow mb-6">
                    <h2 class="text-2xl font-bold mb-2">Welcome, ${user.firstName}! 👋</h2>
                    <p class="text-gray-600">Manage your car wash appointments</p>
                </div>
                
                <!-- Show warning if no cars -->
                ${!userHasCars ? `
                    <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg shadow mb-6">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                <i class="fa-solid fa-car-side text-yellow-600 text-2xl"></i>
                            </div>
                            <div class="ml-3">
                                <h3 class="text-sm font-medium text-yellow-800">No cars added yet!</h3>
                                <div class="mt-2 text-sm text-yellow-700">
                                    <p>You need to add a car before you can make a booking.</p>
                                </div>
                                <div class="mt-3">
                                    <button onclick="showAddCarForm()" class="bg-yellow-600 text-white px-3 py-1 rounded text-sm hover:bg-yellow-700">
                                        + Add Your First Car
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ` : ''}
                
                <!-- My Cars Section -->
                ${renderMyCarsWithActions(userCars)}
                
                <div class="grid md:grid-cols-2 gap-6 mt-6">
                    <!-- Book Appointment - Disabled if no cars -->
                    <div class="bg-white p-6 rounded-lg shadow">
                        <h3 class="text-xl font-bold mb-4">Book New Appointment</h3>
                        ${!userHasCars ? `
                            <div class="text-center py-8">
                                <i class="fa-solid fa-car text-gray-400 text-5xl mb-3"></i>
                                <p class="text-gray-500">Add a car first to start booking</p>
                                <button onclick="showAddCarForm()" class="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                    Add Your First Car
                                </button>
                            </div>
                        ` : `
                            <form onsubmit="event.preventDefault(); bookAppointment();">
                                <input id="booking_date" type="datetime-local" required class="w-full border p-2 rounded mb-3">
                                <select id="booking_service" required class="w-full border p-2 rounded mb-3">
                                    <option value="">Select Service</option>
                                    <option value="1">Basic Wash - Kes 500</option>
                                    <option value="2">Deluxe Wash - Kes 1500</option>
                                    <option value="3">Premium Wash - Kes 3000</option>
                                </select>
                                <select id="booking_car" required class="w-full border p-2 rounded mb-3">
                                    <option value="">Select Your Car</option>
                                    ${userCars.map(car => `
                                        <option value="${car.id}">${car.plateNumber} (${car.model})</option>
                                    `).join('')}
                                </select>
                                <button type="submit" class="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                    Book Appointment
                                </button>
                            </form>
                        `}
                    </div>
                    
                    <!-- Current Washes -->
                    ${currentCustomerWashesHTML(joinedCurrentWashes)}
                </div>
                
                <!-- Bookings -->
                ${myBookingsHTML(joinedBookings)}
                
                <!-- My Washes -->
                ${customerWashesHTML(joinedMyWashes)}
                
                <!-- My Payments -->
                ${myPaymentsHTML(joinedMyPayments)}
            </div>
        `;
        
        // Event listeners
        document.querySelectorAll(".cancel-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const id = btn.dataset.id;
                cancelBooking(id);
            });
        });
        
        if (userHasCars) {
            loadUserCars(user.id);
        }
        
        function setMinBookingDateTime() {
            const input = document.getElementById("booking_date");
            if(input) {
                const now = new Date();
                now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
                input.min = now.toISOString().slice(0, 16);
            }
        }
        setMinBookingDateTime();
    })
    .catch(err => {
        console.error(err);
        showToast("Error loading dashboard: " + err.message, "error");
    });
}
// ============================================
// CUSTOMER CAR MANAGEMENT (CRUD Operations)
// ============================================

// Render customer's cars with edit/delete options
function renderMyCarsWithActions(cars) {
    if (!cars || cars.length === 0) {
        return `
            <div class="bg-white p-6 rounded-xl shadow mt-6">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-semibold">🚗 My Cars</h3>
                    <button onclick="showAddCarForm()" class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                        + Add Car
                    </button>
                </div>
                <p class="text-center text-gray-500 py-6">You haven't added any cars yet.</p>
            </div>
        `;
    }

    return `
        <div class="bg-white p-6 rounded-xl shadow mt-6">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold">🚗 My Cars</h3>
                <button onclick="showAddCarForm()" class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                    + Add Car
                </button>
            </div>
            
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-gray-100">
                        <tr>
                            <th class="p-3 text-left">Plate Number</th>
                            <th class="p-3 text-left">Model</th>
                            <th class="p-3 text-left">Type</th>
                            <th class="p-3 text-left">Color</th>
                            <th class="p-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${cars.map(car => `
                            <tr class="border-t hover:bg-gray-50">
                                <td class="p-3 font-mono">${car.plateNumber}</td>
                                <td class="p-3">${car.model}</td>
                                <td class="p-3">${car.type || 'N/A'}</td>
                                <td class="p-3">${car.color || 'N/A'}</td>
                                <td class="p-3">
                                    <button onclick="editCar('${car.id}')" class="text-blue-500 hover:text-blue-700 mr-2">
                                        <i class="fa-solid fa-edit"></i> Edit
                                    </button>
                                    <button onclick="deleteCar('${car.id}')" class="text-red-500 hover:text-red-700">
                                        <i class="fa-solid fa-trash"></i> Delete
                                    </button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// Show add car form modal
function showAddCarForm() {
    const modal = document.createElement("div");
    modal.className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
    modal.innerHTML = `
        <div class="bg-white rounded-lg p-6 w-96 max-w-md">
            <h3 class="text-xl font-bold mb-4">Add New Car</h3>
            <input id="new_car_plate" placeholder="Plate Number (e.g., KDA 123A)" class="w-full border p-2 rounded mb-3">
            <input id="new_car_model" placeholder="Model (e.g., Toyota Premio)" class="w-full border p-2 rounded mb-3">
            <select id="new_car_type" class="w-full border p-2 rounded mb-3">
                <option value="">Select Type</option>
                <option>SUV</option>
                <option>Saloon</option>
                <option>Hatchback</option>
                <option>Van / MPV</option>
                <option>Pickup</option>
            </select>
            <input id="new_car_color" placeholder="Color" class="w-full border p-2 rounded mb-4">
            <div class="flex justify-end gap-2">
                <button onclick="this.closest('.fixed').remove()" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
                <button onclick="addCustomerCar()" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add Car</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Add customer car
async function addCustomerCar() {
    const user = JSON.parse(localStorage.getItem("user"));
    const plate = document.getElementById("new_car_plate").value.toUpperCase();
    const model = document.getElementById("new_car_model").value;
    const type = document.getElementById("new_car_type").value;
    const color = document.getElementById("new_car_color").value;

    if (!plate || !model) {
        showToast("Please fill plate number and model", "error");
        return;
    }

    try {
        // Check if car exists
        let cars = await fetch("http://localhost:5000/cars").then(r => r.json());
        let car = cars.find(c => c.plateNumber === plate);

        if (!car) {
            // Create new car
            car = await fetch("http://localhost:5000/cars", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: Date.now().toString(),
                    plateNumber: plate,
                    model: model,
                    type: type || "Not specified",
                    color: color || "Not specified",
                    createdAt: new Date().toISOString()
                })
            }).then(r => r.json());
        }

        // Check if car already linked to this user
        const existingLinks = await fetch(`http://localhost:5000/customer_cars?customerId=${user.id}&carId=${car.id}`).then(r => r.json());
        
        if (existingLinks.length === 0) {
            // Link car to customer
            await fetch("http://localhost:5000/customer_cars", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: Date.now().toString(),
                    customerId: user.id,
                    carId: car.id,
                    ownershipType: "primary",
                    createdAt: new Date().toISOString()
                })
            });
        }

        showToast("Car added successfully!", "success");
        document.querySelector(".fixed")?.remove();
        renderCustomerDashboard();
    } catch (err) {
        console.error(err);
        showToast("Failed to add car", "error");
    }
}

// Edit car
async function editCar(carId) {
    try {
        const car = await fetch(`http://localhost:5000/cars/${carId}`).then(r => r.json());
        
        const modal = document.createElement("div");
        modal.className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
        modal.innerHTML = `
            <div class="bg-white rounded-lg p-6 w-96 max-w-md">
                <h3 class="text-xl font-bold mb-4">Edit Car</h3>
                <input id="edit_car_plate" value="${car.plateNumber}" placeholder="Plate Number" class="w-full border p-2 rounded mb-3">
                <input id="edit_car_model" value="${car.model}" placeholder="Model" class="w-full border p-2 rounded mb-3">
                <select id="edit_car_type" class="w-full border p-2 rounded mb-3">
                    <option ${car.type === 'SUV' ? 'selected' : ''}>SUV</option>
                    <option ${car.type === 'Saloon' ? 'selected' : ''}>Saloon</option>
                    <option ${car.type === 'Hatchback' ? 'selected' : ''}>Hatchback</option>
                    <option ${car.type === 'Van / MPV' ? 'selected' : ''}>Van / MPV</option>
                    <option ${car.type === 'Pickup' ? 'selected' : ''}>Pickup</option>
                </select>
                <input id="edit_car_color" value="${car.color || ''}" placeholder="Color" class="w-full border p-2 rounded mb-4">
                <div class="flex justify-end gap-2">
                    <button onclick="this.closest('.fixed').remove()" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
                    <button onclick="updateCar('${carId}')" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Save Changes</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    } catch (err) {
        showToast("Error loading car details", "error");
    }
}

// Update car
async function updateCar(carId) {
    const plate = document.getElementById("edit_car_plate").value.toUpperCase();
    const model = document.getElementById("edit_car_model").value;
    const type = document.getElementById("edit_car_type").value;
    const color = document.getElementById("edit_car_color").value;

    try {
        await fetch(`http://localhost:5000/cars/${carId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                plateNumber: plate, 
                model: model, 
                type: type, 
                color: color 
            })
        });
        
        showToast("Car updated successfully!", "success");
        document.querySelector(".fixed")?.remove();
        renderCustomerDashboard();
    } catch (err) {
        showToast("Failed to update car", "error");
    }
}

// Delete car
async function deleteCar(carId) {
    const confirmed = confirm("Are you sure you want to remove this car? This will affect your booking history.");
    if (!confirmed) return;

    try {
        // Delete customer_car links first
        const links = await fetch(`http://localhost:5000/customer_cars?carId=${carId}`).then(r => r.json());
        for (let link of links) {
            await fetch(`http://localhost:5000/customer_cars/${link.id}`, { method: "DELETE" });
        }
        
        // Delete the car
        await fetch(`http://localhost:5000/cars/${carId}`, { method: "DELETE" });
        
        showToast("Car removed successfully!", "success");
        renderCustomerDashboard();
    } catch (err) {
        console.error(err);
        showToast("Failed to delete car", "error");
    }
}
   
//User dashboard API functions



//function to load customer cars and append them to the select element to facilitate easy and correct booking
function loadUserCars(userId) {
    Promise.all([
        fetch(`http://localhost:5000/customer_cars?customerId=${userId}`).then(res => res.json()),
        fetch(`http://localhost:5000/cars`).then(res => res.json())
    ])
    .then(([relations, cars]) => {

        const select = document.getElementById("booking_car");
        if(select) {
            select.innerHTML = `<option value="">Select Your Car</option>`;

            relations.forEach(rel => {
                const car = cars.find(c => c.id === rel.carId);

                if (car) {
                    const option = document.createElement("option");
                    option.value = car.id;
                    option.textContent = `${car.plateNumber} (${car.model})`;
                    select.appendChild(option);
                }
            });
        }
    });
}
function bookingFormHTML() {
    return `
        <div class="bg-white p-6 rounded-lg shadow">
            <h3 class="text-xl font-bold mb-4">Book New Appointment</h3>

            <form onsubmit="event.preventDefault(); bookAppointment();">

                <input id="booking_date"
                    type="datetime-local"
                    required
                    class="w-full border p-2 rounded mb-3">

                <select id="booking_service"
                    required
                    class="w-full border p-2 rounded mb-3">
                    <option value="">Select Service</option>
                    <option value="1">Basic Wash - Kes 500</option>
                    <option value="2">Deluxe Wash - Kes 1500</option>
                    <option value="3">Premium Wash - Kes 3000</option>
                </select>

                <select id="booking_car"
                    required
                    class="w-full border p-2 rounded mb-3">
                </select>

                <button class="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Book Appointment
                </button>

            </form>
        </div>
    `;
}
//
function myBookingsHTML(bookings) {
    return `
        <div class="bg-white p-6 rounded-lg shadow">
            <input type="text" id="searchBookings" placeholder="Search bookings..." class="w-full mb-4 p-2 border rounded">
            <h2 class="text-2xl font-bold mb-4">My Bookings</h2>

            ${bookings.length === 0 ? `
                <p class="text-center text-gray-500 py-6">
                    No bookings yet
                </p>
            ` : `
                <div class="space-y-4" id="bookingsList">
                    ${bookings.map(b => `
                        <div class="border rounded-lg p-4 shadow-sm booking-item">
                            <p><strong>Car:</strong> ${b.carPlate}</p>
                            <p><strong>Service:</strong> ${b.serviceName}</p>
                            <p><strong>Date:</strong> ${new Date(b.date).toLocaleString()}</p>

                            <p class="mt-2">
                                <strong>Status:</strong>
                                <span class="
                                    px-2 py-1 rounded text-sm
                                    ${b.bookingStatus === "pending" ? "bg-yellow-200" : ""}
                                    ${b.bookingStatus === "approved" ? "bg-green-200" : ""}
                                    ${b.bookingStatus === "rejected" ? "bg-red-200" : ""}
                                    ${b.bookingStatus === "started" ? "bg-orange-200" : ""}
                                    ${b.bookingStatus === "completed" ? "bg-green-200" : ""}
                                ">
                                    ${b.bookingStatus}
                                </span>
                            </p>

                            ${b.bookingStatus === "pending" ? `
                                <button class="cancel-btn text-red-600 mt-3"
                                    data-id="${b.id}">
                                    Cancel Booking
                                </button>
                            ` : ""}

                        </div>
                    `).join("")}
                </div>
            `}

        </div>
    `;
}
function currentCustomerWashesHTML(currentWashes) {
    return `
<div class="bg-white p-6 rounded-xl shadow mt-6">
    <h3 class="text-lg font-semibold mb-4">Current Wash</h3>

    <div class="overflow-x-auto">
        <table class="min-w-full border border-gray-200">
                
                <table  class="min-w-full text-left border-collapse">

                    <thead class="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
                        <tr>
                            <th class="p-3">Car</th>
                            <th class="p-3">Service</th>
                            <th class="p-3">Date</th>
                            <th class="p-3">Status</th>
                            <th class="p-3">Payment status</th>
                        </tr>
                    </thead>

                    <tbody>
                    
                    ${currentWashes.length === 0 
                         ? `
                            <tr>
                                <td colspan="5" class="p-3 text-center text-gray-500">
                                    No current washes yet
                                </td>
                            </tr>
                         `
                         
                        :currentWashes.map(w => `
                            <tr class="border-t hover:bg-gray-50 transition">

                                <td class="p-3 font-medium">${w.carPlate}</td>
                                <td class="p-3 capitalize">${w.serviceName}</td>
                                
                                    <td class="p-3 capitalize">${new Date(w.date).toLocaleString()}</td>

                                <td class="p-3">
                                    <span class="
                                px-2 py-1 rounded text-xs font-semibold
                                ${w.status === 'started' ? 'bg-orange-100 text-orange-700' : ''}
                                ${w.status === 'completed' ? 'text-xs font-semibold bg-green-200' : ''}
                            ">
                                ${w.status}
                            </span>
                                </td>
                                <td class="p-3">
                                    <span class="
                                px-2 py-1 rounded text-xs font-semibold text-red-500 bg-red-50
                               
                            ">
                                ${w.paymentStatus}
                            </span>
                                </td>

                            </tr>
                        `).join("")}
                    
                    </tbody>

                </table>

            </div>
        </div>`
                        }

function customerWashesHTML(myWashes){
                            return `
                            <div class="bg-white p-6 rounded-xl shadow mt-6">
    <h3 class="text-lg font-semibold mb-4">My washes</h3>

    <div class="overflow-x-auto">
        <table class="min-w-full border border-gray-200">
                
                <table  class="min-w-full text-left border-collapse">

                    <thead class="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
                        <tr>
                            <th class="p-3">Car</th>
                            <th class="p-3">Service</th>
                            <th class="p-3">Date</th>
                            <th class="p-3">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                    
                    ${myWashes.length === 0 
                         ? `
                            <tr>
                                <td colspan="5" class="p-3 text-center text-gray-500">
                                    No  washes yet
                                </td>
                            </tr>
                         `
                        :myWashes.map(w => `
                            <tr class="border-t hover:bg-gray-50 transition">

                                <td class="p-3 font-medium">${w.carPlate}</td>
                                <td class="p-3 capitalize">${w.serviceName}</td>
                                
                                    <td class="p-3 capitalize">${new Date(w.date).toLocaleString()}</td>

                                <td class="p-3">
                                    <span class="px-2 py-1 rounded text-xs font-semibold bg-green-200 ">
                                        ${w.status}
                                    </span>
                                </td>

                            </tr>
                        `).join("")}
                    
                    </tbody>

                </table>

            </div>
        </div>`  
                        }

function myPaymentsHTML(myPayments){
    return`
    <div class="bg-white p-6 rounded-xl shadow mt-6">
    <h3 class="text-lg font-semibold mb-4">My Payments</h3>

    <div class="overflow-x-auto">
        <input 
                type="text" 
                id="tableSearch" 
                placeholder="Search car, service, status..."
                class="w-full mb-3 p-2 border rounded"
                />
                <table id="paymentsTable" class="min-w-full text-left border-collapse">

                    <thead class="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
                        <tr>
                            <th class="p-3">Car</th>
                            <th class="p-3">Service</th>
                            <th class="p-3">Amount</th>
                            <th class="p-3">Method</th>
                            <th class="p-3">Reference</th>
                            <th class="p-3">Date</th>
                            <th class="p-3">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        ${myPayments.length === 0 
                         ? `
                            <tr>
                                <td colspan="5" class="p-3 text-center text-gray-500">
                                    No payments made
                                </td>
                            </tr>
                         ` 
                        :myPayments.map(p => `
                            <tr class="border-t hover:bg-gray-50 transition">

                                <td class="p-3 font-medium">${p.carPlate}</td>
                                <td class="p-3 capitalize">${p.serviceName}</td>
                                <td class="p-3">Kes ${p.amount}</td>
                                <td class="p-3 capitalize">${p.method}</td>
                                <td class="p-3">${p.paymentRef || "N/A"}</td>
                                <td class="p-3 text-sm text-gray-500">
                                    ${new Date(p.date).toLocaleString()}
                                </td>

                                <td class="p-3">
                                    <span class="px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-700">
                                        PAID
                                    </span>
                                </td>

                            </tr>
                        `).join("")}
                    </tbody>

                </table>

            </div>
        </div>`
}
// Booking function
function bookAppointment() {
    const user = JSON.parse(localStorage.getItem("user"));
    const date = document.getElementById("booking_date").value;
    const serviceId = document.getElementById("booking_service").value;
    const carId = (document.getElementById("booking_car").value);

      const selectedDate = new Date(date);
    const now = new Date();

    // this prevents users from selecting a past date and time from the backend side
    if (selectedDate < now) {
        showToast("You cannot select a past date or time.", "error");
        return;
    }

    //this ensures that these fields are not empty before submission
    if (!date || !serviceId || !carId) {
        showToast("Please fill all fields", "error");
        return;
    }
    
    const newBooking = {
        id: Date.now().toString(),
        customerId: user.id,
        staffId: null,
        carId,
        serviceId,
        date,
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
        showToast("Booking submitted for approval!", "success");
        renderCustomerDashboard();
    })
    .catch(err => {
        console.error("Error booking appointment:", err);
        showToast("Failed to submit booking. Please try again.", "error");
    });
}
function joinBookings(bookings, cars, services) {
    return bookings.map(b => {
        // Case-insensitive car lookup
        const car = cars.find(c => 
            c.id?.toLowerCase() === b.carId?.toLowerCase()
        );
        const service = services.find(s => s.id === b.serviceId);

        return {
            ...b,
            carPlate: car?.plateNumber || "Unknown",
            serviceName: service?.name || "Unknown"
        };
    });
}

function joinWashes(washes, cars, services) {
    return washes.map(w => {
        const car = cars.find(c => 
            c.id?.toLowerCase() === w.carId?.toLowerCase()
        );
        const service = services.find(s => s.id === w.serviceId);

        return {
            ...w,
            carPlate: car?.plateNumber || "Unknown",
            serviceName: service?.name || "Unknown"
        };
    });
}
function joinPaymentsByWash(washes, payments, cars, services) {
    return washes.map(wash => {

        const payment = payments.find(p => p.washId === wash.id);
        const car = cars.find(c => c.id === wash.carId);
        const service = services.find(s => s.id === wash.serviceId);

        return {
            ...wash,
            carPlate: car?.plateNumber || "Unknown",
            serviceName: service?.name || "Unknown",

            paymentStatus: payment ? "paid" : "unpaid",
            amount: payment?.amount || 0,
            method: payment?.method || "-",
            paymentRef: payment?.paymentRef || "-"
        };
    });
}

 //this function changes booking status to cancelled as long as wash is not complete
function cancelBooking(bookingId) {
    console.log(bookingId)
    const user = JSON.parse(localStorage.getItem("user"));

    // Ask for confirmation first
    const confirmCancel = confirm("Are you sure you want to cancel this booking?");

    if (!confirmCancel) {
        return; // stop if user clicks "Cancel"
    }

    fetch(`http://localhost:5000/bookings/${bookingId}`)
        .then(res => res.json())
        .then(booking => {

            if (booking.bookingStatus === "completed") {
                
                throw new Error("completed");
                
            }
            

            return fetch(`http://localhost:5000/bookings/${bookingId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ bookingStatus: "cancelled" })
            });
        })
        .then(res => res?.json())
        .then(() => {
            showToast("Booking cancelled successfully!", "success");

            // refresh UI depending on role
            if (user.role === "staff") {
                renderStaffDashboard();
            } else if (user.role === "admin") {
                renderAdminDashboard();
            } else {
                renderUserDashboard();
            }
        })
        .catch(err => {
            if (err.message === "completed") {
                showToast("You cannot cancel a completed booking.", "error");
            } else {
                console.error(err);
                showToast("Failed to cancel booking. Please try again.", "error");
            }
        });
}

// end of user dashboard API functions


// STAFF DASHBOARD
//displays staff dashboard
function renderStaffDashboard() {
    const user = JSON.parse(localStorage.getItem("user"));//stores information of current user in local storage
    const staffId = user.id// stores id of current staff for it to be sent to the booking and washing fields later for linking the tables
    
    showLoading();
    
//fetches data from bookings, washes and payments in db.json
    Promise.all([
        fetch(`http://localhost:5000/bookings`).then(res => res.json()),
        fetch(`http://localhost:5000/washes`).then(res => res.json()),
        fetch(`http://localhost:5000/payments`).then(res => res.json()),
        fetch(`http://localhost:5000/cars`).then(res => res.json()),
        fetch(`http://localhost:5000/services`).then(res => res.json()),
        fetch(`http://localhost:5000/users`).then(res => res.json())
    ])
    .then(([bookings, washes, payments, cars, services, users]) => {
const currentBookings = bookings.filter(b => b.bookingStatus === "approved" );//to only show bookings that have been approved
const currentWashes = washes.filter(w => (w.status === "started" || w.status === "completed") && w.staffId === user.id && w.paymentStatus === "unpaid" ); // checks if wash status is in progress and is assigned to me as a staff then it displays here for me to complete and carry out payment
const myWashes = washes.filter(w => w.paymentStatus === "paid" && w.staffId === user.id );// checks if wash status is completed and is assigned to me as a staff then it displays here for me to view.
const bookingData= bookings //this stores information about booking to be used to populate washes table

// JOIN bookings with cars and services for proper display
const joinedCurrentBookings = currentBookings.map(booking => {
    const car = cars.find(c => c.id === booking.carId);
    const service = services.find(s => s.id === booking.serviceId);
    const customer = users.find(u => u.id === booking.customerId);
    return {
        ...booking,
        carPlate: car?.plateNumber || "Unknown",
        serviceName: service?.name || "Unknown",
        customerName: customer ? `${customer.firstName} ${customer.lastName}` : "Unknown"
    };
});

const joinedCurrentWashes = joinWashes(currentWashes, cars, services);
const joinedCompleteWashes = joinWashes(myWashes, cars, services);
        
        app.innerHTML = `
        <div class="max-w-7xl mx-auto p-4">

            <!-- Header -->
            <div class="bg-white p-6 rounded-xl shadow mb-6">
                <h2 class="text-2xl font-bold">Staff Dashboard 👨‍🔧</h2>
                <h2 class="text-xl font-bold mb-2">Welcome, ${user.firstName}! 👋</h2>
                <p class="text-gray-500">Manage washes, bookings and payments</p>
            </div>
            

            <!-- Forms -->
            <div class="grid md:grid-cols-2 gap-6">

                <!-- Record Wash -->
                
                <div class="bg-white p-6 rounded-xl shadow">
                <h3 class="text-lg font-semibold mb-4">Walk-in Customer</h3>

                <!-- STEP 1: Search customer -->
                <input id="search_phone" type="number"
                    placeholder="Search customer by phone"
                    class="w-full border p-2 rounded mb-3">

                <button onclick="searchCustomerByPhone()"
                    class="w-full bg-gray-500 text-white py-2 rounded mb-4">
                    Search Customer
                </button>

                <!-- CUSTOMER INFO (auto-filled or new) -->
                <input id="walk_first_name" placeholder="First Name" class="w-full border p-2 rounded mb-2">
                <input id="walk_last_name" placeholder="Last Name" class="w-full border p-2 rounded mb-2">
                <input id="walk_email" placeholder="Email" class="w-full border p-2 rounded mb-2">
                <input id="walk_phone" placeholder="Phone" class="w-full border p-2 rounded mb-4">

                <!-- STEP 2: Car dropdown -->
                <select id="car_select" class="w-full border p-2 rounded mb-3">
                    <option value="">Select Car</option>
                </select>

                <!-- STEP 3: Add new car -->
                <button onclick="addCarField()" class="bg-green-500 text-white px-3 py-1 rounded">
                + Add Car
                </button>

                <div id="carContainer"></div>

                <!-- SERVICE -->
                <select id="wash_service" class="w-full border p-2 rounded mb-4">
                    <option value="1">Basic - Kes 500</option>
                    <option value="3">Premium - Kes 3000</option>
                    <option value="2">Deluxe - Kes 1500</option>
                </select>

                <button onclick="walkInWash()"
                    class="w-full bg-green-500 text-white py-2 rounded">
                    Start Wash
                </button>
            </div>

                <!-- Record Payment -->
                <div class="bg-white p-6 rounded-xl shadow">
                    <h3 class="text-lg font-semibold mb-4">Record Payment (Booked & Walk-in Customers)</h3>
                    <form onsubmit="event.preventDefault(); recordPayment();">

                        <input id="payment_car" placeholder="Car Plate" required class="w-full border p-2 rounded mb-3">
                        <input id="booking_id" placeholder="BookingId" hidden   null class="w-full border p-2 rounded mb-3">
                        <input id="wash_type" placeholder="Wash Type" disabled class="w-full border p-2 rounded mb-3">
                        <input id="wash_pay_service" placeholder="Wash Service" disabled class="w-full border p-2 rounded mb-3">
                        

                        <!-- TOTAL -->
                        <input id="payment_total" type="number" placeholder="Total Amount" required 
                            class="w-full border p-2 rounded mb-3">

                        <!-- METHOD -->
                        <select id="payment_method" onchange="handlePaymentMethod()" required 
                            class="w-full border p-2 rounded mb-3">
                            <option value="cash">Cash</option>
                            <option value="mpesa">M-Pesa</option>
                            <option value="split">M-Pesa + Cash</option>
                        </select>

                        <!-- MPESA DETAILS -->
                        <div id="mpesaFields" class="hidden">
                            <input id="payment_phone" placeholder="M-Pesa Phone Number" 
                                class="w-full border p-2 rounded mb-3">

                            <input id="payment_ref" placeholder="M-Pesa Reference" 
                                class="w-full border p-2 rounded mb-3">
                        </div>

                        <!-- SPLIT FIELDS -->
                        <div id="splitFields" class="hidden">
                            <input id="mpesa_amount" type="number" placeholder="M-Pesa Amount" 
                                class="w-full border p-2 rounded mb-3">

                            <input id="cash_amount" type="number" placeholder="Cash Amount" 
                                class="w-full border p-2 rounded mb-3">
                        </div>

                        <button class="w-full bg-blue-500 text-white py-2 rounded">
                            Save Payment
                        </button>
                    </form>
                </div>
            </div>

            <!-- Bookings -->
<div class="bg-white p-6 rounded-xl shadow mt-6">
    <h3 class="text-lg font-semibold mb-4">Current Bookings</h3>
    <input type="text" id="searchStaffBookings" placeholder="Search bookings..." class="w-full mb-4 p-2 border rounded">

    <div class="overflow-x-auto">
        <table class="min-w-full border border-gray-200" id="staffBookingsTable">

            <!-- HEADER -->
            <thead class="bg-gray-100 text-gray-700 text-sm">
                <tr>
                    <th class="p-3 text-left">Customer</th>
                    <th class="p-3 text-left">Car</th>
                    <th class="p-3 text-left">Service</th>
                    <th class="p-3 text-left">Date</th>
                    <th class="p-3 text-left">Status</th>
                    <th class="p-3 text-left">Actions</th>
                </tr>
            </thead>

            <!-- BODY -->
            <tbody>
            ${joinedCurrentBookings.length === 0 
                        ? `
                        <tr>
                            <td colspan="6" class="p-3 text-center text-gray-500">
                                No bookings yet
                            </td>
                        </tr>
                    `
                : joinedCurrentBookings.slice(-5).reverse().map(booking => `
                    <tr class="border-t hover:bg-gray-50">
                        <td class="p-3 font-medium">${booking.customerName}</td>
                        <td class="p-3">${booking.carPlate}</td>
                        <td class="p-3 capitalize">${booking.serviceName}</td>
                        <td class="p-3 text-sm text-gray-500">
                            ${new Date(booking.date).toLocaleString()}
                        </td>

                        <td class="p-3">
                            <span class="
                                px-2 py-1 rounded text-xs font-semibold
                                ${booking.bookingStatus === 'pending' ? 'bg-yellow-100 text-yellow-700' : ''}
                                ${booking.bookingStatus === 'approved' ? 'bg-blue-100 text-blue-700' : ''}
                                ${booking.bookingStatus === 'rejected' ? 'bg-red-100 text-red-700' : ''}
                                ${booking.bookingStatus === 'started' ? 'bg-orange-100 text-orange-700' : ''}
                                ${booking.bookingStatus === 'completed' ? 'bg-green-400 text-green-700' : ''}
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
                        </td>
                    </tr>
                `).join('')}
            </tbody>

        </table>
    </div>
</div>
            <!-- Current Washes Table-->
             ${currentStaffWashesHTML(joinedCurrentWashes)}

            <!-- Completed Washes Table-->
            ${washesCompletedByStaff(joinedCompleteWashes)}
            
        `;
    
    // Add search functionality
    const searchInput = document.getElementById("searchStaffBookings");
    if(searchInput) {
        searchInput.addEventListener("input", function() {
            const filter = this.value.toLowerCase();
            const rows = document.querySelectorAll("#staffBookingsTable tbody tr");
            rows.forEach(row => {
                const text = row.innerText.toLowerCase();
                row.style.display = text.includes(filter) ? "" : "none";
            });
        });
    }
    
// event listener for stating a wash
        document.querySelectorAll(".start-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                //updates progress of the booking and assigns the booking to a particular staff
                updateBookingStatus(btn.dataset.id, "started", staffId);
                //sends bookings data to wash table along with staff doing the wash
                bookingWash(btn.dataset.id, bookings, staffId);
            });
        });
//event listener for completing a wash
        //event listener for completing a wash - Using both IDs
//event listener for completing a wash - With debugging
document.querySelectorAll(".complete-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const washId = btn.dataset.washId;
        const bookingId = btn.dataset.bookingId;
        
        console.log("Complete button clicked - Wash ID:", washId);
        console.log("Complete button clicked - Booking ID:", bookingId);
        
        if (!washId) {
            console.error("No wash ID found on button!");
            showToast("Error: Could not find wash ID", "error");
            return;
        }
        
        // Update wash status
        fetch(`http://localhost:5000/washes/${washId}`, {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ status: "completed" })
        })
        .then(res => {
            console.log("Wash update response status:", res.status);
            return res.json();
        })
        .then(() => {
            // If there's a booking ID, update it too
            if (bookingId && bookingId !== "" && bookingId !== "undefined") {
                console.log("Updating booking:", bookingId);
                return fetch(`http://localhost:5000/bookings/${bookingId}`, {
                    method: "PATCH",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({ bookingStatus: "completed" })
                });
            } else {
                console.log("No booking ID to update (walk-in wash)");
                return Promise.resolve();
            }
        })
        .then(() => {
            showToast("✅ Wash completed successfully!", "success");
            renderStaffDashboard();
        })
        .catch(err => {
            console.error("Error completing wash:", err);
            showToast("Failed to complete wash: " + err.message, "error");
        });
    });
});
        //event listener for initiating payment
        document.querySelectorAll(".pay-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const washId = btn.dataset.id;
        window.selectedWashId = washId;

        Promise.all([
            fetch(`http://localhost:5000/washes/${washId}`).then(res => res.json()),
            fetch(`http://localhost:5000/cars`).then(res => res.json()),
            fetch(`http://localhost:5000/services`).then(res => res.json())
        ])
        .then(([wash, cars, services]) => {

            const car = cars.find(c => c.id === wash.carId);
            const service = services.find(s => s.id === wash.serviceId);

            // ✅ Fill form properly
            document.getElementById("payment_car").value = car?.plateNumber || "N/A";
            document.getElementById("wash_type").value = wash.type;
            document.getElementById("wash_pay_service").value = service?.name || "N/A";
            document.getElementById("booking_id").value = wash.bookingId || "";

            // ✅ Pricing based on service NAME
            const prices = {
                basic: 500,
                deluxe: 1500,
                premium: 3000
            };

            document.getElementById("payment_total").value =
                prices[service?.name?.toLowerCase()] || 0;
        });
    });
});
    })
        
        
    .catch(err => {
        console.error(err);
        showToast("Error loading data", "error");
    });
}

//staff dashboard display functions
//this displays the staff's current washes those that he has started and then he can complete them and initiate payment from there through a button
function currentStaffWashesHTML(currentWashes) {
    return `
<div class="bg-white p-6 rounded-xl shadow mt-6">
    <h3 class="text-lg font-semibold mb-4">Current Wash</h3>

    <div class="overflow-x-auto">
        <table class="min-w-full border border-gray-200">
                
                <table  class="min-w-full text-left border-collapse">

                    <thead class="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
                        <tr>
                            <th class="p-3">Car</th>
                            <th class="p-3">Service</th>
                            <th class="p-3">Date</th>
                            <th class="p-3">Status</th>
                            
                            <th class="p-3">Actions</th>
                        </tr>
                    </thead>

                    
                    
                    <tbody>
                        ${currentWashes.length === 0 
                            ? `
                            <tr>
                                <td colspan="5" class="p-3 text-center text-gray-500">
                                    No current washes
                                </td>
                            </tr>
                        `
                         
                        :currentWashes.map(w => `
                            <tr class="border-t hover:bg-gray-50 transition">
                                    <td class="p-3 font-medium">${w.carPlate}</td>
                                    <td class="p-3 capitalize">${w.serviceName}</td>
                                    <td class="p-3 text-sm text-gray-500">
                                        ${new Date(w.date).toLocaleString()}
                                    </td>

                                    <td class="p-3">
                                        <span class="
                                            px-3 py-1 rounded-full text-xs font-semibold
                                            ${w.status === 'completed'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-yellow-100 text-yellow-700'}
                                        ">
                                            ${w.status}
                                        </span>
                                    </td>

                                    
                                    <td class="p-3">
                                ${w.status === 'started' ? `
                                   <button class="complete-btn bg-green-200 text-green-800 px-2 py-1 rounded mr-2 hover:bg-green-300"
                                        data-wash-id="${w.id}" data-booking-id="${w.bookingId || ''}">
                                    Complete Wash
                                </button>

                                    
                                                                    ` : ""}
                                ${w.status === "completed" && w.paymentStatus === "unpaid" ? `
                                    <button class="pay-btn bg-green-300 text-green-800 px-2 py-1 rounded mr-2 hover:bg-green-400"
                                            data-id="${w.id}">
                                        Pay
                                    </button>

                                    
                                                                    ` : ""}
                                                                    
                            </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>`;
            
}

//this shows washes that have been completed by the staff and payments made
//this function still uses joinWahes() function above to help to map out ids for service and carplate dsiplays same as the current washes above
function washesCompletedByStaff(completedWashes) {
    return `<div class="bg-white p-6 rounded-xl shadow mt-6">
                <h3 class="text-lg font-semibold mb-4">My Washes</h3>

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
                        ${completedWashes.length === 0 
                            ? `
                            <tr>
                                <td colspan="5" class="p-3 text-center text-gray-500">
                                    No washes completed
                                </td>
                            </tr>
                         `
                        :completedWashes.slice(-5).reverse().map(w => `
                                <tr class="border-b hover:bg-gray-50">
                                    <td>${w.carPlate}</td>
                                    <td>${w.serviceName}</td>

                                    <td class="p-3">
                                        <span class="
                                            px-3 py-1 rounded-full text-xs font-semibold
                                            ${w.status === 'completed'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-yellow-100 text-yellow-700'}
                                        ">
                                            ${w.status}
                                        </span>
                                    </td>

                                    <td class="p-3 text-sm text-gray-500">
                                        ${new Date(w.date).toLocaleString()}
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>`;
}

//staff dashboard API functions
function searchCustomerByPhone() {
    let phoneInput = document.getElementById("search_phone").value;

    // Normalize input (remove spaces, etc.)
    phoneInput = phoneInput.replace(/\s/g, "").trim();

    fetch("http://localhost:5000/users")
        .then(res => res.json())
        .then(users => {

            console.log("All users:", users);

            // Find customer safely using normalized comparison
            const customer = users.find(u =>
                u.phone && u.phone.replace(/\s/g, "").trim() === phoneInput
            );

            if (!customer) {
                showToast("New customer — please fill details", "info");
                return;
            }

            console.log("Customer found:", customer);

            //  Fill form
            document.getElementById("walk_first_name").value = customer.firstName;
            document.getElementById("walk_last_name").value = customer.lastName;
            document.getElementById("walk_phone").value = customer.phone;
            document.getElementById("walk_email").value = customer.email;

            //  Load cars for this customer
            loadCustomerCars(customer.id);
        })
        .catch(err => {
            console.error("Error searching customer:", err);
            showToast("Search failed. Try again.", "error");
        });
}
function loadCustomerCars(customerId) {
    fetch(`http://localhost:5000/customer_cars?customerId=${customerId}`)
    .then(res => res.json())
    .then(relations => {

        const select = document.getElementById("car_select");
        if(select) {
            select.innerHTML = `<option value="">Select existing car</option>`;

            relations.forEach(r => {
                fetch(`http://localhost:5000/cars/${r.carId}`)
                .then(res => res.json())
                .then(car => {
                    const option = document.createElement("option");
                    option.value = car.id;
                    option.textContent = `${car.plateNumber} (${car.model || "Unknown"})`;
                    select.appendChild(option);
                });
            });
        }
    });
}
function addCarField() {
    const container = document.getElementById("carContainer");

    const carDiv = document.createElement("div");
    carDiv.classList.add("car-block");

    carDiv.innerHTML = `
        <input placeholder="Plate Number" class="car-plate border p-2 m-1" required />
        <input placeholder="Model" class="car-model border p-2 m-1" required />

        <select class="car-type border p-2 m-1">
            <option>SUV</option>
            <option>Saloon</option>
            <option>Hatchback</option>
            <option>Van / MPV</option>
            <option>Pickup</option>
            <option>Other</option>
        </select>

        <input placeholder="Color" class="car-color border p-2 m-1" required />

        <button type="button" onclick="this.parentElement.remove()" class="text-red-500">
            Remove
        </button>
        <hr/>
    `;

    container.appendChild(carDiv);
}
async function registerCustomerWithCars() {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value;

    const carBlocks = document.querySelectorAll(".car-block");

    // 1. Check customer
    let customers = await fetch("http://localhost:5000/users")
        .then(res => res.json());

    let customer = customers.find(c => c.phone === phone);

    // 2. Create customer if not exists
    if (!customer) {
        customer = await fetch("http://localhost:5000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                firstName,
                lastName,
                phone,
                email,
                role: "user",
                createdAt: new Date().toISOString()
            })
        }).then(res => res.json());
    }

    // 3. Loop cars dynamically
    for (let block of carBlocks) {

        const plate = block.querySelector(".car-plate").value.toUpperCase();
        const model = block.querySelector(".car-model").value;
        const type = block.querySelector(".car-type").value;
        const color = block.querySelector(".car-color").value;

        // check car exists
        let cars = await fetch("http://localhost:5000/cars").then(res => res.json());
        let car = cars.find(c => c.plateNumber === plate);

        let ownershipType = "primary";

        // 4. Create car if not exists
        if (!car) {
            car = await fetch("http://localhost:5000/cars", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    plateNumber: plate,
                    model,
                    type,
                    color,
                    createdAt: new Date().toISOString()
                })
            }).then(res => res.json());
        } else {
            // if car exists → secondary owner
            ownershipType = "secondary";
        }

        // 5. Check if already linked
        let links = await fetch("http://localhost:5000/customer_cars").then(res => res.json());

        let exists = links.find(l =>
            l.customerId === customer.id && l.carId === car.id
        );

        if (exists) continue;

        // 6. Create link
        await fetch("http://localhost:5000/customer_cars", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                customerId: customer.id,
                carId: car.id,
                ownershipType,
                createdAt: new Date().toISOString()
            })
        });
    }

    showToast("Customer & cars registered successfully!", "success");
}
//this records wash of customers who walk in and is used when a staff records wash normally
async function walkInWash() {
    const staff = JSON.parse(localStorage.getItem("user"));

    const firstName = document.getElementById("walk_first_name").value;
    const lastName = document.getElementById("walk_last_name").value;
    const phone = document.getElementById("walk_phone").value;
    const email = document.getElementById("walk_email").value || null;

    const selectedCarId = document.getElementById("car_select").value;
    const serviceId = document.getElementById("wash_service").value;

    if (!firstName || !lastName || !phone || !serviceId) {
        showToast("Fill all required fields", "error");
        return;
    }

    let customerId = null;

    // 1. Get or create customer
    const customers = await fetch(`http://localhost:5000/users?phone=${phone}`)
        .then(res => res.json());

    if (customers.length > 0) {
        customerId = customers[0].id;
    } else {
        const newCustomer = await fetch("http://localhost:5000/users", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                firstName,
                lastName,
                phone,
                email,
                role: "user",
                createdAt: new Date().toISOString()
            })
        }).then(res => res.json());

        customerId = newCustomer.id;
    }

    // 2. Handle car
    let finalCarId = selectedCarId;

    const carBlocks = document.querySelectorAll(".car-block");

    if (!selectedCarId && carBlocks.length > 0) {
        const block = carBlocks[0];

        const plate = block.querySelector(".car-plate").value.toUpperCase();
        const model = block.querySelector(".car-model").value;
        const type = block.querySelector(".car-type").value;
        const color = block.querySelector(".car-color").value;

        const newCar = await fetch("http://localhost:5000/cars", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                plateNumber: plate,
                model,
                type,
                color,
                createdAt: new Date().toISOString()
            })
        }).then(res => res.json());

        finalCarId = newCar.id;

        // link car
        await fetch("http://localhost:5000/customer_cars", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                customerId,
                carId: finalCarId,
                ownershipType: "primary",
                createdAt: new Date().toISOString()
            })
        });
    }

    // 3. Create wash
    await fetch("http://localhost:5000/washes", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            id: Date.now().toString(),
            customerId,
            staffId: staff.id,
            carId: finalCarId,
            serviceId,
            type: "walk-in",
            status: "started",
            date: new Date().toISOString(),
            paymentStatus: "unpaid"
        })
    });

    showToast("Walk-in wash recorded successfully!", "success");
    renderStaffDashboard();
}

//this function is called when a staff starts a wash by clicking on the start button in the manage bookings table
function bookingWash(bookingId, bookings, staffId) {
    const booking = bookings.find(b => b.id == bookingId);

    if (!booking) return;

    const wash = {
        id: Date.now().toString(),
        bookingId: bookingId,
        customerId: booking.customerId,
        staffId: staffId,
        carId: booking.carId,
        serviceId: booking.serviceId,
        type: "booking",
        status: "started",
        date: new Date().toISOString(),
        paymentStatus: "unpaid"
    };

    fetch("http://localhost:5000/washes", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(wash)
    }).then(() => {
        renderStaffDashboard();
    });
}
// changes wash status to complete
function updateWashStatus(washId, status) {
    fetch(`http://localhost:5000/washes/${washId}`, {
        method: "PATCH",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ status })
    })
    .then(res => res.json())
    .then(() => {
        renderStaffDashboard();
    })
    .catch(err => console.error(err));
}

function recordPayment() {
    console.log("recording payment of wash");

    const car = document.getElementById("payment_car").value;
    const method = document.getElementById("payment_method").value;
    const total = parseFloat(document.getElementById("payment_total").value);

    const paymentRef = document.getElementById("payment_ref").value || null;
    const phone = document.getElementById("payment_phone").value || null;

    const mpesaAmount = parseFloat(document.getElementById("mpesa_amount")?.value) || 0;
    const cashAmount = parseFloat(document.getElementById("cash_amount")?.value) || 0;

    const type = document.getElementById("wash_type")?.value;
    const service = document.getElementById("wash_pay_service")?.value;

    const washId = window.selectedWashId;
    const bookingId = document.getElementById("booking_id")?.value;

    //  Validation
    if (!car || !method || !total) {
        showToast("Please fill all required fields", "error");
        return;
    }

    let amount = total;

    if (method === "split") {
        if (mpesaAmount + cashAmount !== total) {
            showToast("Split amounts must equal total amount", "error");
            return;
        }
    }

    // ✅ STEP 1: Fetch wash to get userId
    fetch(`http://localhost:5000/washes/${washId}`)
        .then(res => res.json())
        .then(wash => {

            const payment = {
                id: Date.now().toString(),
                washId: washId,        
                type,
                method,
                amount,
                mpesaAmount,
                cashAmount,
                phone,
                paymentRef,
                date: new Date().toISOString(),
                status: "completed"
            };

            // ✅ STEP 2: Save payment
            return fetch("http://localhost:5000/payments", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(payment)
            });
        })
        .then(res => res.json())

        // ✅ STEP 3: Update statuses
        .then(() => {
            updateWashPaymentStatus(washId, "paid");

            if (bookingId) {
                updateBookingPaymentStatus(bookingId, "paid");
            }
        })

        // ✅ STEP 4: UI feedback
        .then(() => {
            showToast("Payment recorded successfully!", "success");
            renderStaffDashboard();
        })

        .catch(err => {
            console.error(err);
            showToast("Payment failed", "error");
        });
}
//this function displays the phone input field when the mpesa item in dropdown is selected
function togglePhoneField() {
    const method = document.getElementById("payment_method").value;
    const phoneInput = document.getElementById("payment_phone");

    if (method === "mpesa") {
        phoneInput.classList.remove("hidden");
    } else {
        phoneInput.classList.add("hidden");
    }
}
//this function displays additional fields based on the payment method selected
function handlePaymentMethod() {
    const method = document.getElementById("payment_method").value;

    const mpesaFields = document.getElementById("mpesaFields");
    const splitFields = document.getElementById("splitFields");

    if (method === "mpesa") {
        mpesaFields.classList.remove("hidden");
        splitFields.classList.add("hidden");
    } 
    else if (method === "split") {
        mpesaFields.classList.remove("hidden");
        splitFields.classList.remove("hidden");
    } 
    else {
        mpesaFields.classList.add("hidden");
        splitFields.classList.add("hidden");
    }
}
//this function updates wash payment status to paid
function updateWashPaymentStatus(washId, status) {
    fetch(`http://localhost:5000/washes/${washId}`, {
        method: "PATCH",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ paymentStatus: status })
    })
    .then(res => res.json())
    .then(() => {
        renderStaffDashboard();
    })
    .catch(err => console.error(err));
}
//this function updates bookingpayment status to paid
function updateBookingPaymentStatus(bookingId, status) {
    fetch(`http://localhost:5000/bookings/${bookingId}`, {
        method: "PATCH",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ paymentStatus: status })
    })
    .then(res => res.json())
    .then(() => {
        renderStaffDashboard();
    })
    .catch(err => console.error(err));
}
//this function changes booking status to in progress and assigns a staff id of the washing staff to the record
//this function changes booking status and assigns a staff id
function updateBookingStatus(bookingId, status, staffId) {

    console.log(`Updating booking ${bookingId} to status: ${status} and assign to staff: ${staffId}`);
    
    fetch(`http://localhost:5000/bookings/${bookingId}`,{
        method: "PATCH",
        headers:{
            "content-type": "application/json"
        },
        body: JSON.stringify({bookingStatus: status, staffId: staffId})
    })
    .then(res => res.json())
    .then(data => {
        // Show appropriate message based on status
        if (status === "started") {
            showToast("🔧 Wash started! You can now begin the car wash.", "success");
        } else if (status === "completed") {
            showToast("✅ Wash completed successfully!", "success");
        } else if (status === "approved") {
            showToast("✅ Booking approved!", "success");
        } else if (status === "rejected") {
            showToast("❌ Booking rejected", "info");
        } else {
            showToast(`Booking ${status}!`, "success");
        }
        
        if (JSON.parse(localStorage.getItem("user")).role === "staff") {
            renderStaffDashboard();
        } else {
            renderAdminDashboard();
        }
    })
    .catch(err => {
        console.error("Error updating booking status:", err);
        showToast("Failed to update status. Please try again.", "error");
    });
}

//end of staff dashboard API functions

// ADMIN DASHBOARD (COMPLETE - Bookings, Washes, Payments, Cars)
function renderAdminDashboard() {
    showLoading();
    
    Promise.all([
        fetch(`http://localhost:5000/users`).then(res => res.json()),
        fetch(`http://localhost:5000/bookings`).then(res => res.json()),
        fetch(`http://localhost:5000/washes`).then(res => res.json()),
        fetch(`http://localhost:5000/payments`).then(res => res.json()),
        fetch(`http://localhost:5000/cars`).then(res => res.json()),
        fetch(`http://localhost:5000/services`).then(res => res.json()),
        fetch(`http://localhost:5000/customer_cars`).then(res => res.json())
    ])
    .then(([users, bookings, washes, payments, cars, services, customerCars]) => {
        
        // JOIN bookings with cars, services, and users
        const joinedBookings = bookings.map(booking => {
            const car = cars.find(c => c.id === booking.carId);
            const service = services.find(s => s.id === booking.serviceId);
            const customer = users.find(u => u.id === booking.customerId);
            return {
                ...booking,
                carPlate: car?.plateNumber || 'Unknown',
                serviceName: service?.name || 'Unknown',
                customerName: customer ? `${customer.firstName} ${customer.lastName}` : 'Unknown'
            };
        });
        
        // JOIN washes with cars, services, customers, and staff
        const joinedWashes = washes.map(wash => {
            const car = cars.find(c => c.id === wash.carId);
            const service = services.find(s => s.id === wash.serviceId);
            const customer = users.find(u => u.id === wash.customerId);
            const staff = users.find(u => u.id === wash.staffId);
            const payment = payments.find(p => p.washId === wash.id);
            
            return {
                ...wash,
                carPlate: car?.plateNumber || 'Unknown',
                serviceName: service?.name || 'Unknown',
                customerName: customer ? `${customer.firstName} ${customer.lastName}` : 'Unknown',
                staffName: staff ? `${staff.firstName} ${staff.lastName}` : 'Unassigned',
                amount: payment?.amount || 0,
                paymentMethod: payment?.method || 'Not paid',
                paymentStatus: wash.paymentStatus || 'unpaid'
            };
        });
        
        // JOIN payments with wash, car, and user data
        const joinedPayments = payments.map(payment => {
            const wash = washes.find(w => w.id === payment.washId);
            const customer = wash ? users.find(u => u.id === wash.customerId) : null;
            const car = wash ? cars.find(c => c.id === wash.carId) : null;
            const service = wash ? services.find(s => s.id === wash.serviceId) : null;
            const staff = wash ? users.find(u => u.id === wash.staffId) : null;
            
            return {
                ...payment,
                customerName: customer ? `${customer.firstName} ${customer.lastName}` : 'Unknown',
                staffName: staff ? `${staff.firstName} ${staff.lastName}` : 'Unknown',
                carPlate: car?.plateNumber || 'Unknown',
                serviceName: service?.name || 'Unknown',
                date: payment.date || wash?.date || 'Unknown'
            };
        });
        
        // Calculate statistics
        const totalRevenue = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
        const pendingApprovals = bookings.filter(b => b.bookingStatus === 'pending').length;
        const completedWashes = washes.filter(w => w.status === 'completed').length;
        const pendingPayments = washes.filter(w => w.paymentStatus === 'unpaid' && w.status === 'completed').length;
        
        // Prepare cars with owners
        const carsWithOwners = cars.map(car => {
            const customerCar = customerCars.find(cc => cc.carId === car.id);
            const owner = customerCar ? users.find(u => u.id === customerCar.customerId) : null;
            return {
                ...car,
                ownerName: owner ? `${owner.firstName} ${owner.lastName}` : 'Unassigned',
                linked: !!customerCar
            };
        });
        
        app.innerHTML = `
            <div class="max-w-7xl mx-auto p-4">
                <!-- Header -->
                <div class="bg-white p-6 rounded-xl shadow mb-6">
                    <h2 class="text-2xl font-bold">Admin Dashboard</h2>
                    <p class="text-gray-600">Manage bookings, washes, payments, and customers</p>
                </div>
                
                <!-- KPI Cards -->
                <div class="grid md:grid-cols-5 gap-4 mb-6">
                    <div class="bg-white p-4 rounded-xl shadow border-l-4 border-blue-500">
                        <h3 class="text-gray-500 text-sm">Total Users</h3>
                        <p class="text-2xl font-bold">${users.length}</p>
                    </div>
                    <div class="bg-white p-4 rounded-xl shadow border-l-4 border-green-500">
                        <h3 class="text-gray-500 text-sm">Total Bookings</h3>
                        <p class="text-2xl font-bold">${bookings.length}</p>
                    </div>
                    <div class="bg-white p-4 rounded-xl shadow border-l-4 border-yellow-500">
                        <h3 class="text-gray-500 text-sm">Pending Approvals</h3>
                        <p class="text-2xl font-bold">${pendingApprovals}</p>
                    </div>
                    <div class="bg-white p-4 rounded-xl shadow border-l-4 border-purple-500">
                        <h3 class="text-gray-500 text-sm">Completed Washes</h3>
                        <p class="text-2xl font-bold">${completedWashes}</p>
                    </div>
                    <div class="bg-white p-4 rounded-xl shadow border-l-4 border-red-500">
                        <h3 class="text-gray-500 text-sm">Total Revenue</h3>
                        <p class="text-2xl font-bold">Kes ${totalRevenue.toLocaleString()}</p>
                    </div>
                </div>
                
                <!-- Bookings Management -->
                <div class="bg-white p-6 rounded-xl shadow mb-6">
                    <h3 class="text-xl font-bold mb-4"> Manage Bookings</h3>
                    <input type="text" id="searchAdminBookings" placeholder="Search by customer, car, or service..." 
                           class="w-full mb-4 p-2 border rounded">
                    <div class="overflow-x-auto">
                        <table class="min-w-full" id="adminBookingsTable">
                            <thead class="bg-gray-100">
                                <tr>
                                    <th class="p-3 text-left">Customer</th>
                                    <th class="p-3 text-left">Car</th>
                                    <th class="p-3 text-left">Service</th>
                                    <th class="p-3 text-left">Date</th>
                                    <th class="p-3 text-left">Status</th>
                                    <th class="p-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${joinedBookings.length === 0 ? `
                                    <tr><td colspan="6" class="p-3 text-center">No bookings yet</td></tr>
                                ` : joinedBookings.map(booking => `
                                    <tr class="border-t hover:bg-gray-50">
                                        <td class="p-3">${booking.customerName}</td>
                                        <td class="p-3">${booking.carPlate}</td>
                                        <td class="p-3 capitalize">${booking.serviceName}</td>
                                        <td class="p-3">${new Date(booking.date).toLocaleString()}</td>
                                        <td class="p-3">
                                            <span class="px-2 py-1 rounded text-sm ${
                                                booking.bookingStatus === 'pending' ? 'bg-yellow-200' :
                                                booking.bookingStatus === 'approved' ? 'bg-green-200' :
                                                booking.bookingStatus === 'rejected' ? 'bg-red-200' :
                                                booking.bookingStatus === 'started' ? 'bg-orange-200' :
                                                booking.bookingStatus === 'completed' ? 'bg-blue-200' :
                                                'bg-gray-200'
                                            }">
                                                ${booking.bookingStatus}
                                            </span>
                                        </td>
                                        <td class="p-3">
                                            ${booking.bookingStatus === 'pending' ? `
                                                <button class="approve-btn bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600" data-id="${booking.id}">
                                                    Approve
                                                </button>
                                                <button class="reject-btn bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" data-id="${booking.id}">
                                                    Reject
                                                </button>
                                            ` : '—'}
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <!-- Washes Management (NEW! - Shows staff who did the wash) -->
                <div class="bg-white p-6 rounded-xl shadow mb-6">
                    <h3 class="text-xl font-bold mb-4"> Washes Management</h3>
                    <input type="text" id="searchAdminWashes" placeholder="Search by customer, car, staff, or service..." 
                           class="w-full mb-4 p-2 border rounded">
                    <div class="overflow-x-auto">
                        <table class="min-w-full" id="adminWashesTable">
                            <thead class="bg-gray-100">
                                <tr>
                                    <th class="p-3 text-left">Customer</th>
                                    <th class="p-3 text-left">Car</th>
                                    <th class="p-3 text-left">Service</th>
                                    <th class="p-3 text-left">Staff</th>
                                    <th class="p-3 text-left">Type</th>
                                    <th class="p-3 text-left">Status</th>
                                    <th class="p-3 text-left">Payment</th>
                                    <th class="p-3 text-left">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${joinedWashes.length === 0 ? `
                                    <tr><td colspan="8" class="p-3 text-center">No washes recorded yet</td></tr>
                                ` : joinedWashes.map(wash => `
                                    <tr class="border-t hover:bg-gray-50">
                                        <td class="p-3">${wash.customerName}</td>
                                        <td class="p-3 font-mono">${wash.carPlate}</td>
                                        <td class="p-3 capitalize">${wash.serviceName}</td>
                                        <td class="p-3">
                                            ${wash.staffName !== 'Unassigned' ? 
                                                `<span class="text-blue-600">${wash.staffName}</span>` : 
                                                `<span class="text-gray-400">${wash.staffName}</span>`
                                            }
                                        </td>
                                        <td class="p-3">
                                            <span class="px-2 py-1 rounded text-xs ${
                                                wash.type === 'booking' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                                            }">
                                                ${wash.type || 'N/A'}
                                            </span>
                                        </td>
                                        <td class="p-3">
                                            <span class="px-2 py-1 rounded text-xs font-semibold ${
                                                wash.status === 'completed' ? 'bg-green-100 text-green-700' :
                                                wash.status === 'started' ? 'bg-orange-100 text-orange-700' :
                                                'bg-gray-100 text-gray-700'
                                            }">
                                                ${wash.status || 'pending'}
                                            </span>
                                        </td>
                                        <td class="p-3">
                                            <span class="px-2 py-1 rounded text-xs font-semibold ${
                                                wash.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }">
                                                ${wash.paymentStatus === 'paid' ? 'Paid' : 'Unpaid'}
                                            </span>
                                            ${wash.paymentStatus === 'paid' ? `<span class="text-xs text-gray-500 block">Kes ${wash.amount}</span>` : ''}
                                        </td>
                                        <td class="p-3 text-sm">${new Date(wash.date).toLocaleString()}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                    <div class="mt-4 p-3 bg-gray-50 rounded">
                        <p class="text-sm text-gray-600">
                            <strong>Total Washes:</strong> ${washes.length} 
                            | <strong>Completed:</strong> ${washes.filter(w => w.status === 'completed').length}
                            | <strong>Pending Payment:</strong> ${washes.filter(w => w.paymentStatus === 'unpaid' && w.status === 'completed').length}
                        </p>
                    </div>
                </div>
                
                <!-- Payments Management -->
                <div class="bg-white p-6 rounded-xl shadow mb-6">
                    <h3 class="text-xl font-bold mb-4"> Payments Management</h3>
                    <input type="text" id="searchAdminPayments" placeholder="Search by customer, car, or staff..." 
                           class="w-full mb-4 p-2 border rounded">
                    <div class="overflow-x-auto">
                        <table class="min-w-full" id="adminPaymentsTable">
                            <thead class="bg-gray-100">
                                <tr>
                                    <th class="p-3 text-left">Customer</th>
                                    <th class="p-3 text-left">Car</th>
                                    <th class="p-3 text-left">Service</th>
                                    <th class="p-3 text-left">Staff</th>
                                    <th class="p-3 text-left">Amount</th>
                                    <th class="p-3 text-left">Method</th>
                                    <th class="p-3 text-left">Reference</th>
                                    <th class="p-3 text-left">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${joinedPayments.length === 0 ? `
                                    <tr><td colspan="8" class="p-3 text-center">No payments recorded yet</td></tr>
                                ` : joinedPayments.map(payment => `
                                    <tr class="border-t hover:bg-gray-50">
                                        <td class="p-3">${payment.customerName}</td>
                                        <td class="p-3 font-mono">${payment.carPlate}</td>
                                        <td class="p-3 capitalize">${payment.serviceName}</td>
                                        <td class="p-3"> ${payment.staffName}</td>
                                        <td class="p-3 font-semibold text-green-600">Kes ${payment.amount}</td>
                                        <td class="p-3 capitalize">${payment.method || 'N/A'}</td>
                                        <td class="p-3 text-sm">${payment.paymentRef || '—'}</td>
                                        <td class="p-3 text-sm">${new Date(payment.date).toLocaleString()}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <!-- Cars Management -->
                <div class="bg-white p-6 rounded-xl shadow">
                    <h3 class="text-xl font-bold mb-4">🚗 Cars Management</h3>
                    <div class="overflow-x-auto">
                        <table class="min-w-full">
                            <thead class="bg-gray-100">
                                <tr>
                                    <th class="p-3 text-left">Plate Number</th>
                                    <th class="p-3 text-left">Model</th>
                                    <th class="p-3 text-left">Type</th>
                                    <th class="p-3 text-left">Color</th>
                                    <th class="p-3 text-left">Owner</th>
                                    <th class="p-3 text-left">Source</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${carsWithOwners.length === 0 ? `
                                    <tr><td colspan="6" class="p-3 text-center">No cars found</td></tr>
                                ` : carsWithOwners.map(car => `
                                    <tr class="border-t hover:bg-gray-50">
                                        <td class="p-3 font-mono">${car.plateNumber}</td>
                                        <td class="p-3">${car.model}</td>
                                        <td class="p-3">${car.type || 'N/A'}</td>
                                        <td class="p-3">${car.color || 'N/A'}</td>
                                        <td class="p-3">
                                            ${car.ownerName !== 'Unassigned' ? 
                                                `<span class="text-green-600">${car.ownerName}</span>` : 
                                                `<span class="text-gray-400">${car.ownerName}</span>`
                                            }
                                        </td>
                                        <td class="p-3">
                                            ${car.linked ? 
                                                '<span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">User Added</span>' : 
                                                '<span class="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">System</span>'
                                            }
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                    
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add search functionality for admin bookings
        const searchBookingsInput = document.getElementById("searchAdminBookings");
        if(searchBookingsInput) {
            searchBookingsInput.addEventListener("input", (e) => {
                const searchTerm = e.target.value.toLowerCase();
                const rows = document.querySelectorAll("#adminBookingsTable tbody tr");
                rows.forEach(row => {
                    const text = row.innerText.toLowerCase();
                    row.style.display = text.includes(searchTerm) ? "" : "none";
                });
            });
        }
        
        // Add search functionality for admin washes
        const searchWashesInput = document.getElementById("searchAdminWashes");
        if(searchWashesInput) {
            searchWashesInput.addEventListener("input", (e) => {
                const searchTerm = e.target.value.toLowerCase();
                const rows = document.querySelectorAll("#adminWashesTable tbody tr");
                rows.forEach(row => {
                    const text = row.innerText.toLowerCase();
                    row.style.display = text.includes(searchTerm) ? "" : "none";
                });
            });
        }
        
        // Add search functionality for admin payments
        const searchPaymentsInput = document.getElementById("searchAdminPayments");
        if(searchPaymentsInput) {
            searchPaymentsInput.addEventListener("input", (e) => {
                const searchTerm = e.target.value.toLowerCase();
                const rows = document.querySelectorAll("#adminPaymentsTable tbody tr");
                rows.forEach(row => {
                    const text = row.innerText.toLowerCase();
                    row.style.display = text.includes(searchTerm) ? "" : "none";
                });
            });
        }
        
        // Attach event listeners for bookings
        document.querySelectorAll(".approve-btn").forEach(btn => {
            btn.addEventListener("click", () => updateBookingStatus(btn.dataset.id, "approved", null));
        });
        document.querySelectorAll(".reject-btn").forEach(btn => {
            btn.addEventListener("click", () => updateBookingStatus(btn.dataset.id, "rejected", null));
        });
    })
    .catch(err => {
        console.error(err);
        app.innerHTML = `<div class="text-center text-red-500 p-8">Error loading admin dashboard: ${err.message}</div>`;
    });
}
// Add new car function 
function addNewCar() {
    const plate = document.getElementById("new_plate")?.value.toUpperCase();
    const model = document.getElementById("new_model")?.value;
    const type = document.getElementById("new_type")?.value;
    const color = document.getElementById("new_color")?.value;
    
    if (!plate || !model || !type || !color) {
        showToast("Please fill all car fields", "error");
        return;
    }
    
    const newCar = {
        id: Date.now().toString(),
        plateNumber: plate,
        model: model,
        type: type,
        color: color,
        createdAt: new Date().toISOString()
    };
    
    fetch("http://localhost:5000/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCar)
    })
    .then(res => res.json())
    .then(() => {
        showToast("Car added successfully!", "success");
        renderAdminDashboard();
    })
    .catch(err => {
        console.error(err);
        showToast("Failed to add car", "error");
    });
}

// API FUNCTIONS

// Initialize app
initApp();

// Listen for hash changes
window.addEventListener("hashchange", () => {
    const page = window.location.hash.slice(1) || "home";
    navigate(page);
});