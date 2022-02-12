import { NextApiResponse, NextApiRequest } from "next";
import { updateStore } from "utils/airtable";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, votes } = req.body;

  if (req.method === "PUT") {
    if (!id || !votes) {
      return res.status(400).json({ message: "id and votes is required" });
    }

    try {
      const updatedStore = await updateStore(id, votes);

      if (updatedStore) {
        return res.status(200).json(updatedStore[0]);
      } else {
        res
          .status(400)
          .json({ message: "no data exist with provided id " + id });
      }
    } catch (err) {
      res.status(500).json({ message: "Something went wrong", err });
    }
  } else {
    res.status(400).json({ message: "method is not allowed" });
  }
};

export default handler;
