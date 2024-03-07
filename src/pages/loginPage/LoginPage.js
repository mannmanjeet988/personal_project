import React from "react";
import "./loginPage.css";
import logoImage from "../../assets/images/logo_login_page.png";
import loginPage_handImg from "../../assets/images/loginPage_HandImg.jpg";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";



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
                <img className="logo-image" src={logoImage} alt="logo-image" />
            </div>
            <div className="inner-container">
                <div className="left-container">

                    <form className="login-form" onSubmit={verifyUser}>
                        <h1>Sign In</h1>
                        {/* {success  && <h4 style={{color:"green"}}>{success}</h4>}
                          {error  && <h4 style={{color:"red"}}>{error}</h4>} */}
                        <p className="">Enter your email and password to sign in!</p>
                        <label>Email</label>
                        <input type="email" placeholder="Enter your email"
                            onChange={(e) => { setUser({ ...user, email: e.target.value }) }} />
                        <label >Password</label>
                        <input className="" type="password" placeholder="Enter your password"
                            onChange={(e) => { setUser({ ...user, password: e.target.value }) }} />
                        <div>
                            <label>
                                <input type="checkbox" />
                                Keep me logged In
                            </label>
                            <span>Forgot Password?</span>
                        </div>
                        {/* <Link to="/trial"> <button >Sign In</button></Link> */}
                        <button >Sign In</button>
                    </form>
                    {/* <Link to="/trial">Trial</Link> */}
                </div>
                <div className="right-container">
                    <img src={loginPage_handImg} alt="loginPage_handImg" />
                </div>
            </div>

        </div>
    )
}

export default LoginPage

