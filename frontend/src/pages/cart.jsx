import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cookies from "js-cookie";
const Cart = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);

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

    useEffect(() => {
        console.log("useEffect")
        getCartItems();
    }, []);

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
                    <p>{item.itemsCount}</p>
                    <button onClick={() => {
                    }}>Delete</button>
                </div>
            ))}
        </div>
    )
}

export default Cart