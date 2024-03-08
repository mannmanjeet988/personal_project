import React from "react";
import "./loginPage.css";

import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import logo from "../../assets/images/logo.png";
import background_img from "../../assets/images/background_image.jpeg.png";
import loginPage_roboticImage from "../../assets/images/login_page_roboticImg.png";



const LoginPage = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        email: "",
        password: "",
    })
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [token, setToken] = useState("")
    console.log(token)


    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        }
    }, [token])


    async function verifyUser(e) {
        e.preventDefault();

        if (!user.email && !user.password) {
          //  setError("Please enter email and password")
            toast.error("Please enter email and password")
            setSuccess("")
            return;
        }

        if (!user.email) {
            toast.error("Please enter email")
            setSuccess("")
            return;
        }

        if (!user.password) {
            toast.error("Please enter password")
            setSuccess("")
            return;
        }

        try {
            const response = await axios.post("https://api-test.myliveeye.com/api/login/customer",
                {
                    email: user.email,
                    password: user.password,
                }
            )
            console.log(response)
            console.log("token", response.data.token);
            setToken(response.data.token)
            localStorage.setItem("token", response.data.token)
            setError("")
            //setSuccess("Login successful")
            toast.success("Login successful")
            navigate("/trial")

        }
        catch (err) {
            console.log(err)
            //setError(err.response.data.message)
            toast.error(err.response.data.message)
            setSuccess("")
        }
    }

    return (
        <div className="outer-container">
            <div className="header">
                <img className="logo-image" src={logo} alt="logo-image" />
            </div>
            <div className="main-container">
            <div className="inner-container">
                <div className="left-container">
                  <div className="form-container">
                  <form className="login-form" onSubmit={verifyUser}>
                        <p className="signIn-text">Sign In</p>
                        {/* {success  && <h4 style={{color:"green"}}>{success}</h4>}
                          {error  && <h4 style={{color:"red"}}>{error}</h4>} */}
                        <p className="hintText">Enter your email and password to sign in!</p>
                        <label>Email<sup className="star">*</sup></label>
                        <input type="email" placeholder="Enter your email"
                            onChange={(e) => { setUser({ ...user, email: e.target.value }) }} />
                        <label >Password<sup className="star">*</sup></label>
                        <input className="" type="password" placeholder="Enter your password"
                            onChange={(e) => { setUser({ ...user, password: e.target.value }) }} />
                        <div className="forgot-pass-container">
                            <div className="checkbox-container">
                            {/* <label className="loggedInText">
                                <input type="checkbox" />
                                Keep me logged In
                            </label> */}
                            </div>
                            <span className="forgotPassText">Forget Password?</span>
                        </div>
                        {/* <Link to="/trial"> <button >Sign In</button></Link> */}
                        <button className="signIn-btn" >Sign In</button>
                    </form>
                  </div>
                    
                    {/* <Link to="/trial">Trial</Link> */}
                </div>
                <div className="right-container">
                    <img className="loginPage_handImg" src={loginPage_roboticImage} alt="loginPage_handImg" />
                    
                </div>              
            </div>
            <div className="bottomTextDiv" >
                    <p className="bottomText">Unveil the Future of Protection with our cutting-edge AI solutions </p>
            </div>  
            </div>
           
            

        </div>
    )
}

export default LoginPage

