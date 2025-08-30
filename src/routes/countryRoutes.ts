import { Router } from "express";
import { getAvailableCountries } from "../controllers/countryController.ts";

const router = Router();

router.get("/countries", getAvailableCountries);

export default router;
