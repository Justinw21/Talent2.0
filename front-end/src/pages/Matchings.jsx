import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const MatchingsPage = () => {
    const location = useLocation();
    const { data } = location.state || {}; // Extract data from location state
    const [pairings, setPairings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (data) {
            console.log('Data:', data);
            fetchPairings();
        } else {
            console.log("wait");
            // setError('No data provided for generating matchings');
        }
    }, [data]);

    const fetchPairings = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://0.0.0.0:8000/get_pairings/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error('Failed to fetch pairings');
            }
            const result = await response.json();
            setPairings(result);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Group pairings by interviewer
    const groupedPairings = pairings.reduce((acc, pairing) => {
        const { interviewer, interviewee, similarity_score } = pairing;
        if (!acc[interviewer]) {
            acc[interviewer] = [];
        }
        acc[interviewer].push({ interviewee, similarity_score });
        return acc;
    }, {});

    return (
        <section className="p-8">
            <header className="mb-6">
                <h1 className="text-2xl font-semibold">Interview Pairings</h1>
            </header>

            {loading ? (
                <p>Loading pairings...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div>
                    {Object.keys(groupedPairings).length > 0 ? (
                        Object.entries(groupedPairings).map(([interviewer, interviewees], index) => (
                            <div key={index} className="mb-8 border rounded-md p-4">
                                <h2 className="text-xl font-semibold mb-4">Interviewer: {interviewer}</h2>
                                <Table className="w-full">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Interviewee</TableHead>
                                            <TableHead>Similarity Score</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {interviewees.map((item, idx) => (
                                            <TableRow key={idx}>
                                                <TableCell>{item.interviewee}</TableCell>
                                                <TableCell>{item.similarity_score.toFixed(4)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        ))
                    ) : (
                        <p className="text-center">No pairings found</p>
                    )}
                </div>
            )}

            <Button onClick={() => window.history.back()} variant="outline" className="mt-4">
                Back
            </Button>
        </section>
    );
};

export default MatchingsPage;
