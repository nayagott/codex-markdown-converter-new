import Link from "next/link";
import { type LocationSummary, type UnitSystem } from "@/lib/weather/types";

type HeaderProps = {
  location?: LocationSummary;
  unit?: UnitSystem;
};

export function Header({ location, unit = "metric" }: HeaderProps) {
  return (
    <header className="header">
      <div>
        <p className="eyebrow">Weather MVP</p>
        <h1>{location ? `${location.name}, ${location.country}` : "Forecast"}</h1>
      </div>
      <nav className="nav-links">
        <Link href={`/?unit=${unit}`}>Home</Link>
        <Link href={`/search?unit=${unit}`}>Search</Link>
        <Link href="/settings">Settings</Link>
      </nav>
    </header>
  );
}
