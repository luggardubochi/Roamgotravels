import { NextResponse, type NextRequest } from "next/server";
import { verifyJWT } from './lib/auth';
import { JWT_SECRET, TOKENNAME } from "./app/Constants";
import jwt from "jsonwebtoken";

export async function middleware(req: NextRequest) {
    const token = req.cookies.get(TOKENNAME)?.value;
    console.log(token);

    if (req.nextUrl.pathname.startsWith("/dashboard")) {
        if (token == undefined) {
            return NextResponse.redirect(new URL("/auth/login", req.url));
        }
        const user = await verifyJWT(token);
        if (!user) {
            console.log(jwt.verify(token, JWT_SECRET), token);
            return NextResponse.redirect(new URL("/auth/login", req.url));
        }
    }

    if (req.nextUrl.pathname.startsWith("/admin")) {
        if (!token) {
            return NextResponse.redirect(new URL("/admin/login", req.url));
        }
        const user = await verifyJWT(token);
        if (!user) {
            return NextResponse.redirect(new URL("/admin/login", req.url));
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/admin/:path*"
    ]
}