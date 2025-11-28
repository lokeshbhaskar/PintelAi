import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'

const Orgs = () => {
    const [orgs, setOrgs] = useState([]);

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/orgs")
            .then(res => setOrgs(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="p-6 font-sans bg-gray-50 min-h-screen">
            <h1 className="text-3xl text-center font-bold mb-6 text-gray-800">Organizations</h1>

            <div className="space-y-4">
                {orgs.map(org => (
                    <div
                        key={org.id}
                        className="p-4 bg-white shadow-md rounded-lg border border-gray-200
                                   transform transition-all duration-300 ease-in-out
                                   hover:scale-101 hover:shadow-xl hover:border-blue-300 hover:bg-blue-50 cursor-pointer"
                    >
                        <p className="text-lg text-center font-medium ">
                            <span className="font-bold">{org.id}</span> : {org.name}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Orgs
