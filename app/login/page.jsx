"use client";

import { login } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function loginPage(){

    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        if(submitting) return;

        setSubmitting(true);
        setError(null);

        try{
            const data = await login(username, password);
            localStorage.setItem("token", data.accessToken);
            router.push("/products");

        } catch (err){
            setError("Invalid username or password");
        } finally{
            setSubmitting(false);
        }
    }
    
    return (
        <div className="flex justify-center p-7 mt-7 ">
            <form
               className="flex flex-col gap-4 border rounded-2xl p-6 w-full max-w-sm"
               onSubmit={handleSubmit}
            >
                <h1 className="text-xl font-semibold text-center">Login</h1>

                <div>
                    <label className="block mb-2 ">Username</label>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block mb-2">Password</label>
                    <input
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       type="password"
                       className="w-full border rounded px-3 py-2"
                    />
                </div>

                {error && <p className="text-red-500">{error}</p>}

                <button
                   type="submit"
                   disabled={submitting}
                   className="bg-pink-600 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    {submitting? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
};