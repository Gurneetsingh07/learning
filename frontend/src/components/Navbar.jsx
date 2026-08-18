import React, { useEffect } from 'react'
import SearchProducts from './searchProducts'
import { useNavigate } from 'react-router-dom'

import Cookies from 'js-cookie';

const Navbar = () => {
    const navigate = useNavigate();
    const jwtToken = Cookies.get('jwt');

    const handleButtonClick = () => {
        navigate('/cart')
    }

    function handlesignup() {
        navigate('/signup')
    }
    const handlelogin = () => {
        navigate('/login')
    }

    const handleLogout = async () => {
        try {
            const res = await fetch("/user/logout", { method: "POST", credentials: "include" });
            const data = await res.json();
            if (res.ok) {
                navigate("/login")
            }
            else {
                alert(data.message || "Logout failed")
            }
        }
        catch (error) {
            alert("could not connect to the server")
        }
    }
    return (
        <>
            <SearchProducts />
            <button onClick={handleButtonClick} disabled={!jwtToken}>cart</button>
            {jwtToken ? (
                <button onClick={handleLogout}>Logout</button>
            ) : (
                <>
                    <button onClick={handlelogin}>Login</button>
                    <button onClick={handlesignup}>Signup</button>
                </>
            )}
        </>
    )
}

export default Navbar