import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import key from './Apikey'

function ChatwithMe() {
    const { token, email } = useParams()
    const [userData, setUserData] = useState({ message: "" })
    const [name, setName] = useState(<><h4 className="text-center">We are fetching data...<br /><p>if no messages are not showing in a minute, may be the email that you enter is not associated with this chat code try refreshing the page</p></h4></>)
    const [display, setDisplay] = useState('d-none')
    const handleInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUserData({ ...userData, [name]: value })
    }
    const ContactPost = async () => {
        try {
            function getdates() {
                var d = moment(new Date, "DD-MM-YYYY");
                var day = d.format('DD');
                var month = d.format('MMM');
                var year = d.format('YYYY');
                return (`${day} ${month} ${year}`)
            }
            function gettime() {
                var d = moment(new Date, "hh mm a");
                var day = d.format('hh');
                var month = d.format('mm');
                var year = d.format('a');
                let hello = new Date
                hello = hello.toLocaleTimeString()
                return (`${day}:${month} ${year.toUpperCase()}`)
            }
            if (userData.message !== "") {
                const res = await fetch(`${key}/addmessage`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id: token, message: userData.message, time: gettime(), Date: getdates(), chatter:"me"
                    })
                })
                userData.message = ""
            }
        }
        catch {

        }
    }
    const rest = async () => {
        try {
            const resss = await fetch(`${key}/aboutapi`, {
                method:"POST",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    user:localStorage.getItem("Logdata")
                })
            })
            const datasss = await resss.json()
            const gettoken = await fetch(`${key}/chatgetid`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: token, useremail: email
                })
            }
            )
            const datas = await gettoken.json()
            function ncard(val) {
                return (<><div className={`${val.Chatter}-text`}><div className={val.Chatter}><p className="message">{val.message}</p>
                    <p className="time">{val.Time} | {val.Date}</p></div>
                </div></>)
            }
            if (datas[0].useremail === datasss.email) {
                setDisplay("")
                setName(<><h6 className="text-center body-center text-light px-2 p-1" style={{background:"lightskyblue", width:'fit-content', borderRadius:'5px'}}>Start Messaging</h6>{datas[0].Chat.map(ncard)}</>)
            }
        }
        catch {

        }
    }
    useEffect(() => {
        rest()
    })
    return (
        <div className="chat"><div className="container mt-3 mb-3">
            <div className="contact_form_title text-center" style={{ marginBottom: '0', marginTop: '10px' }}>
                Chat
                {/* <p>If the message is not sending try refreshing the page</p> */}
            </div>
            <div className="chat-middle">
                {name}
            </div>
            <div className={display}>
                <input name="message" value={userData.message} onChange={handleInputs} type="text" placeholder="Type your message" />
                <button onClick={ContactPost} className="btn btn-primary body-center mt-3">Send</button>
            </div>
        </div>
        </div>
    )
}

export default ChatwithMe
