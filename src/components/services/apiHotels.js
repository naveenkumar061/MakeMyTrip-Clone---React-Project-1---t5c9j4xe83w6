import { projectID, url } from "./urls";

export async function getHotelCities() {
  const response = await fetch(`${url}/city`, {
    headers: { projectID: `${projectID}` },
  });
  if (!response.ok) throw new Error("Something went wrong while fetching data");

  return response.json();
}

export async function getHotelsPresentInCities(cityName, sortValue) {
  const location = { location: cityName };

  // console.log(sortValue);

  let sortData;

  if (sortValue === "popular") sortData = { name: 1 };

  if (sortValue === "highest rating") sortData = { rating: -1 };

  if (sortValue === "highest price") sortData = { avgCostPerNight: -1 };

  if (sortValue === "lowest price") sortData = { avgCostPerNight: 1 };

  const response = await fetch(
    `${url}/hotel?search=${JSON.stringify(location)}&sort=${JSON.stringify(sortData)}&limit=30`,
    {
      headers: { projectID: `${projectID}` },
    },
  );
  if (!response.ok) throw new Error("Something went wrong while fetching data");

  return response.json();
}
