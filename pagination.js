"use strict";

let currentPage = 1;
const postContainer = document.getElementById("post-container");
const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");

let lastRequestTime = 0;
const RATE_LIMIT_DELAY = 2000; // 2 second

async function fetchPosts(page) {
    const currentTime = Date.now();
    if (currentTime - lastRequestTime < RATE_LIMIT_DELAY) {
        console.warn("Too many requests! Please wait.");
        return;
    }
    lastRequestTime = currentTime;

    const url = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const posts = await response.json();
        renderPosts(posts);
    } catch (error) {
        console.error(`Error fetching page ${page}:`, error.message);
    }
}

function renderPosts(posts) {
    postContainer.innerHTML = ""; // Clear previous posts

    posts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");
        postElement.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
        postContainer.appendChild(postElement);
    });

    // Enable/disable pagination buttons
    prevButton.disabled = currentPage === 1;
}

// Button event listeners with rate-limited fetch
prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        fetchPosts(currentPage);
    }
});

nextButton.addEventListener("click", () => {
    currentPage++;
    fetchPosts(currentPage);
});

// Initial fetch
fetchPosts(currentPage);
