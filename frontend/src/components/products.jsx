
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addProduct } from '../features/slices/productSlice.js';
import { setTotalPages } from '../features/slices/paginationSlice.js';
import { setCartItems } from '../features/slices/cartSlice.js';

const Products = () => {
    const dispatch = useDispatch();
    const productsState = useSelector((state) => state.product.value);
    const cartItems = useSelector((state) => state.cart.value.cartItems) || [];

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch("/products")
            const data = await response.json();
            dispatch(addProduct({ products: data.products, totalItems: data.productsLength }))
            dispatch(setTotalPages(data.totalPages));
        }
        fetchProducts()
    }, [])

    return (
        <>
            {productsState.products.map((product) => (
                <div key={product.id}>
                    <h1>{product.name}</h1>
                    <p>{product.category}</p>
                    <p>{product.price}</p>
                    <button onClick={() => {
                        dispatch(setCartItems({ cartItems: { ...product, itemsCount: 1 } }));
                    }}>add to cart {cartItems.itemsCount}</button>
                </div>
            ))}

        </>
    )
}

export default Products