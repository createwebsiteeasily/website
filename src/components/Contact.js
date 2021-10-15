import React, {useState, useEffect} from 'react'
import key from './Apikey'

const Contact = () => {
    const [userData, setUserData] = useState({
        name: "",
        phone: "",
        email: "",
        message:""
    })
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
            setUserData(data)

            if (!res.status === 200 || !data) {
                const error = new Error(res.error)
                throw error
            }
        }
        catch (err) {
            // History.push("/login")
            // console.log(err);
        }
    }
    useEffect(() => {
        callContact()
    }, [])
    const handleInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUserData({...userData, [name]:value})
    }
    const ContactPost = async (e) => {
        e.preventDefault()
        const res = await fetch(`${key}/contactpost`, {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: userData.name, email: userData.email, phone: userData.phone, message: userData.message
            })
        })
        
        const data = await res.json()

        if (res.status === 200 || data) {
            // console.log("Invalid Crenditials")
            setUserData({...userData, message:""})
            window.alert("Thankyou");
        }
        else {
            window.alert("Invalid Crenditials")
        }
    }
    return (
        <>
            <div className="mt-3 mb-3">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                            <div className="contact_form_container py-5">
                                <div className="contact_form_title">Get in Touch </div>
                                <form method="post" onSubmit={ContactPost} id="contact_form">
                                    <div className="">
                                        <input type="text" id="contact_form_name" className="mt-3 contact_form_name " name="name" placeholder="Your name" required="required" value={userData.name} onChange={handleInputs} />
                                        <input type="email" id="contact_form_email" className="mt-3 contact_form_email " name="email" placeholder="Your Email" required="required" value={userData.email} onChange={handleInputs} />
                                    </div>
                                    <div className="contact_form_text mt-5">
                                        <textarea required style={{minHeight : '170px'}} value={userData.message} onChange={handleInputs} className="text_field contact_form_message" name="message" placeholder="Message" cols="30" rows="10"></textarea>
                                    </div>
                                    <div className="contact_form_button">
                                        <button type="submit" className="button contact_submit_button">Send Message</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact
