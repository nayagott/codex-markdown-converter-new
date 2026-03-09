import { type CurrentWeather, type UnitSystem } from "@/lib/weather/types";

type WeatherDetailsProps = {
  current: CurrentWeather;
  unit: UnitSystem;
};

export function WeatherDetails({ current, unit }: WeatherDetailsProps) {
  return (
    <section className="panel">
      <div className="section-heading">
        <h2>Details</h2>
        <span className="muted">Useful context</span>
      </div>
      <div className="details-grid">
        <div className="detail-item">
          <span>Humidity</span>
          <strong>{current.humidity}%</strong>
        </div>
        <div className="detail-item">
          <span>Wind</span>
          <strong>{current.windSpeed} {unit === "imperial" ? "mph" : "km/h"}</strong>
        </div>
        <div className="detail-item">
          <span>Sunrise</span>
          <strong>{current.sunrise}</strong>
        </div>
        <div className="detail-item">
          <span>Sunset</span>
          <strong>{current.sunset}</strong>
        </div>
      </div>
    </section>
  );
}
