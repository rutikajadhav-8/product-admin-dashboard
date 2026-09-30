"use client";

import { useState } from "react";

const emptyProducts = {
    title: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    brand: "",
    thumbnail: ""
}

export default function ProductForm({initialData, onSubmit, submitLabel}){

    const [form, setForm] = useState({...emptyProducts, ...initialData});
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    
    function handleChange(e){
        const {name, value} = e.target;
        setForm((prev) => ({...prev, [name]: value}));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if(submitting) return;

        const validationErrors = validate();
        setErrors(validationErrors);
        if(Object.keys(validationErrors).length > 0) return;

        try{
            await onSubmit({
                ...form,
                price: Number(form.price),
                stock : Number(form.stock),
            });
        } finally{
            setSubmitting(false);
        }
    }

    function validate(){
        const newErrors = {};
        if(!form.title.trim()) newErrors.title = "Title is required";
        if(!form.category.trim()) newErrors.category = " Category is required";
        if(form.price === "" || Number(form.price) <= 0){
            newErrors.price = "Price must be grater than 0";
        }
        if(form.stock === "" || Number(form.stock) < 0){
            newErrors.stock = "Stock cannot be negative";
        }

        return newErrors;
    }

    return(

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-xl p-4 mx-auto border ">
            
            <div>
                <label className="text-lg mb-1">Title</label>
                <input
                   name="title"
                   value={form.title}
                   onChange={handleChange}
                   className="w-full border rounded px-4 py-1"            
                />
                {errors.title && (
                    <p className="text-red-600 text-sm mt-1">{errors.title}</p>
                )}
            </div>

            <div>
                <label className="text-lg mb-1">Description</label>
                <input
                   name="description"
                   value={form.description}
                   onChange={handleChange}
                   className="w-full border rounded px-4 py-1" 
                   row = {3}           
                />
            </div>

            <div>
               <label className="text-lg mb-1">Category</label>
                <input
                   name="category"
                   value={form.category}
                   onChange={handleChange}
                   className="w-full border rounded px-4 py-1"            
                />
                {errors.category && (
                    <p className="text-red-600 text-sm mt-1">{errors.category}</p>
                )} 
            </div>

            <div>
                <label className="text-lg mb-1">Price</label>
                <input
                   name="price"
                   value={form.price}
                   onChange={handleChange}
                   className="w-full border rounded px-4 py-1"            
                />
                {errors.price && (
                    <p className="text-red-600 text-sm mt-1">{errors.price}</p>
                )}
            </div>

            <div>
                <label className="text-lg mb-1">Stock</label>
                <input
                   name="stock"
                   value={form.stock}
                   onChange={handleChange}
                   className="w-full border rounded px-4 py-1"            
                />
                {errors.stock && (
                    <p className="text-red-600 text-sm mt-1">{errors.stock}</p>
                )}
            </div>

            <div>
                <label className="text-lg mb-1">Brand</label>
                <input
                   name="brand"
                   value={form.brand}
                   onChange={handleChange}
                   className="w-full border rounded px-4 py-1"            
                />
            </div>

            <div>
                <label className="text-lg mb-1">Thumbnail URL</label>
                <input
                   name="thumbnail"
                   value={form.thumbnail}
                   onChange={handleChange}
                   className="w-full border rounded px-4 py-1"            
                />
            </div>

            <button
                type="submit"
                disabled={submitting}
                className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            >
                {submitting ? "Saving..." : submitLabel|| "Save"}
            </button>
        </form>
    );
}

