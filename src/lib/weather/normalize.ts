import {
  type CurrentWeather,
  type DailyForecastPoint,
  type HourlyForecastPoint,
} from "@/lib/weather/types";

const WEATHER_CODES: Record<number, { label: string; code: string }> = {
  0: { label: "Clear", code: "clear" },
  1: { label: "Mainly clear", code: "partly-clear" },
  2: { label: "Partly cloudy", code: "partly-cloudy" },
  3: { label: "Overcast", code: "cloudy" },
  45: { label: "Fog", code: "fog" },
  51: { label: "Light drizzle", code: "drizzle" },
  61: { label: "Rain", code: "rain" },
  71: { label: "Snow", code: "snow" },
  95: { label: "Thunderstorm", code: "storm" },
};

function conditionFromCode(value: number | undefined) {
  return WEATHER_CODES[value ?? -1] ?? { label: "Unknown", code: "unknown" };
}

export function normalizeCurrentWeather(source: {
  current: {
    temperature_2m: number;
    apparent_temperature: number;
    weather_code: number;
    wind_speed_10m: number;
    relative_humidity_2m?: number;
    time: string;
  };
  daily: {
    sunrise: string[];
    sunset: string[];
    precipitation_probability_max?: number[];
  };
}): CurrentWeather {
  const condition = conditionFromCode(source.current.weather_code);

  return {
    temperature: source.current.temperature_2m,
    feelsLike: source.current.apparent_temperature,
    condition: condition.label,
    conditionCode: condition.code,
    humidity: source.current.relative_humidity_2m ?? 0,
    windSpeed: Math.round(source.current.wind_speed_10m),
    precipitationChance: source.daily.precipitation_probability_max?.[0] ?? 0,
    sunrise: source.daily.sunrise[0]?.slice(11, 16) ?? "--:--",
    sunset: source.daily.sunset[0]?.slice(11, 16) ?? "--:--",
    updatedAt: source.current.time,
  };
}

export function normalizeHourlyForecast(source: {
  hourly: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
    precipitation_probability: number[];
  };
}): HourlyForecastPoint[] {
  return source.hourly.time.slice(0, 12).map((time, index) => {
    const condition = conditionFromCode(source.hourly.weather_code[index]);

    return {
      time,
      temperature: source.hourly.temperature_2m[index],
      condition: condition.label,
      conditionCode: condition.code,
      precipitationChance: source.hourly.precipitation_probability[index] ?? 0,
    };
  });
}

export function normalizeDailyForecast(source: {
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
}): DailyForecastPoint[] {
  return source.daily.time.map((date, index) => {
    const condition = conditionFromCode(source.daily.weather_code[index]);

    return {
      date,
      min: source.daily.temperature_2m_min[index],
      max: source.daily.temperature_2m_max[index],
      condition: condition.label,
      conditionCode: condition.code,
    };
  });
}
