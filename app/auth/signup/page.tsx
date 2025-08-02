"use client";

import { useState } from "react";
import * as Label from "@radix-ui/react-label";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    password: form.password,
                }),
            });

            const data = await res.json();
            console.log(data);

            if (!res.ok) {
                alert(data.error || "Signup failed");
                return;
            }

            router.push("/auth/login")
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md space-y-4"
            >
                <h1 className="text-2xl font-semibold text-center text-black">Sign Up</h1>

                <div>
                    <Label.Root htmlFor="name" className="text-sm font-medium text-black">
                        Name
                    </Label.Root>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className="w-full mt-1 px-3 py-2 border rounded-xl text-black"
                    />
                </div>

                <div>
                    <Label.Root htmlFor="email" className="text-sm font-medium text-black">
                        Email
                    </Label.Root>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className="w-full mt-1 px-3 py-2 border rounded-xl text-black"
                    />
                </div>

                <div>
                    <Label.Root htmlFor="password" className="text-sm font-medium text-black">
                        Password
                    </Label.Root>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        value={form.password}
                        onChange={handleChange}
                        className="w-full mt-1 px-3 py-2 border rounded-xl text-black"
                    />
                </div>

                <div>
                    <Label.Root htmlFor="confirmPassword" className="text-sm font-medium text-black">
                        Confirm Password
                    </Label.Root>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        required
                        value={form.confirmPassword}
                        onChange={handleChange}
                        className="w-full mt-1 px-3 py-2 border rounded-xl text-black"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
}
