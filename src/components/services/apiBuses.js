import { projectID, url } from './urls';

export async function getBusesSortByPrice(source, destination, day) {
  const travelInfo = {
    source,
    destination,
  };
  const price = { ticketPrice: 1 };
  const response = await fetch(
    `${url}/bus?search=${JSON.stringify(
      travelInfo
    )}&day=${day}&sort=${JSON.stringify(price)}`,
    {
      headers: {
        projectID: projectID,
      },
    }
  );
  if (!response.ok) throw new Error('Something went wrong while fetching data');
  return response.json();
}
