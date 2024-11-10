import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"; // Adjust if needed

const RegisterPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add form submission logic here (e.g., API call)
        console.log("Registration form submitted:", formData);
        navigate('/dashboard'); // Redirect to a different page on success
    };

    return (
        <section className="flex justify-center items-center h-screen">
            <Card className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold mb-4">Register</CardTitle>
                </CardHeader>
                <div className="space-y-4">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-1 mt-2">Name</label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-1 mt-2">Email</label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium mb-1 mt-2">Password</label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1 mt-2">Confirm Password</label>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm your password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full mt-4">Register</Button>
                    </form>
                </div>
                <CardFooter>
                    <p className="text-center text-sm mt-4">
                        Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login here</a>
                    </p>
                </CardFooter>
            </Card>
        </section>
    );
};

export default RegisterPage;
