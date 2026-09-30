"use client";

export default function Pagination({page, limit, total, onPageChange, onLimitChange}){

    const totalPages = Math.max(1, Math.ceil(total/limit));
    const start = total === 0 ? 0 : (page -1) * limit + 1;
    const end = Math.min(page * limit, total);

    const pageNumbers = [];
    for(let i=1; i<totalPages; i++){
        pageNumbers.push(i);
    }

    return(
        <div className="flex items-center gap-3 py-4">

            <span className="text-gray-500">
                Showing {start}--{end} of {total}
            </span>

            <div className="flex gap-2">
                <button
                   onClick={() => onPageChange(page-1)}
                   disabled = {page<=1}
                   className="px-2 py-1 border rounded"
                >
                    Previous
                </button>

                {pageNumbers.map((num) => (
                    <button
                       key={num}
                       onClick={() => onPageChange(num)}
                       className="px-2 py-1 border rounded"
                    >
                        {num}
                    </button>
                ))}

                <button
                   onClick={() => onPageChange(page+1)}
                   disabled = {page >= totalPages}
                   className="px-2 py-1 border rounded"
                >
                    Next
                </button>

                <select
                   value={limit}
                   onChange={((e) => onLimitChange(Number(e.target.value)))}
                   className="border rounded  px-2 py-1"
                >
                    <option value={10}>10/page</option>
                    <option value={20}>20/page</option>
                    <option value={50}>50/page</option>
                </select>
            </div>
        </div>
    );
}