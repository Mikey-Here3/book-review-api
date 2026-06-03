const axios = require('axios');

const BASE_URL = "http://localhost:5000";

// Task 11: Search by ISBN – Using Promises
const searchByISBN = (isbn) => {
    return new Promise((resolve, reject) => {
        axios.get(`${BASE_URL}/isbn/${isbn}`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error.message);
            });
    });
};

// Example Usage
searchByISBN("1")
    .then(data => {
        console.log("Book Details (Promise):\n", JSON.stringify(data, null, 2));
    })
    .catch(err => {
        console.error("Error:", err);
    });
