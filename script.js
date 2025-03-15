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
    const API_KEY = "AIzaSyCqtkjnU54D8IJBHLAIDFGUfAvyJfe4Z0I"; // 👈 Yahan apni API key paste karo
    const CHANNEL_ID = "UC0jiPBcE-2QbiBLt2m3MHSQ"; // 👈 Yahan apna YouTube channel ID paste karo
    const videoContainer = document.getElementById("video-container");
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    let nextPageToken = "";
    let videosToShow = 6; // Pehle sirf 6 videos dikhayenge

    function fetchVideos(loadMore = false) {
        let apiURL = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${videosToShow}`;

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

// Fetch Trending Videos Using YouTube API //

document.addEventListener("DOMContentLoaded", function () {
    const API_KEY = "AIzaSyCqtkjnU54D8IJBHLAIDFGUfAvyJfe4Z0I"; // 👈 Yahan apni API key paste karo
    const CHANNEL_ID = "UC0jiPBcE-2QbiBLt2m3MHSQ"; // 👈 Yahan apna YouTube channel ID paste karo
    const trendingContainer = document.getElementById("trending-video-container");
    const loadMoreTrendingBtn = document.getElementById("loadMoreTrendingBtn");
    let trendingPageToken = "";
    let trendingVideosToShow = 6; // Pehle sirf 6 videos dikhayenge

    function fetchTrendingVideos(loadMore = false) {
        let apiURL = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=viewCount&maxResults=${trendingVideosToShow}`;

        if (loadMore && trendingPageToken) {
            apiURL += `&pageToken=${trendingPageToken}`;
        }

        fetch(apiURL)
            .then(response => response.json())
            .then(data => {
                trendingPageToken = data.nextPageToken || "";

                if (!loadMore) {
                    trendingContainer.innerHTML = ""; // Clear previous content if first load
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
                        trendingContainer.appendChild(videoCard);
                    }
                });

                // Hide Load More button if no more videos
                if (!trendingPageToken) {
                    loadMoreTrendingBtn.style.display = "none";
                }
            })
            .catch(error => console.error("Error fetching trending videos:", error));
    }

    loadMoreTrendingBtn.addEventListener("click", function () {
        fetchTrendingVideos(true);
    });

    fetchTrendingVideos(); // Initial fetch
});
