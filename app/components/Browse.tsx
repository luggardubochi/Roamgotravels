// components/TripOptions.tsx
"use client";

import Image from "next/image";

export default function TripOptions() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 h-[100vh] w-full">
            {/* Browse Group Trips */}
            <div
                className="relative flex items-center justify-center h-full w-full bg-cover bg-center cursor-pointer"
                style={{ backgroundImage: "url('/background/cajeo-zhang-fdWcu__dodM-unsplash.jpg')" }}
            >
                <div className="border-dotted border-white border-2 bg-black/50 p-6 rounded-full">
                    <h2 className="text-white text-2xl md:text-3xl font-bold text-center">
                        Browse Group Trips
                    </h2>
                </div>
            </div>

            {/* Plan My Private Trips */}
            <div
                className="relative flex items-center justify-center h-full w-full bg-cover bg-center cursor-pointer"
                style={{ backgroundImage: "url('/background/cheng-lin-wZ8NK3SnDcs-unsplash.jpg')" }}
            >
                <div className="p-6 rounded-full border-dotted border-white border-2">
                    <h2 className="text-white text-2xl md:text-3xl font-bold text-center">
                        Plan My Private Trips
                    </h2>
                </div>
            </div>
        </div>
    );
}
