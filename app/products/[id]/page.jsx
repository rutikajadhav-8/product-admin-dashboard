"use client"; 
import ErrorMessage from "@/components/ErrorMessage";
import Loader from "@/components/Loader";
import { getProductById } from "@/lib/api/products";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductDetailPage(){

    const {id} = useParams();
    const router = useRouter();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [error, setError] = useState(null);

    async function fetchProduct() {
        setLoading(true);
        setError(null);
        setNotFound(false);

        try{
            const data = await getProductById(id);
            setProduct(data);
        } catch(err){
            const localProducts = JSON.parse(localStorage.getItem("localProducts") || "[]");
            const localMatch = localProducts.find((p) => String(p.id) === String(id));
            if(localMatch) {
                setProduct(localMatch);
            }else if(err.message.toLowerCase().includes("not found")){
                setNotFound(true);
            } else{
                setError(err.message);
            }
        } finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProduct();
    }, [id]);

    if(loading) return <Loader/>

    if(notFound){
        return(
            <div className="p-6 mt-4 text-center" >
                <h1 className="text-xl font-semibold mb-2">Product not found</h1>
                <p className="text-gray-500 mb-4">
                    No product exists with id "{id}".
                </p>
                <button
                   onClick={() => router.push("/products")}
                   className="bg-pink-700 text-white px-4 py-1 rounded"
                >
                   ⬅️ Back to products
                </button>
            </div>
        );
    }

    if(error){
        return <ErrorMessage message={error} onRetry={fetchProduct} />;
    }

    return(
        <div className="p-6 mx-auto max-w-3xl">
            <button
                onClick={() => router.push("/products")}
                className="bg-pink-700 text-white px-4 py-1 rounded mb-6"
            >
                ⬅️ Back to products     
            </button>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="flex gap-2 overflow-x-auto">
                    {product.images?.map((img, i) => (
                        <img
                           key={i}
                           src={img}
                           alt={`${product.title} ${i+1}`}
                           className="w-40 h-40 object-cover rounded shrink-0"
                        />
                    ))}
                </div>

                <div>
                   <h2 className="text-2xl font-bold">{product.title}</h2> 
                   <p className="text-gray-500">{product.category}</p>
                   <p className="mt-2 text-gray-700">{product.description}</p>
                   <p className="text-sm font-semibold mt-4">₹{product.price}</p>
                   <p className="text-sm text-gray-500 mt-1">
                    ⭐{product.rating} Stock: {product.stock}
                   </p>

                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-lg font-semibold mb-3">Reviews</h2>
                {product.reviews?.length > 0 ? (
                    <div className="flex flex-col gap-4">
                        {product.reviews.map((review,i) => (
                            <div key={i} className="border rounded p-3">
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>{review.reviewerName}</span>
                                    <span>⭐{review.rating}</span>
                                </div>
                                <p className="mt-1">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                ):(
                    <p className="text-gray-500">No reviews yet</p>
                )}
            </div>

        </div>
    );
}