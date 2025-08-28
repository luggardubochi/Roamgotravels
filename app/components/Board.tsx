"use client";
import { motion } from "framer-motion";

const steps = [
  {
    number: 1,
    title: "Check-In",
    description: "Complete your online check-in or at the airport counter.",
    svg: (
      <svg
        className="w-10 h-10 text-blue-500 mb-2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M3 10h18M3 6h18M3 14h18M3 18h18" />
      </svg>
    ),
  },
  {
    number: 2,
    title: "Security Check",
    description: "Go through the security checkpoint before boarding.",
    svg: (
      <svg
        className="w-10 h-10 text-green-500 mb-2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M12 3v18M3 12h18" />
      </svg>
    ),
  },
  {
    number: 3,
    title: "Boarding",
    description: "Show your boarding pass and enter the aircraft.",
    svg: (
      <svg
        className="w-10 h-10 text-purple-500 mb-2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    ),
  },
];

export default function HowToBoard() {
  return (
    <div className="flex flex-col items-center justify-center text-white h-[400px] border-t-4">
      <h2 className="text-3xl font-bold text-center">
        How to Board a Flight
      </h2>

      <div className="flex flex-col md:flex-row items-center justify-center gap-10">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className="flex flex-col items-center text-center  rounded-2xl p-6 shadow-lg w-64"
          >
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 border-white mb-4 text-lg font-bold">
              {step.number}
            </div>
            {step.svg}
            <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
            <p className="text-gray-600 text-sm">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
