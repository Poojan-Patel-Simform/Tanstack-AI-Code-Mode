import {
  weatherInputSchema,
  weatherOutputSchema,
} from "@/schemas/weatherSchema";
import { ToolNameEnum } from "@/types/tool";
import { toolDefinition } from "@tanstack/ai";

const fetchWeatherDef = toolDefinition({
  name: ToolNameEnum.WEATHER_TOOL,
  description: "Get current weather for a city",
  inputSchema: weatherInputSchema,
  outputSchema: weatherOutputSchema,
});

export const fetchWeatherTool = fetchWeatherDef.server(async ({ location }) => {
  const res = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${process.env.OPEN_WEATHER_API_KEY}&q=${location}`,
  );
  return res.json();
});
