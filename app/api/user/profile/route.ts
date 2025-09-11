import { verifyUser } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const user = await verifyUser(req);

    if (!user)
        return NextResponse.json({ error: "UnAuthorized" }, { status: 401 })

    return NextResponse.json({
        data: {
            firstName: user.firstName,
            lastName: user.lastName,
            image: user.image,
            email: user.email,
        },
        status: 200,
    })

}