import React, { useEffect, useState } from 'react';
import img from '../signup.49e79a86.svg'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom';
import key from './Apikey';

const Updatepass = () => {
    const History = useHistory()
    const [userData, setUserData] = useState({
        name: "John",
        work: "Web Developer",
        _id: "xxxxxxxxxxxxxxxx"
    })
    const callAbout = async () => {
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
            setUserData(data)

            if (!res.status === 200 || !data) {
                const error = new Error(res.error)
                throw error
            }
        }
        catch (err) {
            History.push("/updatepass")
            console.log(err);
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
    const UpdateData = async () => {
        try {
            const res = await fetch(`${key}/updatepatch`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: userData._id, name: userData.name, user:localStorage.getItem("Logdata")
                })
            })
            // window.alert("Your Data is updated")
            const data = await res.json()

            if (res.status === 400 || !data) {
                window.alert("Error")
            }
            else {
                History.push("/")
                window.alert("Successful Update")
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
                            <h2 className="form-title">Update Your Profile</h2>
                            <form onSubmit={UpdateData} method="dialog" className="register-form" id="register-form">
                                <span>Your Name</span>
                                <div className="form-group">
                                    <label className="label" htmlFor="name">
                                        <i className="zmdi zmdi-account material-icons-name"></i>
                                    </label>
                                    <input type="text" name="name" id="name" autoComplete="off" placeholder="Your Name" value={userData.name} onChange={handleInputs} />
                                </div>
                                {/* <span>Your Email</span>
                                <div className="form-group">
                                    <label className="label" htmlFor="email"><i className="zmdi zmdi-email material-icons-name"></i></label>
                                    <input type="email" name="email" id="email" autoComplete="off" placeholder="Your Email" value={userData.email} onChange={handleInputs} />
                                </div>
                                <span>Your Phone</span>
                                <div className="form-group">
                                    <label className="label" htmlFor="phone"><i className="zmdi zmdi-phone-in-talk material-icons-name"></i></label>
                                    <input type="number" name="phone" id="phone" autoComplete="off" placeholder="Your Phone" value={userData.phone} onChange={handleInputs} />
                                </div> */}
                                {/* <span>Your Profession</span>
                                <div className="form-group">
                                    <label className="label" htmlFor="work"><i className="zmdi zmdi-slideshow material-icons-name"></i></label>
                                    <input type="text" name="work" id="work" autoComplete="off" placeholder="Your Profession" value={userData.work} onChange={handleInputs} />
                                </div> */}
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
                                <div className="text-right">
                                    <Link className="signup-image-link text-right" style={{ display: "inline", textAlign: 'right' }} to="/updatepass">Update Password</Link>
                                </div>
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

export default Updatepass