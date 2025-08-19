"use client";

import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

type TripCardProps = {
    key?: string;
    identity?: string;
    image: string;
    title: string;
    date: string;
    tags: string[];
};

export function TripCard({ key, identity, image, title, date, tags }: TripCardProps) {
    const router = useRouter();
    return (
        <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden shadow-md w-[300px] flex-shrink-0"
            onClick={() => {
                if (identity)
                    router.push(`/grouptrip/${identity}`)
                console.log(title, key, identity);
            }}
        >
            <Image
                src={image}
                alt={title}
                width={400}
                height={500}
                className="w-full h-[450px] object-cover"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {/* Tags */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {tags.map((tag, i) => (
                    <span
                        key={i}
                        className="bg-gray-800/70 text-white text-xs px-3 py-1 rounded-full"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {/* Text */}
            <div className="absolute bottom-6 left-6 text-white">
                <p className="text-xs mb-1">{date}</p>
                <h3 className="text-xl font-semibold leading-snug max-w-[250px]">
                    {title}
                </h3>
            </div>
        </motion.div>
    );
}

export default function GroupDestinations() {
    const trips = [
        {
            image: "/assets/15+Places+You+Must+Visit+in+Albania1.jpg",
            title: "Singapore & Vietnam",
            date: "November 25th - December 01st",
            tags: ["Adventure", "Combo Trip", "Culture", "Luxe Living"],
        },
        {
            image: "/assets/thailandnwbeachsplash.jpg",
            title: "Japan Highlights 2025",
            date: "October 04th - October 12th",
            tags: ["Adventure", "Culture", "Multi City"],
        },
        {
            image: "/assets/jyoshankar_travelblogger_desertluxurycamp_morocco_merzouga_saharadesert_glamping_ergchebbi_2.jpg",
            title: "Morocco Colors & Culture",
            date: "September 10th - September 18th",
            tags: ["Adventure", "Culture", "History"],
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % trips.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? trips.length - 1 : prev - 1
        );
    };

    return (
        <section className="py-16 px-6 md:px-20 lg:flex lg:justify-between sm:flex-col lg:flex-row">
            {/* Section header */}
            <div>

                <p className="text-pink-600 uppercase text-2xl align-middle text-center font-semibold mb-2">
                    Suggested Group Destinations
                </p>

                {/* Filters */}
                <div className="flex flex-wrap gap-3 mb-8">
                    <button className="px-4 py-2 border border-pink-600 text-pink-600 rounded-full text-sm hover:bg-pink-50 transition">
                        🧳 Trips for Every Style
                    </button>
                    <button className="px-4 py-2 border border-pink-600 text-pink-600 rounded-full text-sm hover:bg-pink-50 transition">
                        🧑‍🤝‍🧑 Perfect for Solo Travelers
                    </button>
                    <button className="px-4 py-2 border border-pink-600 text-pink-600 rounded-full text-sm hover:bg-pink-50 transition">
                        💳 Flexible Payment Plans
                    </button>
                    <button className="px-4 py-2 border border-pink-600 text-pink-600 rounded-full text-sm hover:bg-pink-50 transition">
                        🌐 Expand Your Network
                    </button>
                </div>

                {/* Title + Description */}
                <h2 className="text-3xl md:text-4xl font-bold mb-3 text-black">
                    No friends to travel with? No problem, <br />
                    join our travel tribe.
                </h2>
                <p className="text-gray-600 mb-8">
                    Browse over 100 group trips on our calendar and sign up for the trip that
                    matches your travel style!
                </p>

            </div>
            {/* Carousel */}
            <div>

                <div className="relative flex items-center gap-6">
                    {/* Prev Button */}

                    {/* Cards */}
                    <div className="flex gap-6 overflow-hidden">
                        {trips.slice(currentIndex, currentIndex + 3).map((trip, i) => (
                            <TripCard key={i} {...trip} />
                        ))}
                    </div>

                    {/* Next Button */}
                </div>

                {/* Pagination */}
                <div className="text-center mt-6 text-gray-500">
                    <button
                        onClick={prevSlide}
                        className="mr-5"
                    >
                        <FaArrowLeft />
                    </button>
                    {currentIndex + 1} | {trips.length}
                    <button
                        onClick={nextSlide}
                        className="ml-5"
                    >
                        <FaArrowRight />
                    </button>
                </div>
            </div>
        </section>
    );
}
