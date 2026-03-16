document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const errorMsg = document.getElementById("error-msg");

  loginForm.addEventListener("submit", function (e) {
    
    e.preventDefault();

    
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

   
    if (username === "admin" && password === "admin123") {
      
      window.location.href = "index.html";

    } else {
      
      errorMsg.classList.remove("hidden");
      
      
      document.getElementById("password").value = "";
      
      
      setTimeout(() => {
        errorMsg.classList.add("hidden");
      }, 3000);
    }
  });
});