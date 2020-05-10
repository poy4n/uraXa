import React from 'react'
import './Signup.css';

export default function Signup() {
    return (
        <div className="form-container">
        
            <form className="form-wraper" method="POST" name="signup">
                <div className="input-wraper">
                    <input className="input" type="text" id="name" name="name" autoComplete="off" required></input>
                    <label className="label" htmlFor="name">Your name</label>
                </div>

                <div className="input-wraper">
                    <input className="input" type="text" id="username" name="username" autoComplete="off" required></input>
                    <label className="label" htmlFor="username">Username</label>
                </div>

                <div className="input-wraper">
                    <input className="input" type="email" id="email" name="email" autoComplete="off" required></input>
                    <label className="label" htmlFor="email">Email address</label>
                 </div>

                 <div className="input-wraper">
                    <input className="input" type="password" id="password" name="password" required></input>
                    <label className="label" htmlFor="password">Password</label>
                </div>
            </form>

        </div>
    )
}
