import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import ProfilePicSelector from "../components/ProfilePicSelector";

const showHideToggle = [
  { label: "Show", icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" width="200" height="200" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" color="currentColor"><path d="M21.544 11.045c.304.426.456.64.456.955c0 .316-.152.529-.456.955C20.178 14.871 16.689 19 12 19c-4.69 0-8.178-4.13-9.544-6.045C2.152 12.529 2 12.315 2 12c0-.316.152-.529.456-.955C3.822 9.129 7.311 5 12 5c4.69 0 8.178 4.13 9.544 6.045"/><path d="M15 12a3 3 0 1 0-6 0a3 3 0 0 0 6 0"/></g></svg> },
  { label: "Hide", icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" width="200" height="200" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" color="currentColor"><path d="M19.439 15.439a19.5 19.5 0 0 0 2.105-2.484c.304-.426.456-.64.456-.955c0-.316-.152-.529-.456-.955C20.178 9.129 16.689 5 12 5c-.908 0-1.77.155-2.582.418m-2.67 1.33c-2.017 1.36-3.506 3.195-4.292 4.297c-.304.426-.456.64-.456.955c0 .316.152.529.456.955C3.822 14.871 7.311 19 12 19c1.99 0 3.765-.744 5.253-1.747"/><path d="M9.858 10A2.929 2.929 0 1 0 14 14.142M3 3l18 18"/></g></svg> },
];

export default function SignUp() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [selectedPic, setSelectedPic] = useState(null);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const { showToast } = useToast();

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

  const handleNext = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showToast("Please fix the highlighted errors", "warning");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/check-availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
        }),
      });

      const data = await res.json();

      if (data.usernameTaken) validationErrors.username = "Username already in use";
      if (data.emailTaken) validationErrors.email = "Email already in use";

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        showToast("Username or Email already taken", "error");
      } else {
        setErrors({});
        showToast("Account details look good!", "success");
        setStep(2);
      }
    } catch (err) {
      console.error("Availability check error:", err);
      setErrors({ general: "Server error. Please try again later." });
      showToast("Server error. Please try again later.", "error");
    }
  };

  const handleFinalSubmit = async () => {
    try {
      const payload = {
        ...form,
        profilePicture: selectedPic,
      };

      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

      showToast("Account created successfully!", "success");
      navigate("/signin");
    } catch (err) {
      console.error("Signup error:", err);
      showToast(err.message || "Something went wrong during signup", "error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-100 dark:bg-zinc-900 transition-colors duration-300 px-4">
      <div className="grid grid-rows-[1fr_6.5fr] w-full max-w-5xl h-fit p-10 rounded-4xl bg-white dark:bg-black">
        <div className="pr-5">
            <div className="h-full">
              <img
                  src="./src/assets/tabs-logo.svg"
                  alt="logo"
                  className="max-h-full max-w-[80px]"
              />
          </div>
        </div>
        {step === 1 ? (
          <form
            onSubmit={handleNext}
            className="self-center grid grid-rows-[4fr_1fr]"
          >
          <div className="grid grid-cols-2">
            <div>
              <h2 className="text-4xl tracking-wide text-black dark:text-white text-left">
                Create Account
              </h2>
            </div>

            <div>
              <div className="mb-4">
                <label className="block tracking-wider pl-3 text-sm font-medium text-black dark:text-gray-200 mb-1">
                  Username
                </label>
                <input
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-2xl tracking-wider border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#121212] text-black dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                  type="text"
                  placeholder="Enter your username"
                />
                {errors.username && (
                  <p className="text-sm text-red-500 mt-1">{errors.username}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block tracking-wider pl-3 text-sm font-medium text-black dark:text-gray-200 mb-1">
                  Email
                </label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-2xl tracking-wider border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#121212] text-black dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                  type="email"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block tracking-wider pl-3 text-sm font-medium text-black dark:text-gray-200 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 pr-16 rounded-2xl tracking-wider border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#121212] text-black dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                    type={showPassword1 ? "text" : "password"}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword1((prev) => !prev)}
                    className="absolute right-3 top-2 p-1.5 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-300/80 hover:rounded-full transition-all duration-200"
                  >
                    {showPassword1 ? showHideToggle[0].icon : showHideToggle[1].icon}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500 mt-1">{errors.password}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block tracking-wider pl-3 text-sm font-medium text-black dark:text-gray-200 mb-1">
                  Re-enter Password
                </label>
                <div className="relative">
                  <input
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 pr-16 rounded-2xl tracking-wider border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#121212] text-black dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                    type={showPassword2 ? "text" : "password"}
                    placeholder="Re-enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword2((prev) => !prev)}
                    className="absolute right-3 top-2 p-1.5 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-300/80 hover:rounded-full transition-all duration-200"
                  >
                    {showPassword2 ? showHideToggle[0].icon : showHideToggle[1].icon}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-5 items-baseline-last justify-end">
            <span>
              <Link to="/signin" className="px-4 py-2 tracking-wide text-indigo-600 hover:bg-indigo-100 rounded-2xl transition-colors duration-300 font-medium border-2 border-white hover:border-indigo-100">
                Sign In
              </Link>
            </span>
            <button
              type="submit"
              className="px-6 py-2 tracking-wide text-white bg-indigo-600 hover:bg-indigo-800 rounded-2xl"
            >
              Next
            </button>
            </div>
          </form>
        ) : (
          <ProfilePicSelector
            selectedPic={selectedPic}
            setSelectedPic={setSelectedPic}
            onSubmit={handleFinalSubmit}
            onBack={() => setStep(1)}
          />
        )}
      </div>
    </div>
  );
}
