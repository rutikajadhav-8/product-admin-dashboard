"use client";

export default function FilterSort({
    categories,
    category,
    sortBy,
    order,
    onCategoryChange,
    onSortChange,
    searchActive,
}){

    return(
        <div className="flex flex-wrap gap-3">
            <select
              value={category}
              onChange={(e) => onCategoryChange(e.target.value)}
              disabled = {searchActive}
              className="border rounded px-2 py-1 disabled:cursor-not-allowed disabled:opacity-40"
            >
                <option value="">All categories</option>
                {categories.map((cat) => (
                    <option key={cat.slug} value={cat.slug}>
                        {cat.name}
                    </option>
                ))}
            </select>

            <select
               value={sortBy}
               onChange={(e) => onSortChange(e.target.value)}
               className="border rounded px-2 py-1"
            >
                <option value="">Sort By</option>
                <option value="price">Price</option>
                <option value="rating">Rating</option>
                <option value="title">Title</option>

            </select>

            <select
                value={order}
                onChange={(e) => onSortChange(sortBy, e.target.value)}
                disabled ={!sortBy}
                className=" border rounded px-2 py-1 disabled:opacity-40  disabled:cursor-not-allowed "
            >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>

            </select>
        </div>
    )
}