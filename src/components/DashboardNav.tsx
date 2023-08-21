'use client'

import { useRouter } from 'next/navigation';
import Corbado from '@corbado/webcomponent';
import { NEXT_PUBLIC_CORBADO_PROJECT_ID } from '@/utils/environment';

const DashboardNav: React.FC = () => {
    const router = useRouter();
    const session = new Corbado.Session(NEXT_PUBLIC_CORBADO_PROJECT_ID);

    // Get username / email from local storage
    const getUsernameFromLocalStorage = () => {
        return localStorage.getItem('username');
    };

    const handleLogout = async () => {
        await session.logout();
        alert("Logged out");
        // Redirect back to the login page
        router.push('/auth/login')
    }

    return (
            <nav className="bg-gray-200 py-4 px-6 flex justify-between items-center">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-xl font-bold">My Dashboard</div>
                    <div className="flex flex-col items-end md:flex-row md:items-center">
                        <div className="mr-0 md:mr-4">{getUsernameFromLocalStorage()}</div>
                        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Logout
                        </button> 
                    </div>
                </div>
            </nav>
    )
}

export default DashboardNav;