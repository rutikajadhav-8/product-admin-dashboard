"use client";

export default function ErrorMessage({message, onRetry}){
    return (
        <div className="flex flex-col items-center gap-3 py-10 text-center">
            <p className="text-red-600">{message || "Something went Wrong"}</p>
            {onRetry && (
                <button 
                   onClick={onRetry}
                   className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" 
                >
                    Retry
                </button>
            )}
        </div>
    );
}