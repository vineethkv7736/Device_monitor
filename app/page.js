"use client";
import { auth } from "@/firebase/config"
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  onAuthStateChanged(auth, (user) => {
    if (user) {
     router.push("/dashboard");
    }
     else {
       router.push("/login");
    }
  });
  return (<div></div>
  );
}
