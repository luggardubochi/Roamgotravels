import {Request, Response} from "express";
import Stripe from "stripe";
import bodyParser from "body-parser";
import getRawBody from "raw-body";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const stripeWebhook = process.env.STRIPE_WEBHOOK_SECRET as string;

export async function createPaymentIntent(req: Request, res: Response) {
    try{
        const {amount, currency} = req.body;
        const Intent = await stripe.paymentIntents.create({
            amount, 
            currency,
            automatic_payment_methods: {
                enabled:true
            }
        });
        res.send({clientSecret: Intent.client_secret})
    } catch (err) {
        res.status(500).json({error: err})
    }
}

export async function confimTransaction(req: Request, res: Response) {
    const sig = req.headers["stripe-signature"] as string[];
    let event;

    try {
        const rawBody = await getRawBody(req);
        event = stripe.webhooks.constructEvent(rawBody, sig, stripeWebhook);
    } catch (err) {
        console.error("Webhook signature verification failed", err);
        return res.sendStatus(400);
    }

    switch(event.type) {
        case "payment_intent.succeeded":
            const paymentIntent = event.data.object;
            console.log("Payment Succeded: ", paymentIntent.id);
            break;
        case "payment_intent.payment_failed":
            const failedPayment = event.data.object;
            console.log("Payment Failed: ", failedPayment.id);
            break
        default:
            console.log("This case was not handled");
    }

    res.json({received: true});
}