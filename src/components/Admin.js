import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import moment from "moment"
import key from './Apikey'

export function Admin() {
  const [userData, setUserData] = useState({ pass: "" })
  const [gettinlinks, setGettinlinks] = useState()
  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value })
  }
  const [name, setName] = useState("d-block")
  const MoreOption = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`${key}/gettingoptioninadmin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          pass: userData.pass
        })
      })
      if (res.status === 202) {
        setName("d-none")
        setGettinlinks(<><div style={{ boxShadow: 'none', borderRadius: '0px' }} className="container pt-3 pb-3 mt-5 mb-5"><div className="body-center"><Link to="/orders" className="mr-3 ml-3"><button className="btn btn-primary">Orders</button></Link><Link to="/chatadmin" className="mr-3 ml-3"><button className="btn btn-primary">Chats</button></Link><Link to="/addproducts" className="mr-3 ml-3"><button className="btn btn-primary">Add Products</button></Link><Link to="/messages" className="mr-3 ml-3"><button className="btn btn-primary">See Messages</button></Link><Link to="/addrevision" className="mr-3 ml-3"><button className="btn btn-primary">Add Revision</button></Link><Link to="/adddownload" className="mr-3 ml-3"><button className="btn btn-primary">Add Download</button></Link></div></div></>)
      }
      else {
        window.alert("Wrong Password")
      }
    }
    catch {

    }
  }
  return (
    <>
      <div className={`${name} mt-5 mb-5`}>
        <form className="container mt-3 mb-3" onSubmit={MoreOption}><input name="pass" value={userData.pass} onChange={handleInputs} type="text" placeholder="Your Password" /><button className="btn btn-success body-center mt-3 mb-3" type="submit">Submit</button></form>
      </div>
      {gettinlinks}
    </>
  )
}

export function Messages() {
  const [userData, setUserData] = useState({ pass: "" })
  const [gettinlinks, setGettinlinks] = useState()
  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value })
  }
  const [name, setName] = useState("d-block")
  const MoreOption = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`${key}/getthemessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          pass: userData.pass
        })
      })
      if (res.status === 202) {
        const data = await res.json()
        console.log(data)
        function ncard(val) {
          return (<>
            <div className="card mt-3 container" style={{ boxShadow: 'none', borderRadius: '0px' }}>
              <div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-3 mt-3">
                      <h5><b>Name</b></h5>
                      {val.name}
                      <h5 className="mt-4"><b>Email</b></h5>
                      {val.email}
                    </div>
                    <div className="col-md-9 mt-3">
                      <h5><b>Date</b></h5>
                      {val.date}
                      <h5><b>_id</b></h5>
                      <pre><h6>{val._id}</h6></pre>
                      <h5><b>Message</b></h5>
                      <pre style={{ maxHeight: '200px', overflowY: 'auto' }}><h6>{val.message}</h6></pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>)
        }
        setName("d-none")
        setGettinlinks(<>{data.map(ncard)}</>)
      }
      else {
        window.alert("Wrong Password")
      }
    }
    catch {

    }
  }
  return (
    <>
      <div className={`${name} mt-5 mb-5`}>
        <form className="container mt-3 mb-3" onSubmit={MoreOption}><input name="pass" value={userData.pass} onChange={handleInputs} type="text" placeholder="Your Password" /><button className="btn btn-success body-center mt-3 mb-3" type="submit">Submit</button></form>
      </div>
      <div className="mb-3">
        {gettinlinks}
      </div>
    </>
  )
}

export function Orders() {
  const [userData, setUserData] = useState({ download: "", href: "", name: "" })
  const [gettinlinks, setGettinlinks] = useState()
  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value })
  }
  const [name, setName] = useState("d-block")
  const MoreOption = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`${key}/gettheordersbyadmin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          pass: userData.pass
        })
      })
      if (res.status === 202) {
        const data = await res.json()
        // console.log(data)
        function getname(val) {
          return <><a href={val.href} target="_blank" rel="noopener noreferrer">{val.name}</a><br /></>
        }
        function ncard(val) {
          function Downloads() {
            if (val.complete !== true) {
              return <><span className="badge badge-primary">Active</span></>
            }
            else {
              return <><span className="badge badge-success">Completed</span></>
            }
          }
          function Revision() {
            for (let index = 0; index < data.length; index++) {
              const element = data[index];
              return element.Revisions.map(getname)
            }
          }
          function LastMessage() {
            for (let index = 0; index < data.length; index++) {
              const element = data[index];
              let last = data[0].Chat.slice(-1)[0].message
              return last
            }
          }
          return (<>
            <div className="mr-3 ml-3 card mt-3">
              <div className="row g-0" style={{ margin: '5px' }}>
                <div className="col-md-4">
                  <img src={val.img} width="660px" height="440px" className="img-fluid rounded-start" alt="..." />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{val.Name}</h5>
                    <p className="text-success" style={{ fontSize: "18px" }}>Price - {val.price}₹</p>
                    <p className="card-text">{val.desc}</p>
                    <p className="card-text"><small className="text-muted">Delever will be on {val.dele}<br />Ordered at {val.orderedon}</small></p>
                    <p className="card-text text-right">
                      <ul style={{ display: 'inline' }} className="social-icons inline-center"><li className="text-right"><a href="#" data-toggle="collapse" href={`#${val._id}`} role="button" aria-expanded="false" aria-controls="multiCollapseExample1"><i className="fa fa-angle-down"></i></a></li></ul></p>
                  </div>
                </div>
              </div>
              <div id={`${val._id}`} className="collapse" style={{ boxShadow: 'none', margin: '0', padding: '10px' }} aria-labelledby="headingOne" data-parent="#accordion">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-3 mt-3">
                      <h5><b>Name</b></h5>
                      {val.username}
                      <h5 className="mt-4"><b>Email</b></h5>
                      {val.useremail}
                      <h5 className="mt-4"><b>Id</b></h5>
                      <kbd>{val._id}</kbd><br />chat at <a href="/chatadmin">/chatadmin</a>
                    </div>
                    <div className="col-md-6 mt-3">
                      <h5><b>Revisions</b></h5>
                      {Revision()}
                      <Link to="/addrevision"><button className="btn btn-success">Add Revision</button></Link>
                    </div>
                    <div className="col-md-3 mt-3">
                      <h5><b>Download</b></h5>
                      <Link to="/adddownload"><button className="btn btn-success">Add Download</button></Link>
                      {/* <form action="">
                        <input type="text" name="download" placeholder="Type a Download link" />
                        <button className="btn btn-success mt-2">Submit</button>
                      </form> */}
                      <h5 className="mt-4"><b>Complete</b></h5>
                      {Downloads()}
                      <h5 className="mt-4"><b>Last Message</b></h5>
                      {LastMessage()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>)
        }
        setName("d-none")
        setGettinlinks(<>{data.map(ncard)}</>)
      }
      else {
        window.alert("Wrong Password")
      }
    }
    catch {

    }
  }
  return (
    <>
      <div className={`${name} mt-5 mb-5`}>
        <form className="container mt-3 mb-3" onSubmit={MoreOption}><input name="pass" value={userData.pass} onChange={handleInputs} type="text" placeholder="Your Password" /><button className="btn btn-success body-center mt-3 mb-3" type="submit">Submit</button></form>
      </div>
      <div className="mb-3">
        {gettinlinks}
      </div>
    </>
  )
}

export function AddRevision() {
  const [userData, setUserData] = useState({ pass: "" })
  const [gettinlinks, setGettinlinks] = useState()
  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value })
  }
  const [name, setName] = useState("d-block")
  const [formnone, setFormnone] = useState("d-none")
  const SubmitRevision = async () => {
    try {
      await fetch(`${key}/addrevision`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: userData.id, password: userData.password, name: userData.name, href: userData.href
        })
      })
    }
    catch {

    }
  }
  const MoreOption = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`${key}/gettingoptioninadmin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          pass: userData.pass
        })
      })
      if (res.status === 202) {
        setName("d-none")
        setFormnone("d-block")
      }
      else {
        window.alert("Wrong Password")
      }
    }
    catch {

    }
  }
  return (
    <>
      <div className={`${name} mt-5 mb-5`}>
        <form className="container mt-3 mb-3" onSubmit={MoreOption}><input name="pass" value={userData.pass} onChange={handleInputs} type="text" placeholder="Your Password" /><button className="btn btn-success body-center mt-3 mb-3" type="submit">Submit</button></form>
      </div>
      <form onSubmit={SubmitRevision} className={`${formnone} container mb-3`}>
        <input name="password" value={userData.password} onChange={handleInputs} type="text" placeholder="Your Password" />
        <input className="mt-2" type="text" value={userData.id} onChange={handleInputs} name="id" placeholder="Type _id" />
        <input className="mt-2" value={userData.href} onChange={handleInputs} type="text" name="href" placeholder="Type link" />
        <input className="mt-2" type="text" value={userData.name} onChange={handleInputs} name="name" placeholder="Type name" />
        <button type="submit" className="btn btn-success mt-2 body-center">Submit</button>
      </form>
    </>
  )

}

export function Adddownload() {
  const [userData, setUserData] = useState({ pass: "" })
  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value })
  }
  const SubmitDownload = async () => {
    try {
      const hello = await fetch(`${key}/submitdownload`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: userData.id, password: userData.password, link: userData.link
        })
      })
      if (hello.status === 202) {
        window.alert("Added")
      }
    }
    catch {

    }
  }
  return (
    <form onSubmit={SubmitDownload} className={`container mb-3`}>
      <input name="password" value={userData.password} onChange={handleInputs} type="text" placeholder="Your Password" />
      <input className="mt-2" type="text" value={userData.id} onChange={handleInputs} name="id" placeholder="Type _id" />
      <input className="mt-2" type="text" value={userData.link} onChange={handleInputs} name="link" placeholder="Type Download Link" />
      <button type="submit" className="btn btn-success mt-2 body-center">Submit</button>
    </form>
  )
}

export function Addproducts() {
  const [userData, setUserData] = useState({ pass: "" })
  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value })
  }
  const SubmitProduct = async () => {
    try {
      const hello = await fetch(`${key}/submitproducts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          pass: userData.password, name: userData.name, desc: userData.desc, price: userData.price, src: userData.src, to: userData.to, dele: userData.dele, about: userData.about
        })
      })
      if (hello.status === 202) {
        window.alert("Added")
      }
    }
    catch {

    }
  }
  return (
    <form onSubmit={SubmitProduct} className={`container mb-3`}>
      <input required name="password" value={userData.password} onChange={handleInputs} type="text" placeholder="Your Password" />
      <input required className="mt-2" type="text" value={userData.name} onChange={handleInputs} name="name" placeholder="Type Name" />
      <input required className="mt-2" type="text" value={userData.desc} onChange={handleInputs} name="desc" placeholder="Type Desc" />
      <input required className="mt-2" type="number" value={userData.price} onChange={handleInputs} name="price" placeholder="Type Price" />
      <input required className="mt-2" type="text" value={userData.src} onChange={handleInputs} name="src" placeholder="Type img src" />
      <input required className="mt-2" type="text" value={userData.to} onChange={handleInputs} name="to" placeholder="Type to" />
      <input required className="mt-2" type="number" value={userData.dele} onChange={handleInputs} name="dele" placeholder="Type Delevery Time" />
      <textarea required cols="30" rows="10" className="text_field contact_form_message mt-2" type="text" value={userData.about} onChange={handleInputs} name="about" placeholder="Type About" ></textarea>
      <button type="submit" className="btn btn-success mt-2 body-center">Submit</button>
    </form>
  )
}

export function ChatAdmin() {
  // const { token, email } = useParams()
  const [userData, setUserData] = useState({ message: "" })
  const [name, setName] = useState(<><h4 className="text-center">You are not allowed to chat with others users<br /></h4></>)
  // const [hellllo, setHellllo] = useState()
  const [display, setDisplay] = useState('d-none')
  const [displayform, setDisplayform] = useState('d-block')
  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({ ...userData, [name]: value })
  }
  const [passbyadmin, setPassbyadmin] = useState("")
  const [idbyadmin, setIdbyadmin] = useState("")
  const gettheidpass = (e) => {
    e.preventDefault()
    setIdbyadmin(userData.id)
    setPassbyadmin(userData.pass)
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
            id: userData.id, message: userData.message, time: gettime(), Date: getdates(), chatter: "other"
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
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user: localStorage.getItem("Logdata")
        })
      })
      const datasss = await resss.json()
      const gettoken = await fetch(`${key}/chatgetidadmin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: idbyadmin, pass: passbyadmin
        })
      }
      )
      const datas = await gettoken.json()
      function ncard(val) {
        return (<><div className={`${val.Chatter}-admin-text`}><div className={`${val.Chatter}-admin`}><p className="message">{val.message}</p>
          <p className="time">{val.Time} | {val.Date}</p></div>
        </div></>)
      }
      if (datas[0].useremail === datasss.email) {
        setDisplay("")
        setDisplayform("d-none")
        setName(<><h6 className="text-center body-center text-light px-2 p-1" style={{ background: "lightskyblue", width: 'fit-content', borderRadius: '5px' }}>Start Messaging</h6>{datas[0].Chat.map(ncard)}</>)
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
        <form className={displayform} onSubmit={gettheidpass}>
          <input name="pass" value={userData.pass} onChange={handleInputs} type="text" placeholder="Type your Password" />
          <input name="id" value={userData.id} onChange={handleInputs} type="text" placeholder="Type _id" />
          <button onClick={ContactPost} className="btn btn-primary body-center mt-3">Send</button>
        </form>
      </div>
      <div className={display}>
        <input name="message" value={userData.message} onChange={handleInputs} type="text" placeholder="Type your message" />
        <button onClick={ContactPost} className="btn btn-primary body-center mt-3">Send</button>
      </div>
    </div>
    </div>
  )
}

export function ChatAdmins() {
  // const { token, email } = useParams()
  const [userData, setUserData] = useState({ message: "" })
  const [name, setName] = useState(<><h4 className="text-center d-none">You are not allowed to chat with others users<br /></h4></>)
  // const [hellllo, setHellllo] = useState()
  const [display, setDisplay] = useState('d-none')
  const [displayform, setDisplayform] = useState('d-block')
  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({ ...userData, [name]: value })
  }
  const [passbyadmin, setPassbyadmin] = useState("")
  const [idbyadmin, setIdbyadmin] = useState("")
  const [displayloader, setDisplayloader] = useState("none")
  const gettheidpass = (e) => {
    setDisplayloader("inline")
    setIdbyadmin(userData.id)
    setPassbyadmin(userData.pass)
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
            id: userData.id, message: userData.message, time: gettime(), Date: getdates(), chatter: "me"
          })
        })
        userData.message = ""
      }
    }
    catch {

    }
  }
  const [chatsbycarts, setChatsbycarts] = useState(<><h4 className="text-center">No chats are associated with this account</h4><p className="text-center">It also can be happen if all of your orders are completed. Or it can be an server error try reloading the site</p></>)
  const rest = async () => {
    try {
      const res = await fetch(`${key}/gettinguserorder`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user:localStorage.getItem("Logdata")
        })
      })
      const datasofchat = await res.json()
      function getchats(val) {
          if (val.complete === false) {
          return (<>
            <div className="body-center card mt-3" style={{ cursor: 'pointer' }} onClick={() => { userData.id = val._id; gettheidpass() }}>
              <div className="row g-0" style={{ margin: '5px' }}>
                <div className="col-md-4">
                  <img src={val.img} width="660px" height="440px" className="img-fluid rounded-start" alt="..." />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{val.Name}</h5>
                    <p className="text-success" style={{ fontSize: "18px" }}>Chat Code - {val._id}</p>
                    <p style={{ fontSize: "10px" }}>Ordered on - {val.orderedon}</p>
                    <p className="card-text">{val.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          </>)
        }
      }
      setChatsbycarts(<><div><div><div><div>{datasofchat.map(getchats)}</div></div></div></div></>)
      const gettoken = await fetch(`${key}/chatgetidadmins`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: idbyadmin, pass: passbyadmin
        })
      })
      const datas = await gettoken.json()
      function ncard(val) {
        return (<><div className={`${val.Chatter}-text`}><div className={`${val.Chatter}`}><p className="message">{val.message}</p>
          <p className="time">{val.Time} | {val.Date}</p></div>
        </div></>)
      }
      if (datas[0].useremail === datasofchat[0].useremail) {
        setDisplay("")
        setDisplayform("d-none")
        setName(<><h6 className="text-center body-center text-light px-2 p-1" style={{ background: "lightskyblue", width: 'fit-content', borderRadius: '5px' }}>Start Messaging</h6>{datas[0].Chat.map(ncard)}</>)
        setDisplayloader("none")
      }
    }
    catch {

    }
  }
  useEffect(() => {
    rest()
  })
  return (
    <>
      <div className="loader" style={{ display: displayloader }}>
        <div className="loading"></div>
      </div>
      <div className="chat">
        <div className="container mt-3 mb-3">
          <div className="contact_form_title text-center" style={{ marginBottom: '0', marginTop: '10px' }}>
            <i onClick={() => { window.location.reload() }} className={`fa fa-chevron-left ${display}`} style={{ position: 'relative', right: '45%', cursor: 'pointer' }} aria-hidden="true"></i>
            Chat
          </div>
          <div className="chat-middle">
            {name}
            <div className={displayform}>
              {chatsbycarts}
            </div>
          </div>
          <div className={display}>
            <input name="message" value={userData.message} onChange={handleInputs} type="text" placeholder="Type your message" />
            <button onClick={ContactPost} className="btn btn-primary body-center mt-3">Send</button>
          </div>
        </div>
      </div>
    </>
  )
}