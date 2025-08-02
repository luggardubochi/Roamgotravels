"use client";

import { useState } from "react";
import * as Label from "@radix-ui/react-label";
import { motion } from "framer-motion";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                const data = await res.json();
                console.log(data);
                setError(data.error || "Login failed");
                setLoading(false);
                return;
            }
            console.log(await res.json())
            // return redirect("/dashboard");
            router.push("/dashboard");
            return;
        } catch (err) {
            console.error(err);
            setError("Something went wrong");
            setLoading(false);
        }
    };



    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md"
            >
                <div className="bg-white shadow-lg rounded-2xl p-8">
                    <h1 className="text-center text-2xl font-semibold mb-6 text-gray-600">
                        Welcome Back
                    </h1>

                    <form onSubmit={handleLogin} className="flex flex-col gap-6">
                        {/* Email */}
                        <div className="flex flex-col gap-2">
                            <Label.Root
                                htmlFor="email"
                                className="text-sm font-medium text-gray-700"
                                aria-required={true}
                            >
                                Email
                            </Label.Root>
                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                                placeholder="you@example.com"
                            />
                        </div>

                        {/* Password */}
                        <div className="flex flex-col gap-2">
                            <Label.Root
                                htmlFor="password"
                                className="text-sm font-medium text-gray-700"
                            >
                                Password
                            </Label.Root>
                            <input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                                placeholder="••••••••"
                            />
                        </div>

                        {/* Submit */}
                        <button
                            // type="submit"
                            className="w-full py-2 text-lg rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer"
                            onClick={handleLogin}
                        >
                            Log In
                        </button>
                    </form>

                    <p className="text-center mt-6 text-sm text-gray-600">
                        Don’t have an account?{" "}
                        <Link
                            href="/auth/signup"
                            className="text-blue-600 hover:underline font-medium"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
