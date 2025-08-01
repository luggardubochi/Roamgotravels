"use client";

import { useMemo } from "react";
import GroupData from "../../components/GroupTripData";
import { useParams } from "next/navigation";
import { Button } from "@radix-ui/themes";

const Page = () => {
    const { grouptripid } = useParams();
    const data = useMemo(() => {
        const value = GroupData.filter(val => {
            return val.name === grouptripid
        })
        return value[0];
    }, [GroupData, grouptripid]);
    return (
        <>
            <div
                className="relative flex h-[100vh] items-center justify-start w-full bg-cover bg-center cursor-pointer"
                style={{ backgroundImage: `url(${data.mainPic})` }}
                id="hero"
            >
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="flex flex-col mx-3 lg:mx-70 font-bold gap-10">
                    <div className="flex sm:gap-4 flex-wrap lg:gap-6 ">{data.tag.map(v=>(<span className="px-4 text-white bg-gray-600 rounded-3xl p-2 backdrop-blur-2xl">{v}</span>))}</div>
                    <div className="text-[9em]">{data.pName}</div>
                    <div>{data.overview}</div>
                    <div><Button variant="classic" highContrast>Book This Trip</Button></div>
                </div>
            </div>
        </>
    )
}

export default Page;