import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  console.log("Token recebido no Middleware:", token);

  if (!token) {
    console.log("Token ausente. Redirecionando para /login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  console.log("Token presente. Permitir acesso.");
  return NextResponse.next();
}

export const config = {
  matcher: ["/eventos/:path*"],
};