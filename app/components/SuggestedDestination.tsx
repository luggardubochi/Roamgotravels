"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type TripCardProps = {
  image: string;
  title: string;
  date: string;
  tags: string[];
};

function TripCard({ image, title, date, tags }: TripCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="relative rounded-2xl overflow-hidden shadow-md"
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

export default function SuggestedDestinations() {
  const trips = [
    {
      image: "/dubai.jpg", // put these in /public
      title: "Dubai Luxe Getaway",
      date: "January 01st - December 31st",
      tags: ["Culture", "Luxe Living", "Summer"],
    },
    {
      image: "/bali.jpg",
      title: "Bali Baecation",
      date: "January 01st - December 31st",
      tags: ["Couples Getaways", "Culture", "Islands", "Luxe Living", "Summer"],
    },
    {
      image: "/kenya.jpg",
      title: "Kenya Full Safari Experience Nairobi, Amboseli & Maasai Mara",
      date: "January 01st - December 31st",
      tags: ["Adventure", "Culture", "Summer"],
    },
  ];

  return (
    <section className="py-16 px-6 md:px-20">
      {/* Section header */}
      <p className="text-pink-600 uppercase text-sm font-semibold mb-2">
        Suggested Private Destinations
      </p>
      <h2 className="text-3xl md:text-4xl font-bold mb-3">
        Bucket list vacations designed for your budget!
      </h2>
      <p className="text-gray-600 mb-8">
        Browse our travel packages or request a customized trip designed to match
        your travel style.
      </p>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-12">
        <button className="px-4 py-2 border border-pink-600 text-pink-600 rounded-full text-sm hover:bg-pink-50 transition">
          🌍 Over 100 Destinations
        </button>
        <button className="px-4 py-2 border border-pink-600 text-pink-600 rounded-full text-sm hover:bg-pink-50 transition">
          💸 For Every Budget
        </button>
        <button className="px-4 py-2 border border-pink-600 text-pink-600 rounded-full text-sm hover:bg-pink-50 transition">
          ⚖ Flexible Payments
        </button>
        <button className="px-4 py-2 border border-pink-600 text-pink-600 rounded-full text-sm hover:bg-pink-50 transition">
          📝 Curated Travel Plans
        </button>
      </div>

      {/* Cards grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {trips.map((trip, i) => (
          <TripCard key={i} {...trip} />
        ))}
      </div>
    </section>
  );
}
