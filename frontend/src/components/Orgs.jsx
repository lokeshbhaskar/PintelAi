import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router-dom';

const Orgs = () => {
    const [orgs, setOrgs] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredOrgs, setFilteredOrgs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate()

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
                            onClick={() => navigate(`/org/${org.id}/credits`)}
                            className="p-4 bg-white shadow-md rounded-lg border border-gray-200
                transform transition-all duration-300 ease-in-out
                hover:scale-101 hover:shadow-xl hover:border-blue-300 hover:bg-blue-50 cursor-pointer"
                        >
                            <p className="text-lg text-center font-medium text-gray-400">
                                {highlightMatch(org.name, search)}
                            </p>
                            <div className="flex justify-center">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/org/${org.id}`);
                                    }}
                                    className="mt-3 px-4 py-2 cursor-pointer bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition"
                                >
                                    View Organization
                                </button>
                            </div>
                        </div>
                    ))
                )
                }
            </div>
        </div>
    );
}

export default Orgs
