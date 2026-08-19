import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cookies from "js-cookie";
const Cart = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    useEffect(() => {
        console.log("useEffect")
        getCartItems();
    }, []);
    const getCartItems = async () => {
        const token = cookies.get('jwt');
        if (!token) {
            alert("please login first");
            navigate("/login");
            return;
        }
        try {
            const res = await fetch("user/cart", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (res.ok) {
                console.log(data.cart)
                setCartItems(data.cart || []);
            }
        }
        catch (error) {
            alert("could not connect to the server")
        }
    };

    const handleDelete = async (productId) => {
        const token = cookies.get("jwt")
        if (!token) {
            alert("please login first");
            navigate("/login");
            return;
        }
        try {
            const res = await fetch(`/user/cart/${productId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if (res.ok) {
                setCartItems(data.cart || []);
            }
            else {
                console.log(data.message || "could not delete the item")
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    const handleButtonClick = () => {
        navigate('/')
    }

    return (
        <div>
            <button onClick={handleButtonClick}>Home</button>
            {cartItems.map((item, index) => (
                <div key={index}>
                    <h2>{item.name}</h2>
                    <p>{item.price}</p>
                    <p>{item.quantity}</p>
                    <button onClick={() => handleDelete(item.product)}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    )
}

export default Cart