import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NavBar = () => {
  return (
    <div>
      <div className="h-10 bg-slate-200 flex flex-row  justify-center items-center">
        <div className=" flex flex-row  justify-center items-center w-11/12">
          <h1 className="text-blue-400 text- xl">Device Monitor</h1>
        </div>
        <div className="flex flex-row  justify-end items-center">
          <Sheet>
            <SheetTrigger><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
</svg>
</SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Work in progress</SheetTitle>
                <SheetDescription>
                  pending......
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
