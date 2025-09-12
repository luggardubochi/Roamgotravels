"use client";
import { STRIPE_PUBLIC_KEY } from "./constant"
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkout from "../components/checkout";
// import {stripe} from "@/app/Constants";
console.log(process.env.STRIPE_SECRET_KEY)
const stripe = loadStripe("pk_test_51RyEJfBITn6ixMC1X9r1Jy0k1N9tclO8Ed4PrDcu7Fu9efz2vP1HlI8bTPBp8m53uaJT1OA62SWD5pBJvZwXJ9VY00Sj3e66Ln");

export default function Page({ searchParams }: { searchParams: any }) {
    return (
        <Elements stripe={stripe} options={{
            mode: "payment",
            amount: 200,
            currency: "usd"
        }} 
        // className
        >

            <Checkout />
        </Elements>
    )
}