const axios = require('axios');

const BASE_URL = "http://localhost:5000";

// Task 12: Search by Author
const searchByAuthor = async (author) => {
    try {
        const response = await axios.get(`${BASE_URL}/author/${author}`);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Example Usage
(async () => {
    try {
        const books = await searchByAuthor("Unknown");
        console.log("Books by Author (Async/Await):\n", JSON.stringify(books, null, 2));
    } catch (err) {
        console.error("Error:", err.message);
    }
})();
