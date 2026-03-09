import { formatTemperature, formatTimestamp } from "@/lib/utils/format";
import { type CurrentWeatherResponse } from "@/lib/weather/types";

type CurrentWeatherCardProps = {
  weather: CurrentWeatherResponse;
};

export function CurrentWeatherCard({ weather }: CurrentWeatherCardProps) {
  return (
    <section className="current-card">
      <p className="eyebrow">Current weather</p>
      <div className="temperature-row">
        <strong>{formatTemperature(weather.current.temperature, weather.unit)}</strong>
        <span className="badge">{weather.current.condition}</span>
      </div>
      <p className="summary">
        Feels like {formatTemperature(weather.current.feelsLike, weather.unit)}.
        Precipitation chance {weather.current.precipitationChance}%.
      </p>
      <p className="muted">Updated {formatTimestamp(weather.current.updatedAt)}</p>
    </section>
  );
}
