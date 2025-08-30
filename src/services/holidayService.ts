import axios from "axios";

export async function fetchPublicHolidays(countryCode: string, year: number) {
  const url = `https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`;
  const response = await axios.get(url);
  return response.data;
}
