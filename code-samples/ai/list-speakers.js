const RC = require('@ringcentral/sdk').SDK;
require('dotenv').config();

// Initialize the RingCentral SDK and Platform
const rcsdk = new RC({
    'server':       process.env.RC_SERVER_URL,
    'clientId':     process.env.RC_CLIENT_ID,
    'clientSecret': process.env.RC_CLIENT_SECRET
});

const platform = rcsdk.platform();

// Authenticate with RingCentral Developer Platdorm using Developer's JWT Credential
platform.login({
    'jwt': process.env.RC_JWT
});

// Call the Speaker Enrollment API right after login asynchronously
platform.on(platform.events.loginSuccess, () => {
    getEnrolledSpeakers();
})

async function getEnrolledSpeakers() {
    try {
        console.log("Retreiving Data for all enrolled speakers");
        let resp = await platform.get("ai/audio/v1/sync/enrollments");
        console.log("Enrolled speaker data: ", resp);
    } 
    catch (e) {
        console.log("An error occurred : " + e.message);
    }
}

