import React from 'react'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { useLocation } from 'react-router'
import moment from "moment"
import StripeCheckoutButton from './stripepayment'
import key from './Apikey'

function GetData() {
  let history = useHistory()
  const [name, setName] = useState()
  const [value, setValue] = useState({ name: "", desc: "", price: "" })
  const [userDetails, setUserDetails] = useState({ email: "", username: "", name: "", desc: "", img: "", to: "", price: 0, dele: 5 })
  let locate = useLocation()
  const [token, setToken] = useState()
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
      userDetails.email = data.email
      userDetails.username = data.name

      if (!res.status === 200 || !data) {
      }
    }
    catch (err) {
      window.alert("You have to login to order something")
      history.push("/login")
    }
  }
  const Order = async () => {
    try {
      function getdates(howafter) {
        var d = moment(new Date, "DD-MM-YYYY").add(howafter, 'days');
        var day = d.format('DD');
        var month = d.format('MM');
        var year = d.format('YYYY');
        return (`${day}/${month}/${year}`)
      }
      const rest = await fetch(`${key}/gettingproducts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data = await rest.json()

      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        if (locate.pathname.replace(/\/shop/g, "").replace(/shop/g, "") === element.to.replace(/\/shop/g, "").replace(/shop/g, "")) {
          userDetails.name = element.Name
          userDetails.desc = element.desc
          userDetails.img = element.img
          userDetails.price = element.price
          userDetails.dele = element.dele
        }
      }

      const res = await fetch(`${key}/gettingorder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: userDetails.username, useremail: userDetails.email, Name: userDetails.name, desc: userDetails.desc, price: userDetails.price, img: userDetails.img, to: userDetails.to, dele: getdates(userDetails.dele)
        })
      })
      alert("Successfully Ordered")
      history.push("/my-cart")
    }
    catch {

    }
  }
  const callProducts = async () => {
    try {
      const res = await fetch(`${key}/gettingproducts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data = await res.json()
      function ncard(val) {
        if (locate.pathname.replace(/\/shop/g, "").replace(/shop/g, "") === val.to.replace(/\/shop/g, "").replace(/shop/g, "")) {
          value.dele = val.dele
          value.price = val.price
          value.price = val.price
          value.Name = val.Name
          return (
            <></>
          )
        }
      }
      setName(data.map(ncard))
    }
    catch {

    }
  }
  const makeRequest = async () => {
    try {
      const hello = await fetch(`${key}/payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          tokenId:token,
          amount:1
        })
      })
      if(hello.status === 200){
        Order()
      }
    }
    catch {

    }
  }
  useEffect(() => {
    makeRequest()
  }, [token])
  useEffect(() => {
    callProducts()
    callContact()
  }, [])
  function getdates(howafter) {
    var d = moment(new Date, "DD-MM-YYYY").add(howafter, 'days');
    var day = d.format('DD');
    var month = d.format('MM');
    var year = d.format('YYYY');
    return (`${day}/${month}/${year}`)
  }
  return (
    <>
      <div className="container mt-5 mb-5 pr-4 pl-4"><div style={{ fontSize: '30px' }} className="pt-3">{value.Name} Order Form</div><h5 className="text-success"><span className="text-dark">Price - </span>{value.price}₹</h5><h5 className="text-success"><span className="text-dark">Deliver at {getdates(value.dele)}</span></h5><h2>Payment</h2><p>Don't reload and press back button while the payment transaction is running</p><div style={{ paddingBlock: '20px' }}>
        <StripeCheckoutButton price={"1"} onToken={(tokens) => { setToken(tokens.id); }} /></div>
        <div></div></div>

    </>
  )
}

export default GetData
