
import { useEffect } from 'react'
import Cookies from "js-cookie"
import { useSelector, useDispatch } from 'react-redux';
import { addProduct } from '../features/slices/productSlice.js';
import { setTotalPages } from '../features/slices/paginationSlice.js';


const Products = () => {
    const dispatch = useDispatch();
    const productsState = useSelector((state) => state.product.value);


    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch("/products")
            const data = await response.json();
            dispatch(addProduct({ products: data.products, totalItems: data.productsLength }))
            dispatch(setTotalPages(data.totalPages));
        }
        fetchProducts()
    }, [])

    const handleAddToCart = async (product) => {
        const token = Cookies.get('jwt');
        if (!token) {
            alert("Please login first");
            return;
        }
        try {
            const response = await fetch("/user/cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    id: product._id
                })
            });
             await response.json();

        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            {productsState.products.map((product) => (
                <div key={product.id}>
                    <h1>{product.name}</h1>
                    <p>{product.category}</p>
                    <p>{product.price}</p>
                    <button onClick={() => handleAddToCart(product)}>
                        Add to cart
                    </button>
                </div>
            ))}

        </>
    )
}

export default Products