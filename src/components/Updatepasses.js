import React, { useEffect, useState } from 'react';
import img from '../signup.49e79a86.svg'
import { useHistory } from 'react-router-dom'
import key from './Apikey';

const Forgotpasses = () => {
    const History = useHistory()
    const [userId, setUserId] = useState()
    const [userData, setUserData] = useState({
        name: "John",
        work: "Web Developer",
        phone: "xxxxxxxxxx",
        email: "xxxxx@xxx.com",
        id: "", curr: "", pass: "", cpass: ""
    })
    const callAbout = async () => {
        //  )
        try {
            const res = await fetch(`${key}/aboutapi`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user: localStorage.getItem("Logdata")
                })
            })

            const data = await res.json();
            setUserData(data)
            setUserId(data._id)
            if (!res.status === 200 || !data) {
                const error = new Error(res.error)
                throw error
            }
            // else{
            //     History.push("/updatepass")
            // }
        }
        catch (err) {
            History.push("/login")
            console.log(err);
            //  )
        }
    }
    useEffect(() => {
        callAbout()
    }, [])

    let name, value
    const handleInputs = (e) => {
        name = e.target.name
        value = e.target.value
        setUserData({ ...userData, [name]: value })
    }
    const { email, curr, pass, cpass } = userData
    const UpdateData = async () => {
        try {
            const res = await fetch(`${key}/updatepasspatch`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: userId, current: userData.curr, pass: userData.pass, cpass: userData.cpass, user: localStorage.getItem("Logdata")
                })
            })
            const data = await res.json()
            if (!email || !curr || !pass || !cpass || pass !== cpass) {
                window.alert("Invalid Credintials")
            }
            else {
                if (res.status === 404) {
                    window.alert("Password is incorrect")
                }
                else if (res.status === 202) {
                    History.push("/")
                    window.alert("Password is now update")
                }
            }
        }
        catch (err) {
            window.alert(`Error ${err}`)
        }
    }
    return (
        <>
            <section className="sinup mb-3">
                <div className="container mt-5">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 className="form-title">Update Your Password</h2>
                            <form onSubmit={UpdateData} method="dialog" className="register-form" id="register-form">
                                <span>Your Current Password</span>
                                <div className="form-group">
                                    <label className="label" htmlFor="phone"><i className="zmdi zmdi-lock material-icons-name"></i></label>
                                    <input type="password" name="curr" id="phone" autoComplete="off" placeholder="Your Current Password" value={userData.curr} onChange={handleInputs} />
                                </div>
                                <span>New Password</span>
                                <div className="form-group">
                                    <label className="label" htmlFor="work"><i className="zmdi zmdi-lock material-icons-name"></i></label>
                                    <input type="password" name="pass" id="work" autoComplete="off" placeholder="New Password" value={userData.pass} onChange={handleInputs} />
                                </div>
                                <span>Confirm Password</span>
                                <div className="form-group">
                                    <label className="label" htmlFor="work"><i className="zmdi zmdi-lock material-icons-name"></i></label>
                                    <input type="password" name="cpass" id="work" autoComplete="off" placeholder="Confirm Password" value={userData.cpass} onChange={handleInputs} />
                                </div>
                                {/* <div className="form-group">
                                    <label className="label" htmlFor="work"><i className="zmdi zmdi-slideshow material-icons-name"></i></label>
                                    <input type="file" name="work" id="work" autoComplete="off" placeholder="Your Profession" />
                                </div> */}
                                {/* <div className="form-group">
                                    <label className="label" htmlFor="password"><i className="zmdi zmdi-lock material-icons-name"></i></label>
                                    <input type="password" name="password" id="password" autoComplete="off" placeholder="Your Password" value={userData.name} onChange={handleInputs} />
                                </div>
                                <div className="form-group">
                                    <label className="label" htmlFor="cpassword"><i className="zmdi zmdi-lock material-icons-name"></i></label>
                                    <input type="password" name="cpassword" id="cpassword" autoComplete="off" placeholder="Confirm Your Password" value={userData.name} onChange={handleInputs} />
                                </div> */}
                                {/* <div className="text-right">
                                    <Link className="signup-image-link text-right" style={{ display: "inline", textAlign: 'right' }} to="/updatepass">Update Password</Link>
                                </div> */}
                                <div className="form-group form-button">
                                    <input type="submit" name="signup" id="signup" className="form-submit" value="Update" />
                                </div>
                            </form>
                        </div>
                        <div className="signup-image">
                            <figure>
                                <img src={img} className="mt-1" alt="registration pic" />
                            </figure>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Forgotpasses