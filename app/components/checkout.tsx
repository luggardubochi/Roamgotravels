'use client'

import {
    PaymentElement,
    useElements,
    useStripe
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import { fetchClientSecret } from "@/app/actions/stripe"
import { useEffect, useState } from 'react'


export default function Checkout() {
    const stripe = useStripe();
    const element = useElements();

    const [errorMessage, setErrorMessage] = useState<string>("x");
    const [clientSecret, setclientSecret] = useState();
    const [loading, setloading] = useState<boolean>(false);

    useEffect(() => {
        fetch("/api/checkout/payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount: 200,
                currency: "usd"
            })
        })
            .then((res) => res.json())
            .then(data => setclientSecret(data.clientSecret))
    }, [])
    return (
        <form>
            {clientSecret && <PaymentElement className='text-black' />}
            <button
                type="submit"
                disabled={!stripe || loading}
                className="px-4 py-2 bg-blue-600 text-white rounded"
            >
                {loading ? "Processing..." : "Pay"}
            </button>
        </form>
    )
}