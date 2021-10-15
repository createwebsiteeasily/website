import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router'
import { useLocation } from 'react-router'
import moment from "moment"
import key from './Apikey'

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = src
    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }
    document.body.appendChild(script)
  })
}

const __DEV__ = document.domain === 'localhost'

function GetData() {

  let history = useHistory()
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [value, setValue] = useState({ name: "", desc: "", price: "" })
  const [userDetails, setUserDetails] = useState({ email: "", username: "", name: "", desc: "", img: "", to: "", price: 0, dele: 5 })
  let locate = useLocation()
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
      setEmail(data.email)
      if (!res.status === 200 || !data) {
      }
    }
    catch (err) {
      window.alert("You have to login to order something")
      history.push("/login")
    }
  }
  // paytm

  function isDate(val) {
    // Cross realm comptatible
    return Object.prototype.toString.call(val) === '[object Date]'
  }

  function isObj(val) {
    return typeof val === 'object'
  }

  function stringifyValue(val) {
    if (isObj(val) && !isDate(val)) {
      return JSON.stringify(val)
    } else {
      return val
    }
  }

  function buildForm({ action, params }) {
    const form = document.createElement('form')
    form.setAttribute('method', 'post')
    form.setAttribute('action', action)

    Object.keys(params).forEach(key => {
      const input = document.createElement('input')
      input.setAttribute('type', 'hidden')
      input.setAttribute('name', key)
      input.setAttribute('value', stringifyValue(params[key]))
      form.appendChild(input)
    })

    return form
  }

  function post(details) {
    const form = buildForm(details)
    document.body.appendChild(form)
    form.submit()
    form.remove()
  }

  const getData = async () => {
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
    const datas = await rest.json()

    for (let index = 0; index < datas.length; index++) {
      const element = datas[index];
      if (locate.pathname.replace(/\/shop/g, "").replace(/shop/g, "") === element.to.replace(/\/shop/g, "").replace(/shop/g, "")) {
        userDetails.name = element.Name
        userDetails.desc = element.desc
        userDetails.img = element.img
        userDetails.price = element.price
        userDetails.dele = element.dele
      }
    }
    const ressi = await fetch(`${key}/aboutapi`, {
      method:"POST",
      headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
      },
      body:JSON.stringify({
          user:localStorage.getItem("Logdata")
      })
  })
    const datasof = await ressi.json();
    // console.log(String(`/callback/name=${userDetails.username}/email=${userDetails.useremail}/${userDetails.name}/desc=${userDetails.desc}/${userDetails.price}/img=${userDetails.img}/to=hi/dele=${getdates(userDetails.dele)}/${moment(new Date, "DD-MM-YYYY")}`))
    const res = await fetch(`${key}/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: Number(value.price), email: email, username: `${`callback?username=${datasof.name}&useremail=${datasof.email}&name=${userDetails.name}&desc=${userDetails.desc}&img=${userDetails.img}&price=${userDetails.price}&dele=${getdates(userDetails.dele)}`}`
      })
    })
    const data = await res.json()
    return (data)
  }

  const makePaytm = async () => {
    try {
      getData().then((response) => {
        var information = {
          action: "https://securegw-stage.paytm.in/order/process",
          params: response
        }
        post(information)
      })
    }
    catch {

    }
  }
  // paytm end

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
          username: userDetails.username, useremail: userDetails.email, Name: userDetails.name, desc: userDetails.desc, price: userDetails.price, img: userDetails.img, dele: getdates(userDetails.dele)
        })
      })
      alert("Successfully Ordered")
      history.push("/my-cart")
    }
    catch {

    }
  }
  /* Razorpay */

  async function displayRazorpay() {
    try {
      const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

      if (!res) {
        alert('Razorpay SDK failed to load. Are you online?')
        return
      }

      const datas = await fetch(`${key}/razorpay`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          amount: value.price
        })
      })
      const data = await datas.json()

      const options = {
        key: __DEV__ ? 'rzp_test_H4CjjzrgImCNl5' : '6',
        currency: data.currency,
        amount: data.amount.toString(),
        order_id: data.id,
        name: `${value.Name}`,
        description: 'Thank you',
        image: `${key}/logo`,
        handler: function (response) {
          // console.log(response)
          Order()
        }
      }
      const paymentObject = new window.Razorpay(options)
      paymentObject.open()
    }
    catch {

    }
  }
  /* Razorpay end */


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
      <div className="container mt-5 mb-5 pr-4 pl-4"><div style={{ fontSize: '30px' }} className="pt-3">{value.Name}</div><h5 className="text-success"><span className="text-dark">Price - </span>{value.price}₹</h5><h5 className="text-success"><span className="text-dark">Deliver at {getdates(value.dele)}</span></h5><div style={{ paddingBlock: '20px' }}>
        <h3 className="text-center">Choose One of the Payment method</h3>
        <div className="row mb-3">
          <div className="col-lg-6 col-md-6 text-center borderright">
            <h3 style={{ fontWeight: '500', fontStyle: 'italic' }}>Using Razorpay</h3>
            <p>Most suitable for cards</p>
            <img className="img-fluid" style={{ width: '200px', filter: 'none', margin: '10px' }} src="/media/payment/razorpay.png" alt="razorpay" /><br />
            <button
              style={{ cursor: 'pointer' }}
              className="App-link pay-link"
              onClick={displayRazorpay}
            >
              Pay ₹{value.price}
            </button>
          </div>
          <div className="text-centers">
            <h3 className="ormobile">Or</h3>
          </div>
          <div className="col-lg-6 col-md-6 text-center">
            <h3 style={{ fontWeight: '500', fontStyle: 'italic' }}>Using Paytm</h3>
            <p>Most suitable Paytm users</p>
            <img className="img-fluid" style={{ width: '200px', filter: 'none', margin: '10px' }} src="/media/payment/paytm.png" alt="paytm" /><br />
            <button
              style={{ cursor: 'pointer' }}
              className="App-link pay-link"
              onClick={makePaytm}
            >
              Pay ₹{value.price}
            </button>
          </div>
        </div>
      </div>
        <div></div></div>

    </>
  )
}

export default GetData
