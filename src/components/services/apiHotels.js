import { projectID, url } from './urls';

export async function getHotelCities() {
  const response = await fetch(`${url}/city`, {
    headers: { projectID: `${projectID}` },
  });
  if (!response.ok) throw new Error('Something went wrong while fetching data');

  return response.json();
}

export async function getHotelsPresentInCities(cityName) {
  const location = { location: cityName };

  const response = await fetch(
    `${url}/hotel?search=${JSON.stringify(location)}&limit=30`,
    {
      headers: { projectID: `${projectID}` },
    }
  );
  if (!response.ok) throw new Error('Something went wrong while fetching data');

  return response.json();
}

export async function getHotelById(id) {
  const response = await fetch(`${url}/hotel/${id}`, {
    headers: { projectID: `${projectID}` },
  });
  if (!response.ok) throw new Error('Something went wrong while fetching data');

  return response.json();
}
