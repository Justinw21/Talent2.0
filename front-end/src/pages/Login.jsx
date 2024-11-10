import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"; // Adjust if needed

const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add login logic here (e.g., API call)
        console.log("Login form submitted:", formData);
        navigate('/dashboard'); // Redirect to a different page on success
    };

    return (
        <section className="flex justify-center items-center h-screen">
            <Card className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold mb-4">Login</CardTitle>
                </CardHeader>
                <div className="space-y-4">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
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
                            <label htmlFor="password" className="block text-sm font-medium mb-1 mt-4">Password</label>
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
                        <Button type="submit" className="w-full mt-4">Login</Button>
                    </form>
                </div>
                <CardFooter>
                    <p className="text-center text-sm mt-4">
                        Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Register here</a>
                    </p>
                </CardFooter>
            </Card>
        </section>
    );
};

export default LoginPage;
