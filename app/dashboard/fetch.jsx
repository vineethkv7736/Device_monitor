"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth,dbr } from "@/firebase/config";
import {ref, onValue } from "firebase/database";
import { onAuthStateChanged, signOut } from "firebase/auth";
import FetchData from "@/components/fetchData";



const Fetch = () => {
  const router = useRouter();
  const [fetchedData, setFetchedData] = useState({});
  const [fetchSign, setFetchSign] = useState(1);
  const [userdata, setuserdata] = useState({
    name: "",
    email: "",
    photo: "",
  });

  const toSize = (bits) => {
    const Gb = bits / 1000000000; 
    const Mb = bits / 1000000;
    
    if (Gb >= 1) {
      return Gb.toFixed(2) + ' Gb';
    } else {
      return Mb.toFixed(2) + ' Mb';
    }
  };
  
  const fetchData =() => {
    const Ref = ref(dbr, 'vineethkv7736/' + '/rasberry_pi');
    onValue(Ref, (snapshot) => {
      const data = snapshot.val();
      setFetchedData(data);
      setFetchSign(0);
    });
  };

  useEffect(() => {
    setInterval(() => {
          fetchData();
        }, 1000);
  });


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
      alert("Sign Out unsucessfull try again");
    }
  };
  return (
    <div>
      {fetchSign ? (
        <div>
          <FetchData />
        </div>
      ) : (
        <div className="">

          <h1>Welcome to Your Next.js App!</h1>
          <h1>hii</h1>
          <h2>Fetched Data:</h2>
          <ul>
            <li>Temperature: {fetchedData.temperature_celsius} °C</li>
            <li>Timestamp: {fetchedData.timestamp}</li>
            <li>SSID: {fetchedData.ssid}</li>
            <li>CPU Usage: {fetchedData.cpu_usage}%</li>
            <li>Signal Strength: {fetchedData.signal_strength}</li>
            <li>ram_percent_used: {fetchedData.ram_percent_used}%</li>
            <li>total_ram: {toSize(fetchedData.total_ram)}</li>
            <li>used_ram: {toSize(fetchedData.used_ram)}</li>
            <li>free_ram: {toSize(fetchedData.free_ram)}</li>
            <br />
            <li>partition: {fetchedData.storage_info[0].partition}</li>
            <li>percent_used: {fetchedData.storage_info[0].percent_used}%</li>
            <li>total_space: {toSize(fetchedData.storage_info[0].total_space)}</li>
            <li>used_space: {toSize(fetchedData.storage_info[0].used_space)}</li>
            <li>free_space: {toSize(fetchedData.storage_info[0].free_space)}</li>
            <br />
            <li>partition: {fetchedData.storage_info[1].partition}</li>
            <li>percent_used: {fetchedData.storage_info[1].percent_used}%</li>
            <li>total_space: {toSize(fetchedData.storage_info[1].total_space)}</li>
            <li>used_space: {toSize(fetchedData.storage_info[1].used_space)}</li>
            <li>free_space: {toSize(fetchedData.storage_info[1].free_space)}</li>
          </ul>
          <ul>
            <li>Temperature: {fetchedData.temperature_celsius} °C</li>
            <li>Timestamp: {fetchedData.timestamp}</li>
            <li>SSID: {fetchedData.ssid}</li>
            <li>CPU Usage: {fetchedData.cpu_usage}%</li>
            <li>Signal Strength: {fetchedData.signal_strength}</li>
            <li>ram_percent_used: {fetchedData.ram_percent_used}%</li>
            <li>total_ram: {toSize(fetchedData.total_ram)}</li>
            <li>used_ram: {toSize(fetchedData.used_ram)}</li>
            <li>free_ram: {toSize(fetchedData.free_ram)}</li>
            <br />
            <li>partition: {fetchedData.storage_info[0].partition}</li>
            <li>percent_used: {fetchedData.storage_info[0].percent_used}%</li>
            <li>total_space: {toSize(fetchedData.storage_info[0].total_space)}</li>
            <li>used_space: {toSize(fetchedData.storage_info[0].used_space)}</li>
            <li>free_space: {toSize(fetchedData.storage_info[0].free_space)}</li>
            <br />
            <li>partition: {fetchedData.storage_info[1].partition}</li>
            <li>percent_used: {fetchedData.storage_info[1].percent_used}%</li>
            <li>total_space: {toSize(fetchedData.storage_info[1].total_space)}</li>
            <li>used_space: {toSize(fetchedData.storage_info[1].used_space)}</li>
            <li>free_space: {toSize(fetchedData.storage_info[1].free_space)}</li>
          </ul>
          <button onClick={signout}>signout</button>
          herjwerj
        </div>
      )}
    </div>
  );
};

export default Fetch;