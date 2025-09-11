"use client";
import React, { useState, useEffect } from 'react';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';

type HighLightProp = {
    images?: {
        src?: string;
        alt?: string;
        caption?: string;
    }[];
    autoPlayInterval?: number;
    showControls?: boolean;
    title?: string;
    subtitle?: string;
};

const Highlights = ({
    images = [],
    autoPlayInterval = 4000,
    showControls = true,
    title = "Explore the most beautiful places in Peru",
    subtitle = "TOP HIGHLIGHTS"
}: HighLightProp) => {
    // Default images if none provided - Peru themed
    const defaultImages = [
        {
            src: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=600&h=400&fit=crop',
            alt: 'People with llamas in traditional Peruvian clothing',
            caption: 'Traditional Culture'
        },
        {
            src: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=600&h=400&fit=crop',
            alt: 'Machu Picchu ancient ruins',
            caption: 'Machu Picchu'
        },
        {
            src: 'https://images.unsplash.com/photo-1531065208531-4036c0dba3ca?w=600&h=400&fit=crop',
            alt: 'Person at Machu Picchu with llamas',
            caption: 'Sacred Valley'
        },
        {
            src: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=600&h=400&fit=crop',
            alt: 'Woman sitting at Machu Picchu viewpoint',
            caption: 'Mountain Views'
        },
        {
            src: 'https://images.unsplash.com/photo-1539650116574-75c0c6d0fc85?w=600&h=400&fit=crop',
            alt: 'Colorful Peruvian landscape',
            caption: 'Rainbow Mountain'
        },
        {
            src: 'https://images.unsplash.com/photo-1580735924582-4d7cfb481c91?w=600&h=400&fit=crop',
            alt: 'Lake Titicaca floating islands',
            caption: 'Lake Titicaca'
        }
    ];

    const imageList = images.length > 0 ? images : defaultImages;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);

    // Calculate how many images to show based on screen size
    const getVisibleCount = () => {
        if (typeof window === 'undefined') return 4;
        if (window.innerWidth < 640) return 1;
        if (window.innerWidth < 768) return 2;
        if (window.innerWidth < 1024) return 3;
        return 4;
    };

    const [visibleImages, setVisibleImages] = useState(getVisibleCount());

    useEffect(() => {
        const handleResize = () => {
            setVisibleImages(getVisibleCount());
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    // Auto-play functionality
    useEffect(() => {
        if (!isPlaying || imageList.length <= visibleImages) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const maxIndex = imageList.length - visibleImages;
                return prevIndex >= maxIndex ? 0 : prevIndex + 1;
            });
        }, autoPlayInterval);

        return () => clearInterval(interval);
    }, [isPlaying, autoPlayInterval, imageList.length, visibleImages]);

    const maxIndex = Math.max(0, imageList.length - visibleImages);
    const canNavigate = imageList.length > visibleImages;

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex <= 0 ? maxIndex : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex >= maxIndex ? 0 : prevIndex + 1
        );
    };

    return (
        <div className="w-full bg-gray-50 py-16 px-4" id='hightlight'>
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <p className="text-gray-500 text-sm font-medium tracking-wider uppercase mb-4">
                        {subtitle}
                    </p>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-800 leading-tight max-w-4xl mx-auto">
                        {title}
                    </h1>
                </div>

                {/* Images Container */}
                <div className="relative">
                    <div className="overflow-hidden rounded-2xl">
                        <div
                            className="flex transition-transform duration-700 ease-in-out gap-6"
                            style={{
                                transform: `translateX(-${currentIndex * (100 / visibleImages)}%)`,
                                width: `${(imageList.length / visibleImages) * 100}%`
                            }}
                        >
                            {imageList.map((image, index) => (
                                <div
                                    key={index}
                                    className="relative group cursor-pointer"
                                    style={{ width: `${100 / imageList.length}%` }}
                                >
                                    <div className="aspect-[4/3] relative overflow-hidden">
                                        <img
                                            src={image.src}
                                            alt={image.alt}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            loading={index < visibleImages ? "eager" : "lazy"}
                                        />

                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        {/* Caption overlay */}
                                        {image.caption && (
                                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                                                <h3 className="text-white font-medium text-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                                    {image.caption}
                                                </h3>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    {showControls && canNavigate && (
                        <>
                            <button
                                onClick={goToPrevious}
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 backdrop-blur-sm border border-gray-200 hover:shadow-xl"
                                aria-label="Previous images"
                            >
                                <BiLeftArrow size={24} />
                            </button>
                            <button
                                onClick={goToNext}
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 backdrop-blur-sm border border-gray-200 hover:shadow-xl"
                                aria-label="Next images"
                            >
                                <BiRightArrow size={24} />
                            </button>
                        </>
                    )}
                </div>

                {/* Dot Indicators */}
                {showControls && canNavigate && (
                    <div className="flex justify-center gap-2 mt-8">
                        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                    ? 'bg-gray-800 w-8'
                                    : 'bg-gray-300 hover:bg-gray-400 w-2'
                                    }`}
                                aria-label={`Go to slide group ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Highlights;