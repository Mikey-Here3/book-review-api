const axios = require('axios');

const BASE_URL = "http://localhost:5000";

// Task 10: Get all books – Using async callback function
const getAllBooks = (callback) => {
    axios.get(`${BASE_URL}/`)
        .then(response => {
            callback(null, response.data);
        })
        .catch(error => {
            callback(error, null);
        });
};

// Example Usage
getAllBooks((err, data) => {
    if (err) {
        console.error("Error fetching books:", err.message);
    } else {
        console.log("All Books (Callback):\n", JSON.stringify(data, null, 2));
    }
});
