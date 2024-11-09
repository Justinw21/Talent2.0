import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";

const AddListing = () => {
    const [listingData, setListingData] = useState({
        name: '',
        datePosted: '',
        department: '',
        status: 'Processing', // Default status
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setListingData({ ...listingData, [name]: value });
    };

    const handleStatusChange = (value) => {
        setListingData({ ...listingData, status: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic, such as sending data to a backend or updating a state
        console.log("New Listing Data:", listingData);
        navigate('/'); // Navigate back to the main page or listing page after submission
    };

    return (
        <section className="w-[100%]">
            <h1 className="text-4xl font-semibold mb-6">Add New Listing</h1>
            <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">Application Name</label>
                    <Input
                        type="text"
                        name="name"
                        id="name"
                        value={listingData.name}
                        onChange={handleInputChange}
                        className="w-full p-2"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="datePosted" className="block text-sm font-medium mb-1">Date Posted</label>
                    <Input
                        type="date"
                        name="datePosted"
                        id="datePosted"
                        value={listingData.datePosted}
                        onChange={handleInputChange}
                        className="w-full p-2"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="department" className="block text-sm font-medium mb-1">Department</label>
                    <Input
                        type="text"
                        name="department"
                        id="department"
                        value={listingData.department}
                        onChange={handleInputChange}
                        className="w-full p-2"
                        required
                    />
                </div>

                <Button type="submit" className="w-full mt-4 p-2">
                    Add Listing
                </Button>
            </form>
        </section>
    );
};

export default AddListing;
