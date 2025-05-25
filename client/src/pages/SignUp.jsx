import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.username.trim()) newErrors.username = "Username is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please re-enter your password";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      console.log("Signup form submitted:", form);
    }
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
          Create Account
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-black dark:text-gray-200 mb-1">
            Username
          </label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#121212] text-black dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
            type="text"
            placeholder="Enter your username"
          />
          {errors.username && (
            <p className="text-sm text-red-500 mt-1">{errors.username}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-black dark:text-gray-200 mb-1">
            Email
          </label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#121212] text-black dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
            type="email"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-black dark:text-gray-200 mb-1">
            Password
          </label>
          <div className="relative">
            <input
              name="password"
              value={form.password}
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
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">{errors.password}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-black dark:text-gray-200 mb-1">
            Re-enter Password
          </label>
          <input
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#121212] text-black dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
            type={showPassword ? "text" : "password"}
            placeholder="Re-enter your password"
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 mt-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors duration-200 font-medium"
        >
          Sign Up
        </button>

        <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-4">
          Already have an account?{" "}
          {/* <Link to="/login" className="text-indigo-600 hover:underline">
            Log in
          </Link> */}
        </p>
      </form>
    </div>
  );
}
