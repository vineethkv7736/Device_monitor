"use client";
import React from "react";


const UserInfo = ({name,photo,email}) => {
  return (
    <div>
      <div className="w-32  h-screen bg-blue-200 ">
        name:{name}
        photo:{photo}
        email:{email}
      </div>
    </div>
  );
};

export default UserInfo;
