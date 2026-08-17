import React, { useEffect, useState } from 'react'
import { addProduct } from '../features/slices/productSlice'
import { useDispatch } from 'react-redux'
import { setTotalPages } from '../features/slices/paginationSlice'
const SearchProducts = () => {
    const [searchedValue, setSearchedValue] = useState("")
    const dispatch = useDispatch();
    useEffect(() => {
        if (searchedValue === "") {
            return;
        }
        let handler = setTimeout(() => fetchSearchedProducts(), 2000)
        return () => clearTimeout(handler)
    }, [searchedValue])

    async function handleChange(event) {
        setSearchedValue(event.target.value)
    }

    async function fetchSearchedProducts() {
        const response = await fetch(`/products/search?search=${searchedValue}`)
        const data = await response.json();
        console.log(data)
        dispatch(addProduct({ products: data.products, totalItems: data.productsLength }))
        dispatch(setTotalPages(data.totalPages))
    }

    return (
        <div>
            <input type="text" placeholder='search the products' onChange={handleChange} />
        </div>
    )
}

export default SearchProducts