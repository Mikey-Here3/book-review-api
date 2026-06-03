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

// Task 12: Search by Author
const searchByAuthor = async (author) => {
    try {
        const response = await axios.get(`${BASE_URL}/author/${author}`);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Task 13: Search by Title
const searchByTitle = async (title) => {
    try {
        const response = await axios.get(`${BASE_URL}/title/${title}`);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Test / Verification execution
async function runTests() {
    console.log("--- Starting client verification tests ---");
    
    // Test Task 10
    console.log("\nTesting Task 10: Get all books using async callback:");
    getAllBooks((err, data) => {
        if (err) {
            console.error("Task 10 Failed:", err.message);
        } else {
            console.log("Task 10 Success! All books:\n", JSON.stringify(data, null, 2));
        }
    });

    // Wait a brief moment to avoid log interleaving
    await new Promise(r => setTimeout(r, 500));

    // Test Task 11
    console.log("\nTesting Task 11: Search by ISBN using Promises:");
    searchByISBN("1")
        .then(data => {
            console.log("Task 11 Success! Book details:\n", JSON.stringify(data, null, 2));
        })
        .catch(err => {
            console.error("Task 11 Failed:", err);
        });

    await new Promise(r => setTimeout(r, 500));

    // Test Task 12
    console.log("\nTesting Task 12: Search by Author using async/await:");
    try {
        const authorBooks = await searchByAuthor("Unknown");
        console.log("Task 12 Success! Books by Author:\n", JSON.stringify(authorBooks, null, 2));
    } catch (err) {
        console.error("Task 12 Failed:", err.message);
    }

    await new Promise(r => setTimeout(r, 500));

    // Test Task 13
    console.log("\nTesting Task 13: Search by Title using async/await:");
    try {
        const titleBooks = await searchByTitle("The Divine Comedy");
        console.log("Task 13 Success! Books matching Title:\n", JSON.stringify(titleBooks, null, 2));
    } catch (err) {
        console.error("Task 13 Failed:", err.message);
    }
}

// Run tests if called directly
if (require.main === module) {
    runTests();
}

module.exports = {
    getAllBooks,
    searchByISBN,
    searchByAuthor,
    searchByTitle
};
