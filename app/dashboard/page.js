"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
const page = () => {
  const router = useRouter();
  const [fetchedData, setFetchedData] = useState({});
  const [userdata, setuserdata] = useState({
    name: "",
    email: "",
    photo: "",
  });

  const fetchData = async () => {
    const docRef = doc(db, "temperature_data", "data");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      //console.log("Document data:", docSnap.data());
      setFetchedData(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchData();
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      userdata.email = user.email;
      userdata.name = user.displayName;
      userdata.photo = user.photoURL;
      //console.log(userdata);
    } else {
      router.push("/login");
    }
  });

  const signout = () => {
    try {
      signOut(auth);
      alert("Signed out Sucessfullly");
      router.push("/login");
    } catch {
      alert("error.message");
    }
  };
  return (
    <div>
      <h1>Welcome to Your Next.js App!</h1>
      <h1>hii</h1>
      <h2>Fetched Data:</h2>
      <ul>
        <li>Temperature: {fetchedData.temperature_celsius} °C</li>
        <li>Timestamp: {fetchedData.timestamp}</li>
        <li>SSID: {fetchedData.ssid}</li>
        <li>CPU Usage: {fetchedData.cpu_usage}%</li>
        <li>Signal Strength: {fetchedData.signal_strength}</li>
      </ul>
      <button onClick={signout}>signout</button>
    </div>
  );
};

export default page;
