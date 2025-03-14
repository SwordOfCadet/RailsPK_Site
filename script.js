document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll("nav ul li a").forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            document.getElementById(targetId).scrollIntoView({ behavior: "smooth" });
        });
    });
});

// Dark Mode Toggle Button
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

document.addEventListener("DOMContentLoaded", function () {
    const API_KEY = "AIzaSyDCG-5z6oNHTydx7kpzOUk0umHAs0JySrw"; // 👈 Yahan apni API key paste karo
    const CHANNEL_ID = "UC0jiPBcE-2QbiBLt2m3MHSQ"; // 👈 Yahan apne YouTube channel ka ID paste karo
    const videoContainer = document.getElementById("video-container");
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    let nextPageToken = "";
    let videosToShow = 6; // Pehle sirf 6 videos dikhayenge

    function fetchVideos(loadMore = false) {
        let apiURL = `https://www.googleapis.com/youtube/v3/search?key=${AIzaSyDCG-5z6oNHTydx7kpzOUk0umHAs0JySrw}&channelId=${UC0jiPBcE-2QbiBLt2m3MHSQ}&part=snippet,id&order=date&maxResults=${videosToShow}`;
        
        if (loadMore && nextPageToken) {
            apiURL += `&pageToken=${nextPageToken}`;
        }

        fetch(apiURL)
            .then(response => response.json())
            .then(data => {
                nextPageToken = data.nextPageToken || "";
                
                if (!loadMore) {
                    videoContainer.innerHTML = ""; // Clear previous content if first load
                }

                data.items.forEach(item => {
                    if (item.id.videoId) {
                        const videoCard = document.createElement("div");
                        videoCard.classList.add("col-12", "col-md-6");
                        videoCard.innerHTML = `
                            <div class="card">
                                <iframe class="card-img-top" width="100%" height="200" src="https://www.youtube.com/embed/${item.id.videoId}" allowfullscreen></iframe>
                            </div>
                        `;
                        videoContainer.appendChild(videoCard);
                    }
                });

                // Hide Load More button if no more videos
                if (!nextPageToken) {
                    loadMoreBtn.style.display = "none";
                }
            })
            .catch(error => console.error("Error fetching videos:", error));
    }

    loadMoreBtn.addEventListener("click", function () {
        fetchVideos(true);
    });

    fetchVideos(); // Initial fetch
});