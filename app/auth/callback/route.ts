import { NextResponse } from "next/server";

import { createSupabaseServerClient } from "@/src/lib/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);

  const code =
    requestUrl.searchParams.get("code");

  const next =
    requestUrl.searchParams.get("next") ||
    "/account/profile";

  const safeNext =
    next.startsWith("/") &&
    !next.startsWith("//")
      ? next
      : "/account/profile";

  if (!code) {
    return NextResponse.redirect(
      new URL("/account/profile", requestUrl.origin)
    );
  }

  const supabase =
    await createSupabaseServerClient();

  const { error } =
    await supabase.auth.exchangeCodeForSession(
      code
    );

  if (error) {
    console.error(
      "Failed to exchange confirmation code:",
      error
    );

    return NextResponse.redirect(
      new URL("/account/profile", requestUrl.origin)
    );
  }

  return NextResponse.redirect(
    new URL(safeNext, requestUrl.origin)
  );
}