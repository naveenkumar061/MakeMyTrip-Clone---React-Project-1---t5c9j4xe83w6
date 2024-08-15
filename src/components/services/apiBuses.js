import { projectID, url } from './urls';

export async function getBusesSortByName(source, destination, day) {
  const travelInfo = {
    source,
    destination,
  };
  const name = { name: 1 };
  const response = await fetch(
    `${url}/bus?search=${JSON.stringify(
      travelInfo
    )}&day=${day}&sort=${JSON.stringify(name)}`,
    {
      headers: {
        projectID: projectID,
      },
    }
  );
  if (!response.ok) throw new Error('Something went wrong while fetching data');
  return response.json();
}
