"use client";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/config";
import { signInWithEmailAndPassword,onAuthStateChanged } from "firebase/auth";
import React, { useState } from "react";
const Home = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    pass: "",
  });

  onAuthStateChanged(auth, (user) => {
    if (user) {
     router.push("/dashboard");
    }
     
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, formData.email, formData.pass)
      .then((userCredential) => {
        router.push("/dashboard");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(error.message);
      });
  };
  return (
    <div className="bg-blue-200  w-screen h-screen flex flex-col justify-center items-center p-2">
      <div className="flex flex-col shadow-2xl rounded-2xl justify-center items-center bg-slate-200  p-0">
        <div className="mt-4 mb-5">
          <h1>Login Form</h1>
        </div>
        <div className="mr-10 ml-10 mb-4">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center"
          >
            <label>
              Email:
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className=""
              />
            </label>
            <br />
            <label>
              Password:
              <input
                type="Password"
                name="pass"
                value={formData.pass}
                onChange={handleChange}
                className=" "
              />
            </label>
            <br />
            <button
              type="submit"
              className="bg-green-400 rounded-md  w-20 h-7 "
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
