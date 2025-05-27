import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!formData.email || !formData.password) {
            setError("Please fill in all fields.");
            return;
        }
        setError("");
        console.log("Login Data:", formData);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-white to-slate-300 dark:from-black dark:to-gray-900 transition-colors duration-300 px-4">
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-md p-6 rounded-2xl shadow-xl
                    bg-white/40 dark:bg-black/40
                    backdrop-blur-md backdrop-saturate-150
                    border border-white/20 dark:border-white/10"
        >
            <h2 className="text-2xl font-bold mb-6 text-black dark:text-white text-center">
                Welcome Back
            </h2>

            {error && (
                <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
            )}

            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-black dark:text-gray-200 mb-1">
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#121212] text-black dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter your email"
                />
                {error.username && (
                    <p className="text-sm text-red-500 mt-1">{error.username}</p>
                )}
            </div>

            <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-black dark:text-gray-200 mb-1">
                    Password
                </label>
                <div className="relative">
                    <input
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 pr-16 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#121212] text-black dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-2 text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>
                {error.password && (
                    <p className="text-sm text-red-500 mt-1">{error.password}</p>
                )}
            </div>

            <button
                type="submit"
                className="w-full py-2 mt-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors duration-200 font-medium"
            >
                Log In
            </button>

            <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-4">
                Don't have an account?{" "}
                {/* <Link to="/signup" className="text-indigo-600 hover:underline">
                    Log in
                </Link> */}
            </p>
        </form>
        </div>
    );
}