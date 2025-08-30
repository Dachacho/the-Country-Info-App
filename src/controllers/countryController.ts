import type { Request, Response } from "express";
import axios from "axios";

export const getAvailableCountries = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(
      "https://date.nager.at/api/v3/AvailableCountries"
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch countries", error });
  }
};
