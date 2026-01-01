// Signup function
function signup() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!name || !email || !password) {
    alert("All fields are required");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters long");
    return;
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address");
    return;
  }

  // Check if user already exists
  const existingUser = JSON.parse(localStorage.getItem("user"));
  if (existingUser && existingUser.email === email) {
    alert("This email is already registered. Please login instead.");
    window.location.href = "login.html";
    return;
  }

  // Store user data
  localStorage.setItem("user", JSON.stringify({ name, email, password }));
  alert("Signup successful! Please login to continue.");
  window.location.href = "login.html";
}

// Login function
function login() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;
  const user = JSON.parse(localStorage.getItem("user"));

  if (!email || !password) {
    alert("Please enter both email and password");
    return;
  }

  if (!user) {
    alert("No account found. Please signup first.");
    window.location.href = "signup.html";
    return;
  }

  if (email === user.email && password === user.password) {
    localStorage.setItem("loggedIn", "true");
    alert("Login successful!");
    window.location.href = "index.html";
  } else {
    alert("Invalid email or password. Please try again.");
  }
}

// Check authentication
function checkAuth() {
  const loggedIn = localStorage.getItem("loggedIn");
  const user = JSON.parse(localStorage.getItem("user"));
  
  if (loggedIn !== "true") {
    window.location.href = "login.html";
    return;
  }

  // Display user initial in avatar
  if (user && user.name) {
    const avatar = document.getElementById("userAvatar");
    if (avatar) {
      avatar.textContent = user.name.charAt(0).toUpperCase();
    }
  }
}

// Check if already logged in (for auth pages)
function checkAlreadyLoggedIn() {
  if (localStorage.getItem("loggedIn") === "true") {
    window.location.href = "index.html";
  }
}

// Logout function
function logout() {
  if (confirm("Are you sure you want to logout?")) {
    localStorage.removeItem("loggedIn");
    alert("Logged out successfully!");
    window.location.href = "home.html";
  }
}