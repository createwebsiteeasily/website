import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Register from './components/Signup';
import Logout from './components/Logout';
import { useLocation } from 'react-router';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/js/bootstrap.bundle';
import './index.css';
import { Link, Route, Switch } from 'react-router-dom';
import { createContext, useReducer } from 'react';
import { reducer, initialState } from '../src/reducer/UseReducer'
import Updatepass from './components/Updatepass';
import Forgotpasses from './components/Updatepasses';
import Cart from './components/Cart';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import MyCart from './components/MyCart';
import GetData from './components/GetData';
// import Chat from './components/Chat';
// import ChatwithMe from './components/ChatwithMe';
import { useState, useEffect } from 'react';
import Forgotpass from './components/Forgotpass';
import { Admin, Messages, Orders, AddRevision, Adddownload, Addproducts, ChatAdmin, ChatAdmins } from './components/Admin';
import NotFound from './components/NotFound';
import key from './components/Apikey';

export const UserContext = createContext()

function App() {
  const [name, setName] = useState()
  let locate = useLocation()
  const Res = async () => {
    try {
      const hello = await fetch(`${key}/gettingproducts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      })
      const datas = await hello.json()
      function other(val) {
        if (val.to !== locate.pathname) {
          return (<>
            <div className="mx-3 mb-3" style={{ width: "auto", borderRadius: "1px" }}>
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
                    <p className="text-right" style={{ fontWeight: "700", fontSize: "18px" }}>~ ₹{val.price}</p>
                  </p>
                  <Link to={val.to} style={{ boxShadow: 'none' }} className="btn btn-primary d-block">
                    Order Now
                  </Link>
                </div>
              </div>
            </div>
          </>)
        }
      }

      function ncard(val) {
        return (
          <Route exact path={val.to}>
            <Navbar />
            <div className="container-fluid py-3" style={{ background: "#fff" }}>
              <div className="row">
                <div className="col-md-8 col-xl-8 col-sm-12">
                  <div className="container" style={{ borderRadius: '0', boxShadow: "none" }}>
                    <h3>Build a Website</h3>
                    <pre><p>{val.CartAbout}</p></pre>
                    {/* {val.CartData} */}
                  </div>
                </div>
                <div className="col-md-4 col-xl-4" style={{ width: '100%' }}>
                  <div className={`card-card mx-auto my-2 p-2 align-items-center`}>
                    <img
                      src={val.img}
                      className="img-fluid padded card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title text-center">{val.Name}</h5>
                      <p className="card-text mb-1">
                        {val.desc}
                        <p className="text-right" style={{ fontWeight: "700", fontSize: "18px" }}>~ {val.price}₹</p>
                        <p className="text-right" style={{ fontWeight: "700", fontSize: "18px" }}><svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 14c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z"></path><path d="M9 4H7v5h5V7H9V4z"></path></svg> {val.dele} Days Delivery</p>
                      </p>
                      <Link className="btn btn-success d-block" to={`${val.to}/shop`} style={{ borderRadius: '1px', boxShadow: 'none' }}>Order Now</Link>
                      {/* <Link className="btn btn-secondary d-block mt-2" to="/contact" style={{ borderRadius: '1px', boxShadow: 'none' }}>Contact Seller</Link> */}
                    </div>
                  </div>
                </div>
                {/* <div className="container-fluid mt-2" style={{ borderRadius: '0', boxShadow: "none" }}>
                  <h3>More Products</h3>
                  <div className="row mb-3" style={{ maxheight: "450px", width: '100%', overflowY: 'auto', display: 'flex', flexWrap: 'nowrap' }}>
                    {datas.map(other)}
                  </div>
                </div> */}
              </div>
            </div>
          </Route>
        )
      }
      setName(datas.map(ncard))
    }
    catch {

    }
  }
  useEffect(() => {
    Res()
  }, [locate])
  const [state, dispatch] = useReducer(reducer, initialState)
  function Httporhttps() {
    var hello = window.location.href
    var hello2 = hello.replace("http", "https")
    if (window.location.origin.includes("http")) {
      window.location.replace(hello2)
    }
  }
  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <ScrollToTop />
        <Switch>
          {name}
          {/* {Httporhttps()} */}
          <Route exact path="/"><Navbar /><Home /></Route>
          <Route exact path="/about"><Navbar /><About /></Route>
          <Route exact path="/contact"><Navbar /><Contact /></Route>
          <Route exact path="/login"><Navbar /><Login /></Route>
          <Route exact path="/register"><Navbar /><Register /></Route>
          <Route exact path="/logout"><Navbar /><Logout /></Route>
          <Route exact path="/update"><Navbar /><Updatepass /></Route>
          <Route exact path="/updatepass"><Navbar /><Forgotpasses /></Route>
          <Route exact path="/cart"><Navbar /><Cart /></Route>
          <Route exact path="/my-cart"><Navbar /><MyCart /></Route>
          <Route exact path="/admin"><Navbar /><Admin /></Route>
          <Route exact path="/messages"><Navbar /><Messages /></Route>
          <Route exact path="/orders"><Navbar /><Orders /></Route>
          <Route exact path="/addrevision"><Navbar /><AddRevision /></Route>
          <Route exact path="/adddownload"><Navbar /><Adddownload /></Route>
          <Route exact path="/addproducts"><Navbar /><Addproducts /></Route>
          <Route exact path="/chatadmin"><Navbar /><ChatAdmin /></Route>
          <Route exact path="/chat"><Navbar /><ChatAdmins /></Route>
          <Route exact path="/forgotpass"><Navbar /><Forgotpass /></Route>
          <Route exact path="/cart/:param/shop"><Navbar /><GetData /></Route>
          <Route><Navbar /><NotFound /></Route>
        </Switch>
        <Footer />
      </UserContext.Provider>
    </>
  );
}

export default App;
