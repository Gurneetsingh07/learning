
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeCartItem } from '../features/slices/cartSlice';

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.value.cartItems) || [];

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
                        dispatch(removeCartItem(item));
                    }}>Delete</button>
                </div>
            ))}
        </div>
    )
}

export default Cart