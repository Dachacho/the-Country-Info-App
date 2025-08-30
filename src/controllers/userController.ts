import type { Request, Response } from "express";
import { fetchPublicHolidays } from "../services/holidayService.ts";
import { addCalendarEvent } from "../models/calendarEventModel.ts";

export const addHolidayToCalendar = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { countryCode, year, holidays } = req.body;

  if (!userId || !countryCode || !year) {
    return res
      .status(400)
      .json({ message: "userid, countrycode and year are required" });
  }

  try {
    const allHolidays = await fetchPublicHolidays(countryCode, year);

    let selectedHolidays = allHolidays;
    if (Array.isArray(holidays) && holidays.length > 0) {
      selectedHolidays = allHolidays.filter(
        (h: any) => holidays.includes(h.localName) || holidays.includes(h.name)
      );
    }

    for (const holiday of selectedHolidays) {
      await addCalendarEvent({
        userId,
        countryCode,
        year,
        holidayName: holiday.localName || holiday.name,
        date: holiday.date,
      });

      res
        .status(201)
        .json({
          message: "holidays added to your calendar",
          saved: selectedHolidays.length,
        });
    }
  } catch (error) {
    res.status(500).json({ message: "failed to add holiday" });
  }
};
