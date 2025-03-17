document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        document.getElementById(targetId).scrollIntoView({ behavior: "smooth" });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    let imageCarousel = new bootstrap.Carousel(document.getElementById("imageCarousel"), {
        interval: 3000, // Auto-slide every 3 seconds
        ride: "carousel"
    });
});


document.getElementById("darkModeToggle").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        this.innerHTML = "☀️";
        this.classList.remove("btn-outline-light");
        this.classList.add("btn-outline-dark");
    } else {
        this.innerHTML = "🌙";
        this.classList.remove("btn-outline-dark");
        this.classList.add("btn-outline-light");
    }
});


async function fetchVideos() {
    const API_KEY = "AIzaSyCqtkjnU54D8IJBHLAIDFGUfAvyJfe4Z0I";  // 👈 Apni YouTube API Key paste karo
    const CHANNEL_ID = "UC0jiPBcE-2QbiBLt2m3MHSQ";  // 👈 Apna YouTube Channel ID paste karo
    const apiURL = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=10`;

    try {
        const response = await fetch(apiURL);
        const data = await response.json();

        const videoContainer = document.getElementById("video-container");
        videoContainer.innerHTML = ""; // Purana content clear karo

        data.items.forEach(item => {
            if (item.id.videoId) {
                const videoCard = document.createElement("div");
                videoCard.classList.add("col-12", "col-md-6");
                videoCard.innerHTML = `
                    <div class="card">
                        <iframe class="card-img-top" width="100%" height="200" 
                            src="https://www.youtube.com/embed/${item.id.videoId}" 
                            allowfullscreen></iframe>
                    </div>
                `;
                videoContainer.appendChild(videoCard);
            }
        });
    } catch (error) {
        console.error("Error fetching videos:", error);
    }
}

// ✅ Call function on page load
document.addEventListener("DOMContentLoaded", fetchVideos);
