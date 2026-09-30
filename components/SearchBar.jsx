"use client";
import { useEffect, useState } from "react";

export default function SearchBar({value, onSearch}){

    const [text, setText] = useState(value || "");

    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(text);
        }, 400);
        return () => clearTimeout(timer);
    }, [text])

    return(
        <div>
            <input
               type="text"
               value={text}
               onChange={(e) => setText(e.target.value)}
               placeholder="Search"
               className="w-xl border rounded px-3 py-2 m-4 shadow-lg"
            />
        </div>
    );
}