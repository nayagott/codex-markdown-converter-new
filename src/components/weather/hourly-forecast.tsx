import { formatTemperature, formatTime } from "@/lib/utils/format";
import { type HourlyForecastPoint, type UnitSystem } from "@/lib/weather/types";

type HourlyForecastProps = {
  hourly: HourlyForecastPoint[];
  unit: UnitSystem;
};

export function HourlyForecast({ hourly, unit }: HourlyForecastProps) {
  return (
    <section className="panel">
      <div className="section-heading">
        <h2>Hourly</h2>
        <span className="muted">Next 12 hours</span>
      </div>
      <div className="hourly-grid">
        {hourly.map((entry) => (
          <article className="mini-card" key={entry.time}>
            <p>{formatTime(entry.time)}</p>
            <strong>{formatTemperature(entry.temperature, unit)}</strong>
            <p className="muted">{entry.condition}</p>
            <p className="muted">{entry.precipitationChance}% rain</p>
          </article>
        ))}
      </div>
    </section>
  );
}
