import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, XCircle, Clock, Plus } from "lucide-react"; // Added Plus icon for the "Add Listing" button

const PostListing = () => {
    const jsonData = [
        { id: 40901, name: "SWE Intern 2025", datePosted: "14 Nov 2024", department: "IT", status: "Completed" },
        { id: 91042, name: "HR Rep (Full-time)", datePosted: "28 Oct 2024", department: "HR", status: "Processing" },
        { id: 10805, name: "Recruiter (Full-time)", datePosted: "14 Oct 2024", department: "HR", status: "Rejected" },
        { id: 1205, name: "Full-Stack Developer Intern", datePosted: "14 Oct 2024", department: "IT", status: "Completed" },
        { id: 4002, name: "Marketing Intern 2025", datePosted: "14 Oct 2024", department: "PR", status: "Processing" },
    ];
    const [data, setData] = useState(jsonData);
    const [filteredData, setFilteredData] = useState(data);
    const [selectedDate, setSelectedDate] = useState('None');
    const [selectedDepartment, setSelectedDepartment] = useState('None');
    const [selectedStatus, setSelectedStatus] = useState('None');
    const navigate = useNavigate();

    useEffect(() => {
        // Simulate fetching data and setting it in the state
        setData(jsonData);
        setFilteredData(jsonData);
    }, []);

    const handleFilterChange = () => {
        const filtered = data.filter(item => {
            return (
                (selectedDate !== 'None' ? item.datePosted === selectedDate : true) &&
                (selectedDepartment !== 'None' ? item.department === selectedDepartment : true) &&
                (selectedStatus !== 'None' ? item.status === selectedStatus : true)
            );
        });
        setFilteredData(filtered);
    };

    const handleResetFilters = () => {
        setSelectedDate('None');
        setSelectedDepartment('None');
        setSelectedStatus('None');
        setFilteredData(data);
    };

    const StatusBadge = ({ status }) => {
        const statusComponents = {
            Completed: { text: "Completed", color: "bg-green-100 text-green-800", icon: <CheckCircle className="w-4 h-4 mr-1" /> },
            Processing: { text: "Processing", color: "bg-purple-100 text-purple-800", icon: <Clock className="w-4 h-4 mr-1" /> },
            Rejected: { text: "Rejected", color: "bg-red-100 text-red-800", icon: <XCircle className="w-4 h-4 mr-1" /> },
        };

        return (
            <span className={`flex items-center px-2 py-1 rounded-full text-sm font-medium ${statusComponents[status].color}`}>
                {statusComponents[status].icon}
                {statusComponents[status].text}
            </span>
        );
    };

useEffect(() => {
    // Only apply the filter logic if any of the filters are active (not "None")
    if (selectedDate !== 'None' || selectedDepartment !== 'None' || selectedStatus !== 'None') {
        handleFilterChange();
    } else {
        setFilteredData(data); // Reset to full data set if no filters are active
    }
}, [selectedDate, selectedDepartment, selectedStatus]);

    return (
        <section className="p-8">
            <header className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold">Application Listings</h1>
                <div className="flex items-center space-x-4">
                    <Button onClick={() => navigate('/')} variant="outline" className="ml-4">
                        Main Page
                    </Button>
                </div>
            </header>

            <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                    <Select onValueChange={(value) => setSelectedDate(value)} value={selectedDate}>
                        <SelectTrigger className="w-32">
                            <span>{selectedDate !== 'None' ? `Date: ${selectedDate}` : 'Date'}</span>
                        </SelectTrigger>
                        {selectedDate !== 'None' && (
                            <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                !
                            </span>
                        )}
                        <SelectContent>
                            <SelectItem value="None">None</SelectItem>
                            <SelectItem value="14 Nov 2024">14 Nov 2024</SelectItem>
                            <SelectItem value="28 Oct 2024">28 Oct 2024</SelectItem>
                            <SelectItem value="14 Oct 2024">14 Oct 2024</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="relative">
                    <Select onValueChange={(value) => setSelectedDepartment(value)} value={selectedDepartment}>
                        <SelectTrigger className="w-32">
                            <span>{selectedDepartment !== 'None' ? `Dept: ${selectedDepartment}` : 'Department'}</span>
                        </SelectTrigger>
                        {selectedDepartment !== 'None' && (
                            <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                !
                            </span>
                        )}
                        <SelectContent>
                            <SelectItem value="None">None</SelectItem>
                            <SelectItem value="IT">IT</SelectItem>
                            <SelectItem value="HR">HR</SelectItem>
                            <SelectItem value="PR">PR</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="relative">
                    <Select onValueChange={(value) => setSelectedStatus(value)} value={selectedStatus}>
                        <SelectTrigger className="w-32">
                            <span>{selectedStatus !== 'None' ? `Status: ${selectedStatus}` : 'Status'}</span>
                        </SelectTrigger>
                        {selectedStatus !== 'None' && (
                            <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                !
                            </span>
                        )}
                        <SelectContent>
                            <SelectItem value="None">None</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                            <SelectItem value="Processing">Processing</SelectItem>
                            <SelectItem value="Rejected">Rejected</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button variant="outline" onClick={handleResetFilters}>Reset Filter</Button>
                <Button variant="outline" className="flex items-center hover:bg-green-500 hover:text-white transition-colors">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Listing
                </Button>
            </div>

            <div className="mb-8">
                <Table className="w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Listing ID</TableHead>
                            <TableHead>Application</TableHead>
                            <TableHead>Job Description</TableHead>
                            <TableHead>Date Posted</TableHead>
                            <TableHead>Department</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredData.map((item) => (
                            <TableRow key={item.id} 
                            onClick={() => navigate('/post', 
                                { state: 
                                    { posting:  {
                                        id: item.id,
                                        name: item.name,
                                        datePosted: item.datePosted,
                                        department: item.department,
                                        status: item.status,
                                        indexes: [item.id % 10 * 50, item.id % 10 * 50 + 80]
                                    }} })}
                            >
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>...</TableCell>
                                <TableCell>{item.datePosted}</TableCell>
                                <TableCell>{item.department}</TableCell>
                                <TableCell>
                                    <StatusBadge status={item.status} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </section>
    );
};

export default PostListing;
