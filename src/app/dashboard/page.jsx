'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Corbado from '@corbado/webcomponent';
import DashboardNav from '@/components/DashboardNav';
import { NEXT_PUBLIC_CORBADO_PROJECT_ID } from '@/utils/environment';
import { BsSortAlphaUp } from 'react-icons/bs';

const Dashboard = () => {
    const session = new Corbado.Session(NEXT_PUBLIC_CORBADO_PROJECT_ID);
    const router = useRouter();
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true)
    const [filters, setFilters] = useState({
        id: '',
        title: '',
        updatedAt: '',
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('title');


    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSortChange = (column) => {
        setSortBy(column);
        getData();
    };

    // Get Bearer Token from Cookie
    const getBearerTokenFromCookie = () => {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith('cbo_short_session=')) {
                return cookie.substring('cbo_short_session='.length);
            }
        }
        return null;
    };

    useEffect(() => {
        session.refresh(() => { });

        const token = getBearerTokenFromCookie();
        console.log("token", token);
        if (!token) {
            alert("You are not logged in. Please login to continue");
            router.push('/auth/login');
        }
        // Get the posts
        getData();
    }, []);

    const getData = () => {
        let queryString = '/api/posts';

        const queryParts = [];
        for (const [key, value] of Object.entries(filters)) {
            if (value) queryParts.push(`${key}=${value}`);
        }
        if (searchTerm) queryParts.push(`titleLike=${searchTerm}`);
        if (sortBy) queryParts.push(`sortBy=${sortBy}`);

        if (queryParts.length) {
            queryString += '?' + queryParts.join('&');
        }
        fetch(queryString,
            {
                method: "GET",
                headers: { "Authorization": `Bearer ${getBearerTokenFromCookie()}` }
            })
            .then(res => res.json())
            .then(res => {
                setData(res);
                setLoading(false);
                console.log("res", res)
            })
            .catch(err => console.log(err));
    }

    if (isLoading) return <p>Loading...</p>

    if (!data) return <p>No posts found</p>

    return (
        <main className='flex flex-col h-screen'>
            {/* Dashboard navigation bar */}
            <DashboardNav />

            {/* Refresh button */}
            <button onClick={getData} className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'>Refresh</button>


            {/* Filter Inputs */}
            <div className="container mx-auto flex justify-between p-2">
                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search by title"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="my-2 p-2 border rounded"
                />
                <input
                    type="text"
                    placeholder="Filter by Post ID"
                    value={filters.id}
                    onChange={handleFilterChange}
                    name="id"
                    className="p-2 border rounded"
                />
                <input
                    type="text"
                    placeholder="Filter by Title"
                    value={filters.title}
                    onChange={handleFilterChange}
                    name="title"
                    className="p-2 border rounded"
                />
                <input
                    type="date"
                    value={filters.updatedAt}
                    onChange={handleFilterChange}
                    name="updatedAt"
                    className="p-2 border rounded"
                />
            </div>
            {/* Filter apply button */}
            <button onClick={getData} className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'>Apply</button>


            {/* Table to display a list of posts */}
            <div className="flex w-screen rounded-t-xl overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 p-10">
                <table className="table-auto w-screen">
                    <thead>
                        <tr>
                            <th className="border border-gray-500 px-4 py-2 text-blue-600">Post ID </th>
                            <th className="border border-gray-500 px-4 py-2 text-blue-600 flex">Title <BsSortAlphaUp /></th>
                            <th className="border border-gray-500 px-4 py-2 text-blue-600">Last updated at</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((post, index) => {
                            return (
                                <tr key={index}>
                                    <td className='border border-gray-500 px-4 py-2 text-gray-600 font-medium'>{post.id}</td>
                                    <td className='border border-gray-500 px-4 py-2 text-gray-600 font-medium'>{post.title}</td>
                                    <td className='border border-gray-500 px-4 py-2 text-gray-600 font-medium'>{post.updatedAt}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

        </main>
    );
}

export default Dashboard;