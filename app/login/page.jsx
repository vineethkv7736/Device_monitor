"use client";
import { useRouter } from "next/navigation";
import { auth, provider } from "@/firebase/config";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import SiginIn from "@/components/siginIn";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    pass: "",
  });

  const [log, setLog] = useState(1);
  const [error, seterror] = useState("");
  const errorColor = 'border-red-500'
  onAuthStateChanged(auth, (user) => {
    if (user) {
      router.push("/dashboard");
    }
  });

  const sigingoogle = (e) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        router.push("/dashboard");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    setLog(0);
    e.preventDefault();
    signInWithEmailAndPassword(auth, formData.email, formData.pass)
      .then((userCredential) => {
        router.push("/dashboard");
      })
      .catch((error) => {
        setLog(1);
        seterror("Incorrect Username/Password");
        setInterval(() => {
          seterror("")
        }, 3000);
      });
  };
  return (
    <div className="w-screen h-max sm:h-screen flex justify-center sm:items-center">
      {log ? (
        <div className="w-full h-max flex flex-col sm:h-max sm:w-96 sm:shadow-xl pb-4">
          <div className="w-full h-1/2 sm:hidden flex justify-center items-center">
            <Image
              src={"/login.svg"}
              height={0}
              width={0}
              style={{ height: "100%", width: "auto" }}
              alt="login"
            />
          </div>
          <div className="w-full h-1/2 flex flex-col text-center px-10">
            <h1 className="text-4xl text-blue-500 font-semibold mt-3">Login</h1>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-center items-center mt-4"
            >
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`mb-2 border-2 rounded-md border-slate-100 p-1 ${error && errorColor}`}
                placeholder="Email"
              />

              <input
                type="Password"
                name="pass"
                value={formData.pass}
                onChange={handleChange}
                className={`mb-1 border-2 rounded-md border-slate-100 p-1 ${error && errorColor}`}
                placeholder="Password"
              />
              <div className="w-full flex gap-1 justify-end mb-3">
                <Link className="text-right text-blue-500"  href="/login/resetpass">Forgot Password?</Link>
        
              </div>
              <p className="text-red-600 text-sm">{error}</p>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded-3xl"
              >
                Log In
              </button>
              <div className="w-full flex items-center justify-center gap-3 my-3">
                <hr style={{ height: "1px" }} className="w-36" />
                <span>or</span>
                <hr style={{ height: "1px" }} className="w-36" />
              </div>

              <button
                onClick={sigingoogle}
                className=" flex gap-2 bg-blue-500 text-white p-1 pr-2 items-center mb-3"
              >
                <div className="bg-white p-1">
                  <Image src={"/google.svg"} width={35} height={35} alt="G" />
                </div>
                <span className="px-3">Continue with Google</span>
              </button>
              <span className="flex gap-1">
                <span className="text-gray-400">Don't have an Account?</span>
                <Link href={"/signup"}>
                  <span className="text-blue-500 font-semibold">Signup</span>
                </Link>
              </span>
            </form>
          </div>
        </div>
      ) : (
        <div>
          <SiginIn />
        </div>
      )}
    </div>
  );
};

export default Home;
