import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage, setTotalPages } from '../features/slices/paginationSlice';
import { addProduct } from '../features/slices/productSlice';

const Pagination = ({limit}) => {
    const dispatch = useDispatch();
    const { currentPage, totalPages } = useSelector((state) => state.pagination);
    const productsState = useSelector((state) => state.product.value);

    async function handlePrevious() {
        if (currentPage > 1) {
            const newPage = currentPage - 1;
            dispatch(setCurrentPage(newPage));
            const response = await fetch(`/products?page=${newPage}`)
            const data = await response.json();
            dispatch(addProduct({ products: data.products }))
        }
    }

    async function handlePageClick(pageNumber) {
        dispatch(setCurrentPage(pageNumber));
        const response = await fetch(`/products?page=${pageNumber}&limit=${limit}`);
        const data = await response.json();
        dispatch(addProduct({ products: data.products }))
    }

    async function handleNext() {
        const newPage = currentPage + 1;
        dispatch(setCurrentPage(newPage));
        const response = await fetch(`/products?page=${newPage}&limit=${limit}`)
        const data = await response.json();
        dispatch(addProduct({ products: data.products }))
    }

    return (
        <div>
            <button onClick={handlePrevious} disabled={currentPage === 1}>prev</button>

            {[...Array(totalPages)].map((_, index) => (
                <button
                    key={index + 1}
                    onClick={() => handlePageClick(index + 1)}
                    disabled={currentPage === index + 1}
                >
                    {index + 1}
                </button>
            ))}
            <button onClick={handleNext} disabled={currentPage * limit >= productsState.totalItems}>next</button>
        </div>
    )
}

export default Pagination