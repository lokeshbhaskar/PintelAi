import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'
import SearchBar from './SearchBar';

const Orgs = () => {
    const [orgs, setOrgs] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredOrgs, setFilteredOrgs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrgs = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/orgs");
                setOrgs(response.data);
                setFilteredOrgs(response.data);
            } catch (err) {
                setError("Failed to load organizations");
            } finally {
                setLoading(false);
            }
        };

        fetchOrgs();
    }, []);

    useEffect(() => {
        const searchedItem = orgs.filter((orgz) => {
            return orgz.name.toLowerCase().includes(search.toLowerCase());
        })
        setFilteredOrgs(searchedItem);
    }, [search, orgs])


    const highlightMatch = (text, search) => {
        if (!search) return text;

        const regex = new RegExp(`(${search})`, "gi");
        return text.split(regex).map((part, index) =>
            part.toLowerCase() === search.toLowerCase() ? (
                <span key={index} className="text-gray-900 font-semibold">
                    {part}
                </span>
            ) : (
                part
            )
        );
    };

    if (loading) return <div className='p-3 font-medium text-green-500 text-center'>Loading...</div>
    if (error) return <div className='p-4 text-center font-medium text-red-900'>{error}</div>
    return (
        <div className="p-6 font-sans bg-gray-200 min-h-screen">
            <h1 className="text-3xl text-center font-bold mb-6 text-gray-800">Organizations</h1>
            <SearchBar search={search} setSearch={setSearch} />

            <div className="space-y-4">
                {filteredOrgs.length === 0 ? (<div className='text-center font-medium text-gray-600'>No organizations found.</div>) : (

                    filteredOrgs.map(org => (
                        <div
                            key={org.id}
                            className="p-4 bg-white shadow-md rounded-lg border border-gray-200
                                   transform transition-all duration-300 ease-in-out
                                   hover:scale-101 hover:shadow-xl hover:border-blue-300 hover:bg-blue-50 cursor-pointer"
                        >
                            {/* <p className="text-lg text-center font-medium ">
                                <span className="font-medium text-gray-600">{org.name}</span>
                            </p> */}
                            <p className="text-lg text-center font-medium text-gray-400">
                                {highlightMatch(org.name, search)}
                            </p>
                        </div>
                    ))

                )
                }
            </div>
        </div>
    );
}

export default Orgs
