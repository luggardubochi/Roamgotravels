"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiSearch } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";

import Logo from "@/public/assets/roamtravel_logo.png";

type AuthButtonProp = {
    color?: string;
}

const AuthButton = ({ color }: AuthButtonProp) => {
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("/api/me/", { credentials: "include" });
                if (res.ok) {
                    const data = await res.json();
                    setUser(data);
                } else {
                    setUser(null);
                }
            } catch (err) {
                console.error("Error fetching user:", err);
                setUser(null);
            }
        };

        fetchUser();
    }, []);


    const handleLogout = async () => {
        await fetch("/api/auth/logout", {
            method: "POST",
            credentials: "include",
        });
        router.push("/auth/login");
    };


    if (!user) {
        return (
            <button
                className={color}
                onClick={() => router.push("/auth/login")}
            >
                Login
            </button>
        );
    }

    return (
        <button
            className={color}
            onClick={handleLogout}
        >
            Logout
        </button>
    );
};

const NavBar = () => {
    const linksConf = "text-lg font-medium hover:text-gray-300 transition-colors";

    return (
        <nav className="w-full bg-transparent z-50 shadow-sm px-6 py-3 flex items-center justify-between border-b-2">
            {/* LEFT - MOBILE DROPDOWN + DESKTOP LINKS */}
            <div className="flex items-center">
                {/* MOBILE MENU */}
                <div className="lg:hidden z-50">
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger className="p-2 text-white hover:bg-gray-700 rounded-md">
                            <GiHamburgerMenu className="h-6 w-6" color="black" />
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content
                            className="bg-black text-white rounded-lg shadow-lg w-50 p-2 space-y-2 flex flex-col gap-5 justify-center items-center"
                            sideOffset={8}
                        >
                            <DropdownMenu.Item>
                                <Link href="/grouptrip" className={linksConf}>
                                    Group Trips
                                </Link>
                            </DropdownMenu.Item>
                            <DropdownMenu.Item>
                                <Link href="/privatetrip" className={linksConf}>
                                    Private Trips
                                </Link>
                            </DropdownMenu.Item>
                            <DropdownMenu.Item>
                                <Link href="" className={linksConf}>
                                    Past Trips
                                </Link>
                            </DropdownMenu.Item>
                            <DropdownMenu.Item>
                                <Link href="" className={linksConf}>
                                    About Us
                                </Link>
                            </DropdownMenu.Item>
                            <DropdownMenu.Item>
                                <Link href="" className={linksConf}>
                                    Contact Us
                                </Link>
                            </DropdownMenu.Item>
                            <DropdownMenu.Item>
                                <button className="p-2 hover:bg-gray-700 rounded-full">
                                    <FiSearch size={18} />
                                </button>
                            </DropdownMenu.Item>
                            <DropdownMenu.Item>
                                <AuthButton color="px-4 py-2 border border-white text-white rounded-md hover:bg-white hover:text-black transition" />
                            </DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                </div>

                {/* DESKTOP LEFT LINKS */}
                <ul className="hidden lg:flex space-x-8 text-black ml-2">
                    <li>
                        <Link href="/grouptrip" className={linksConf}>
                            Group Trips
                        </Link>
                    </li>
                    <li>
                        <Link href="/privatetrip" className={linksConf}>
                            Private Trips
                        </Link>
                    </li>
                    <li>
                        <Link href="" className={linksConf}>
                            Past Trips
                        </Link>
                    </li>
                </ul>
            </div>

            {/* CENTER LOGO */}
            <div className="flex left-50 -translate-x-8">
                <Link href="/">
                    <Image src={Logo} alt="RoamGo Logo" width={100} height={100} priority />
                </Link>
            </div>

            {/* RIGHT (DESKTOP ONLY) */}
            <div className="hidden lg:flex items-center space-x-8 text-black">
                <Link href="" className={linksConf}>
                    About Us
                </Link>
                <Link href="" className={linksConf}>
                    Contact Us
                </Link>
                <button className="p-2 hover:bg-gray-700 rounded-full">
                    <FiSearch size={20} />
                </button>
                <AuthButton color="px-4 py-2 border border-black text-black rounded-md hover:bg-white hover:text-black transition" />
            </div>
        </nav>
    );
};

export default NavBar;
