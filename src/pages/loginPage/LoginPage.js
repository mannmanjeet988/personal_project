import React from "react";
import "./loginPage.css";
import logoImage from "../../assets/images/logo_login_page.png";
import loginPage_handImg from "../../assets/images/loginPage_HandImg.jpg";


const LoginPage = () => {

    return (
        <div className="outer-container">

            <div className="header">
                <img src={logoImage} alt="logo-image" />

            </div>
            <div className="inner-container">
                <div className="left-container">
                    
                    <form className="login-form">
                    <h1>Sign In</h1>
                    <p>Enter your email and password to sign in!</p>
                    <label>Email</label>
                        <input type="email" placeholder="Enter your email" />
                        <label>Password</label>
                        <input type="password" placeholder="Enter your password" />
                        <div>
                            <label>
                                <input type="checkbox" />
                                Keep me logged In
                            </label>
                            <span>Forgot Password?</span>
                        </div>
                        <button>Sign In</button>
                    </form>
                </div>
                <div className="right-container">
                    <img src={loginPage_handImg} alt="loginPage_handImg" />
                </div>
            </div>

        </div>
    )
}

export default LoginPage

