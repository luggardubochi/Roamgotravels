import { getUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Page() {
    const user = await getUser();

    if (!user || user.role !== "admin") redirect("/auth/login");

    return (
        <div className="p-6">
            <h1 className='text-2xl font-bold '>Admin Panel</h1>
            <p>Welcome, {user.email} (role: {user.role})</p>
        </div>
    )
}