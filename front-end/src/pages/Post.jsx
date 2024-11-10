import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Filter, CheckCircle, XCircle, Clock } from "lucide-react"; // Icons from lucide-react for status and filter icon

const applicants = [
  { id: 40901, name: "Applicant 1", datePosted: "14 Nov 2024", department: "IT", status: "Completed" },
  { id: 91042, name: "Applicant 2", datePosted: "28 Oct 2024", department: "HR", status: "Processing" },
  { id: 10805, name: "Applicant 3", datePosted: "14 Oct 2024", department: "HR", status: "Rejected" },
  { id: 1205, name: "Applicant 4", datePosted: "14 Oct 2024", department: "IT", status: "Completed" },
  { id: 4002, name: "Applicant 5", datePosted: "14 Oct 2024", department: "PR", status: "Processing" },
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

const Post = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();

  // States for filters for applicants
  const [selectedDateApplicants, setSelectedDateApplicants] = useState('None');
  const [selectedDepartmentApplicants, setSelectedDepartmentApplicants] = useState('None');
  const [selectedStatusApplicants, setSelectedStatusApplicants] = useState('None');
  const [filteredApplicants, setFilteredApplicants] = useState(applicants);

  // States for filters for employees
  const [selectedDateEmployees, setSelectedDateEmployees] = useState('None');
  const [selectedDepartmentEmployees, setSelectedDepartmentEmployees] = useState('None');
  const [selectedStatusEmployees, setSelectedStatusEmployees] = useState('None');
  const [filteredEmployees, setFilteredEmployees] = useState(employees);

  const filterData = (data, type) => {
    const isApplicant = type === 'applicants';
    const date = isApplicant ? selectedDateApplicants : selectedDateEmployees;
    const department = isApplicant ? selectedDepartmentApplicants : selectedDepartmentEmployees;
    const status = isApplicant ? selectedStatusApplicants : selectedStatusEmployees;

    return data.filter(item => {
      return (
        (date !== 'None' ? item.datePosted === date : true) &&
        (department !== 'None' ? item.department === department : true) &&
        (status !== 'None' ? item.status === status : true)
      );
    });
  };

  useEffect(() => {
    if (selectedDateApplicants !== 'None' || selectedDepartmentApplicants !== 'None' || selectedStatusApplicants !== 'None') {
      setFilteredApplicants(filterData(applicants, 'applicants'));
    } else {
      setFilteredApplicants(applicants);
    }
  }, [selectedDateApplicants, selectedDepartmentApplicants, selectedStatusApplicants]);

  useEffect(() => {
    if (selectedDateEmployees !== 'None' || selectedDepartmentEmployees !== 'None' || selectedStatusEmployees !== 'None') {
      setFilteredEmployees(filterData(employees, 'employees'));
    } else {
      setFilteredEmployees(employees);
    }
  }, [selectedDateEmployees, selectedDepartmentEmployees, selectedStatusEmployees]);

  const handleResetFiltersApplicants = () => {
    setSelectedDateApplicants('None');
    setSelectedDepartmentApplicants('None');
    setSelectedStatusApplicants('None');
    setFilteredApplicants(applicants);
  };

  const handleResetFiltersEmployees = () => {
    setSelectedDateEmployees('None');
    setSelectedDepartmentEmployees('None');
    setSelectedStatusEmployees('None');
    setFilteredEmployees(employees);
  };

  return (
    <section className="p-8">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">SWE Intern 2025</h1>
        <Button onClick={() => navigate('/')} variant="outline" className="ml-4">
          Main Page
        </Button>
      </header>

      {/* Filters for applicants */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Applicants Filters</h2>
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <Select onValueChange={(value) => setSelectedDateApplicants(value)} value={selectedDateApplicants}>
              <SelectTrigger className="w-32">
                <span>{selectedDateApplicants !== 'None' ? `Date: ${selectedDateApplicants}` : 'Date'}</span>
              </SelectTrigger>
              {selectedDateApplicants !== 'None' && (
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
            <Select onValueChange={(value) => setSelectedDepartmentApplicants(value)} value={selectedDepartmentApplicants}>
              <SelectTrigger className="w-32">
                <span>{selectedDepartmentApplicants !== 'None' ? `Dept: ${selectedDepartmentApplicants}` : 'Department'}</span>
              </SelectTrigger>
              {selectedDepartmentApplicants !== 'None' && (
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
            <Select onValueChange={(value) => setSelectedStatusApplicants(value)} value={selectedStatusApplicants}>
              <SelectTrigger className="w-32">
                <span>{selectedStatusApplicants !== 'None' ? `Status: ${selectedStatusApplicants}` : 'Status'}</span>
              </SelectTrigger>
              {selectedStatusApplicants !== 'None' && (
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
          <Button variant="outline" onClick={handleResetFiltersApplicants}>Reset Filter</Button>
        </div>

        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Applicant ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Job Description</TableHead>
              <TableHead>Date Posted</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApplicants.map((applicant) => (
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

      {/* Filters for employees */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Employees Filters</h2>
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <Select onValueChange={(value) => setSelectedDateEmployees(value)} value={selectedDateEmployees}>
              <SelectTrigger className="w-32">
                <span>{selectedDateEmployees !== 'None' ? `Date: ${selectedDateEmployees}` : 'Date'}</span>
              </SelectTrigger>
              {selectedDateEmployees !== 'None' && (
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
            <Select onValueChange={(value) => setSelectedDepartmentEmployees(value)} value={selectedDepartmentEmployees}>
              <SelectTrigger className="w-32">
                <span>{selectedDepartmentEmployees !== 'None' ? `Dept: ${selectedDepartmentEmployees}` : 'Department'}</span>
              </SelectTrigger>
              {selectedDepartmentEmployees !== 'None' && (
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
            <Select onValueChange={(value) => setSelectedStatusEmployees(value)} value={selectedStatusEmployees}>
              <SelectTrigger className="w-32">
                <span>{selectedStatusEmployees !== 'None' ? `Status: ${selectedStatusEmployees}` : 'Status'}</span>
              </SelectTrigger>
              {selectedStatusEmployees !== 'None' && (
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
          <Button variant="outline" onClick={handleResetFiltersEmployees}>Reset Filter</Button>
        </div>

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
            {filteredEmployees.map((employee) => (
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
      </div>

      <Button onClick={() => navigate('/pots')} variant="outline" className="mt-4">
        Back to Pots Page
      </Button>
    </section>
  );
};

export default Post;
