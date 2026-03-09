import { NextResponse } from "next/server";
import { searchLocations } from "@/lib/weather/service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") ?? "";
  const results = query ? await searchLocations(query) : [];

  return NextResponse.json({ results });
}
