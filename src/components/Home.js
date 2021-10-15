import React, {useEffect, useState} from 'react'
import key from './Apikey'

const Home = () => {
    const [name, setName] = useState('')
    const [show, setShow] = useState(false)
    // var show =true;
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
            setName(data.name)
            setShow(true)

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
    })
    return (
        <>
            <div className="home-page" style={{minHeight:'400px'}}>
                <div className="home-div">
                    <p className="pt-5">WELCOME</p>
                    <h1>{name}</h1>
                    <h2>{show ? 'Happy To See You back' : 'Make Websites from me'}</h2>
                </div>
            </div>
        </>
    )
}

export default Home