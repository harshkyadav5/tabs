import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import ProfilePicSelector from "../components/ProfilePicSelector";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { EyeIcon, EyeOffIcon } from "../components/icons";

const showHideToggle = [
  { label: "Show", icon: <EyeIcon className="w-6 h-6" /> },
  { label: "Hide", icon: <EyeOffIcon className="w-6 h-6" /> },
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
  const [submitting, setSubmitting] = useState(false);
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

    setSubmitting(true);
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
    } finally {
      setSubmitting(false);
    }
  };

  const handleFinalSubmit = async () => {
    setSubmitting(true);
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
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-100 transition-colors duration-300 px-4">
      <div className="grid grid-rows-[1fr_6.5fr] w-full max-w-5xl h-fit p-6 sm:p-10 rounded-panel bg-white">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h2 className="text-4xl tracking-wide text-black text-left">
                Create Account
              </h2>
            </div>

            <div>
              <Input
                label="Username"
                name="username"
                value={form.username}
                onChange={handleChange}
                type="text"
                placeholder="Enter your username"
                error={errors.username}
              />

              <Input
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder="Enter your email"
                error={errors.email}
              />

              <div className="mb-4">
                <label className="block tracking-wider pl-3 text-sm font-medium text-black mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 pr-16 rounded-card tracking-wider border border-gray-300 bg-white text-black outline-none focus:ring-2 focus:ring-primary"
                    type={showPassword1 ? "text" : "password"}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword1((prev) => !prev)}
                    aria-label={showPassword1 ? "Hide password" : "Show password"}
                    className="absolute right-3 top-2 p-1.5 text-sm text-gray-600 hover:bg-gray-300/80 hover:rounded-full transition-all duration-200"
                  >
                    {showPassword1 ? showHideToggle[0].icon : showHideToggle[1].icon}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-danger mt-1">{errors.password}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block tracking-wider pl-3 text-sm font-medium text-black mb-1">
                  Re-enter Password
                </label>
                <div className="relative">
                  <input
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 pr-16 rounded-card tracking-wider border border-gray-300 bg-white text-black outline-none focus:ring-2 focus:ring-primary"
                    type={showPassword2 ? "text" : "password"}
                    placeholder="Re-enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword2((prev) => !prev)}
                    aria-label={showPassword2 ? "Hide password" : "Show password"}
                    className="absolute right-3 top-2 p-1.5 text-sm text-gray-600 hover:bg-gray-300/80 hover:rounded-full transition-all duration-200"
                  >
                    {showPassword2 ? showHideToggle[0].icon : showHideToggle[1].icon}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-danger mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-5 items-baseline-last justify-end">
            <span>
              <Link to="/signin" className="px-4 py-2 tracking-wide text-primary hover:bg-primary-soft rounded-btn transition-colors duration-300 font-medium border-2 border-white hover:border-primary-soft">
                Sign In
              </Link>
            </span>
            <Button type="submit" loading={submitting} className="px-6 py-2">
              Next
            </Button>
            </div>
          </form>
        ) : (
          <ProfilePicSelector
            selectedPic={selectedPic}
            setSelectedPic={setSelectedPic}
            onSubmit={handleFinalSubmit}
            onBack={() => setStep(1)}
            submitting={submitting}
          />
        )}
      </div>
    </div>
  );
}
