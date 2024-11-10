import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Filter, CheckCircle, XCircle, Clock } from "lucide-react";

const jobs = [
  { id: "00001", title: "SWE Intern 2025", datePosted: "14 Nov 2024", department: "IT", status: "Completed" },
  { id: "00002", title: "HR Rep (Full-time)", datePosted: "28 Oct 2024", department: "HR", status: "Processing" },
  { id: "00003", title: "Recruiter (Full-time)", datePosted: "14 Oct 2024", department: "HR", status: "Rejected" },
  { id: "00004", title: "Full-Stack Developer Intern", datePosted: "14 Oct 2024", department: "IT", status: "Completed" },
  { id: "00005", title: "Marketing Intern 2025", datePosted: "14 Oct 2024", department: "PR", status: "Processing" },
  { id: "00006", title: "Data Analytics Intern", datePosted: "14 Oct 2024", department: "IT", status: "Completed" },
];

const StatusBadge = ({ status }) => {
  const statusComponents = {
    Completed: { text: "Completed", color: "bg-green-100 text-green-800", icon: <CheckCircle className="w-4 h-4 mr-1" /> },
    Processing: { text: "Processing", color: "bg-purple-100 text-purple-800", icon: <Clock className="w-4 h-4 mr-1" /> },
    Rejected: { text: "Rejected", color: "bg-red-100 text-red-800", icon: <XCircle className="w-4 h-4 mr-1" /> },
  };

  return (
    <span className={`flex items-center px-2 py-1 rounded-full text-sm font-medium ${statusComponents[status]?.color || ""}`}>
      {statusComponents[status]?.icon}
      {statusComponents[status]?.text || status}
    </span>
  );
};

const PotsPage = () => {
  const navigate = useNavigate();

  const handleRowClick = (jobId) => {
    navigate(`/post`);  // navigate(`/post/${jobId}`);
  };

  return (
    <section className="p-8">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Pots</h1>
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
              <TableHead>Job ID</TableHead>
              <TableHead>Job Application</TableHead>
              <TableHead>Job Description</TableHead>
              <TableHead>Date Posted</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id} className="cursor-pointer hover:bg-gray-100" onClick={() => handleRowClick(job.id)}>
                <TableCell>{job.id}</TableCell>
                <TableCell>{job.title}</TableCell>
                <TableCell>...</TableCell>
                <TableCell>{job.datePosted}</TableCell>
                <TableCell>{job.department}</TableCell>
                <TableCell>
                  <StatusBadge status={job.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between mt-4">
        <Button variant="outline">Prev. Date</Button>
        <Button variant="outline">Next Date</Button>
      </div>
    </section>
  );
};

export default PotsPage;
