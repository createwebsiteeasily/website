import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import key from './Apikey'

function Cart() {
  const [name, setName] = useState()
  const hello = async () => {
    try {
      const res = await fetch(`${key}/gettingproducts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      })
      const hello = await res.json()
      function ncard(val) {
        return (
          <>
            <div className="container-fluid mb-3 mt-3" style={{ width: "auto", borderRadius: "1px" }}>
              <div className="card-card mx-auto my-2 p-2 align-items-center" style={{ width: '18rem' }}>
                <img
                  src={val.img}
                  className="padded card-img-top"
                  alt="..."
                  style={{ width: "320px", height: '180px' }}
                />
                <div className="card-body">
                  <h5 className="card-title text-center">{val.Name}</h5>
                  <p className="card-text mb-1">
                    {val.desc}
                    <p className="text-right" style={{ fontWeight: "700", fontSize: "18px" }}>~ {val.price}₹</p>
                  </p>
                  <Link to={val.to} style={{ boxShadow: 'none' }} className="btn btn-primary d-block">
                    Order Now
                  </Link>
                </div>
              </div>
            </div>
          </>
        )
      }
      setName(hello.map(ncard))
    }
    catch {

    }
  }
  useEffect(() => {
    hello()
  })
  return (
    <>
      <h2 className="text-center">Shopping Cart</h2>
      <div>
        <div style={{ width: "80%" }} className="body-center">
          <div>
            <div className="row mb-3">
              {name}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart
