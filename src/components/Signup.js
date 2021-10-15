import React, { useState } from 'react'
import img from '../signup.49e79a86.svg'
import { Link, useHistory } from 'react-router-dom'
import key from './Apikey'

const Register = () => {

  const [user, setUser] = useState({
    name: "", email: "", phone: "", work: "", password: "", cpassword: ""
  })
  const [display, setDisplay] = useState({ name: "block", email: "none", otp: "none", pass: "none" })
  const [warndisplay, setWarndisplay] = useState("none")
  const [displayName, setDisplayName] = useState("block")
  const [email, setEmail] = useState("none")
  const [otp, setOtp] = useState("none")
  const [pass, setPass] = useState("none")
  const [otpWarn, setOtpWarn] = useState("none")
  const [loadspinner, setLoadspinner] = useState("none")
  const [otpget, setOtpget] = useState()

  let history = useHistory()

  let name, value
  const handleInputs = (e) => {
    name = e.target.name
    value = e.target.value
    setUser({ ...user, [name]: value })
  }

  function displayotp() {
    if (user.email !== "") {
      setDisplayName("none")
      setEmail("none")
      setOtp("block")
      setPass("none")
      setWarndisplay("none")
      setOtpWarn("none")
    }
    else {
      setWarndisplay("block")
      setOtpWarn("none")
    }
  }
  const getOtp = async (e) => {
    // e.preventDefault()
    try {
      setLoadspinner("block")
      const hello = await fetch(`${key}/getemail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: user.email
        })
      })
      const data = await hello.json()
      setOtpget(data.otp)
      displayotp()
      setLoadspinner("none")
    }
    catch {

    }
  }
  const PostData = async (e) => {
    e.preventDefault();

    // const [name, email, phone, work, password, cpassword] = user;

    if (otpget == user.otp) {
      const res = await fetch(`${key}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: user.name, email: user.email, password: user.password, cpassword: user.cpassword, otp: user.otp
        })
      })

      const data = await res.json()
      if (res.status === 402) {
        window.alert("Confirm Password Doesn't Match")
        // console.log("Invalid Crenditials")
      }
      else if (res.status === 404) {
        window.alert(`The email you enter is already registered please try different email id`)
        // console.log("Invalid Crenditials")
      }
      else if (res.status === 500) {
        window.alert("Fill all the fields")
      }
      else if (!data) {
        window.alert("Invalid Credintials")
      }
      else {
        window.alert("Successful Registeration")
        // console.log("Successful Registeration")

        history.push("/login")
      }
    }
    else {
      window.alert("OTP doesn't match")
    }
  }
  function displaynames() {
    if (user.name !== "") {
      setDisplayName("none")
      setEmail("inline")
      setOtp("none")
      setPass("none")
      setWarndisplay("none")
      setOtpWarn("none")
    }
    else {
      setWarndisplay("block")
      setOtpWarn("none")
    }
  }

  function gobackname() {
    setDisplayName("block")
    setEmail("none")
    setOtp("none")
    setPass("none")
    setWarndisplay("none")
    setOtpWarn("none")
  }

  function gobackemail() {
    setDisplayName("none")
    setEmail("block")
    setOtp("none")
    setPass("none")
    setWarndisplay("none")
    setOtpWarn("none")
  }

  function displaypass() {
    if (user.otp === "") {
      setWarndisplay("block")
    }
    else {
      if (user.otp == otpget) {
        setDisplayName("none")
        setEmail("none")
        setOtp("none")
        setPass("block")
        setWarndisplay("none")
        setOtpWarn("none")
      }
      else {
        setOtpWarn("block")
      }
    }
  }

  function gobackotp() {
    setDisplayName("none")
    setEmail("none")
    setOtp("block")
    setPass("none")
    setWarndisplay("none")
    setOtpWarn("none")
  }

  return (
    <>
      <div className="sinup mb-5">
        <div className="container mt-5">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title">Sign Up</h2>
              <div>
                <p className="text-danger mb-2" style={{ fontWeight: '600', textAlign: 'center', display: warndisplay }}><i className="mr-2 fa fa-exclamation-triangle"></i>Please fill all the fields</p>
                <p className="text-danger mb-2" style={{ fontWeight: '600', textAlign: 'center', display: otpWarn }}><i className="mr-2 fa fa-exclamation-triangle"></i>OTP not matched Please Try again</p>
                <div style={{ display: displayName }} className="form-group">
                  <label className="label" htmlFor="name">
                    <i className="zmdi zmdi-account material-icons-name"></i>
                  </label>
                  <input type="text" name="name" id="name" autoComplete="off" placeholder="Your Name" value={user.name} onChange={handleInputs} />
                </div>
                <div className="container-fluid mb" style={{ display: displayName }}>
                  <div className="row">
                    <div>
                    </div>
                    <div className="col-md-0 ml-auto mr-4">
                      <button onClick={displaynames} className="btn btn-primary">Next</button>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div style={{ display: email }} className="form-group">
                  <label className="label" htmlFor="email"><i className="zmdi zmdi-email material-icons-name"></i></label>
                  <input name="email" id="email" autoComplete="off" placeholder="Your Email" value={user.email} onChange={handleInputs} />
                </div>
                <div className="container-fluid" style={{ display: email }}>
                  <div className="row">
                    <div>
                      <button className="btn btn-secondary" onClick={gobackname}>Go Back</button>
                    </div>
                    <div className="col-md-0 ml-auto mr-4">
                      <button className="btn btn-primary" onClick={getOtp}>Next</button>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div style={{ display: otp }} className="form-group">
                  <label className="label" htmlFor="otp"><i className="zmdi zmdi-email material-icons-name"></i></label>
                  <input required type="number" name="otp" autoComplete="off" placeholder="Your OTP" value={user.otp} onChange={handleInputs} />
                </div>
                <div className="container-fluid mb" style={{ display: otp }}>
                  <div className="row">
                    <div>
                      <button className="btn btn-secondary" onClick={gobackemail}>Go Back</button>
                    </div>
                    <div className="col-md-0 ml-auto mr-4">
                      <button className="btn btn-primary" onClick={displaypass}>Verify</button>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div style={{ display: pass }} className="form-group">
                  <label className="label" htmlFor="password"><i className="zmdi zmdi-lock material-icons-name"></i></label>
                  <input type="password" name="password" id="password" autoComplete="off" placeholder="Your Password" value={user.password} onChange={handleInputs} />
                </div>
                <div style={{ display: pass }} className="form-group">
                  <label className="label" htmlFor="cpassword"><i className="zmdi zmdi-lock material-icons-name"></i></label>
                  <input type="password" name="cpassword" id="cpassword" autoComplete="off" placeholder="Confirm Your Password" value={user.cpassword} onChange={handleInputs} />
                </div>
                <p className="text-secondary text-center" style={{ display: loadspinner }}><i className="fa fa-spinner mr-2" aria-hidden="true"></i>Sending OTP</p>
                <div className="container-fluid mb" style={{ display: pass }}>
                  <div className="row">
                    <div>
                      <button className="btn btn-secondary" onClick={gobackotp}>Go Back</button>
                    </div>
                    <div className="col-md-0 ml-auto mr-4">
                      <button className="btn btn-primary" onClick={PostData}>Register</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="signup-image">
              <figure>
                <img src={img} className="mt-1" alt="registration pic" />
              </figure>
              <Link className="signup-image-link" to="/login">I am already register</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
