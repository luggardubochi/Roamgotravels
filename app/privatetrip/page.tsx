"use client";
import { useState } from "react";
import BackDrop from "../components/BackDrop";
import TripFilter from "../components/TripFilter";
import Highlights from "../components/HighLight";
import NextSteps from "../components/NextSteps";

interface FilterProps {
    continent: string;
    year: string;
    month: string;
    tripStyle: string;
    minPrice: Number;
    maxPrice: Number;
}


export default function Page() {
    const [filter, setFilter] = useState<FilterProps>();
    const description = "Take control of your adventure with private trip bookings. Whether it’s a romantic escape, a family getaway, or a personalized retreat, we craft experiences tailored just for you. Enjoy flexibility, comfort, and unforgettable memories on your terms.";

    const handleApply = (filters: FilterProps) => {
        setFilter(filters);
    };

    const images = [
        {
            src: "/background/grouptrip/ida-bagus-surya-adiputra-gdfxKO5LpPU-unsplash.jpg"
        },
        {
            src: "/background/grouptrip/muhammad-iswandi-k0O4qnue-FA-unsplash.jpg"
        },
        {
            src: "/background/grouptrip/najmul-h-hossain-Y5XVTrfkYn0-unsplash.jpg"
        },
        {
            src: "/assets/carousel_image_3.jpg",
        },
        {
            src: "/assets/carousel_image_4.jpg",
        },
        {
            src: "/assets/IMG-20250620-WA0048.jpg",
        },
        {
            src: "/assets/IMG-20250620-WA0057.jpg",
        },
        {
            src: "/assets/IMG-20250620-WA0059.jpg",
        },
        {
            src: "/assets/IMG-20250620-WA0063.jpg",
        },
    ]
    return (<div className="w-full">
        <BackDrop imageURL="/background/daniel-sessler-IyhdFcaRYqE-unsplash.jpg" title="🌟 Your Journey, Your Way" description={description} />
        <TripFilter onApply={handleApply} />
        <Highlights images={images} />
        <NextSteps />
    </div>)
}