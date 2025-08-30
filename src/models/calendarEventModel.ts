import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

export async function getDb(): Promise<Database> {
  return open({
    filename: "./calendar.db",
    driver: sqlite3.Database,
  });
}

export async function initCalendarEventTable() {
  const db = await getDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS calendar_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT NOT NULL,
      countryCode TEXT NOT NULL,
      year INTEGER NOT NULL,
      holidayName TEXT NOT NULL,
      date TEXT NOT NULL
    )
  `);
  await db.close();
}

export async function addCalendarEvent(event: {
  userId: string;
  countryCode: string;
  year: number;
  holidayName: string;
  date: string;
}) {
  const db = await getDb();
  await db.run(
    `INSERT INTO calendar_events (userId, countryCode, year, holidayName, date) VALUES (?, ?, ?, ?, ?)`,
    event.userId,
    event.countryCode,
    event.year,
    event.holidayName,
    event.date
  );
  await db.close();
}

export async function getCalendarEventsForUser(userId: string) {
  const db = await getDb();
  const events = await db.all(
    `SELECT * FROM calendar_events WHERE userId = ?`,
    userId
  );
  await db.close();
  return events;
}
