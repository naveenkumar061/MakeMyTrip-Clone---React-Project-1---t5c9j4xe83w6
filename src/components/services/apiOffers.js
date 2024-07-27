import { projectID, url } from './urls';

export async function getOffers() {
  const response = await fetch(`${url}/offers?limit=146`, {
    headers: {
      projectID: projectID,
    },
  });

  if (!response.ok) throw new Error('Something went wrong while fetching data');

  return response.json();
}

export async function getOffersByFilter(clickedType) {
  const filter = { type: clickedType };

  const response = await fetch(
    `${url}/offers?filter=${JSON.stringify(filter)}&limit=146`,
    {
      headers: {
        projectID: projectID,
      },
    }
  );

  if (!response.ok) throw new Error('Something went wrong while fetching data');

  return response.json();
}
