import React from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router-dom'

function Chat() {
    const [userData, setUserData] = useState({ code: "" })
    const handleInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUserData({ ...userData, [name]: value })
    }
    var History = useHistory()
    function Chat(e){
        e.preventDefault()
        History.push(`/chat/${userData.code}/${userData.email}`)
    }
    return (<>
        <div className="container mt-3 mb-3">
            <div className="row">
                <div className="col-lg-10 offset-lg-1">
                    <div className="contact_form_container py-5">
                        <div className="contact_form_title">Chat</div>
                        <form id="contact_form" onSubmit={Chat}>
                            <div className="contact_form_inputs d-flex flex-md-row flex-column justify-content-between align-items-between">
                                <input type="text" id="contact_form_name" style={{width:'100%'}} className="contact_form_name input_field" name="email" placeholder="Email that is associated with the chat" required="required" value={userData.email} onChange={handleInputs} />
                            </div>
                            <div className="contact_form_inputs d-flex flex-md-row flex-column justify-content-between align-items-between">
                                <input type="text" id="contact_form_name" style={{width:'100%'}} className="contact_form_name input_field" name="code" placeholder="Chat Code" required="required" value={userData.code} onChange={handleInputs} />
                            </div>
                            <div className="contact_form_button">
                                <button type="submit" style={{marginTop:'0'}} className="body-center button contact_submit_button">Start Chat</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default Chat
