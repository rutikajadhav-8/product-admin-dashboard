"use client";
import ProductForm from "@/components/ProductForm";
import { addProduct } from "@/lib/api/products";
import { useRouter } from "next/navigation";

export default function NewProductPage(){

    const router = useRouter();
    
    async function handleAdd(data) {
        try{
            const created = await addProduct(data);

            const existing = JSON.parse(
                localStorage.getItem("localProducts") || "[]"
            );

            const withId = {...created, id:Date.now(), isNew: true};
            localStorage.setItem(
                "localProducts",
                JSON.stringify([withId, ...existing])
            );

            router.push("/products");
        } catch(err){
            alert("Failed to add product" + err.message);
        }
    }

    return(
        <div className="p-6 mx-auto w-xl">
            <h1 className="text-xl font-semibold mb-4">Add Product</h1>
            <ProductForm
                submitLabel= "Add product"
                onSubmit={handleAdd}
            />
            
        </div>
    );
}