import { useEffect, useState } from "react";
import axios from "axios";

const AdminPage = () => {
    const [pending, setPending] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    
    const fetchPending = async () => {
        try {
            const res = await axios.get("http://localhost:8000/credits/pending");
            setPending(res.data);
        } catch (err) {
            console.error("Failed to fetch", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPending();
    }, []);
// approve req
    const approveRequest = async (orgId) => {
        try {
            const res = await axios.post(`http://localhost:8000/org/${orgId}/credits/approve`);
            setMessage(res.data.message);
            fetchPending();
        } catch {
            setMessage("Failed to approve request");
        }
    };

    // Reject Request
    const rejectRequest = async (orgId) => {
        try {
            const res = await axios.post(`http://localhost:8000/org/${orgId}/credits/reject`);
            setMessage(res.data.message);
            fetchPending(); 
        } catch {
            setMessage("Failed to reject request");
        }
    };

    if (loading) return <div className="text-center mt-20 text-xl">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-200 py-10 px-4">
            <h1 className="text-3xl font-bold text-center mb-8">Admin Panel</h1>

            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Pending Allotments</h2>

                {pending.length === 0 ? (
                    <p className="text-gray-500 text-center">No pending requests</p>
                ) : (
                    pending.map((req, index) => (
                        <div
                            key={index}
                            className="border p-4 rounded-lg mb-4 flex justify-between items-center bg-gray-50"
                        >
                            <div>
                                <p data-testid="org-id" className="text-gray-700" >
                                    <span className="font-semibold">Org ID:</span> {req.org_id}
                                </p>
                                <p data-testid="credit-req" className="text-gray-700">
                                    <span className="font-semibold">Credits Requested:</span> {req.credits}
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => approveRequest(req.org_id)}
                                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => rejectRequest(req.org_id)}
                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))
                )}

                {message && (
                    <p className="mt-4 text-center text-lg font-medium text-gray-800">
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default AdminPage;
