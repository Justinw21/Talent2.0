import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, XCircle, Clock } from "lucide-react"; // Icons from lucide-react for status

const StatusBadge = ({ status }) => {
  const statusComponents = {
    Completed: { text: "Completed", color: "bg-green-100 text-green-800", icon: <CheckCircle className="w-4 h-4 mr-1" /> },
    Processing: { text: "Processing", color: "bg-purple-100 text-purple-800", icon: <Clock className="w-4 h-4 mr-1" /> },
    Rejected: { text: "Rejected", color: "bg-red-100 text-red-800", icon: <XCircle className="w-4 h-4 mr-1" /> },
  };

  return (
    <span className={`flex items-center px-2 py-1 rounded-full text-sm font-medium ${statusComponents[status]?.color}`}>
      {statusComponents[status]?.icon}
      {statusComponents[status]?.text || "N/A"}
    </span>
  );
};

const Post = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get location
  const { posting } = location.state || {}; // Safely access posting from state

  const [users, setUsers] = useState([]);
  const [interviewees, setInterviewees] = useState([]);
  const [interviewers, setInterviewers] = useState([]);
  const [pairingsInd, setPairingsInd] = useState([0, 100]);

  // Filter states
  const [selectedDate, setSelectedDate] = useState('None');
  const [selectedDepartment, setSelectedDepartment] = useState('None');
  const [selectedStatus, setSelectedStatus] = useState('None');

  useEffect(() => {
    if (posting) {
      console.log('Data:', posting);
      setPairingsInd(posting.indexes);

      // Fetch users data from API when posting is available
      fetch(`http://0.0.0.0:8000/get_users/?start=${posting.indexes[0]}&end=${posting.indexes[1]}`)
        .then(response => response.json())
        .then(data => {
          const normalizedData = Array.isArray(data) ? data : [data];

          // Separate interviewees and interviewers
          const intervieweeList = normalizedData.filter(user => user.interviewee);
          const interviewerList = normalizedData.filter(user => !user.interviewee);

          setUsers(normalizedData);
          setInterviewees(intervieweeList);
          setInterviewers(interviewerList);
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    }
  }, [posting]); // Run this effect only when posting is available

  const filterData = (data) => {
    return data.filter(item => {
      return (
        (selectedDate !== 'None' ? item.datePosted === selectedDate : true) &&
        (selectedDepartment !== 'None' ? item.department === selectedDepartment : true) &&
        (selectedStatus !== 'None' ? item.status === selectedStatus : true)
      );
    });
  };

  const filteredInterviewees = filterData(interviewees);
  const filteredInterviewers = filterData(interviewers);

  return (
    <section className="p-8">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Applicants</h1>
        <Button onClick={() => navigate('/')} variant="outline" className="ml-4">
          Main Page
        </Button>
      </header>

      {/* "Matchings" Button */}
      <div className="mb-6">
        <Button
          onClick={() => navigate('/matchings', { state: { data: filteredInterviewees.concat(filteredInterviewers) } })}
          variant="primary"
          className="mt-4 text-white"
        >
          Generate Matchings
        </Button>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Filters</h2>
        <div className="flex items-center gap-4 mb-4">
          <Select onValueChange={value => setSelectedDate(value)} value={selectedDate}>
            <SelectTrigger className="w-32">
              <span>{selectedDate !== 'None' ? `Date: ${selectedDate}` : 'Date'}</span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="None">None</SelectItem>
              <SelectItem value="14 Nov 2024">14 Nov 2024</SelectItem>
              <SelectItem value="28 Oct 2024">28 Oct 2024</SelectItem>
              <SelectItem value="14 Oct 2024">14 Oct 2024</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={value => setSelectedDepartment(value)} value={selectedDepartment}>
            <SelectTrigger className="w-32">
              <span>{selectedDepartment !== 'None' ? `Dept: ${selectedDepartment}` : 'Department'}</span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="None">None</SelectItem>
              <SelectItem value="IT">IT</SelectItem>
              <SelectItem value="HR">HR</SelectItem>
              <SelectItem value="PR">PR</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={value => setSelectedStatus(value)} value={selectedStatus}>
            <SelectTrigger className="w-32">
              <span>{selectedStatus !== 'None' ? `Status: ${selectedStatus}` : 'Status'}</span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="None">None</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Processing">Processing</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => {
            setSelectedDate('None');
            setSelectedDepartment('None');
            setSelectedStatus('None');
          }}>Reset Filter</Button>
        </div>
      </div>

      {/* Interviewees Table */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Interviewees</h2>
        <div className="overflow-x-auto max-h-80 border rounded-md">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Hobbies</TableHead>
                <TableHead>Previous Work</TableHead>
                <TableHead>Fast-Pace Preference</TableHead>
                <TableHead>Team Size Preference</TableHead>
                <TableHead>Independent</TableHead>
                <TableHead>Cities Lived In</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInterviewees.length > 0 ? (
                filteredInterviewees.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.hobbies}</TableCell>
                    <TableCell>{user.previous_work.join(', ')}</TableCell>
                    <TableCell>{user['fast-pace-preference'] ? 'Yes' : 'No'}</TableCell>
                    <TableCell>{user['team-size-preference']}</TableCell>
                    <TableCell>{user.independent ? 'Yes' : 'No'}</TableCell>
                    <TableCell>{user['cities-lived-in'].join(', ')}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="8" className="text-center">No interviewees found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Interviewers Table */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Interviewers</h2>
        <div className="overflow-x-auto max-h-80 border rounded-md">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Hobbies</TableHead>
                <TableHead>Previous Work</TableHead>
                <TableHead>Fast-Pace Preference</TableHead>
                <TableHead>Team Size Preference</TableHead>
                <TableHead>Independent</TableHead>
                <TableHead>Cities Lived In</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInterviewers.length > 0 ? (
                filteredInterviewers.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.hobbies}</TableCell>
                    <TableCell>{user.previous_work.join(', ')}</TableCell>
                    <TableCell>{user['fast-pace-preference'] ? 'Yes' : 'No'}</TableCell>
                    <TableCell>{user['team-size-preference']}</TableCell>
                    <TableCell>{user.independent ? 'Yes' : 'No'}</TableCell>
                    <TableCell>{user['cities-lived-in'].join(', ')}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="8" className="text-center">No interviewers found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export default Post;
