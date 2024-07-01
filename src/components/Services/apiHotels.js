import { projectID, url } from "./urls";

export async function getHotelCities() {
  const response = await fetch(`${url}/city`, {
    headers: { projectID: `${projectID}` },
  });
  if (!response.ok) throw new Error("Something went wrong while fetching data");

  return response.json();
}

export async function getHotelsPresentInCities(cityName) {
  if (cityName) {
    const response = await fetch(`${{ url }}/hotel/${cityName}`, {
      headers: { projectID: `${projectID}` },
    });
    if (!response.ok)
      throw new Error("Something went wrong while fetching data");
  }

  return null;
}
