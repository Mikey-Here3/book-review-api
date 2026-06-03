const axios = require('axios');

const BASE_URL = "http://localhost:5000";

// Task 13: Search by Title
const searchByTitle = async (title) => {
    try {
        const response = await axios.get(`${BASE_URL}/title/${title}`);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Example Usage
(async () => {
    try {
        const books = await searchByTitle("The Divine Comedy");
        console.log("Books matching Title (Async/Await):\n", JSON.stringify(books, null, 2));
    } catch (err) {
        console.error("Error:", err.message);
    }
})();
