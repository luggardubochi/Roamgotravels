import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/app/Constants";

export async function POST() {
    try {
        const headerList = await headers();
        const origin = headerList.get("origin");


        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    // Provide the exact Price ID (for example, price_1234) of the product you want to sell
                    price: '{{PRICE_ID}}',
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/?canceled=true`,
        });
        return NextResponse.redirect(session.url as string, 303)
    } catch (err: any) {
        return NextResponse.json({
            error: err.message,
            status: err.status || 500
        })
    }
}