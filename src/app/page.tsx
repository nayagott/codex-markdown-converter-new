import { Header } from "@/components/common/header";
import { CurrentWeatherCard } from "@/components/weather/current-weather-card";
import { HourlyForecast } from "@/components/weather/hourly-forecast";
import { WeatherDetails } from "@/components/weather/weather-details";
import { WeeklyForecast } from "@/components/weather/weekly-forecast";
import {
  DEFAULT_LOCATION,
  getCurrentWeather,
  getForecast,
} from "@/lib/weather/service";
import { type UnitSystem } from "@/lib/weather/types";

type HomePageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function readString(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function readNumber(value: string | string[] | undefined, fallback: number) {
  const parsed = Number(readString(value));
  return Number.isFinite(parsed) ? parsed : fallback;
}

function readUnit(value: string | string[] | undefined): UnitSystem {
  return readString(value) === "imperial" ? "imperial" : "metric";
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = (await searchParams) ?? {};
  const unit = readUnit(params.unit);
  const location = {
    name: readString(params.city) ?? DEFAULT_LOCATION.name,
    country: readString(params.country) ?? DEFAULT_LOCATION.country,
    latitude: readNumber(params.lat, DEFAULT_LOCATION.latitude),
    longitude: readNumber(params.lon, DEFAULT_LOCATION.longitude),
  };

  const [currentWeather, forecast] = await Promise.all([
    getCurrentWeather(location, unit),
    getForecast(location, unit),
  ]);

  return (
    <main className="shell">
      <div className="app-card">
        <Header location={currentWeather.location} unit={unit} />
        <div className="hero-grid">
          <CurrentWeatherCard weather={currentWeather} />
          <WeatherDetails current={currentWeather.current} unit={unit} />
        </div>
        <HourlyForecast hourly={forecast.hourly} unit={unit} />
        <WeeklyForecast daily={forecast.daily} unit={unit} />
      </div>
    </main>
  );
}
