import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
    try {
        const { firstname, lastname, email, password } = await req.json();

        if (!firstname || !lastname || !email || !password) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        // Check if user exists
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            return NextResponse.json({ error: "User already exists" }, { status: 409 });
        }

        // Hash password
        const hashed = await bcrypt.hash(password, 10);

        // Save user
        const data = {
            id: uuidv4(), firstName: firstname, lastName: lastname, email: email,
            password: hashed, role: "user",
            emailVerified: false, image: null,
        };

        const user = await prisma.user.create({
            data: data,
        });

        return NextResponse.json(
            { message: "User created", user: { id: user.id, email: user.email } },
            { status: 201 }
        );
    } catch (err) {
        console.error("Signup error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

