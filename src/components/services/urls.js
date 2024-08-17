// Constants for the project ID and the URL.
const projectID = 't5c9j4xe83w6'; // Unique identifier for the project.
const url = 'https://academics.newtonschool.co/api/v1/bookingportals'; // API endpoint URL.
const authToken = 'Bearer ' + sessionStorage.getItem('authToken');

// Exporting the constants to make them available to other parts of the application.
export { projectID, url, authToken };
