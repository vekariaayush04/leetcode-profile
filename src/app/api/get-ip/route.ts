import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0] || // Handle proxies
    request.headers.get("x-real-ip") || // Alternative headers
    "IP not found";

  return NextResponse.json({ ip });
}
