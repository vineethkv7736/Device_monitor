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
const Home = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    pass: "",
  });

  const [log, setLog] = useState(1);
  const [error, seterror] = useState("");
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
        seterror("Incorrect Username/Password")
      });
  };
  return (
    <div>
      {log ? (
        <div className="bg-blue-200  w-screen h-screen flex flex-col justify-center items-center p-2">
          <div className="flex flex-col shadow-2xl rounded-2xl justify-center items-center bg-slate-200  p-0">
            <div className="p-3 font-serif text-2xl">
              <h1>Login</h1>
            </div>
            <div className="px-5">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-center items-center"
              >
                <label>
                  Email:
                  <br />
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="rounded-md"
                  />
                </label>
                <br />
                <label>
                  Password:
                  <br />
                  <input
                    type="Password"
                    name="pass"
                    value={formData.pass}
                    onChange={handleChange}
                    className="rounded-md"
                  />
                </label>
                <p className="text-red-600 text-sm">{error}</p>
                <br />
                <button
                  type="submit"
                  className="bg-green-400 rounded-md  min-w-28 h-8 "
                >
                  Log In
                </button>
              <p>or</p>
              <div className="pb-2">
              <button
                onClick={sigingoogle}
                className="bg-blue-500 text-white rounded-md  w-max h-8 px-2 "
              >
                Continue with Google
              </button>
              </div>
              </form>
            </div>
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
