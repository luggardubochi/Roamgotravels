"use client";
import { redirect } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import NoResults from "../components/NoResult";
import customTripMessages from "./individual";



interface ProfileProp {
    firstName: string,
    lastName: string,
    image: string,
    email: string,
}

export const Profile = () => {
    const user = useMemo(() => {
        return fetch("api/me/", { credentials: "include" })
            .then(res => res.json)
            .then(data => data);
    }, []);
    if (!user) redirect("/auth/login");

    const [profileUser, setProfileUser] = useState<ProfileProp>();

    useEffect(() => {
        async function setUp() {

            const res = await fetch("/api/user/profile", {
                method: "GET",
                credentials: "include"
            });

            if (!res.ok) {

            }
            const data = await res.json()
            setProfileUser(data.data)

        };
        setUp();
    }, [])
    return (

        <motion.div
            className="flex flex-col items-center text-center rounded-2xl w-96 shadow-sm p-6 text-black"
        >
            {profileUser?.image ? (
                <motion.img className="w-16 h-16 flex flex-row items-center justify-center rounded-full bg-gray-100 border-white mb-4 text-lg font-bold" src={profileUser?.email}></motion.img>
            ) : (
                <div className="h-30 w-30 rounded-full bg-zinc-400 flex justify-center text-center items-center">
                    <h1 className="font-bold text-4xl flex justify-center text-center items-center">{profileUser?.firstName.at(0)}</h1>
                </div>
            )}
            <motion.h4 className="w-16 break-words h-16 flex  flex-row items-center justify-center rounded-full bg-gray-100 border-white mb-4 text-lg font-bold">{profileUser?.firstName} {profileUser?.lastName} {profileUser?.email}</motion.h4>
        </motion.div>

    )
}


export const ProfileDetails = () => {
    const tabNames = ["Upcoming Trips", "Past Trips", "Saved Trips", "Canceled"];
    const [activeTab, setActiveTab] = useState<string>(tabNames[0]);
    const result = useMemo(() => {
        switch (activeTab) {
            case tabNames[0]:
                return customTripMessages["Upcoming Trips"];
            case tabNames[1]:
                return customTripMessages["Past Trips"];
            case tabNames[2]:
                return customTripMessages["Saved Trips"];
            case tabNames[3]:
                return customTripMessages.Canceled;
        }
    }, [activeTab])

    const Tab = () => {
        return (
            <div className="w-full">
                <div className="flex flex-row justify-between border-b-4 text-black lg:text-xl w-full">
                    {tabNames.map((val) => (
                        <button
                            key={val}
                            onClick={() => setActiveTab(val)}
                            className={`px-4 py-2 ${val === activeTab
                                ? "border-b-4 border-blue-500 font-bold"
                                : "text-gray-500 hover:text-black"
                                }`}
                        >
                            {val}
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="shadow-sm w-full max-w-5xl mx-auto p-4 text-black">
            <Tab />
            <div className="mt-6">
                {/* Example content area */}
                <NoResults message={result?.message} details={result?.details} button={result?.button} />
            </div>
        </div>
    );
};
