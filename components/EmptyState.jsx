export default function EmptyState({message}){
    return(
        <div className="flex flex-col items-center text-center text-gray-500 py-10 ">
            <p>{message || "No products found"}</p>
        </div>
    );
}