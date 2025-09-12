"use client";

import { useState } from "react";

interface CurrencySelectorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

// List of ISO 4217 currencies
const currencies = [
    "USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY",
    "SEK", "NZD", "NGN", "INR", "ZAR", "MXN", "BRL", "RUB",
    "KRW", "SGD", "TRY", "AED"
];

export default function CurrencySelector({ value, onChange, placeholder, className }: CurrencySelectorProps) {

    return (
        <div className={`relative flex gap-2 justify-center text-center ${className}`}>
            <label htmlFor="currency">Currency: </label>

            <select name="currency" id="currency" onChange={e => onChange(e.target.value)}>
                <option value={value}>{value}</option>
                {currencies.map(val => (<option value={val}>{val}</option>))}
            </select>
        </div>
    );
}
