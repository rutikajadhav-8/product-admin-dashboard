"use client";

export default function ProductTable({products, onRowClick, onEdit, onDelete}){
    return(
        <table className="w-full border-collapse">
            <thead>
                <tr className="border-b text-left bg-gray-100">
                    <th className="p-2">Image</th>
                    <th className="p-2">Title</th>
                    <th className="p-2">category</th>
                    <th className="p-2">price</th>
                    <th className="p-2">Rating</th>
                    <th className="p-2">Stock</th>
                    <th className="p-2">Actions</th>
                </tr>
            </thead>

            <tbody>
                {products.map((product) => (
                    <tr key={product.id}
                        className="border-b"
                        onClick={() => onRowClick(product) }
                    >
                        <td className="p-2">
                            <img
                               src={product.thumbnail || "https://placehold.co/100*100?text=No+Image"}
                               alt= {product.title}
                               className="w-12 h-12 object-cover rounded"
                            />
                        </td>
                        <td className="p-2">{product.title}</td>
                        <td className="p-2 rounded inline-block bg-purple-200 text-purple-700 ">
                                              {product.category}
                        </td>
                        <td className="p-2">₹{product.price}</td>
                        <td className="p-2">⭐{product.rating}</td>
                        <td className="p-2">{product.stock}</td>
                        <td className="p-2 flex gap-2 mt-2">
                            <button
                               onClick={(e) => {e.stopPropagation(); 
                                                  onEdit(product);}

                               }
                               className="text-blue-500 bg-blue-100 py-1 px-2 rounded"
                            >
                                Edit
                            </button>

                            <button
                                onClick={(e) => { e.stopPropagation();
                                    onDelete(product)}}
                                className="text-red-500 bg-red-200 rounded px-2 py-1 "
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}