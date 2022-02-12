import { CoffeeStoreDataType } from "types/CoffeeStoreDataType";
import Airtable, { FieldSet, Records } from "airtable";

const base = new Airtable({ apiKey: process.env?.AIRTABLE_API_KEY || "" }).base(
  process.env.AIR_TABLE_PROJECT_ID || ""
);

const getField = (record: Records<FieldSet>): FieldSet[] => {
  return record.map(({ fields }) => fields);
};
const getId = (record: Records<FieldSet>): string => {
  return record.map(({ id }) => id)[0];
};

const table = base("coffee-stores");

export const findStore = async (id: string) => {
  const store = await table
    .select({
      filterByFormula: `id="${id}"`,
    })
    .firstPage();

  if (store.length > 0) {
    return getField(store);
  }
  return null;
};

export const findStores = async () => {
  const stores: FieldSet[] = [];
  await table.select({}).eachPage((records, fetchNextPage) => {
    records.forEach((rec) => stores.push(rec.fields));
    fetchNextPage();
  });

  if (stores.length > 0) {
    return stores;
  }
  return null;
};

export const saveStores = async (stores: CoffeeStoreDataType[]) => {
  const data = stores.map((data) => {
    const fields = { ...data, neighborhood: data.neighborhood || "" };
    return {
      fields,
    };
  });

  const store = await table.create(data);

  return getField(store);
};

export const updateStore = async (id: string, votes: number) => {
  const storeToUpdate = await table
    .select({
      filterByFormula: `id="${id}"`,
    })
    .firstPage();

  const storeId = getId(storeToUpdate);

  const store = await table.update([
    {
      id: storeId,
      fields: {
        votes,
      },
    },
  ]);

  return getField(store);
};
