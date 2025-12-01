import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const CreditPage = () => {
    const { id } = useParams();
    const [org, setOrg] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrgCredits = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/orgs/${id}/credits`);
                // console.log("Credits data:", res.data[0]);
                setOrg(res.data[0]);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchOrgCredits();
    }, [id]);

    if (loading) return <div className="text-center mt-20 text-xl">Loading...</div>;
    if (error) return <div className="text-center mt-20 text-red-500 text-xl">{error}</div>;

    return (
        <div className="min-h-screen bg-gray-50 flex justify-center items-center">
            <div className="bg-lime-100 p-6 rounded-xl shadow-lg text-center flex items-center gap-6">
                <h1 className="text-2xl font-bold ">{org.name}</h1>
                <p className="text-xl text-gray-700">Credits: <span className="font-semibold">{org.credits}</span></p>
            </div>
        </div>
    );
};

export default CreditPage;
