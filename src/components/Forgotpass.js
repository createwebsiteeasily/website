import React, { useEffect, useState } from 'react';
import img from '../signup.49e79a86.svg'
import { useHistory } from 'react-router-dom'
import key from './Apikey'

const Forgotpasses = () => {
    const History = useHistory()
    // const [userId, setUserId] = useState()
    const [otpget, setOtpget] = useState()
    const [displayName, setDisplayName] = useState("block")
    const [email, setEmail] = useState("none")
    const [pass, setPass] = useState("none")
    const [warndisplay, setWarndisplay] = useState("none")
    const [otpWarn, setOtpWarn] = useState("none")
    const [loadspinner, setLoadspinner] = useState("none")
    const [userData, setUserData] = useState({
        name: "",
        work: "",
        phone: "",
        id: "", curr: "", pass: "", cpass: ""
    })
    function displaynames() {
        if (userData.email !== "") {
            setDisplayName("none")
            setEmail("inline")
            setPass("none")
            setWarndisplay("none")
            setOtpWarn("none")
        }

    }
    const getOtp = async (e) => {
        try {
            if (userData.email !== "") {
                setLoadspinner("block")
                const hello = await fetch(`${key}/getemailforforgot`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: userData.email
                    })
                })
                const data = await hello.json()
                setOtpget(data.otp)
                setLoadspinner("none")
                displaynames()
            }
            else {
                setWarndisplay("block")
                setOtpWarn("none")
            }
        }
        catch {

        }
    }
    let name, value
    const handleInputs = (e) => {
        name = e.target.name
        value = e.target.value
        setUserData({ ...userData, [name]: value })
    }
    const ForgotPass = async () => {
        try {
            if (otpget === null || otpget === undefined || otpget === "") {
                alert("Please Fill all the fields")
            }
            else {
                if (otpget == userData.otp) {
                    if (!userData.email, !userData.otp, !userData.pass, !userData.cpass) {
                        window.alert("Please fill all the forms")
                    }
                    else if (userData.pass !== userData.cpass) {
                        window.alert("Confirm Password doesn't match")
                    }
                    else {
                        const hello = await fetch(`${key}/forgotpasspatch`, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                email: userData.email, otp: userData.otp, pass: userData.pass, cpass: userData.cpass, user: localStorage.getItem("Logdata")
                            })
                        })
                        window.alert("Your password is now updated")
                        History.push("/login")
                    }
                }
                else {
                    window.alert("OTP doesn't Match")
                }
            }
        }
        catch {

        }
    }
    function noneotp() {
        setDisplayName("block")
        setEmail("none")
    }
    function verifyotp() {
        if (userData.otp == "") {
            setWarndisplay("block")
        }
        else {
            if (userData.otp == otpget) {
                setDisplayName("none")
                setEmail("none")
                setPass("block")
                setWarndisplay("none")
                setOtpWarn("none")
            }
            else {
                setOtpWarn("block")
            }
        }
    }
    function nonepass() {
        setDisplayName("none")
        setEmail("block")
        setPass("none")
        setWarndisplay("none")
        setOtpWarn("none")
    }
    return (
        <>
            <section className="sinup mb-3">
                <div className="container mt-5">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 className="form-title">Forgot Password</h2>
                            <p className="text-danger mb-2" style={{ fontWeight: '600', textAlign: 'center', display: warndisplay }}><i className="mr-2 fa fa-exclamation-triangle"></i>Please fill all the fields</p>
                            <p className="text-danger mb-2" style={{ fontWeight: '600', textAlign: 'center', display: otpWarn }}><i className="mr-2 fa fa-exclamation-triangle"></i>OTP not matched Please Try again</p>
                            <div style={{ display: displayName }}>
                                <span>Your Email</span>
                                <div className="form-group">
                                    <label className="label" htmlFor="phone"><i className="zmdi zmdi-email material-icons-name"></i></label>
                                    <input type="text" name="email" autoComplete="off" placeholder="Your Email" value={userData.email} onChange={handleInputs} />
                                </div>
                                <div className="container-fluid mb">
                                    <div className="row">
                                        <div>
                                        </div>
                                        <div className="col-md-0 ml-auto mr-4">
                                            <button onClick={() => { getOtp() }} className="btn btn-primary">Get OTP</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: email }}>
                                <span>Your OTP</span>
                                <div className="form-group">
                                    <label className="label" htmlFor="work"><i className="zmdi zmdi-lock material-icons-name"></i></label>
                                    <input type="text" name="otp" autoComplete="off" placeholder="Your OTP" value={userData.otp} onChange={handleInputs} />
                                </div>
                                <div className="container-fluid">
                                    <div className="row">
                                        <div>
                                            <button className="btn btn-secondary" onClick={noneotp}>Go Back</button>
                                        </div>
                                        <div className="col-md-0 ml-auto mr-4">
                                            <button className="btn btn-primary" onClick={verifyotp}>Verify</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: pass }}>
                                <span>New Password</span>
                                <div className="form-group">
                                    <label className="label" htmlFor="work"><i className="zmdi zmdi-lock material-icons-name"></i></label>
                                    <input type="password" name="pass" autoComplete="off" placeholder="New Password" value={userData.pass} onChange={handleInputs} />
                                </div>
                                <span>Confirm Password</span>
                                <div className="form-group">
                                    <label className="label" htmlFor="work"><i className="zmdi zmdi-lock material-icons-name"></i></label>
                                    <input type="password" name="cpass" autoComplete="off" placeholder="Confirm Password" value={userData.cpass} onChange={handleInputs} />
                                </div>
                                <div className="container-fluid">
                                    <div className="row">
                                        <div>
                                            <button className="btn btn-secondary" onClick={nonepass} >Go Back</button>
                                        </div>
                                        <div className="col-md-0 ml-auto mr-4">
                                            <button className="btn btn-primary" onClick={ForgotPass}>Update</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-secondary text-center" style={{ display: loadspinner }}><i className="fa fa-spinner mr-2" aria-hidden="true"></i>Sending OTP</p>
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