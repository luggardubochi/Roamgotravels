import React from 'react';
import { HiGlobe, HiCalendar, HiCurrencyDollar, HiPaperAirplane } from 'react-icons/hi';

const NextSteps = () => {
    const title = "See what to do next";
    const subtitle = "Next steps";
    const defaultSteps = [
        { id: 1, icon: HiGlobe, title: "Chose Package", description: "Select the trip that works for your travel style and budget! All of our package are customizable, your dedicated travel wxpert will make adjustment based on your preferences and we provide you with a list of top rated hotels and villas so you get the final say on your accommodations" },
        { id: 2, icon: HiCalendar, title: "Choose departure date", description: "We plan your trip based on the dates you provide us! You can always change your dates as needed up util your accommodations are booked. Need help with finding lifhts? You can always reach out to our team for support." },
        { id: 3, icon: HiCurrencyDollar, title: "Pick a payment plan", description: "We provide fully customizable payment plans for all travelers. Simple secure your trip with a deposit and pay the remaining balance with regular installments with all payments completed up to one month before your arrival date" },
        { id: 4, icon: HiPaperAirplane, title: "Travel", description: "Our team will be ready to welcome you once you arrive at your destination, we provide full service 24/7 support during your trip. Get ready for a bucket list experience. Your experience has been curated with care and attention to detail, We can't wait for you to see what we have in store" }
    ];

    return (
        <div className="w-full bg-gray-50 py-16 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <p className='text-gray-500 text-sm font-medium tracking-wider uppercase mb-4'>
                        {subtitle}
                    </p>
                    <h2 className='text-4xl md:text:5xl lg:text-6xl font-light text-gray-800 leading-tight'>{title}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {defaultSteps.map((step, index) => (
                        <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 group hover:-translate-y-1" key={step.id}>

                            <div className="mb-6">
                                <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center group-hover:bg-gray-800 transition-colors duration-300">
                                    <step.icon size={28} className='text-gray-600 group-hover:text-white transition-colors duration-300' />
                                </div>
                            </div>

                            <h3 className='text-xl font-semibold text-gray-800 mb-4 leading-tight'>
                                {index+1}. {step.title}
                            </h3>

                            <p className='text-gray-600 leading-relaxed text-sm'>
                                {step.description}
                            </p>

                        </div>
                    ))}
                </div>

                <div className="text-center mt-16">
                    <button className='bg-gray-800 hover:bg-gray-900 text-white px-8 py-4 rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5'>
                        Get Started Today
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NextSteps;