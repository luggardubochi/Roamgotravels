import React from "react";
import Link from "next/link";

import { CiInstagram, CiTwitter, CiFacebook } from "react-icons/ci";
import { DiGithub } from "react-icons/di";
import * as Separator from "@radix-ui/react-separator";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* LEFT: BRAND */}
        <div>
          <h2 className="text-2xl font-bold text-white">RoamGo</h2>
          <p className="mt-2 text-sm text-gray-400">
            Explore the world your way. Group trips, private trips, and past adventures all in one place.
          </p>
        </div>

        {/* MIDDLE: LINKS */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <Link href="/" className="hover:text-white">Group Trips</Link>
          <Link href="/" className="hover:text-white">Private Trips</Link>
          <Link href="/" className="hover:text-white">Past Trips</Link>
          <Link href="/" className="hover:text-white">About Us</Link>
          <Link href="/" className="hover:text-white">Contact Us</Link>
        </div>

        {/* RIGHT: SOCIALS */}
        <div>
          <h3 className="text-lg font-semibold text-white">Follow Us</h3>
          <div className="flex space-x-4 mt-3">
            <Link href="/" aria-label="Instagram">
              <CiInstagram className="w-5 h-5 hover:text-white" />
            </Link>
            <Link href="/" aria-label="Twitter">
              <CiTwitter className="w-5 h-5 hover:text-white" />
            </Link>
            <Link href="/" aria-label="Facebook">
              <CiFacebook className="w-5 h-5 hover:text-white" />
            </Link>
            <Link href="/" aria-label="Github">
              <DiGithub className="w-5 h-5 hover:text-white" />
            </Link>
          </div>
        </div>
      </div>

      {/* SEPARATOR */}
      <Separator.Root className="bg-gray-700 h-px w-full my-8" />

      {/* COPYRIGHT */}
      <div className="text-center text-sm text-gray-500">
        © {new Date().getFullYear()} RoamGo. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
