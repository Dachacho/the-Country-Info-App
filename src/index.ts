import express from "express";
import dotenv from "dotenv";
import countryRouter from "./routes/countryRoutes.ts";
import userRouter from "./routes/userRoutes.ts";
import { initCalendarEventTable } from "./models/calendarEventModel.ts";

initCalendarEventTable();

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(countryRouter);
app.use(userRouter);

app.get("/", (req, res) => {
  res.send("Country Info App backend is running!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
