"use client";

import { useEffect, useState } from "react";
import { BiX } from "react-icons/bi";
import { DualRange } from "./DualRange";
import { CiSliderHorizontal } from "react-icons/ci";

export type TripFilterProps = {
    onApply: (filters: {
        continent: string;
        year: string;
        month: string;
        tripStyle: string;
        minPrice: number;
        maxPrice: number;
    }) => void;
};

function setupIntersectionObserver(elementId: string, callback: (...x: any) => void) {
    const element = document.getElementById(elementId);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                callback('visible', entry);
            } else {
                const rect = entry.boundingClientRect;
                if (rect.bottom < 0) {
                    callback('scrolled-past', entry);
                } else if (rect.top > window.innerHeight) {
                    callback('before', entry);
                }
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0
    });

    observer.observe(element as HTMLElement);
    return observer;
}

const TripFilter: React.FC<TripFilterProps> = ({ onApply }) => {
    const [isSticky, setIsSticky] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [height, setHeight] = useState<number>(0);
    const [scroll, setScroll] = useState<number>(0);

    const [continent, setContinent] = useState("");
    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [tripStyle, setTripStyle] = useState("");
    const [minPrice, setMinPrice] = useState(500);
    const [maxPrice, setMaxPrice] = useState(2000);

    useEffect(() => {
        const handleScroll = () => {

            const trippy = document.getElementById("hightlight");
            const heroHeight = document.getElementById("hero")?.offsetHeight || 0;
            setIsSticky(window.scrollY > heroHeight && window.scrollY < (trippy?.offsetTop as number));
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleApply = () => {
        onApply({
            continent,
            year,
            month,
            tripStyle,
            minPrice,
            maxPrice,
        });
    };

    /** Extracted reusable filter form */
    const FilterForm = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 items-end p-4" id="tripfilter">
            {/* Continent */}
            <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-600">Continent</label>
                <select
                    value={continent}
                    onChange={e => setContinent(e.target.value)}
                    className="p-2 border rounded-lg w-full text-black"
                >
                    <option value="">Select Continent</option>
                    <option value="africa">Africa</option>
                    <option value="asia">Asia</option>
                    <option value="europe">Europe</option>
                    <option value="americas">Americas</option>
                    <option value="oceania">Oceania</option>
                </select>
            </div>

            {/* Year */}
            <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-600">Year</label>
                <select
                    value={year}
                    onChange={e => setYear(e.target.value)}
                    className="p-2 border rounded-lg w-full text-black"
                >
                    <option value="">Select Year</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                </select>
            </div>

            {/* Month */}
            <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-600">Month</label>
                <select
                    value={month}
                    onChange={e => setMonth(e.target.value)}
                    className="p-2 border rounded-lg w-full text-black"
                >
                    <option value="">Select Month</option>
                    {[
                        "January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December",
                    ].map(m => (
                        <option key={m}>{m}</option>
                    ))}
                </select>
            </div>

            {/* Price (Dual Range) */}
            <div className="lg:col-span-2">
                <label className="text-sm text-gray-600">Price Range ($)</label>
                <DualRange
                    min={100}
                    max={2000}
                    step={50}
                    minValue={minPrice}
                    maxValue={maxPrice}
                    minDistance={100}
                    onChange={({ minValue, maxValue }) => {
                        setMinPrice(minValue);
                        setMaxPrice(maxValue);
                    }}
                />
            </div>

            {/* Trip Style */}
            <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-900">Trip Style</label>
                <select
                    className="p-2 border rounded-lg w-full text-black"
                    onChange={e => setTripStyle(e.target.value)}
                    value={tripStyle}
                >
                    <option value="">Trip Style</option>
                    <option value="adventure">Adventure</option>
                    <option value="luxury">Luxury</option>
                    <option value="family">Family</option>
                    <option value="romantic">Romantic</option>
                    <option value="cultural">Cultural</option>
                </select>
            </div>

            {/* Action */}
            <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full"
                onClick={handleApply}
            >
                Apply Filters
            </button>
        </div>
    );


    return (
        <>
            <div
                className={`hidden md:block w-full bg-white shadow-md transition-all duration-300 ${isSticky ? "fixed top-0 left-0 z-50" : "relative"
                    }`}
            >
                <div className="max-w-7xl mx-auto">{FilterForm()}</div>
            </div>

            {/* Mobile top bar */}
            <div
                className={`md:hidden w-full bg-white shadow-md transition-all duration-300 ${isSticky ? "fixed top-0 left-0 z-50" : "relative"
                    }`}
            >
                <div className="flex items-center justify-between px-4 py-3">
                    <span className="font-semibold text-gray-800">Filters</span>
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white"
                    >
                        <CiSliderHorizontal className="h-4 w-4" />
                        Open
                    </button>
                </div>
            </div>

            {/* Mobile drawer */}
            {isSidebarOpen && (
                <div className="fixed inset-0 z-50 flex">
                    <div
                        className="flex-1 bg-black/50"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                    <div className="w-11/12 max-w-sm h-full bg-white shadow-xl p-4 animate-in slide-in-from-right">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-lg font-semibold">Filters</h2>
                            <button onClick={() => setIsSidebarOpen(false)}>
                                <BiX className="h-6 w-6 text-gray-600" />
                            </button>
                        </div>
                        <div className="overflow-y-auto">{FilterForm()}</div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TripFilter;
