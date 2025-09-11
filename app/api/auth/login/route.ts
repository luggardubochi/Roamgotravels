import { NextResponse } from "next/server";

import prisma from "@/prisma/client";
import { createJWT } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { TOKENNAME } from "@/app/Constants";
import { cookies } from "next/headers";



export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // Check password
        const match = await bcrypt.compare(password, user.password as string);
        if (!match) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // Generate JWT
        const token = await createJWT(user);

        const res = NextResponse.json({ message: "Login successful" }, { status: 200 });
        const cookiestore = await cookies();
        cookiestore.set(TOKENNAME, token, {
            httpOnly: true,
            path: "/",
            secure: true,
            maxAge: 60 * 60 * 24,
        });
        return res
    } catch (err) {

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
