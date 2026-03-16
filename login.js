document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const errorMsg = document.getElementById("error-msg");

  loginForm.addEventListener("submit", function (e) {
    // 1. Prevent the page from refreshing
    e.preventDefault();

    // 2. Get the input values
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // 3. Logic: Check credentials
    if (username === "admin" && password === "admin123") {
      // SUCCESS: Redirect to the dashboard
      // Ensure your main file is named 'dashboard.html' or 'index.html'
      window.location.href = "index.html";
    } else {
      // FAILURE: Show the error message and highlight the error
      errorMsg.classList.remove("hidden");
      
      // Optional: Clear the password field for security
      document.getElementById("password").value = "";
      
      // Optional: Hide error after 3 seconds
      setTimeout(() => {
        errorMsg.classList.add("hidden");
      }, 3000);
    }
  });
});