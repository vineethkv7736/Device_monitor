"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const NavBar = ({ name, photo, email }) => {
  return (
    <div>
      <div className="h-10 bg-slate-50 flex flex-row  justify-center items-center">
        <div className=" flex flex-row  justify-center items-center w-11/12">
          <h1 className="text-blue-400 text- xl">Device Monitor</h1>
        </div>
        <div className="fixed right-1 sm:invisible">
          <Sheet>
            <SheetTrigger>
              <Avatar>
                <AvatarImage src={photo} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Work in progress</SheetTitle>
                <SheetDescription>name:{name}</SheetDescription>
                <SheetDescription>email:{email}</SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
