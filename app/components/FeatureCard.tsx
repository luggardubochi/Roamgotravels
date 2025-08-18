"use client";

import { motion } from "framer-motion";

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: () => void;
};

export function FeatureCard({ icon, title, description, action }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="transition-all"
    >
      <div className="bg-white shadow-md p-6 rounded-2xl border border-gray-200 hover:border-pink-400 hover:shadow-lg hover:shadow-pink-100">
        <div className="flex flex-col items-center text-center">
          <div className="mb-3">{icon}</div>
          <h3 className="text-lg text-black font-semibold">{title}</h3>
          <p className="text-gray-600 text-sm mt-2">{description}</p>
          {action && (
            <button
              onClick={action}
              className="mt-4 px-4 py-2 rounded-lg bg-pink-500 hover:bg-pink-600 text-white text-sm transition-colors"
            >
              Learn More
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
