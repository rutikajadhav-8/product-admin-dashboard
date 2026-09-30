"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

 export default function ProductsLayout({children}){
 
    const router = useRouter();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token) {
            router.push("/login");
        } else{
            setChecking(false);
        }
    }, [router]);

    function handleLogout(){
        localStorage.removeItem("token");
        router.push("/login");
    }

    if(checking) return null;

    return(
        <div>
            <div className="flex justify-end p-3">
                <button
                   onClick={handleLogout}
                   className="bg-red-200 text-red-700 border px-2 py-1 rounded-lg"
                >
                    Logout
                </button>
            </div>
         {children}
        </div>
    );
 }