import { airlineData } from '../assets/data/AirlineData';
import { projectID, url } from './urls';

export async function getFlightsList() {
  const response = await fetch(`${url}/airport?limit=30`, {
    headers: {
      projectID: `${projectID}`,
    },
  });
  if (!response.ok) throw new Error('Something went wrong while fetching data');

  return response.json();
}

export async function getFlightsListUsingCityName(cityName) {
  if (!cityName) {
    return getFlightsList();
  }
  const city = { city: cityName };
  const response = await fetch(
    `${url}/airport?search=${JSON.stringify(city)}&limit=30`,
    {
      headers: {
        projectID: `${projectID}`,
      },
    }
  );
  if (!response.ok) throw new Error('Something went wrong while fetching data');

  return response.json();
}

export async function getFlightSortByPrice(source, destination, day) {
  const travelInfo = {
    source,
    destination,
  };
  const price = { ticketPrice: 1 };
  const response = await fetch(
    `${url}/flight?search=${JSON.stringify(
      travelInfo
    )}&day=${day}&sort=${JSON.stringify(price)}`,
    {
      headers: {
        projectID: `${projectID}`,
      },
    }
  );
  if (!response.ok) throw new Error('Something went wrong while fetching data');
  return response.json();
}

export async function getFlightSortBySortValue(
  source,
  destination,
  day,
  sortValue
) {
  const travelInfo = {
    source,
    destination,
  };

  let sortData;

  if (sortValue === 'price') sortData = { ticketPrice: 1 };

  if (sortValue === 'stops') sortData = { stops: 1 };

  if (sortValue === 'departureTime') sortData = { departureTime: 1 };

  const response = await fetch(
    `${url}/flight?search=${JSON.stringify(
      travelInfo
    )}&day=${day}&sort=${JSON.stringify(sortData)}`,
    {
      headers: {
        projectID: `${projectID}`,
      },
    }
  );
  if (!response.ok) throw new Error('Something went wrong while fetching data');
  return response.json();
}

export async function getFlightsInDetailed(flightID) {
  const response = await fetch(`${url}/flight/${flightID}`, {
    headers: {
      projectID: `${projectID}`,
    },
  });
  if (!response.ok) throw new Error('Something went wrong while fetching data');
  return response.json();
}

export async function getFlightSortFilter(
  source,
  destination,
  day,
  sortValue,
  filterOptions,
  minPrice,
  maxPrice
) {
  const travelInfo = {
    source,
    destination,
  };

  let sortData;

  if (sortValue === 'price') sortData = { ticketPrice: 1 };

  if (sortValue === 'stops') sortData = { stops: 1 };

  if (sortValue === 'departureTime') sortData = { departureTime: 1 };

  const filterChanged = filterOptions.includes('changed');
  const filterStops = filterOptions.filter((item) => item.includes('Stop'));

  const filterAirlines = filterOptions.filter((item) =>
    item.includes('Airline')
  );

  let filtered = {};

  if (filterChanged) filtered.ticketPrice = { $gte: minPrice, $lte: maxPrice };

  if (filterStops.length === 1) {
    const splitStop = filterStops[0].split(' ')[0];
    filtered.stops = splitStop === 'Non' ? 0 : 1;
  } else if (filterStops.length > 1) {
    filtered.stops = { $lte: 1, $gte: 0 };
  }

  if (filterAirlines.length === 1) {
    const air = airlineData.filter(
      (airline) =>
        airline.name ===
        filterAirlines[0].slice(0, filterAirlines[0].length - 8)
    );
    filtered.aircraftModel = air[0].model;
  }

  if (sortValue && filterOptions.length > 0) {
    const response = await fetch(
      `${url}/flight?search=${JSON.stringify(
        travelInfo
      )}&day=${day}&sort=${JSON.stringify(sortData)}&filter=${JSON.stringify(
        filtered
      )}`,
      {
        headers: {
          projectID: `${projectID}`,
        },
      }
    );
    if (!response.ok)
      throw new Error('Something went wrong while fetching data');
    return response.json();
  } else return getFlightSortBySortValue(source, destination, day, sortValue);
}
