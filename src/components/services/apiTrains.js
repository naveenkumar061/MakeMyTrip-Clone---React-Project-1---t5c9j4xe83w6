import { projectID, url } from './urls';

export async function getTrainSortBySeats(source, destination, day) {
  const travelInfo = {
    source,
    destination,
  };
  const seats = { availableSeats: 1 };
  const response = await fetch(
    `${url}/train?search=${JSON.stringify(
      travelInfo
    )}&day=${day}&sort=${JSON.stringify(seats)}`,
    {
      headers: {
        projectID: projectID,
      },
    }
  );
  if (!response.ok) throw new Error('Something went wrong while fetching data');
  return response.json();
}
