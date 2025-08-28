"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const reasons = [
  {
    name: "Affordable Packages",
    description: "Get the best deals tailored for your budget.",
    color: "bg-red-400",
  },
  {
    name: "Personalized Itineraries",
    description: "Custom plans that fit your preferences.",
    color: "bg-green-400",
  },
  {
    name: "24/7 Support",
    description: "Always here to help during your journey.",
    color: "bg-blue-400",
  },
  {
    name: "Trusted Partners",
    description: "Work with top-rated travel partners worldwide.",
    color: "bg-yellow-400",
  },
  {
    name: "Flexible Booking",
    description: "Change your plans without extra fees.",
    color: "bg-purple-400",
  },
  {
    name: "Exclusive Deals",
    description: "Access special offers available only on RoamGo.",
    color: "bg-pink-400",
  },
];

export default function WhyChooseRoamGo() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-6 border-t-2">
      <h2 className="text-4xl font-bold mb-0 text-center">
        Why You Should Choose RoamGo
      </h2>

      <div
        ref={ref}
        className="relative lg:w-[500px] lg:h-[900px] sm:w-[700px] sm:h-[700px]"
      >
        {/* Center Airplane */}
        <motion.div
          initial={{ scale: 0 }}
          animate={controls}
          variants={{
            visible: { scale: 1, transition: { duration: 0.8 } },
          }}
          className="absolute left-3/5 top-12/20 transform -translate-x-1/2 -translate-y-1/2"
        >
          <svg
            className="hidden w-16 h-16 text-gray-700 animate-bounce lg:flex"
            fill="blue"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M2.5 19l19-7-19-7v6l15 1-15 1v6z" />
          </svg>
        </motion.div>

        {/* Circles around */}
        {reasons.map((reason, i) => {
          const angle = (i / reasons.length) * 360;
          const radius = 300; // distance from center
          const rad = (angle * Math.PI) / 180;
          const x = radius * Math.cos(rad);
          const y = radius * Math.sin(rad);

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: i * 0.2 } },
              }}
              className={`lg:absolute flex flex-col items-center justify-center my-3 lg:w-70 lg:h-70 rounded-full shadow-lg p-4 text-center ${reason.color} text-white`}

              style={{
                left: `calc(50% + ${x}px - 80px)`,
                top: `calc(50% + ${y}px - 80px)`,
              }}
            >
              <span className="font-bold text-lg">{reason.name}</span>
              <p className="text-sm mt-2">{reason.description}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
