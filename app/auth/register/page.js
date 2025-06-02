"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faEye,
  faEyeSlash,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Swal from "sweetalert2";
export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isScaling, setIsScaling] = useState(false);
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [isloading, setIsLoading] = useState(false);
  const [isMatch, setIsmatch] = useState(false);
  const handleFormChange = async(e) => {
    await setData({ ...data, [e.target.name]: e.target.value });
    setIsLoading(false);
    console.log(data);
  };
  useEffect(() => {
    if (data.password === data.confirmpassword) {
      setIsmatch(true);
    } else {
      setIsmatch(false);
    }
  }, [data.password, data.confirmpassword]);
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
    setIsScaling(true);
    setTimeout(() => setIsScaling(false), 200);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  try {
    const response = await axios.post('http://localhost:5000/api/users', {
      username: data.username,
      password: data.password,
      email: data.email
    });
    const result = response.data;
    console.log(result);
    localStorage.setItem("token", result.data.token);
    Swal.fire({
      icon: 'success',
      title: 'Registered!',
      text: result.message || 'Registration successful.'
    });
  } catch (error) {
    let message = 'Registration failed.';
    if (error.response && error.response.data && error.response.data.message) {
      message = error.response.data.message;
    } else if (error.message) {
      message = error.message;
    }
    Swal.fire({
      icon: 'error',
      title: "Can't Register",
      text: message
    });
    console.error('Registration error:', error);
  } finally {
    setIsLoading(false);
  }
};
  return (
    <div
      className="flex flex-col my-5 mx-auto md:my-20 md:mx-auto bg-[var(--oxford-blue)]/30 rounded-xl p-5 shadow-md shadow-white w-5/6 md:w-2/6 gap-3 "
      data-aos="fade-up"
      data-aos-duration="1000"
      data-aos-delay="500"
    >
      <h1 className="text-4xl font-bold self-center py-6">Register</h1>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <label className="flex flex-row gap-2 items-center border px-2 rounded-lg select-none">
          <FontAwesomeIcon icon={faUser} size="xl" />
          <input
            placeholder="Username"
            type="username"
            name="username"
            className="p-2 w-full border-none focus:outline-none focus:ring-0 focus:border-transparent"
            required
            onChange={handleFormChange}
          />
        </label>
        <label
          className={`flex flex-row gap-2 items-center border px-2 rounded-lg select-none transition-transform duration-200`}
        >
          <FontAwesomeIcon icon={faEnvelope} size="xl" />
          <input
            placeholder="Email"
            type="email"
            name="email"
            className="p-2 w-full border-none focus:outline-none focus:ring-0 focus:border-transparent"
            required
            onChange={handleFormChange}
          />
        </label>
        <label
          className={`flex flex-row gap-2 items-center border px-2 rounded-lg select-none transition-transform duration-200 ${
            isScaling ? "scale-95" : ""
          }`}
        >
          <FontAwesomeIcon icon={faLock} size="xl" />
          <input
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            className="p-2 w-full border-none focus:outline-none focus:ring-0 focus:border-transparent"
            required
            onChange={handleFormChange}
          />
          <div onClick={togglePassword}>
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              size="xl"
            />
          </div>
        </label>
        <label
          className={`flex flex-row gap-2 items-center border px-2 rounded-lg select-none transition-transform duration-200 ${
            isScaling ? "scale-95" : ""
          }`}
        >
          <FontAwesomeIcon icon={faLock} size="xl" />
          <input
            placeholder="Confirm Password"
            type={showPassword ? "text" : "password"}
            name="confirmpassword"
            className="p-2 w-full border-none focus:outline-none focus:ring-0 focus:border-transparent"
            required
            onChange={handleFormChange}
          />
          <div onClick={togglePassword}>
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              size="xl"
            />
          </div>
        </label>
        {isMatch ? null : (
          <p
            className="text-sm font-bold"
            data-aos="fade-right"
            data-aos-duration="100"
          >
            Password is not match
          </p>
        )}
        {isloading ? (
          <button
            type="button"
            className="w-full bg-gray-400 rounded-sm p-2 hover:scale-105 hover:bg-gray-500/80 text-black font-bold ease-in-out transition-transform duration-200"
          >
            Loading
          </button>
        ) : (
          <button
            type="submit"
            className="w-full bg-[var(--mikado-yellow)] rounded-sm p-2 hover:scale-105 hover:bg-[var(--mikado-yellow)]/80 text-black font-bold ease-in-out transition-transform duration-200"
          >
            Register
          </button>
        )}

        <Link
          href="/auth/login"
          className="w-full bg-[var(--mikado-yellow)] rounded-sm p-2 hover:scale-105 hover:bg-[var(--mikado-yellow)]/80 text-black font-bold ease-in-out transition-transform duration-200 text-center"
        >
          Login
        </Link>
      </form>
    </div>
  );
}
