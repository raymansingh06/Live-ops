import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
import "./login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8000/api/v4/login", {
                email,
                password,
            });
            localStorage.setItem("authToken", res.data.Token)
            // console.log(res.data);
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h2>Login</h2>
            {error && <div className="error">{error}</div>}
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    className="email"
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    className="password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button id='btn' type="submit">Login</button>
            <span>Don't have account <Link to="/signup">Signup</Link> </span>
        </form>
    );
};

export default Login;