import z from "zod";

export const weatherInputSchema = z.object({ location: z.string() });

const ConditionSchema = z.object({
  text: z.string(),
  icon: z.string(),
  code: z.number(),
});

const LocationSchema = z.object({
  name: z.string(),
  region: z.string(),
  country: z.string(),
  lat: z.number(),
  lon: z.number(),
  tz_id: z.string(),
  localtime_epoch: z.number(),
  localtime: z.string(),
});

const CurrentSchema = z.object({
  last_updated_epoch: z.number(),
  last_updated: z.string(),
  temp_c: z.number(),
  temp_f: z.number(),
  is_day: z.number().int(),
  condition: ConditionSchema,

  wind_mph: z.number(),
  wind_kph: z.number(),
  wind_degree: z.number(),
  wind_dir: z.string(),

  pressure_mb: z.number(),
  pressure_in: z.number(),

  precip_mm: z.number(),
  precip_in: z.number(),

  humidity: z.number(),
  cloud: z.number(),

  feelslike_c: z.number(),
  feelslike_f: z.number(),

  windchill_c: z.number(),
  windchill_f: z.number(),

  heatindex_c: z.number(),
  heatindex_f: z.number(),

  dewpoint_c: z.number(),
  dewpoint_f: z.number(),

  vis_km: z.number(),
  vis_miles: z.number(),

  uv: z.number(),

  gust_mph: z.number(),
  gust_kph: z.number(),

  will_it_rain: z.number().int(),
  chance_of_rain: z.number().int(),

  will_it_snow: z.number().int(),
  chance_of_snow: z.number().int(),

  short_rad: z.number(),
  diff_rad: z.number(),
  dni: z.number(),
  gti: z.number(),
});

export const weatherOutputSchema = z.object({
  location: LocationSchema,
  current: CurrentSchema,
});

export type FetchWeatherInput = z.infer<typeof weatherInputSchema>;
