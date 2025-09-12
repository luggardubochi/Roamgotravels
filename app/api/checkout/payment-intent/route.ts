import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/app/Constants";

export async function POST(req: NextRequest) {
    try {
        const headerList = await headers();
        const origin = headerList.get("origin");
        const { amount, currency } = await req.json();

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: currency,
            automatic_payment_methods: { enabled: true }
        })

        return NextResponse.json({ clientSecret: paymentIntent.client_secret });

    } catch (err: any) {
        return NextResponse.json({
            error: err.message,
            status: err.status || 500
        })
    }
}