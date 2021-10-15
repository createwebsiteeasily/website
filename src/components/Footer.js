import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div>
      {/* <!-- Site footer --> */}
      <footer className="site-footer">
        <div className="container-mast">
          <div className="row">
            <div className="col-sm-12 col-md-9">
              <h6>About Me</h6>
              <p className="text-justify">I am Aayush Kumar Jha, I am a Web Developer and has Completed many websites projects using HTML, CSS, JS, Bootstrap (if needed), ReactJs, Jquery, MERN Stack. You can order your websites from me using this website. ThankYou :)</p>
            </div>

            <div className="col-xs-6 col-md-3">
              <h6>Quick Links</h6>
              <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/cart">Shop</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/login">Login</Link></li>
              </ul>
            </div>
          </div>
          <hr />
        </div>
        <div className="container-mast">
          <div className="row">
            <div className="col-md-8 col-sm-6 col-xs-12">
              <p className="copyright-text">Copyright &copy; 2021 All Rights Reserved
              </p>
            </div>

            <div className="col-md-4 col-sm-6 col-xs-12">
              <ul className="social-icons">
                <li><a className="facebook" href="#"><i className="fa fa-facebook"></i></a></li>
                <li><a className="twitter" href="#"><i className="fa fa-twitter"></i></a></li>
                <li><a className="dribbble" href="#"><i className="fa fa-dribbble"></i></a></li>
                <li><a className="linkedin" href="#"><i className="fa fa-linkedin"></i></a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
