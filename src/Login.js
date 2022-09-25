import './style.css';
import React from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "./firebase-config";
import { useState, useEffect } from 'react';

function Login() {
    const [emailInput, setEmail] = useState("");
    const [passwordInput, setPassword] = useState("");

    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                emailInput,
                passwordInput
            );
            window.location.href = "/dashboard";
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className='login'>
            <div className="container py-5 py-sm-7">
                <div className="mx-auto" style={{ maxWidth: "30rem" }}>
                    <div className="card card-lg mb-5">
                        <div className="card-body">
                            <form className="js-validate needs-validation" noValidate>
                                <div className="text-center">
                                    <div className="mb-5">
                                        <h1 className="display-5">Themis - Sign in</h1>
                                        <p>Don't have an account yet? <a className="link" href="./authentication-signup-basic.html">Sign up here</a></p>
                                    </div>
                                    <span className="divider-center text-muted mb-4">OR</span>
                                </div>

                                <div className="mb-4">
                                    <label className="form-label" htmlFor='signinSrEmail'>Your email</label>
                                    <input type="email" id="emailInput" className="form-control form-control-lg" tabIndex="1" placeholder="email@address.com" aria-label="email@address.com" required onChange={(e) => { setEmail(e.target.value) }} />
                                    <span className="invalid-feedback">Please enter a valid email address.</span>
                                </div>

                                <div className="mb-4">
                                    <label className="form-label w-100" htmlFor="signupSrPassword" tabIndex="0">
                                        <span className="d-flex justify-content-between align-items-center">
                                            <span>Password</span>
                                            <a className="form-label-link mb-0" href="./authentication-reset-password-basic.html">Forgot Password?</a>
                                        </span>
                                    </label>

                                    <div className="input-group input-group-merge" data-hs-validation-validate-classname>
                                        <input type="password" id="passwordInput" className="js-toggle-password form-control form-control-lg" placeholder="8+ characters required" aria-label="8+ characters required" required onChange={(e) => { setPassword(e.target.value) }} minLength="8" />
                                    </div>

                                    <span className="invalid-feedback">Please enter a valid password.</span>
                                </div>

                                <div className="form-check mb-4">
                                    <input className="form-check-input" type="checkbox" value="" id="termsCheckbox" />
                                    <label className="form-check-label" htmlFor="termsCheckbox">
                                        Remember me
                                    </label>
                                </div>

                                <div className="d-grid">
                                    <button className="btn btn-primary btn-lg" onClick={(event) => { login(); event.preventDefault() }}>Sign in</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </div>

    );
}

export default Login;
