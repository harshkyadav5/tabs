import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import axios from "axios";

const showHideToggle = [
  { label: "Show", icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" width="200" height="200" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" color="currentColor"><path d="M21.544 11.045c.304.426.456.64.456.955c0 .316-.152.529-.456.955C20.178 14.871 16.689 19 12 19c-4.69 0-8.178-4.13-9.544-6.045C2.152 12.529 2 12.315 2 12c0-.316.152-.529.456-.955C3.822 9.129 7.311 5 12 5c4.69 0 8.178 4.13 9.544 6.045"/><path d="M15 12a3 3 0 1 0-6 0a3 3 0 0 0 6 0"/></g></svg> },
  { label: "Hide", icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" width="200" height="200" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" color="currentColor"><path d="M19.439 15.439a19.5 19.5 0 0 0 2.105-2.484c.304-.426.456-.64.456-.955c0-.316-.152-.529-.456-.955C20.178 9.129 16.689 5 12 5c-.908 0-1.77.155-2.582.418m-2.67 1.33c-2.017 1.36-3.506 3.195-4.292 4.297c-.304.426-.456.64-.456.955c0 .316.152.529.456.955C3.822 14.871 7.311 19 12 19c1.99 0 3.765-.744 5.253-1.747"/><path d="M9.858 10A2.929 2.929 0 1 0 14 14.142M3 3l18 18"/></g></svg> },
];

export default function SignIn() {
  const [form, setForm] = useState({ emailOrUsername: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const { showToast } = useToast();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.emailOrUsername.trim()) {
      newErrors.emailOrUsername = "Email or Username is required";
    }
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setApiError("");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/signin", form);
      login(res.data.user, res.data.token);

      showToast("Login successful!", "success");

      navigate("/");
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Login failed";
      setApiError(errorMsg);

      showToast(errorMsg, "error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-100 dark:bg-zinc-900 transition-colors duration-300 px-4">
      <div className="grid grid-rows-[1fr_4fr] w-full max-w-5xl h-fit p-10 rounded-4xl bg-white dark:bg-black">
        <div className="pr-5">
          <div className="h-full">
            <img src="./src/assets/tabs-logo.svg" alt="logo" className="max-h-full max-w-[80px]" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="self-center grid grid-rows-[2fr_1fr]">
          <div className="grid grid-cols-2">
            <div>
              <h2 className="text-4xl tracking-wide text-black dark:text-white text-left">Sign in</h2>
            </div>
            <div>
              <div className="mb-4">
                <label htmlFor="emailOrUsername" className="block pl-3 text-sm font-medium text-black dark:text-gray-200 mb-1">
                  Email or Username
                </label>
                <input
                  type="text"
                  name="emailOrUsername"
                  id="emailOrUsername"
                  value={form.emailOrUsername}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-2xl tracking-wider border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#121212] text-black dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter email or username"
                />
                {errors.emailOrUsername && <p className="text-sm text-red-500 mt-1">{errors.emailOrUsername}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block pl-3 text-sm font-medium text-black dark:text-gray-200 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    name="password"
                    id="password"
                    value={form.password}
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    className="w-full px-4 py-3.5 pr-16 rounded-2xl tracking-wider border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#121212] text-black dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-2 p-1.5 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-300/80 hover:rounded-full transition-all duration-200"
                  >
                    {showPassword ? showHideToggle[0].icon : showHideToggle[1].icon}
                  </button>
                </div>
                {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
              </div>
              {apiError && <p className="text-sm text-red-500 mt-2">{apiError}</p>}
            </div>
          </div>

          <div className="flex gap-5 items-baseline justify-end">
            <Link to="/signup" className="px-4 py-2 tracking-wide text-indigo-600 hover:bg-indigo-100 rounded-2xl transition-colors duration-300 font-medium">
              Sign Up
            </Link>
            <button type="submit" className="px-6 py-2 tracking-wide text-white bg-indigo-600 hover:bg-indigo-800 rounded-2xl transition-colors duration-300 font-medium">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}