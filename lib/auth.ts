
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { JWT_SECRET, TOKENNAME } from "@/app/Constants";
import { User } from "@/app/generated/prisma";


export async function getUser() {
    const cookieStore = await cookies();
    console.log(cookieStore);
    const token = await cookieStore.get(TOKENNAME)?.value;
    if (!token) return null;
    return verifyJWT(token);
}


const secret = new TextEncoder().encode(JWT_SECRET);

// 🔹 Create a JWT
export async function createJWT(payload: User, expiresIn = "1d") {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(expiresIn) // e.g. "1d", "2h", "10m"
        .sign(secret);
}

// 🔹 Verify a JWT
export async function verifyJWT(token: string) {
    try {
        const { payload } = await jwtVerify(token, secret);
        return payload; // contains decoded user info
    } catch (err) {
        console.error("JWT verification failed:", err);
        return null;
    }
}
