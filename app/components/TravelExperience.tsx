"use client";

import { FeatureCard } from "./FeatureCard";
import { BiWallet as Wallet, BiGift as Gift, BiUser as Users } from "react-icons/bi";
import Image from "next/image";
import { motion } from "framer-motion";

export default function TravelExperience() {
  return (
    <section className="py-16 px-6 md:px-20 text-center">
      <motion.h2
        className="text-3xl md:text-4xl font-bold mb-4"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Looking for a stress-free travel experience?
      </motion.h2>

      <motion.p
        className="text-xl text-gray-600 mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        viewport={{ once: true }}
      >
        Let the fear go...we've got you!
      </motion.p>

      <div className="grid md:grid-cols-3 gap-12 items-center">
        {/* Left side */}
        <div className="flex flex-col gap-12">
          <FeatureCard
            icon={<Wallet className="w-8 h-8 text-pink-500" />}
            title="Payment plans"
            description="Our trips are designed to be affordable and convenient. Choose flexible payments: full or monthly installments!"
            action={() => alert("More about Payment Plans!")}
          />

          <FeatureCard
            icon={<Users className="w-8 h-8 text-pink-500" />}
            title="A travel community"
            description="Join group trips with likeminded professionals worldwide. Build friendships while venturing beyond your comfort zone."
          />
        </div>

        {/* Center image */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <div className="rounded-full border-2 border-dashed border-gray-300 p-2">
            <Image
              src="/travel-swing.jpg" // put in /public
              alt="Travel swing"
              width={400}
              height={400}
              className="rounded-full object-cover"
            />
          </div>
        </motion.div>

        {/* Right side */}
        <div className="flex flex-col gap-12">
          <FeatureCard
            icon={<Gift className="w-8 h-8 text-pink-500" />}
            title="Curated experiences"
            description="Trips are carefully crafted by our travel experts for meaningful, tailored adventures."
          />

          <FeatureCard
            icon={<Users className="w-8 h-8 text-pink-500" />}
            title="Giving back"
            description="A portion of proceeds enriches local communities and supports small businesses in every destination."
          />
        </div>
      </div>
    </section>
  );
}
