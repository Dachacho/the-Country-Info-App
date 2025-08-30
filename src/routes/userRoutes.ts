import { Router } from "express";
import { addHolidayToCalendar } from "../controllers/userController.ts";

const router = Router();

router.post("/users/:userId/calendar/holidays", addHolidayToCalendar);

export default router;
