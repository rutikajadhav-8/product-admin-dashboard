import api from "../axios";

export async function getProducts({limit = 10, skip=0, sortBy, order} = {}) {
    const params = {limit, skip};
    if(sortBy) params.sortBy = sortBy;
    if(order) params.order = order;

    const response = await api.get("/products", {params});
    return response.data;
}

export async function getProductsByCategory(category, {limit = 10, skip = 0, sortBy, order} = {}) {   
    const params = {limit, skip};
    if(sortBy) params.sortBy = sortBy;
    if(order) params.order = order;

    const response = await api.get(`/products/category/${category}`, {params});
    return response.data;
}

export async function searchProducts(query, {limit = 10, skip = 0}) {
    const response = await api.get("/products/search", {
        params : {q : query, limit, skip},
    });
    return response.data;   
}

export async function getCategories() {
    const response = await api.get("/products/categories");
    return response.data;
}

export async function getProductById(id) {
    const response = await api.get(`/products/${id}`);
    return response.data;
}

export async function addProduct(product) {
    const response = await api.post("/products/add", product);
    return response.data;
}

export async function updateProduct(id, product) {
    const response = await api.put(`/products/${id}`, product);
    return response.data;
}

export async function deleteProduct(id) {
    const response = await api.delete(`/products/${id}`);
    return response.data;
}