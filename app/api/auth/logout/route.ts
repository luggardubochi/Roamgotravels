import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { TOKENNAME } from "@/app/Constants"; // your cookie name

export async function POST(req: NextRequest) {
    const cookieStore = await cookies();
    cookieStore.delete(TOKENNAME)
    // cookieStore.set({
    //     name: TOKENNAME,
    //     value: "",
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === "production",
    //     sameSite: "lax",
    //     path: "/",
    //     expires: new Date(0), // expire immediately
    // });

    return NextResponse.json({ message: "Logged out successfully" }, { status: 200 });
}
