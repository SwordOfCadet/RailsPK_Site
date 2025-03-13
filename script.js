document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll("nav ul li a").forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            document.getElementById(targetId).scrollIntoView({ behavior: "smooth" });
        });
    });
});

// Dark Mode Toggle
document.getElementById("darkModeToggle").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
    
    // Button Icon Change
    if (document.body.classList.contains("dark-mode")) {
        this.innerHTML = "☀️";
        this.classList.remove("btn-light");
        this.classList.add("btn-dark");
    } else {
        this.innerHTML = "🌙";
        this.classList.remove("btn-dark");
        this.classList.add("btn-light");
    }
});

