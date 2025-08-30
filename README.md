# Country Info App Backend

This is a Node.js/TypeScript backend for the Country Info App assessment.

## Features

- Get available countries (from Nager.Date API)
- Get detailed country info (borders, population, flag)
- Add national holidays to a user's calendar (with SQLite persistence)

## Tech Stack

- Node.js (Express.js)
- TypeScript
- SQLite (with `sqlite3` and `sqlite` packages)
- Axios

## Setup

1. **Clone the repo and install dependencies:**

   ```sh
   npm install
   ```

2. **Set up environment variables:**
   - Create a `.env` file (see `.env.example` if present)
   - Example:
     ```env
     PORT=3000
     ```

3. **Run the app:**
   ```sh
   npx ts-node src/index.ts --loader ts-node/esm
   ```

## API Endpoints

### 1. Get Available Countries

**GET** `/countries`
Returns a list of available countries from the Nager.Date API.

### 2. Get Country Info

**GET** `/countries/:countryCode/info`
Returns borders, population data, and flag URL for a country.

### 3. Add National Holidays to User's Calendar

**POST** `/users/:userId/calendar/holidays`
**Body:**

```json
{
  "countryCode": "US",
  "year": 2025,
  "holidays": ["New Year's Day", "Independence Day"]
}
```

Adds the specified holidays (or all, if omitted) to the user's calendar in SQLite.

## Code Quality

- ESLint and Prettier are set up for linting and formatting.

## Notes

- Data is persisted in `calendar.db` (SQLite).
- The `.env` file is public for this assessment (no secrets).

---

**Author:** Dachi Arevadze
