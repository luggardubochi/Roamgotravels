import "../style/Payment.css";
import React, { useState } from "react";
import { loadStripe, type StripeCardElement } from "@stripe/stripe-js";
import {
    Elements,
    CardElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { BACKEND_API, STRIPE_PUBLISHABLE_KEY } from "../components/config";

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY); // Your publishable key

function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const plan = { label: "Flight Booking", amount: 1999 }; // $19.99
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setLoading(true);
        const token = localStorage.getItem('token');
        try {
            // Ask backend to create a payment intent
            const req = await fetch(`${BACKEND_API}/api/payment-intent`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    amount: 1000,
                    currency: "usd",
                }),
            });
            const data = await req.json();
            const result = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement) as StripeCardElement,
                },
            });

            if (result.error) {
                setMessage(result.error.message as string);
            } else {
                if (result.paymentIntent.status === "succeeded") {
                    setMessage("Payment successful!");
                }
            }
        } catch (err) {
            setMessage("Payment failed: " + err as string);
        }

        setLoading(false);
    };

    return (
        <div className="payment-container">         

            {/* Order Summary */}
            <div className="order-summary">
                <h2>Order Summary</h2>
                <p>Item: <strong>{plan.label}</strong></p>
                <p>Total: <strong>${(plan.amount / 100).toFixed(2)}</strong></p>
            </div>

            {/* Payment Form */}
            <form onSubmit={handleSubmit}>
                <label className="card-label">Card Details</label>
                <div className="card-input">
                    <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
                </div>
                <button type="submit" disabled={!stripe || loading}>
                    {loading ? "Processing..." : `Pay $${(plan.amount / 100).toFixed(2)}`}
                </button>
            </form>
        </div>
    );
}

export default function PaymentPage() {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
}
