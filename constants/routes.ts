const FOURSQUARE_BASE_URL = `https://api.foursquare.com/v3/places`;
const BASE_URL = "http://localhost:3000";

const getStoresRoute = (
  latLong: string = "52.53050887867109%2C13.410266265615917",
  query?: string,
  limit?: number
): string =>
  `${FOURSQUARE_BASE_URL}/search?query=${query}&ll=${latLong}&limit=${limit}`;

const getStoreRouteById = (id: string): string =>
  `${FOURSQUARE_BASE_URL}/${id}`;

export { getStoreRouteById, getStoresRoute, BASE_URL };
