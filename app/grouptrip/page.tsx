"use client";
import { useMemo, useState } from "react";
import { TripCard } from "../components/GroupDestination";
import GroupData, { GroupTripDataProp } from "../components/GroupTripData";
import TripFilter from "../components/TripFilter";
import NoResults from "../components/NoResult";
import { Button } from "@radix-ui/themes";
import { IoReloadCircle } from "react-icons/io5";


interface FilterProps {
    continent: string;
    year: string;
    month: string;
    tripStyle: string;
    minPrice: Number;
    maxPrice: Number;
}

const Page = () => {

    const handleFilters = (filters: FilterProps) => {
        setFilter(filters);
    };

    function getMonthNumber(month: string): string {
        const months: Record<string, string> = {
            january: "0",
            february: "1",
            march: "2",
            april: "3",
            may: "4",
            june: "5",
            july: "6",
            august: "7",
            september: "8",
            october: "9",
            november: "10",
            december: "11",
        };

        return months[month.toLowerCase()] ?? "";
    }

    const [amount, setAmount] = useState(4);
    const [filter, setFilter] = useState<FilterProps>();
    const data: GroupTripDataProp[] = useMemo(() => {
        const newData = GroupData.slice(0, amount)
        return newData.filter(value => {
            const years = value.tripTime.map(x => x.endDate.getFullYear().toString());
            const months = value.tripTime.map(x => x.startDate.getMonth().toString());
            const tags = value.tag;
            const price = value.cost;
            if (filter)
                console.log(getMonthNumber(filter.month), months, new Date(2025, 12, 22).toDateString());

            const matchYear = filter?.year ? years.includes(filter.year) : true;
            const matchMonth = filter?.month ? months.includes(getMonthNumber(filter.month)) : true;
            const matchTag = filter?.tripStyle ? tags.includes(filter.tripStyle) : true;
            const matchPrice =
                filter?.minPrice !== undefined &&
                    filter?.maxPrice !== undefined
                    ? Number(price) >= Number(filter.minPrice) &&
                    Number(price) <= Number(filter.maxPrice)
                    : true;

            return matchYear && matchMonth && matchTag && matchPrice;
        });
    }, [filter, GroupData, amount]);

    return (
        <>
            <div
                className="relative flex h-[100vh] items-center justify-start w-full bg-cover bg-center cursor-pointer"
                style={{ backgroundImage: "url('/background/grouptrip/najmul-h-hossain-Y5XVTrfkYn0-unsplash.jpg')" }}
                id="hero"
            >
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="p-6 h-10 md:w-200 mx-[20vw] sm:w-300 flex flex-col gap-8" style={{ fontFamily: "var(--popping)" }}>
                    <h2 className="text-white text-2xl md:text-5xl font-bold">
                        " Travel With Our Community "
                    </h2>
                    <p className="md:text-2xl">
                        Don't wait for the group chat—the adventure is waiting for you. We connect travelers with shared interests for incredible trips. Join us to experience new cultures, explore amazing destinations, and build lasting friendships.
                    </p>
                </div>
            </div>
            <TripFilter onApply={handleFilters} />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-10 my-10 justify-items-center items-center">
                {data.length > 0 ? data.map(val => (
                    <TripCard key={val.id} identity={val.name} image={val.mainPic} title={val.pName as string} tags={val.tag as string[]} date={val.tripTime[0].startDate.toDateString()} />
                )) : (<NoResults message="No group trips match your search" />)}
            </div>
            <div className="flex flex-row justify-center border-r-[50px] my-7" >
                <button onClick={() => setAmount(amount + 4)} className="bg-blue-700 flex justify-center items-center rounded-lg p-2 gap-2 cursor-pointer">
                    <IoReloadCircle /> Load More
                </button>
            </div>
        </>
    );
};

export default Page;