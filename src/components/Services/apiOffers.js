// Import statements
// Paths
import { projectID, url } from "./urls";

// Function to fetch all offers with a limit of 146
export async function getOffers() {
  // Sending a GET request to fetch all offers
  const response = await fetch(`${url}/offers?limit=146`, {
    headers: {
      projectID: `${projectID}`,
    },
  });

  // Check if the response is not OK, and throw an error
  if (!response.ok) throw new Error("Something went wrong while fetching data");

  // Return the response data as JSON
  return response.json();
}

// Function to fetch offers by a specific filter type with a limit of 146
export async function getOffersByFilter(clickedType) {
  // Create a filter object with the provided type
  const filter = { type: clickedType };

  // Sending a GET request to fetch offers based on the filter
  const response = await fetch(
    `${url}/offers?filter=${JSON.stringify(filter)}&limit=146`,
    {
      headers: {
        projectID: `${projectID}`,
      },
    },
  );

  // Check if the response is not OK, and throw an error
  if (!response.ok) throw new Error("Something went wrong while fetching data");

  // Return the response data as JSON
  return response.json();
}
