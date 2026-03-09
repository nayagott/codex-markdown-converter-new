import Link from "next/link";
import { Header } from "@/components/common/header";
import { SearchBar } from "@/components/common/search-bar";
import { searchLocations } from "@/lib/weather/service";
import { type UnitSystem } from "@/lib/weather/types";

type SearchPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function readString(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function readUnit(value: string | string[] | undefined): UnitSystem {
  return readString(value) === "imperial" ? "imperial" : "metric";
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = (await searchParams) ?? {};
  const query = readString(params.q) ?? "";
  const unit = readUnit(params.unit);
  const results = query ? await searchLocations(query) : [];

  return (
    <main className="shell">
      <div className="app-card">
        <Header unit={unit} />
        <section className="panel">
          <h1>Search city</h1>
          <p className="muted">
            Search for a city, then jump back to the home screen with its
            coordinates.
          </p>
          <SearchBar defaultValue={query} unit={unit} />
        </section>

        <section className="panel">
          <h2>Results</h2>
          {results.length === 0 ? (
            <p className="muted">
              {query ? "No cities matched that query." : "Try Seoul, Tokyo, or London."}
            </p>
          ) : (
            <div className="stack">
              {results.map((result) => (
                <Link
                  className="result-link"
                  href={`/?city=${encodeURIComponent(result.name)}&country=${encodeURIComponent(
                    result.country,
                  )}&lat=${result.latitude}&lon=${result.longitude}&unit=${unit}`}
                  key={`${result.name}-${result.latitude}-${result.longitude}`}
                >
                  <span>{result.name}</span>
                  <span className="muted">
                    {result.country} · {result.latitude.toFixed(2)}, {result.longitude.toFixed(2)}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
