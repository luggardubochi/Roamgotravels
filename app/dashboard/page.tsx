import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";


export default async function Page() {

    const user = await getUser();
    if (!user) redirect("/auth/login");

    return (
        <div className="flex items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">
                Welcome, {user.email}!
            </h1>
        </div>
    )
}