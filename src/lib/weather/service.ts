import {
  buildMockCurrentWeather,
  buildMockForecast,
  buildMockLocations,
} from "@/lib/weather/mock";
import {
  normalizeCurrentWeather,
  normalizeDailyForecast,
  normalizeHourlyForecast,
} from "@/lib/weather/normalize";
import {
  type CurrentWeatherResponse,
  type ForecastResponse,
  type LocationSummary,
  type UnitSystem,
} from "@/lib/weather/types";

export const DEFAULT_LOCATION: LocationSummary = {
  name: "Seoul",
  country: "KR",
  latitude: 37.5665,
  longitude: 126.978,
};

type OpenMeteoResponse = {
  current: {
    temperature_2m: number;
    apparent_temperature: number;
    weather_code: number;
    wind_speed_10m: number;
    relative_humidity_2m?: number;
    time: string;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
    precipitation_probability: number[];
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    sunrise: string[];
    sunset: string[];
    precipitation_probability_max?: number[];
  };
};

function buildForecastUrl(location: LocationSummary, unit: UnitSystem) {
  const temperature = unit === "imperial" ? "fahrenheit" : "celsius";
  const windspeed = unit === "imperial" ? "mph" : "kmh";
  const search = new URLSearchParams({
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    current: [
      "temperature_2m",
      "apparent_temperature",
      "weather_code",
      "wind_speed_10m",
      "relative_humidity_2m",
    ].join(","),
    hourly: ["temperature_2m", "weather_code", "precipitation_probability"].join(","),
    daily: [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "sunrise",
      "sunset",
      "precipitation_probability_max",
    ].join(","),
    forecast_days: "7",
    timezone: "auto",
    temperature_unit: temperature,
    wind_speed_unit: windspeed,
  });

  return `https://api.open-meteo.com/v1/forecast?${search.toString()}`;
}

async function fetchForecastData(
  location: LocationSummary,
  unit: UnitSystem,
): Promise<OpenMeteoResponse> {
  const response = await fetch(buildForecastUrl(location, unit), {
    next: { revalidate: 1800 },
  });

  if (!response.ok) {
    throw new Error(`Weather provider failed with ${response.status}`);
  }

  return response.json();
}

export async function getCurrentWeather(
  location: LocationSummary,
  unit: UnitSystem,
): Promise<CurrentWeatherResponse> {
  try {
    const data = await fetchForecastData(location, unit);
    return {
      location,
      unit,
      current: normalizeCurrentWeather(data),
    };
  } catch {
    return buildMockCurrentWeather(location, unit);
  }
}

export async function getForecast(
  location: LocationSummary,
  unit: UnitSystem,
): Promise<ForecastResponse> {
  try {
    const data = await fetchForecastData(location, unit);
    return {
      location,
      unit,
      hourly: normalizeHourlyForecast(data),
      daily: normalizeDailyForecast(data),
    };
  } catch {
    return buildMockForecast(location, unit);
  }
}

export async function searchLocations(query: string): Promise<LocationSummary[]> {
  try {
    const search = new URLSearchParams({
      name: query,
      count: "5",
      language: "en",
      format: "json",
    });
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?${search.toString()}`,
      {
        next: { revalidate: 86400 },
      },
    );

    if (!response.ok) {
      throw new Error(`Location provider failed with ${response.status}`);
    }

    const payload = (await response.json()) as {
      results?: Array<{
        name: string;
        country_code?: string;
        latitude: number;
        longitude: number;
      }>;
    };

    return (
      payload.results?.map((item) => ({
        name: item.name,
        country: item.country_code ?? "??",
        latitude: item.latitude,
        longitude: item.longitude,
      })) ?? []
    );
  } catch {
    return buildMockLocations(query);
  }
}
