"use client";
import { useRouter } from "next/navigation";
import { auth, provider } from "@/firebase/config";
import {
  onAuthStateChanged,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
  });
  const Ref = useRef(null);
  const [timer, setTimer] = useState("");
  const [state, setstate] = useState(false);
  const [message, setmessage] = useState(null);
  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return {
      total,
      minutes,
      seconds,
    };
  };
  const [inform, setinform] = useState({
    state: false,
    heading: "Email not sent... ",
    body: "Check whether you are a registed user nor not",
  });
  const startTimer = (e) => {
    let { total, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
      if (total == 0) {
        setmessage(null);
        setTimer(null);
        setstate(false);
      }
    }
  };

  const clearTimer = (e) => {
    setTimer("1:00");
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 60);
    return deadline;
  };

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

  const changepass = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, formData.email)
      .then(() => {
        setinform({
          state: true,
          heading: "Email Sent Successfully... ",
          body: " The Password reset mail successfully sent to your Email address",
        });
        setmessage("Resent link in: ");
        clearTimer(getDeadTime());
        setstate(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setinform({
          state: true,
          heading: "Email not sent... ",
          body: errorMessage,
        });
      });
    // console.log(inform);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const oninform = () => {
    setinform({ state: false });
  };

  return (
    <div className="w-screen h-max sm:h-screen flex justify-center sm:items-center">
      <div className="w-full h-max flex flex-col sm:h-max sm:w-96 sm:shadow-xl pb-4">
        <div className="fixed top-0 right-0">
          <Link href="/login">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </Link>
        </div>
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
          <h1 className="text-2xl text-blue-500 font-semibold mt-3">
            Reset Password
          </h1>
          <h3 className="text-xs text-black  mt-2 flex flex-col justify-center items-center ">
            Enter your registered Username or Email id to sent a reset email
          </h3>
          <form
            onSubmit={changepass}
            className="flex flex-col justify-center items-center mt-4"
          >
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full mb-2 border-2 rounded-md p-1  border-slate-100"
              required
            />
            <p className="text-gray-500 text-sm mb-1">
              {message} {timer}
            </p>
            <button
              disabled={state}
              type="submit"
              className="w-56 bg-blue-500 text-white p-1 rounded-2xl"
            >
              Sent Reset Link
            </button>
            <div className="w-full flex items-center justify-center gap-3 my-3">
              <hr style={{ height: "1px" }} className="w-36" />
              <span>or</span>
              <hr style={{ height: "1px" }} className="w-36" />
            </div>

            <button
              onClick={sigingoogle}
              className=" flex gap-2 bg-blue-500 text-white p-0.5 pr-2 items-center mb-3"
            >
              <div className="bg-white p-0.5">
                <Image src={"/google.svg"} width={35} height={35} alt="G" />
              </div>
              <span className="px-3">Continue with Google</span>
            </button>
          </form>
        </div>
      </div>
      <AlertDialog open={inform.state} onOpenChange={oninform}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-blue-500">
              {inform.heading}
            </AlertDialogTitle>
            <AlertDialogDescription>{inform.body}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="text-blue-500">
            <AlertDialogAction>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default page;
