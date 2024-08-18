import { authToken, projectID, url } from './urls';

export async function getBookingList() {
  const response = await fetch(`${url}/booking`, {
    headers: {
      projectID: projectID,
      Authorization: authToken,
    },
  });
  if (!response.ok) throw new Error('Something went wrong while fetching data');

  return response.json();
}

export async function flightBook({ flightId, startDate, endDate }) {
  try {
    const response = await fetch(`${url}/booking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        projectID: projectID,
        Authorization: authToken,
      },
      body: JSON.stringify({
        bookingType: 'flight',
        bookingDetails: {
          flightId,
          startDate,
          endDate,
        },
      }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Failed to post');
      }
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to post booking');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error(
      error.message ||
        'An error occurred while logging in. Please provide the correct email and password.'
    );
  }
}

export async function hotelBook({ hotelId, startDate, endDate }) {
  console.log(hotelId);
  try {
    const response = await fetch(`${url}/booking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        projectID: projectID,
        Authorization: authToken,
      },
      body: JSON.stringify({
        bookingType: 'hotel',
        bookingDetails: {
          hotelId,
          startDate,
          endDate,
        },
      }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Failed to post');
      }
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to post booking');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error(
      error.message ||
        'An error occurred while logging in. Please provide the correct email and password.'
    );
  }
}
