import React from 'react'

import './Login.css';

export default function Login() {
    return (
        <div className="form-container">
            <h1>Login To Your Account</h1> 
            <form className="form-wraper" method="POST" name="signup">
                <div className="input-wraper">
                    <input className="input" type="email" id="email" name="email" autoComplete="off" required></input>
                    <label className="label" htmlFor="email">Email address</label>
                 </div>

                 <div className="input-wraper">
                    <input className="input" type="password" id="password" name="password" required></input>
                    <label className="label" htmlFor="password">Password</label>
                </div>
                <button className='login-btn'>
                    Login
                </button>
            </form>
        </div>
    )
}
