"use client";

import CurrencySelector from "@/app/components/CurrencySelector";
import { redirect, useRouter } from "next/navigation";
import { MouseEventHandler, useState } from "react";

export default function PrivateBookingForm() {
    const [locations, setLocations] = useState(["", "", ""]);
    const [pickForMe, setPickForMe] = useState(false);
    const [hotelPreference, setHotelPreference] = useState<string[]>([]);
    const [duration, setDuration] = useState("");
    const [customDays, setCustomDays] = useState("");
    const [holidayVibe, setHolidayVibe] = useState<string[]>([]);
    const [flightVisa, setFlightVisa] = useState<string[]>([]);
    const [packageType, setPackageType] = useState("");
    const [budget, setBudget] = useState("");
    const [currency, setCurrency] = useState("");
    const [notes, setNotes] = useState("");
    const [terms, setTerms] = useState<boolean>(false);
    const router = useRouter();

    const hotelOptions = [
        "Beachfront Resort",
        "Boutique Hotel",
        "Luxury Hotel",
        "All-Inclusive Resort",
        "Traditional/Local Style Hotel",
        "Urban/Modern Hotel",
        "Eco-friendly/Green Hotel",
        "Other"
    ];

    const durationOptions = [
        "3-5 Days",
        "6-7 Days",
        "8-10 Days",
        "More than 10 Days"
    ];

    const vibeOptions = [
        "Nature/Adventure",
        "City Escape",
        "A mix of both"
    ];

    const flightVisaOptions = [
        "Arrange my flight bookings",
        "Arrange visa applications",
        "I will handle myself"
    ];

    const packageOptions = ["Budget Package", "Mid-Range Package", "Luxury Package"];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const bookingData = {
            locations,
            pickForMe,
            hotelPreference,
            duration: duration === "Custom" ? customDays : duration,
            holidayVibe,
            flightVisa,
            packageType,
            budget,
            currency,
            notes
        };
        console.log("Booking Submitted:", bookingData);
        // TODO: Send to backend API
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 p-6 max-w-3xl mx-auto text-black">
            <h2 className="text-5xl font-bold text-center">Private Holiday Booking</h2>

            <div>
                <h3 className="font-semibold">Holiday Location Preferences</h3>
                {locations.map((loc, idx) => (
                    <input
                        key={idx}
                        type="text"
                        placeholder={`Location ${idx + 1}`}
                        value={loc}
                        onChange={(e) => {
                            const newLocs = [...locations];
                            newLocs[idx] = e.target.value;
                            setLocations(newLocs);
                        }}
                        className="border p-2 rounded w-full my-1"
                    />
                ))}
                <label className="flex items-center mt-2">
                    <input
                        type="checkbox"
                        checked={pickForMe}
                        onChange={(e) => setPickForMe(e.target.checked)}
                        className="mr-2"
                    />
                    Please pick/suggest a location for me
                </label>
            </div>

            <div>
                <h3 className="font-semibold">Hotel Aesthetic Preferences</h3>
                {hotelOptions.map((opt) => (
                    <label key={opt} className="flex items-center my-1">
                        <input
                            type="checkbox"
                            value={opt}
                            checked={hotelPreference.includes(opt)}
                            onChange={(e) => {
                                const val = e.target.value;
                                setHotelPreference((prev) =>
                                    prev.includes(val)
                                        ? prev.filter((v) => v !== val)
                                        : [...prev, val]
                                );
                            }}
                            className="mr-2"
                        />
                        {opt}
                    </label>
                ))}
                {hotelPreference.includes("Other") && (
                    <input
                        type="text"
                        placeholder="Other preference"
                        className="border p-2 rounded w-full mt-1"
                    />
                )}
            </div>

            <div>
                <h3 className="font-semibold">Duration of Stay</h3>
                {durationOptions.map((opt) => (
                    <label key={opt} className="flex items-center my-1">
                        <input
                            type="radio"
                            name="duration"
                            value={opt}
                            checked={duration === opt}
                            onChange={(e) => setDuration(e.target.value)}
                            className="mr-2"
                        />
                        {opt}
                    </label>
                ))}
                <input
                    type="number"
                    placeholder="Specify number of days"
                    value={customDays}
                    onChange={(e) => setCustomDays(e.target.value)}
                    className="border p-2 rounded w-full mt-2"
                />
            </div>

            <div>
                <h3 className="font-semibold">Holiday Vibe</h3>
                {vibeOptions.map((opt) => (
                    <label key={opt} className="flex items-center my-1">
                        <input
                            type="checkbox"
                            value={opt}
                            checked={holidayVibe.includes(opt)}
                            onChange={(e) => {
                                const val = e.target.value;
                                setHolidayVibe((prev) =>
                                    prev.includes(val)
                                        ? prev.filter((v) => v !== val)
                                        : [...prev, val]
                                );
                            }}
                            className="mr-2"
                        />
                        {opt}
                    </label>
                ))}
            </div>

            <div>
                <h3 className="font-semibold">Flight and Visa Arrangements</h3>
                {flightVisaOptions.map((opt) => (
                    <label key={opt} className="flex items-center my-1">
                        <input
                            type="checkbox"
                            value={opt}
                            checked={flightVisa.includes(opt)}
                            onChange={(e) => {
                                const val = e.target.value;
                                setFlightVisa((prev) =>
                                    prev.includes(val)
                                        ? prev.filter((v) => v !== val)
                                        : [...prev, val]
                                );
                            }}
                            className="mr-2"
                        />
                        {opt}
                    </label>
                ))}
            </div>

            <div>
                <h3 className="font-semibold">Holiday Package Type</h3>
                {packageOptions.map((opt) => (
                    <label key={opt} className="flex items-center my-1">
                        <input
                            type="radio"
                            name="packageType"
                            value={opt}
                            checked={packageType === opt}
                            onChange={(e) => setPackageType(e.target.value)}
                            className="mr-2"
                        />
                        {opt}
                    </label>
                ))}
            </div>

            <div>
                <h3 className="font-semibold">Holiday Budget</h3>
                <div className="flex flex-row-reverse self-start gap-2">
                    <input
                        type="number"
                        placeholder="Total Budget"
                        value={budget}
                        onChange={(e) => {
                            if (Number(e.target.value) < 0)
                                e.target.value = "0";
                            setBudget(e.target.value)
                        }}
                        className="border p-2 rounded w-full my-1"
                    />
                    <CurrencySelector value={currency} onChange={setCurrency} className={"items-center"} />
                </div>
            </div>

            <div>
                <h3 className="font-semibold">Additional Requests/Notes</h3>
                <textarea
                    placeholder="Anything else you'd like to mention?"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="border p-2 rounded w-full"
                    rows={4}
                />
            </div>

            <div className="flex">
                {/* // @ts-ignore */}
                <input type="checkbox" className="mr-2" onClick={e => {
                    // @ts-ignore
                    setTerms(e.target.checked);
                }} />
                <p onClick={() => {
                    router.replace("terms/privatebooking")
                }} className="underline hover:text-blue-600"> By clicking the terms and conditions</p>
            </div>

            <button
                type="submit"
                disabled={!terms}
                className="bg-blue-600 text-white p-3 rounded hover:bg-blue-700 w-full"
            >
                Submit Booking
            </button>
        </form>
    );
}
