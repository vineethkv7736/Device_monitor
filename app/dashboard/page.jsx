"use client";
import React, { useState, useEffect } from "react";
import NavBar from "./navbar";
import Fetch from "./fetch";
import UserInfo from "./userinfo";
import { auth } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";

const Page = () => {
  const [userdata, setuserdata] = useState({
    name: "",
    email: "",
    photo: "",
  });

  
  useEffect(() => {
   
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setuserdata({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
          });
        }
      });

  },[]);


  return (
    <div className="flex flex-row h-screen">
      <div className="hidden lg:block md:block xl:block">
        <UserInfo
          name={userdata.name}
          photo={userdata.photo}
          email={userdata.email}
        />
      </div>
      <div className="flex flex-col w-screen">
        <div className="">
          <NavBar
            name={userdata.name}
            photo={userdata.photo}
            email={userdata.email}
          />
        </div>
        <div className="overflow-y-auto h-screen">
          <Fetch />
        </div>
      </div>
    </div>
  );
};

export default Page;
