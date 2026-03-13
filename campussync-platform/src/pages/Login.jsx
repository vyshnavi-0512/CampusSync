import React, { useState, useEffect } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


export default function Login() {

  // mode toggles
  const [isLogin, setIsLogin] = useState(true);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("cs-dark-mode") === "true"
  );
  const [pulseGoogle, setPulseGoogle] = useState(false);

  // form state
  const initialForm = {
    fullName: "",
    college: "",
    year: "",
    email: "",
    password: "",
    remember: false,
  };
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const start = setTimeout(() => setPulseGoogle(true), 800);
    const end = setTimeout(() => setPulseGoogle(false), 2000);
    return () => {
      clearTimeout(start);
      clearTimeout(end);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("cs-dark-mode", darkMode);
  }, [darkMode]);

  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((e) => ({ ...e, [name]: false }));
    }
  };

  const validate = () => {
    const errs = {};
    const vals = formData;
    if (!vals.email) errs.email = "Required";
    else if (!/^\S+@\S+\.\S+$/.test(vals.email)) errs.email = "Invalid";
    if (!vals.password) errs.password = "Required";
    else if (vals.password.length < 6) errs.password = "Too short";
    if (!isLogin) {
      if (!vals.fullName) errs.fullName = "Required";
      if (!vals.college) errs.college = "Required";
      if (!vals.year) errs.year = "Required";
    }
    setErrors(errs);
    setValid(
      Object.keys(vals).reduce((acc, k) => {
        acc[k] = !errs[k] && vals[k];
        return acc;
      }, {})
    );
    return Object.keys(errs).length === 0;
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) return;

  try {
    if (isLogin) {
      await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      alert("Logged in successfully!");
    } else {
      await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      alert("Account created!");
    }

    window.location.reload();
  } catch (error) {
    alert(error.message);
  }
};

  const colleges = [
    "Select college",
    "Engineering University",
    "State College",
    "Community Institute",
  ];

  const years = ["1", "2", "3", "4", "5+"];

  return (
    <div className="h-screen w-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[55fr_45fr] overflow-hidden">
      {/* left illustration / branding */}
      <div className="hidden md:block illustration-panel animate-slide-in-left relative">
        <div
          className="orb coral"
          style={{ top: "15%", left: "10%", animationDelay: "0.2s" }}
        />
        <div
          className="orb lavender"
          style={{ top: "40%", left: "25%", animationDelay: "0.4s" }}
        />
        <div
          className="orb coral"
          style={{ top: "60%", left: "70%", animationDelay: "0.6s" }}
        />

        <div className="absolute top-10 left-10">
          <h1 className="font-[Fraunces] text-4xl text-white">CampusSync</h1>
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <lottie-player
            src="https://assets.lottiefiles.com/packages/lf20_x62chJ.json"
            background="transparent"
            speed="1"
            loop
            autoplay
            className="w-3/4 h-3/4"
          ></lottie-player>
        </div>

        <div className="absolute bottom-12 left-12 text-white space-y-4">
          <p className="text-xl font-semibold">
            The collaboration platform
            <br />built for campus innovators.
          </p>
          <div className="flex space-x-2">
            <span className="px-3 py-1 bg-white/10 backdrop-blur rounded-full text-sm">
              🤝 Find Teammates
            </span>
            <span className="px-3 py-1 bg-white/10 backdrop-blur rounded-full text-sm">
              🏆 Track Projects
            </span>
            <span className="px-3 py-1 bg-white/10 backdrop-blur rounded-full text-sm">
              💡 Share Ideas
            </span>
          </div>
        </div>
      </div>

      {/* right auth form */}
      <div className="relative bg-[#FAFAF7] dark:bg-[#0F0F13] flex items-center justify-center animate-fade-in" style={{animationDelay:'0.1s'}}>
        <button
          onClick={() => setDarkMode((d) => !d)}
          className="absolute top-6 right-6 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          aria-label="toggle dark mode"
        >
          {darkMode ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-yellow-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v2a1 1 0 11-2 0V3a1 1 0 011-1zM4.22 4.22a1 1 0 011.42 0l1.42 1.42a1 1 0 11-1.42 1.42L4.22 5.64a1 1 0 010-1.42zM2 10a1 1 0 011-1h2a1 1 0 110 2H3a1 1 0 01-1-1zM4.22 15.78a1 1 0 000-1.42l1.42-1.42a1 1 0 011.42 1.42l-1.42 1.42a1 1 0 01-1.42 0zM10 16a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1zM15.78 15.78a1 1 0 011.42 0l1.42 1.42a1 1 0 11-1.42 1.42l-1.42-1.42a1 1 0 010-1.42zM18 10a1 1 0 01-1 1h-2a1 1 0 110-2h2a1 1 0 011 1zM15.78 4.22a1 1 0 00-1.42-1.42L12.94 4.22a1 1 0 001.42 1.42l1.42-1.42z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-800"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.003 8.003 0 0010.586 10.586z" />
            </svg>
          )}
        </button>

        <div className="w-full max-w-[400px] px-8 py-12 space-y-8 animate-fadeInUp transition-all duration-300" style={{animationDelay:'0.2s'}}>
          <h1 className="font-[Fraunces] text-3xl">Welcome back 👋</h1>
          <p className="text-gray-500 font-sans">Sign in to CampusSync</p>

          <form onSubmit={handleSubmit} className="space-y-8">
            <GoogleButton pulse={pulseGoogle} onClick={handleGoogle} customClass="h-12" />

            <Divider text="or" />
            {!isLogin && (
            <>
              <FloatingInput
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                error={errors.fullName}
                valid={valid.fullName}
              />
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <SelectField
                    label="College"
                    name="college"
                    options={colleges}
                    value={formData.college}
                    onChange={handleChange}
                    error={errors.college}
                    valid={valid.college}
                  />
                </div>
                <div className="w-1/2">
                  <SelectField
                    label="Year of Study"
                    name="year"
                    options={years}
                    value={formData.year}
                    onChange={handleChange}
                    error={errors.year}
                    valid={valid.year}
                  />
                </div>
              </div>
            </>
          )}

          <FloatingInput
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            valid={valid.email}
          />
          <FloatingInput
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            valid={valid.password}
            showToggle
            onToggle={() => setShowPassword((s) => !s)}
            show={showPassword}
          />

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-coral focus:ring-coral"
              />
              <span>Remember me</span>
            </label>
            {isLogin && (
              <a href="#" className="text-coral hover:underline">
                Forgot password?
              </a>
            )}
          </div>

            <button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-coral to-[#D4634A] text-white rounded-lg hover:shadow-lg transition"
            >
              {isLogin ? "Sign In" : "Sign Up"}
            </button>
          </form>
          <p className="text-xs text-gray-500">
            By continuing you agree to our{' '}
            <a href="#" className="underline">
              Terms
            </a>{' '}
            &{' '}
            <a href="#" className="underline">
              Privacy Policy
            </a>
          </p>

          <p className="text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button
              type="button"
              className="text-coral font-semibold hover:underline"
              onClick={() => setIsLogin((l) => !l)}
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

function FloatingInput({
  label,
  type = 'text',
  name,
  value,
  onChange,
  error,
  valid,
  showToggle,
  onToggle,
  show,
}) {
  return (
    <div className="relative">
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder=" "
        className={`peer block w-full appearance-none border-b-2 bg-transparent px-0 py-2 focus:outline-none transition 
          ${error ? 'border-red-500 animate-shake' : valid ? 'border-green-500' : 'border-gray-300'}
        `}
      />
      <label
        htmlFor={name}
        className="absolute left-0 top-0 -translate-y-1/2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm"
      >
        {label}
      </label>
      {valid && !error && (
        <span className="absolute right-0 top-2 text-green-500">✓</span>
      )}
      {showToggle && (
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-0 top-0 mt-2 mr-1 text-gray-400 hover:text-gray-600"
        >
          {show ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M10 3C5 3 1.73 7.11 1 10c.73 2.89 4 7 9 7s8.27-4.11 9-7c-.73-2.89-4-7-9-7z"
              />
              <path
                d="M10 13a3 3 0 100-6 3 3 0 000 6z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3.172 3.172a4 4 0 015.656 0L10 4.343l1.172-1.171a4 4 0 115.656 5.657L15.657 10l1.171 1.172a4 4 0 11-5.657 5.656L10 15.657l-1.172 1.171a4 4 0 11-5.656-5.657L4.343 10 3.172 8.828a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      )}
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
  value,
  onChange,
  error,
  valid,
}) {
  return (
    <div className="relative">
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`peer block w-full appearance-none border-b-2 bg-transparent px-0 py-2 pr-8 focus:outline-none transition 
          ${error ? 'border-red-500 animate-shake' : valid ? 'border-green-500' : 'border-gray-300'}
        `}
      >
        {options.map((o) => (
          <option key={o} value={o} disabled={o === options[0]}>
            {o}
          </option>
        ))}
      </select>
      <label
        htmlFor={name}
        className="absolute left-0 top-0 -translate-y-1/2 text-gray-500 text-sm transition-all peer-focus:-translate-y-1/2 peer-focus:text-sm"
      >
        {label}
      </label>
      <svg
        className="w-5 h-5 absolute right-0 top-2 text-gray-400 pointer-events-none"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M19 9l-7 7-7-7" />
      </svg>
      {valid && !error && (
        <span className="absolute right-0 top-2 text-green-500">✓</span>
      )}
    </div>
  );
}

function Divider({ text }) {
  return (
    <div className="flex items-center my-4">
      <span className="flex-grow h-px bg-gray-300" />
      <span className="px-2 text-gray-500 text-sm lowercase">{text}</span>
      <span className="flex-grow h-px bg-gray-300" />
    </div>
  );
}

function GoogleButton({ onClick, pulse, customClass = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center justify-center space-x-2 border border-[#E0D9D4] bg-white text-gray-700 py-2 rounded-lg hover:shadow-lg transition 
        ${customClass} ${pulse ? 'animate-pulse' : ''}`}
    >
      <svg
        className="w-5 h-5"
        viewBox="0 0 533.5 544.3"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M533.5 278.4c0-17.4-1.6-34.1-4.7-50.4H272v95.5h146.9c-6.4 34.5-25.3 63.8-54 83.3v69.2h87.2c51-47 80.4-116.1 80.4-197.6z"
          fill="#4285F4"
        />
        <path
          d="M272 544.3c73 0 134.5-24.1 179.3-65.4l-87.2-69.2c-24.2 16.2-55 25.8-92.1 25.8-70.7 0-130.6-47.7-152-111.9H32.1v70.6c44.5 88.2 136 150.1 239.9 150.1z"
          fill="#34A853"
        />
        <path
          d="M120 325.6c-10.4-30.8-10.4-64.3 0-95.1V159.9H32.1c-43.3 85.1-43.3 185.3 0 270.4L120 325.6z"
          fill="#FBBC05"
        />
        <path
          d="M272 107.1c39.7 0 75.4 13.6 103.6 40.4l77.7-77.7C406.5 24 345 0 272 0 168.1 0 76.6 61.9 32.1 150.1l87.9 70.6c21.4-64.2 81.3-111.9 152-111.9z"
          fill="#EA4335"
        />
      </svg>
      <span>Continue with Google</span>
    </button>
  );
}
