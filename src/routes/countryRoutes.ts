import { Router } from "express";
import {
  getAvailableCountries,
  getCountryInfo,
} from "../controllers/countryController.ts";

const router = Router();

router.get("/countries", getAvailableCountries);
router.get("/countries/:countryCode/info", getCountryInfo);

export default router;
