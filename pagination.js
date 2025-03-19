"use strict";

async function fetchPosts(page) {
    const url = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(`Posts from page ${page}:`, json);
    } catch (error) {
        console.error(`Error fetching page ${page}:`, error.message);
    }
}

// Test the function by fetching page 1 and page 2
fetchPosts(1);
fetchPosts(2);
