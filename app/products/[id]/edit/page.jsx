"use client";
import ErrorMessage from "@/components/ErrorMessage";
import Loader from "@/components/Loader";
import ProductForm from "@/components/ProductForm";
import { getProductById, updateProduct } from "@/lib/api/products";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditProductPage(){

    const {id} = useParams();
    const router = useRouter();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchProduct() {
        setLoading(true);
        setError(null);
        try{
            const data = await getProductById(id);
            setProduct(data);
        } catch(err) {

            const localProducts = JSON.parse(localStorage.getItem("localProducts") || "[]");
            const localMatch = localProducts.find((p) => String(p.id) === String(id));

            if(localMatch) {
                setProduct(localMatch);
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

    async function handleUpdate(data) {
        try{

            const existing = JSON.parse(
                localStorage.getItem("localProducts") || "[]"
            );
            
            const localMatch = existing.find((p) => String(p.id) === String(id));
            const isLocalOnly = !!localMatch?.isNew;

            let updated = {};

            if(!isLocalOnly){
                updated = await updateProduct(id, data);
            }

            const filtered = existing.filter((p) => String(p.id) !== String(id));
            const merged = {
                ...product,
                ...updated,
                ...data,
                id:isLocalOnly? localMatch.id : Number(id),
                ...(isLocalOnly && {isNew : true}),
            };

            localStorage.setItem(
                "localProducts",
                JSON.stringify([merged, ...filtered])
            );

            router.push("/products");
        } catch(err){
            alert("Failed to update product:" + err.message);
        }
    }

    if(loading) return <Loader/>;
    if(error) return <ErrorMessage message={error} onRetry={fetchProduct}/>; 

    return(
        <div className="p-6 w-xl mx-auto">
           <h1 className="text-xl font-semibold mb-4">Edit Product</h1>
           <ProductForm
               initialData={product}
               submitLabel="Save changes"
               onSubmit={handleUpdate}
           />

        </div>
    );
}