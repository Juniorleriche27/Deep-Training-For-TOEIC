import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) =>
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          ),
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isProtected =
    request.nextUrl.pathname.startsWith("/adherent") ||
    request.nextUrl.pathname.startsWith("/admin");

  if (isProtected && !user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  const isConfigurationPage =
    request.nextUrl.pathname === "/adherent/configuration";
  const profileComplete = Boolean(
    user?.user_metadata?.first_name && user?.user_metadata?.last_name
  );
  if (isProtected && user && !profileComplete && !isConfigurationPage) {
    return NextResponse.redirect(
      new URL("/adherent/configuration", request.url)
    );
  }

  return response;
}

export const config = {
  matcher: ["/adherent/:path*", "/admin/:path*"],
};
