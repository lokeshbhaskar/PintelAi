import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const OrgPage = () => {
    const { id } = useParams();
    const [org, setOrg] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [credits, setCredits] = useState("");
    const [totalCredits, setTotalCredits] = useState(0);
    const [message, setMessage] = useState("");

    // Fetch org details including allotments
    const fetchOrg = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/orgs/${id}/credits`);
            const data = res.data;
            console.log(data)

            setOrg(data);

            // Sum allotments + base credits
            const sum = (data.allotments || []).reduce((acc, item) => acc + item.credits, 0);
            setTotalCredits(data.credits + sum);

        } catch {
            setError("Failed to load organization details.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrg();
    }, [id]);


    //  credit request
    const handleRequestCredits = async () => {
        if (!credits || credits <= 0) {
            setMessage("Enter a valid number");
            return;
        }
        try {
            const res = await axios.post(
                `http://localhost:8000/org/${id}/credits/requests`,
                { credits: Number(credits) }
            );

            setMessage("Credit request submitted. Pending approval.");
            setCredits("");

        } catch {
            setMessage("Failed to create credit request.");
        }
    };


    if (loading) return <div className="text-center mt-20 text-xl">Loading...</div>;
    if (error) return <div className="text-center mt-20 text-red-500 text-xl">{error}</div>;

    return (
        <div className="min-h-screen bg-gray-300 flex justify-center items-start py-16 px-4">
            <div className="w-full max-w-lg bg-gray-200 shadow-md rounded-xl p-8 border">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">{org?.name}</h1>

                 
                <div className="p-5 rounded-lg bg-gray-50 border mb-8">
                    <p className="text-sm text-gray-500">Total Credits</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{totalCredits}</p>
                </div>

                 
                <div className="bg-white p-5 border rounded-lg shadow-sm">
                    <h2 className="text-lg font-medium text-gray-800 mb-3">Request Credits</h2>
                    <input
                        type="number"
                        value={credits}
                        onChange={(e) => setCredits(e.target.value)}
                        placeholder="Enter credits"
                        className="w-full p-3 border rounded-md focus:ring-1 focus:ring-gray-400 outline-none mb-4"
                    />

                    <button
                        onClick={handleRequestCredits}
                        className="w-full py-3 bg-gray-600 text-white font-medium rounded-md cursor-pointer hover:bg-gray-700 transition"
                    >
                        Request Allotment
                    </button>

                    {message && <p className="mt-4 font-medium text-gray-800 text-center">{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default OrgPage;
