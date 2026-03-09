export type UnitSystem = "metric" | "imperial";

export type LocationSummary = {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
};

export type CurrentWeather = {
  temperature: number;
  feelsLike: number;
  condition: string;
  conditionCode: string;
  humidity: number;
  windSpeed: number;
  precipitationChance: number;
  sunrise: string;
  sunset: string;
  updatedAt: string;
};

export type HourlyForecastPoint = {
  time: string;
  temperature: number;
  condition: string;
  conditionCode: string;
  precipitationChance: number;
};

export type DailyForecastPoint = {
  date: string;
  min: number;
  max: number;
  condition: string;
  conditionCode: string;
};

export type CurrentWeatherResponse = {
  location: LocationSummary;
  current: CurrentWeather;
  unit: UnitSystem;
};

export type ForecastResponse = {
  location: LocationSummary;
  hourly: HourlyForecastPoint[];
  daily: DailyForecastPoint[];
  unit: UnitSystem;
};
