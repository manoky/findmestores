import { NextApiResponse, NextApiRequest } from "next";
import { findStore } from "utils/airtable";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (id !== "undefined") {
    try {
      const store = await findStore(id as string);
      if (store) {
        return res.status(200).json(store[0]);
      } else {
        res
          .status(404)
          .json({ message: "no data exist with provided id " + id });
      }
    } catch (err) {
      res.status(500).json({ message: "Something went wrong", err });
    }
  } else {
    res.status(400).json({ message: "id is required" });
  }
};

export default handler;
