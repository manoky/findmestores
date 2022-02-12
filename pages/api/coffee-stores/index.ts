import { NextApiResponse, NextApiRequest } from "next";
import { FetchStores } from "utils/fetchApi";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { latLong, limit, query } = req.query;
  const amount = limit ? Number(limit) : undefined;
  const term = query as string;
  const coords = latLong as string;
  try {
    const stores = await FetchStores({
      latlong: coords,
      query: term,
      limit: amount,
    });

    res.status(200).json(stores);
  } catch (err) {
    res.status(500).json({ message: "Error fetching stores", err });
  }
};

export default handler;
