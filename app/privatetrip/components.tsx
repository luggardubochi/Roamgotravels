import { motion } from "framer-motion";
import Image  from "next/image";

type TripCardProps = {
    image: string;
    title: string;
    date: string;
    tags: string[];
};


export function TripCard({ image, title, date, tags }: TripCardProps) {
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