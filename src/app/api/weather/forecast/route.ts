import { NextResponse } from "next/server";
import { DEFAULT_LOCATION, getForecast } from "@/lib/weather/service";
import { type UnitSystem } from "@/lib/weather/types";

function pickUnit(value: string | null): UnitSystem {
  return value === "imperial" ? "imperial" : "metric";
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const latitude = Number(searchParams.get("lat") ?? DEFAULT_LOCATION.latitude);
  const longitude = Number(searchParams.get("lon") ?? DEFAULT_LOCATION.longitude);
  const unit = pickUnit(searchParams.get("unit"));

  const forecast = await getForecast(
    {
      name: searchParams.get("city") ?? DEFAULT_LOCATION.name,
      country: searchParams.get("country") ?? DEFAULT_LOCATION.country,
      latitude: Number.isFinite(latitude) ? latitude : DEFAULT_LOCATION.latitude,
      longitude: Number.isFinite(longitude) ? longitude : DEFAULT_LOCATION.longitude,
    },
    unit,
  );

  return NextResponse.json(forecast);
}
