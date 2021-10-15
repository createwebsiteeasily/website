import React, {useEffect, useState} from 'react';
// import img from '../aboutpic.15bb0c8a.png'
import {useHistory} from 'react-router-dom'
import { Link } from 'react-router-dom';
import key from './Apikey';

const About = () => {
    const History = useHistory()
    const [userData, setUserData] = useState({
        name:"John",
        work:"Web Developer",
        phone:"xxxxxxxxxx",
        email:"xxxxx@xxx.com",
        _id:"xxxxxxxxxxxxxxxx"
    })
    const callAbout = async () => {
        try{
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
            
            if(!res.status === 200 || !data){
                const error = new Error(res.error)
                throw error
            }
        }
        catch (err){
            // History.push("/login")
            console.log(err);
        }
    }
    useEffect(() => { callAbout() })
    return (
        <>
            <div className="container emp-profile">
                <form method="GET">
                    <div className="row">
                    </div>
                    <div className="row">
                        <div className="col-md-8 pl-5 about-info">
                            <div className="tab-content profile-tab" id="myTabContent">
                                <div className="col-md-8 pl-5 about-info">
                                    <div className="tab-content profile-tab" id="myTabContent">
                                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                            <div className="row">
                                                <div className="col-md-6"><label>User Id</label></div>
                                                <div className="col-md-6">
                                                    <p style={{maxWidth: '100%', wordBreak: "break-word"}}>{userData._id}</p>
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-md-6"><label>Name</label></div>
                                                <div className="col-md-6 ">
                                                    <p style={{maxWidth: '100%', wordBreak: "break-word"}}>{userData.name}</p>
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-md-6"><label>Email</label></div>
                                                <div className="col-md-6">
                                                    <p style={{maxWidth: '100%', wordBreak: "break-word"}}>{userData.email}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3"><Link to="/update" className="btn btn-secondary">Edit Profile</Link>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default About
