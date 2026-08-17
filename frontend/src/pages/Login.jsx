import { useState } from "react"
import { useNavigate } from "react-router-dom";
const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    async function handlelogin(event) {
        event.preventDefault();
        const res = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ email: email, password: password })
        });

        const data = await res.json();

        if (res.ok) {
            alert("Login successfull!");
            console.log("login successfull")
            navigate("/");
        }
        else {
            alert(data.message || "Login failed");
        }
    }
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handlelogin}>
                Email:
                <input
                    type="email"
                    required
                    placeholder="enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                /> <br />
                Password:
                <input
                    type="password"
                    required
                    placeholder="enter your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                /> <br />
                <button type="submit">submit</button>
            </form>
        </div>

    )
}

export default Login