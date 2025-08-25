"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FiSearch } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import Logo from "@/public/assets/roamtravel_logo.png";
import { useRouter } from "next/navigation";

const NavBar = () => {
    const linksConf = "text-lg font-medium hover:text-gray-300 transition-colors";
    const router = useRouter();

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
                            className="bg-black text-white rounded-lg shadow-lg w-50 p-2 space-y-2 flex space-x-5 flex-col gap-5 justify-center items-center"
                            sideOffset={8}
                        >
                            <DropdownMenu.Item>
                                <Link href="/grouptrip" className={linksConf}>
                                    Group Trips
                                </Link>
                            </DropdownMenu.Item>
                            <DropdownMenu.Item>
                                <Link href="" className={linksConf}>
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
                                <button className="px-4 py-2 border border-white text-white rounded-md hover:bg-white hover:text-black transition" onClick={() => router.push("/auth/login")}>
                                    Login
                                </button>
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
                        <Link href="" className={linksConf}>
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
                <button className="px-4 py-2 border border-black text-black rounded-md hover:bg-white hover:text-black transition" onClick={() => router.push("/auth/login")}>
                    Login
                </button>
            </div>
        </nav>
    );
};

export default NavBar;
