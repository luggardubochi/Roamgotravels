import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Profile, ProfileDetails } from "./components";


export default async function Page() {

    const user = await getUser();
    if (!user) redirect("/auth/login");

    return (
        <div className="flex justify-center flex-col gap-5 lg:h-[60vh] items-start lg:flex-row lg:mx-72 lg:my-20">
            <Profile />
            <ProfileDetails />
        </div>
    )
}