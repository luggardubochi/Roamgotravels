import "server-only";
import { Stripe } from "stripe";

const TOKENNAME = process.env.TOKEN_NAME as string;
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret"; // use 
const STRIPE_PUBLIC_KEY = process.env.STRIPE_SECRET_KEY as string;
const stripe: Stripe = new Stripe(STRIPE_PUBLIC_KEY);

export {
    TOKENNAME,
    JWT_SECRET,
    STRIPE_PUBLIC_KEY,
    stripe
};
