import {
  type CurrentWeatherResponse,
  type ForecastResponse,
  type LocationSummary,
  type UnitSystem,
} from "@/lib/weather/types";

export function buildMockCurrentWeather(
  location: LocationSummary,
  unit: UnitSystem,
): CurrentWeatherResponse {
  return {
    location,
    unit,
    current: {
      temperature: unit === "imperial" ? 58 : 14,
      feelsLike: unit === "imperial" ? 55 : 13,
      condition: "Partly cloudy",
      conditionCode: "partly-cloudy",
      humidity: 61,
      windSpeed: 13,
      precipitationChance: 20,
      sunrise: "06:42",
      sunset: "18:21",
      updatedAt: new Date().toISOString(),
    },
  };
}

export function buildMockForecast(
  location: LocationSummary,
  unit: UnitSystem,
): ForecastResponse {
  const now = new Date();

  return {
    location,
    unit,
    hourly: Array.from({ length: 12 }, (_, index) => {
      const date = new Date(now.getTime() + index * 60 * 60 * 1000);
      return {
        time: date.toISOString(),
        temperature: (unit === "imperial" ? 58 : 14) + index % 3,
        condition: index % 4 === 0 ? "Rain" : "Partly cloudy",
        conditionCode: index % 4 === 0 ? "rain" : "partly-cloudy",
        precipitationChance: index % 4 === 0 ? 55 : 10,
      };
    }),
    daily: Array.from({ length: 7 }, (_, index) => {
      const date = new Date(now.getTime() + index * 24 * 60 * 60 * 1000);
      return {
        date: date.toISOString(),
        min: (unit === "imperial" ? 47 : 8) + (index % 2),
        max: (unit === "imperial" ? 61 : 16) + (index % 3),
        condition: index % 3 === 0 ? "Rain" : "Clear",
        conditionCode: index % 3 === 0 ? "rain" : "clear",
      };
    }),
  };
}

export function buildMockLocations(query: string): LocationSummary[] {
  const samples: LocationSummary[] = [
    { name: "Seoul", country: "KR", latitude: 37.5665, longitude: 126.978 },
    { name: "Tokyo", country: "JP", latitude: 35.6762, longitude: 139.6503 },
    { name: "London", country: "GB", latitude: 51.5072, longitude: -0.1276 },
  ];

  return samples.filter((item) =>
    item.name.toLowerCase().includes(query.trim().toLowerCase()),
  );
}
