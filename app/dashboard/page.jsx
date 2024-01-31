"use client";
import React from "react";
import NavBar from "./navbar";
import Fetch from "./fetch";
const page = () => {
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div>
        <div><Fetch/></div>
        <div></div>
      </div>
    </div>
  );
};

export default page;
