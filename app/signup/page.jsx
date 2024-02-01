"use client";
import { useRouter } from "next/navigation";
import { auth, provider,db } from "@/firebase/config";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import SiginIn from "@/components/siginIn";
import Image from "next/image";
import Link from "next/link";
import { doc,setDoc } from "firebase/firestore";

const Home = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    pass: "",
    name:"",
  });

  const [log, setLog] = useState(1);
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
        formData.name=user.getDisplayName();
        addDataOnDatabase();
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

const addDataOnDatabase = async (e)=> {
  await setDoc(doc(db, formData.email, "rasberry_pi"), {
    name: formData.name,
  });
};

  const handleSubmit = (e) => {
    setLog(0);
    e.preventDefault();
    createUserWithEmailAndPassword(auth, formData.email, formData.pass)
      .then((userCredential) => {
        addDataOnDatabase();
        router.push("/dashboard");
      })
      .catch((error) => {
        setLog(1);
    
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
            <h1 className="text-4xl text-blue-500 font-semibold mt-3">Create an Account</h1>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-center items-center mt-4"
            >
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mb-2 border-2 rounded-md border-slate-100 p-0.5"
                placeholder="Name"
                required
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mb-2 border-2 rounded-md border-slate-100 p-0.5"
                placeholder="Email"
                required
              />

              <input
                type="Password"
                name="pass"
                value={formData.pass}
                onChange={handleChange}
                className="mb-2 border-2 rounded-md border-slate-100 p-0.5"
                placeholder="Password"
                required
              />

              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded-3xl"
              >
                Sign up
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
                <span className="text-gray-400">Already have an Account?</span>
                <Link href={"/login"}>
                  <span className="text-blue-500 font-semibold">Login</span>
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
