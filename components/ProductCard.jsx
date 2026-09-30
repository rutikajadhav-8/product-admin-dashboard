"use client";
export default function ProductCard({product}){
    return(
        <div className="flex gap-5 border rounded-lg p-3">
            <img
               src= {product.thumbnail || "https://placehold.co/100*100?text=No+Image"}
               alt={product.title}
               className="w-22 h-22 rounded object-cover"
            />

            <div className="">
                <h3 className="font-semibold">{product.title}</h3>
                <p className="text-blue-500 bg-blue-200 text-center rounded inline-block px-4 py-1 text-sm mt-1">{product.category}</p>

                <div className="flex gap-5 mt-2 text-sm">
                    <span>₹{product.price}</span>
                    <span>⭐{product.rating}</span>
                    <span>Stock: {product.stock}</span>
                </div>
            </div>
        </div>
    );
}