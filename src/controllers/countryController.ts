import type { Request, Response } from "express";
import axios from "axios";
import {
  detectIsoType,
  getIso2FromIso3,
  getIso3FromIso2,
} from "../utils/isoCodes.ts";

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

export const getCountryInfo = async (req: Request, res: Response) => {
  const { countryCode } = req.params;

  if (!countryCode) {
    return res.status(400).json({ message: "countryCode is required" });
  }

  let countryCodeIso2 = "";
  let countryCodeIso3 = "";

  const codeType = detectIsoType(countryCode);
  if (codeType === "iso2") {
    countryCodeIso2 = countryCode.toUpperCase();
    const iso3 = getIso3FromIso2(countryCode);
    if (!iso3) {
      return res.status(400).json({ message: "invalid iso2 country code" });
    }
    countryCodeIso3 = iso3;
  } else if (codeType === "iso3") {
    countryCodeIso3 = countryCode.toUpperCase();
    const iso2 = getIso2FromIso3(countryCode);
    if (!iso2) {
      return res.status(400).json({ message: "invalid iso3 country code" });
    }
    countryCodeIso2 = iso2;
  } else {
    try {
      const [countryInfoRes, populationRes, flagRes] = await Promise.all([
        axios.get(
          `https://date.nager.at/api/v3/CountryInfo/${countryCodeIso2}`
        ),
        axios.post("https://countriesnow.space/api/v0.1/countries/population", {
          iso3: countryCodeIso3,
        }),
        axios.post(
          "https://countriesnow.space/api/v0.1/countries/flag/images",
          { iso2: countryCodeIso2 }
        ),
      ]);

      const borders = countryInfoRes.data.borders;
      const population = populationRes.data.data;
      const flagUrl = flagRes.data.data.flag;

      res.json({
        borders,
        population,
        flagUrl,
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch country info", error });
    }
  }
};
