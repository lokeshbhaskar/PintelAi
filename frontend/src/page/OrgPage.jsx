import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const OrgPage = () => {
    const { id } = useParams();
    const [org, setOrg] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [credits, setCredits] = useState("");
    const [allotments, setAllotments] = useState(0);
    const [message, setMessage] = useState("");

    // get org details (name,credits) from backend
    useEffect(() => {
        const fetchOrg = async () => {
            try {
                const res = await axios.get("http://localhost:8000/orgs/details");
                const data = res.data;

                const filtered = data.find((item) => item.id === Number(id));
                console.log("filtered", filtered);
                if (!filtered) {
                    setError("Organization not found.");
                }
                else {

                    setOrg(filtered);
                    setAllotments(filtered.credits);
                }
            } catch {
                setError("Failed to load organization details.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrg();
    }, [id]);
    // handle add credits function
    const handleAddCredits = async () => {
        if (!credits || credits <= 0) {
            setMessage("Enter a valid number");
            return;
        }
        try {
            const res = await axios.post(
                `http://localhost:8000/org/${id}/credits`,
                { credits: Number(credits) }
            );

            setMessage(res.data.message);
            const sumOfAllotments = res.data.allotments.reduce((sum, item) => sum + item.credits, 0);
            // console.log("sumOfAllotments", sumOfAllotments);
            const totalCredits = sumOfAllotments + (org.credits || 0);
            setAllotments(totalCredits);
            setCredits("");
        } catch {
            setMessage("Failed to add credits");
        }
    };

    if (loading) return <div className="text-center mt-20 text-xl">Loading...</div>;
    if (error) return <div className="text-center mt-20 text-red-500 text-xl">{error}</div>;

    return (
        <div className="min-h-screen bg-gray-300 flex justify-center items-start py-16 px-4">
            <div className="w-full max-w-lg bg-gray-200 shadow-md rounded-xl p-8 border">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">{org.name}</h1>
                <div className="p-5 rounded-lg bg-gray-50 border mb-8">
                    <p className="text-sm text-gray-500">Total Credits</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{allotments}</p>
                </div>

                <div className="bg-white p-5 border rounded-lg shadow-sm">
                    <h2 className="text-lg font-medium text-gray-800 mb-3">Add Credits</h2>
                    <input
                        type="number"
                        value={credits}
                        onChange={(e) => setCredits(e.target.value)}
                        placeholder="Enter credits"
                        className="w-full p-3 border rounded-md focus:ring-1 focus:ring-gray-400 outline-none mb-4"
                    />

                    <button
                        onClick={handleAddCredits}
                        className="w-full py-3 bg-gray-600 text-white font-medium rounded-md cursor-pointer hover:bg-gray-700 transition"
                    >
                    Add Credits
                    </button>
                    {message && <p className="mt-4 font-medium text-gray-800 text-center">{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default OrgPage;
