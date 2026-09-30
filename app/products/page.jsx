"use client";

import ConfirmModel from "@/components/ConfirmModel";
import EmptyState from "@/components/EmptyState";
import ErrorMessage from "@/components/ErrorMessage";
import FilterSort from "@/components/FilterSort";
import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import ProductCard from "@/components/ProductCard";
import ProductTable from "@/components/ProductTable";
import SearchBar from "@/components/SearchBar";
import { deleteProduct, getCategories, getProducts, getProductsByCategory, searchProducts } from "@/lib/api/products";
import { useRouter } from "next/navigation";
import { use, useEffect, useRef, useState } from "react";

export default function productsPage(){

  const router = useRouter();
  const [products,setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [categories, setCategories] = useState([]);

  const requestId = useRef(0); //tracks latest fetch

  const trimmeSearch = search.trim();

  function getLocalProducts(){
    try{
      return JSON.parse(localStorage.getItem("localProducts") || "[]");
    } catch{
      return [];
    }
  }

  useEffect(() => {
    getCategories().then(setCategories).catch(() => setCategories([]));
  }, []);

  async function fetchProducts() {
    setLoading(true);
    setError(null);

    const thisRequestId = ++requestId.current;

    try{
      const skip = (page-1) * limit;
      let data;

      //decides which endpoints to call
      if(trimmeSearch){
        data = await searchProducts(trimmeSearch, {limit, skip});
      } else if(category){
        data = await getProductsByCategory(category, {
          limit,
          skip,
          sortBy: sortBy || undefined,
          order: sortBy?order : undefined,
        });
      } else{
         data = await getProducts({
          limit, 
          skip,
          sortBy: sortBy|| undefined,
          oeder: sortBy?order : undefined
        });
      }

      if(thisRequestId !== requestId.current) return;

      //merge changes on top 
      const localProducts = getLocalProducts();
      let merged = [...data.products];

      localProducts.forEach((localItem) => {
        const indexInPage = merged.findIndex((p) => p.id === localItem.id);
        if(indexInPage !== -1){
          merged[indexInPage] = localItem;
        } else if(page === 1 && !search && !category){
          merged = [localItem, ...merged];
        }
      });

      // setProducts(data.products);
      setProducts(merged);
      setTotal(data.total);
    } catch(err) {
      if(thisRequestId !== requestId.current) return
      setError(err.message);
    } finally{
      if(thisRequestId === requestId.current) setLoading(false);
    }
  }
  
  useEffect(() => {
    fetchProducts();
  }, [page, limit, search, category, sortBy, order]);

  async function handleConfirmDelete() {
    if(!productToDelete || deleting) return;
    setDeleting(true);

    try{

      const isLocalOnly = getLocalProducts().some(
        (p) => String(p.id) === String(productToDelete.id) && p.isNew
      );

      if(!isLocalOnly){
         await deleteProduct(productToDelete.id);
      }
    
      setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
      setTotal((prev) => prev-1);

      //remove from localStorage
      const filtered = getLocalProducts().filter((p) => p.id !== productToDelete.id);
      localStorage.setItem("localProducts", JSON.stringify(filtered));

    } catch(err){
      alert("Failesd to delete" + err.message);
    } finally{
      setDeleting(false);
      setProductToDelete(null);
    }
  }

  return(
        <div className="p-4">
             <div className="flex justify-between items-center mb-4 ">
                <h1 className="text-2xl font-bold mb-4">Products</h1>

                <button
                   onClick={() => router.push("/products/new")}
                   className="bg-blue-600 text-white px-4 py-1 rounded "
                >
                 + Add Products
                </button>
             </div>

             <div className="flex flex-col md:flex-row gap-3 mb-4 justify-between">
                <div >
                   <SearchBar
                       value={search}
                       onSearch={(text) => {
                        setSearch(text);
                        setPage(1);  //reset to page 1
                       }}
                   />
                </div>

                <div className="p-6 ">
                   <FilterSort
                    categories={categories}
                    category={category}
                    sortBy={sortBy}
                    order={order}
                    searchActive={!!search}
                    onCategoryChange={(cat) => {
                      setCategory(cat);
                      setPage(1);
                    }}
                    onSortChange={(newSortBy, newOrder) => {
                      setSortBy(newSortBy);
                      setOrder(newOrder);
                      setPage(1);
                    }}
                />
                </div>
             </div>

             {loading && <Loader/>}

             {!loading && error && (
              <ErrorMessage message={error} onRetry={fetchProducts} />
             )}

             {!loading && !error && products.length === 0 && <EmptyState/>}

             {!loading && !error && products.length > 0 && (
              <>
              <div className="hidden md:block">
                <ProductTable 
                    products={products}
                    onRowClick={(p) => router.push(`/products/${p.id}`)}
                    onEdit={(p) => router.push(`/products/${p.id}/edit`)}
                    onDelete={(p) => setProductToDelete(p)}
                />
              </div>

              <div className="md:hidden flex flex-col gap-3">
                {products.map((product) => (
                  <ProductCard key={product.id}
                               product={product}
                  />
                ))}
              </div>

              <Pagination
                  page={page}
                  limit={limit}
                  total={total}
                  onPageChange={setPage}
                  onLimitChange={(newLimit) => {
                    setLimit(newLimit);
                    setPage;
                  }}
              />
              </>
            )}
            
            <ConfirmModel
              open={!!productToDelete}
              title= "Delete product?"
              message= {`Are you sure you want to delete "${productToDelete?.title}"?`}
              onConfirm={handleConfirmDelete}
              onCancel={() => setProductToDelete(null)}
            />

          
        </div>
    );
};