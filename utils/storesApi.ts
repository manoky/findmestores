import { CoffeeStoreDataType } from "types/CoffeeStoreDataType";

const getStoreById = async (id: string) => {
  const resp = await fetch(`/api/coffee-stores/${id}`);
  const stores = await resp.json();
  return stores;
};

const favouriteStore = async (store: CoffeeStoreDataType) => {
  const resp = await fetch(`/api/coffee-stores/favourite`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...store, votes: store.votes + 1 }),
  });

  const stores = await resp.json();
  return stores;
};

export { getStoreById, favouriteStore };
