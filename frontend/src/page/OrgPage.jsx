import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OrgPage = () => {
    const { id } = useParams();
    const [org, setOrg] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrg = async () => {
            try {
                const res = await fetch("http://localhost:8000/orgs/details");
                const data = await res.json();

                const filtered = data.find((item) => item.id === Number(id));

                if (!filtered) {
                    setError("Organization not found.");
                } else {
                    setOrg(filtered);
                }
            } catch (err) {
                setError("Failed to load organization details.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrg();
    }, [id]);

    if (loading) return <div className="text-center mt-20 text-xl">Loading...</div>;
    if (error) return <div className="text-center mt-20 text-red-500 text-xl">{error}</div>;

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-start py-16 px-4">
            <div className="bg-[#fceaf6] w-full max-w-2xl shadow-lg rounded-xl p-8">

                <h1 className="text-3xl font-bold text-gray-800 mb-3">
                    {org.name}
                </h1>
                <div className="border rounded-lg p-5 bg-[#f3ebf0]">
                    <h2 className="text-xl font-semibold mb-2 text-gray-800">
                        Company Overview
                    </h2>
                    <p className="text-gray-700 mb-4">{org.description}</p>

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-500">Industry</p>
                            <p className="font-medium text-gray-900">{org.industry}</p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">Location</p>
                            <p className="font-medium text-gray-900">{org.headquarters}</p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">Website</p>
                            <p className="font-medium text-blue-600 underline break-all">
                                {org.website}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-8 flex justify-center gap-4">

                    <button
                        // onClick={() => navigate("/")}
                        onClick={() => window.history.back()}
                        className="px-5 py-2 cursor-pointer bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition"
                    >
                        Go Back
                    </button>
                    <a
                        href={org.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-700 transition"
                    >
                        Visit Website
                    </a>
                </div>
            </div>
        </div>
    );
};

export default OrgPage;
