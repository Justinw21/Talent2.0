import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Filter, CheckCircle, XCircle, Clock } from "lucide-react"; // Icons from lucide-react for status and filter icon

const applicants = [
    { id: 40901, name: "SWE Intern 2025", datePosted: "14 Nov 2024", department: "IT", status: "Completed" },
    { id: 91042, name: "HR Rep (Full-time)", datePosted: "28 Oct 2024", department: "HR", status: "Processing" },
    { id: 10805, name: "Recruiter (Full-time)", datePosted: "14 Oct 2024", department: "HR", status: "Rejected" },
    { id: 1205, name: "Full-Stack Developer Intern", datePosted: "14 Oct 2024", department: "IT", status: "Completed" },
    { id: 4002, name: "Marketing Intern 2025", datePosted: "14 Oct 2024", department: "PR", status: "Processing" },
];

const employees = [
    { id: 40901, jobApplication: "SWE Intern 2025", datePosted: "14 Nov 2024", department: "IT", status: "Completed" },
    { id: 91042, jobApplication: "HR Rep (Full-time)", datePosted: "28 Oct 2024", department: "HR", status: "Processing" },
];

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

const PostListing = () => {
    const navigate = useNavigate();

    return (
        <section className="p-8">
            <header className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold">Application Listings</h1>
                <Button onClick={() => navigate('/')} variant="outline" className="ml-4">
                    Main Page
                </Button>
            </header>

            <div className="flex items-center gap-4 mb-4">
                <Button variant="outline" className="flex items-center">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter By
                </Button>
                <Select>
                    <SelectTrigger className="w-32">
                        <span>Date</span>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="14 Feb 2019">14 Feb 2019</SelectItem>
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger className="w-32">
                        <span>Department</span>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="IT">IT</SelectItem>
                        <SelectItem value="HR">HR</SelectItem>
                        <SelectItem value="PR">PR</SelectItem>
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger className="w-32">
                        <span>Status</span>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="Processing">Processing</SelectItem>
                        <SelectItem value="Rejected">Rejected</SelectItem>
                    </SelectContent>
                </Select>
                <Button variant="outline">Reset Filter</Button>
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
                        {applicants.map((applicant) => (
                            <TableRow key={applicant.id}>
                                <TableCell>{applicant.id}</TableCell>
                                <TableCell>{applicant.name}</TableCell>
                                <TableCell>...</TableCell>
                                <TableCell>{applicant.datePosted}</TableCell>
                                <TableCell>{applicant.department}</TableCell>
                                <TableCell>
                                    <StatusBadge status={applicant.status} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* <div>
                <h2 className="text-xl font-semibold mb-2">Employees</h2>
                <Table className="w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Employee ID</TableHead>
                            <TableHead>Job Application</TableHead>
                            <TableHead>Job Description</TableHead>
                            <TableHead>Date Posted</TableHead>
                            <TableHead>Department</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {employees.map((employee) => (
                            <TableRow key={employee.id}>
                                <TableCell>{employee.id}</TableCell>
                                <TableCell>{employee.jobApplication}</TableCell>
                                <TableCell>...</TableCell>
                                <TableCell>{employee.datePosted}</TableCell>
                                <TableCell>{employee.department}</TableCell>
                                <TableCell>
                                    <StatusBadge status={employee.status} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div> */}
        </section>
    );
};

export default PostListing;
