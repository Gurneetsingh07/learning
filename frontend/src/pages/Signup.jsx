import { useState } from "react"
import { useNavigate } from "react-router-dom";


const Signup = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    async function handlesignup(event) {
        event.preventDefault();
        if (password !== confirmPassword) {
            console.log("password does not match")
            return;
        }

        const res = await fetch("http://localhost:5000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email, password: password, confirmPassword: confirmPassword })
        });
        const data = await res.json();
        if (res.ok) {
            alert("Signup successfull!");
            console.log("signup successfull")
            navigate("/login");
        }
        else {
            alert(data.message || "Signup failed");
        }
    }

    return (
        <div>
            <h2>signup</h2>
            <form onSubmit={handlesignup}>
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
                confirm Password:
                <input
                    type="password"
                    required
                    placeholder="enter your password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                /> <br />
                <button type="submit">submit</button>
            </form>
        </div>

    )
}

export default Signup