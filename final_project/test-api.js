const axios = require('axios');

const BASE_URL = "http://localhost:5000";

// Use an axios instance to maintain session/cookies
const sessionAxios = axios.create({
    baseURL: BASE_URL,
    withCredentials: true // needed if using sessions with cookies
});

// Since axios doesn't support session persistence out of the box in Node.js (cookies are ignored by default in Node Axios),
// we will intercept cookies manually or use a cookie jar, OR we can just pass the session cookie header manually.
let cookieHeader = '';

async function runApiTests() {
    console.log("--- Starting API Routes Verification (Tasks 1-9) ---");

    const uniqueUsername = "testuser_" + Math.floor(Math.random() * 1000000);
    try {
        // 1. Register User (Task 6)
        console.log("\nTesting Task 6: Registering new user...");
        const registerRes = await axios.post(`${BASE_URL}/register`, {
            username: uniqueUsername,
            password: "password123"
        });
        console.log("Register Response:", registerRes.data);

        // 2. Login User (Task 7)
        console.log("\nTesting Task 7: Logging in as registered user...");
        const loginRes = await axios.post(`${BASE_URL}/customer/login`, {
            username: uniqueUsername,
            password: "password123"
        });
        console.log("Login Response Status:", loginRes.status);
        console.log("Login Response Data:", loginRes.data);

        // Extract session cookie from headers
        const setCookie = loginRes.headers['set-cookie'];
        if (setCookie) {
            cookieHeader = setCookie[0];
            console.log("Session Cookie obtained successfully.");
        }

        // 3. Add/Modify review (Task 8)
        console.log("\nTesting Task 8: Adding/Modifying review for ISBN 1...");
        const addReviewRes = await axios.put(`${BASE_URL}/customer/auth/review/1?review=Amazing book! Highly recommended.`, {}, {
            headers: {
                'Cookie': cookieHeader
            }
        });
        console.log("Add Review Response:", addReviewRes.data);

        // 4. Get Reviews to verify (Task 5)
        console.log("\nTesting Task 5: Getting book reviews for ISBN 1...");
        const getReviewsRes = await axios.get(`${BASE_URL}/review/1`);
        console.log("Reviews for ISBN 1:", getReviewsRes.data);

        // 5. Delete review (Task 9)
        console.log("\nTesting Task 9: Deleting review for ISBN 1...");
        const deleteReviewRes = await axios.delete(`${BASE_URL}/customer/auth/review/1`, {
            headers: {
                'Cookie': cookieHeader
            }
        });
        console.log("Delete Review Response:", deleteReviewRes.data);

        // 6. Get Reviews again to confirm deletion
        console.log("\nGetting reviews for ISBN 1 again to verify deletion...");
        const getReviewsResAfter = await axios.get(`${BASE_URL}/review/1`);
        console.log("Reviews for ISBN 1 after deletion:", getReviewsResAfter.data);

    } catch (error) {
        console.error("Test failed with error:", error.response ? error.response.data : error.message);
    }
}

runApiTests();
