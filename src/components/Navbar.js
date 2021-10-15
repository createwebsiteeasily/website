import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { UserContext } from '../App'
import key from './Apikey';

const Navbar = () => {
    const { pathname } = useLocation();
    const { state, dispatch } = useContext(UserContext)
    const callContact = async () => {
        try {
            const res = await fetch(`${key}/aboutapi`, {
                method:"POST",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    user:localStorage.getItem("Logdata")
                })
            })

            const data = await res.json();
            dispatch({ type: "USER", payload: true })

            if (!res.status === 200 || !data) {
                dispatch({ type: "USER", payload: false })
            }
        }
        catch (err) {
            dispatch({ type: "USER", payload: false })
        }
    }
    useEffect(() => {
        callContact()
    }, [pathname])

    const Menu = () => {
        if (state) {
            return (
                <>
                    <li className="nav-item"><NavLink className="nav-link" exact to="/">Home </NavLink></li>
                    {/* <li className="nav-item"><NavLink className="nav-link" exact to="/about">AboutMe</NavLink></li> */}
                    <li className="nav-item"><NavLink className="nav-link" exact to="/contact" aria-current="page">Contact</NavLink></li>
                    {/* <li className="nav-item"><NavLink className="nav-link" exact to="/cart">Shop</NavLink></li> */}
                    <li className="nav-item"><NavLink className="nav-link" exact to="/cart/buiild-a-website">Build A Website</NavLink></li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {/* {userData.name} */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                            </svg>
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <NavLink className="dropdown-item" to="/about">Profile</NavLink>
                            <NavLink className="dropdown-item" to="/my-cart">My Cart</NavLink>
                            <NavLink className="dropdown-item" to="/chat">Chat</NavLink>
                            <div className="dropdown-divider"></div>
                            <NavLink className="dropdown-item" to="/logout">Logout</NavLink>
                        </div>
                    </li>
                </>
            )
        }
        else {
            return (
                <>
                    <li className="nav-item"><NavLink className="nav-link" exact to="/">Home </NavLink></li>
                    {/* <li className="nav-item"><NavLink className="nav-link" exact to="/about">AboutMe</NavLink></li> */}
                    <li className="nav-item"><NavLink className="nav-link" exact to="/contact" aria-current="page">Contact</NavLink></li>
                    {/* <li className="nav-item"><NavLink className="nav-link" exact to="/cart">Shop</NavLink></li> */}
                    <li className="nav-item"><NavLink className="nav-link" exact to="/cart/buiild-a-website">Build A Website</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" exact to="/login">Login</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" exact to="/register">Register</NavLink></li>
                    {/* <li className="nav-item"><NavLink className="nav-link" exact to="/logout">Logout</NavLink></li> */}
                </>
            )
        }
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light"><NavLink aria-current="page" className="navbar-brand active" to="/">
                {/* <img src={img} alt="logo" /> */}
                <b>Create Website Easily</b>
            </NavLink><button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <Menu />
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar
