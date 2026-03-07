//login section
const login = () => {
    const username = document.getElementById("Username").value;
    const password = document.getElementById("Password").value;

    if (username === "admin" && password === "admin123") {
        window.location.assign("home.html");
      
    }
    else {
        alert("Login failed");
       
    }
};