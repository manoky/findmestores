import {
  CoffeeStoreDataType,
  CoffeeStoreResponseDataType,
} from "types/CoffeeStoreDataType";
import { getStoresRoute, getStoreRouteById } from "constants/routes";
import { findStores, saveStores } from "utils/airtable";

type CachedType = {
  [key: string]: CoffeeStoreDataType;
};

export const fetchImages = async (total: number = 9) => {
  const page = Math.floor(Math.random() * 10 + 1);
  const res = await fetch(
    `https://picsum.photos/v2/list?page=${page}&limit=${total}`
  );

  const data = await res.json();
  const parsedData = data.map((d: { download_url: any }) => d.download_url);
  return parsedData;
};

export const fetchImage = async () => {
  const res = await fetch(`https://picsum.photos/600/300`);

  return res.url;
};

export const fetchStoreRequest = (url: string): Promise<Response> =>
  fetch(url, {
    headers: {
      Accept: "application/json",
      Authorization: `${process.env.NEXT_PUBLIC_FOURSQUARE_AUTH}`,
    },
  });

export const FetchStores = async ({
  latlong = "52.53050887867109%2C13.410266265615917",
  query = "coffee",
  limit = 9,
}: {
  latlong?: string;
  query?: string;
  limit?: number;
}): Promise<CoffeeStoreDataType[]> => {
  try {
    const resp = await fetchStoreRequest(getStoresRoute(latlong, query, limit));
    const images = await fetchImages(limit);
    if (!resp.ok) {
      throw new Error("Something went wrong fetching stores");
    }
    const data = await resp.json();
    const stores = data.results.map(
      (store: CoffeeStoreResponseDataType, i: number) => ({
        id: store.fsq_id,
        imgUrl: images[i],
        address: store?.location?.address ?? "",
        neighborhood:
          store?.location?.neighborhood?.length > 0
            ? store?.location?.neighborhood[0]
            : "",
        name: store.name || "",
        votes: 0,
        category: query.toLowerCase(),
      })
    );

    const cachedStores = (await findStores()) || [];
    const keyValStores = cachedStores.reduce(
      (stores: CachedType, store: CoffeeStoreDataType) => {
        stores[store.id] = store;
        return stores;
      },
      {}
    );

    const filteredStores = stores.reduce(
      (acc: CoffeeStoreDataType[], store: CoffeeStoreDataType) => {
        if (keyValStores[store.id]) {
          return acc;
        }

        return [...acc, store];
      },
      []
    );

    if (filteredStores.length > 0) {
      await saveStores(filteredStores);
    }

    // const storesToReturn = cachedStores.reduce(
    //   (acc: CoffeeStoreDataType[], store: CoffeeStoreDataType) => {
    //     if (
    //       stores?.find(
    //         (c: CoffeeStoreDataType) =>
    //           c.id === store.id && c.category === store.category
    //       )
    //     ) {
    //       return [...acc, store];
    //     }
    //     return acc;
    //   },
    //   []
    // );

    const storesToReturn = stores.reduce(
      (acc: CoffeeStoreDataType[], store: CoffeeStoreDataType) => {
        const found = keyValStores[store.id];
        if (found) {
          return [...acc, found];
        }
        return acc;
      },
      []
    );

    const allStores = storesToReturn.length > 0 ? storesToReturn : stores;

    return allStores as unknown as CoffeeStoreDataType[];
  } catch (err) {
    console.log(err);
  }
  return [];
};
