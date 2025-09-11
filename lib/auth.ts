"use server"
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { JWT_SECRET, TOKENNAME } from "@/app/Constants";
import { User } from "@/app/generated/prisma";
import { NextRequest } from "next/server";


export async function getUser() {
    const cookieStore = await cookies();
    const token = await cookieStore.get(TOKENNAME)?.value;
    if (!token) return null;
    return verifyJWT(token);
}


const secret = new TextEncoder().encode(JWT_SECRET);


export async function createJWT(payload: User, expiresIn = "1d") {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(expiresIn)
        .sign(secret);
}


export async function verifyJWT(token: string) {
    try {
        const { payload } = await jwtVerify(token, secret);
        return payload;
    } catch (err) {
        console.error("JWT verification failed:", err);
        return null;
    }
}

export async function verifyUser(req: NextRequest) {
    const token = req.cookies.get(TOKENNAME)?.value;
    if (!token) return null;

    try {
        const { payload } = await jwtVerify(token, secret);
        return payload;
    } catch {
        return null;
    }
}