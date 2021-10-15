import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import img from '../signin.svg';
import { UserContext } from '../App';
import key from './Apikey';

const Login = () => {
    const { state, dispatch } = useContext(UserContext)
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const loginUser = async (e) => {
        try {
            e.preventDefault();

            const res = await fetch(`${key}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password
                })
            })
            
            const data = await res.json()
            localStorage.setItem("Logdata", data.yourtoken)
            if (res.status === 400 || !data) {
                window.alert("Invalid Crenditials")
                // console.log("Invalid Crenditials")
            }
            else {
                dispatch({ type: "USER", payload: true })
                window.alert("Successful Login")
                history.push("/")
            }
        }
        catch {
            
        }
    }
    return (
        <>
            <section className="signin mb-3">
                <div className="container mt-5">
                    <div className="signin-content">
                        <div className="signin-image">
                            <figure>
                                <img src={img} className="mt-1" alt="Login pic" />
                            </figure>
                            <Link className="signup-image-link" to="/register">Create an Account</Link>
                        </div>
                        <div className="signin-form">
                            <h2 className="form-title">Sign In</h2>
                            <form method="post" onSubmit={loginUser} className="register-form" id="register-form">
                                <div className="form-group">
                                    <label className="label" htmlFor="email"><i className="zmdi zmdi-email material-icons-name"></i></label>
                                    <input type="email" name="email" id="email" autoComplete="off" placeholder="Your Email" value={email} onChange={(e) => {
                                        setEmail(e.target.value)
                                    }} />
                                </div>
                                <div className="form-group">
                                    <label className="label" htmlFor="password"><i className="zmdi zmdi-lock material-icons-name"></i></label>
                                    <input type="password" name="password" id="password" autoComplete="off" placeholder="Your Password" value={password} onChange={(e) => {
                                        setPassword(e.target.value)
                                    }} />
                                </div>
                                <div className="text-right">
                                    <Link className="signup-image-link text-right" style={{ display: "inline", textAlign: 'right' }} to="/forgotpass">Forgot Password</Link>
                                </div>
                                <div className="form-group form-button">
                                    <input type="submit" name="signin" id="signin" className="form-submit" value="Log In" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login
