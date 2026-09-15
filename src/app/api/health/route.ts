import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isAuthorizedCron(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret) {
    return true;
  }

  return request.headers.get("authorization") === `Bearer ${cronSecret}`;
}

export async function GET(request: NextRequest) {
  if (!isAuthorizedCron(request)) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  const startedAt = Date.now();

  try {
    const supabase = await createServerSupabase();
    const { data, error } = await supabase
      .from("products")
      .select("id")
      .limit(1);

    if (error) {
      console.error("Supabase health check failed", {
        message: error.message,
        code: error.code,
      });

      return NextResponse.json(
        {
          ok: false,
          service: "supabase",
          database: "unavailable",
          checkedAt: new Date().toISOString(),
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        service: "supabase",
        database: "available",
        sampleFound: Boolean(data?.length),
        latencyMs: Date.now() - startedAt,
        checkedAt: new Date().toISOString(),
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error(
      "Supabase health check unexpected error",
      error instanceof Error ? error.message : "unknown error"
    );

    return NextResponse.json(
      {
        ok: false,
        service: "supabase",
        database: "unavailable",
        checkedAt: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
