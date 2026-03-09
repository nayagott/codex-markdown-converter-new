import { formatDay, formatTemperature } from "@/lib/utils/format";
import { type DailyForecastPoint, type UnitSystem } from "@/lib/weather/types";

type WeeklyForecastProps = {
  daily: DailyForecastPoint[];
  unit: UnitSystem;
};

export function WeeklyForecast({ daily, unit }: WeeklyForecastProps) {
  return (
    <section className="panel">
      <div className="section-heading">
        <h2>7-day forecast</h2>
        <span className="muted">Daily outlook</span>
      </div>
      <div className="stack">
        {daily.map((entry) => (
          <article className="forecast-row" key={entry.date}>
            <div>
              <strong>{formatDay(entry.date)}</strong>
              <p className="muted">{entry.condition}</p>
            </div>
            <div className="temperature-pair">
              <span>{formatTemperature(entry.min, unit)}</span>
              <strong>{formatTemperature(entry.max, unit)}</strong>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
