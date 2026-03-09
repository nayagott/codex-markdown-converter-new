import { type UnitSystem } from "@/lib/weather/types";

type SearchBarProps = {
  defaultValue?: string;
  unit: UnitSystem;
};

export function SearchBar({ defaultValue = "", unit }: SearchBarProps) {
  return (
    <form action="/search" className="search-form">
      <input type="hidden" name="unit" value={unit} />
      <input
        aria-label="Search city"
        className="search-input"
        defaultValue={defaultValue}
        name="q"
        placeholder="Search city"
        type="search"
      />
      <button className="search-button" type="submit">
        Search
      </button>
    </form>
  );
}
