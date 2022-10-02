import './style.css';
import React from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "./firebase-config";
import { useState } from 'react';
import Swal from 'sweetalert2';

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
            Swal.fire({
                title: 'Willkommen Zurück! ',
                text: 'Du wurdest erfolgreich eingeloggt',
                icon: 'success',
                confirmButtonText: 'Zum Dashboard'
            }).then(() => {
                window.location.href = "/dashboard";
            })
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
                                        <p>Du hast noch keinen Account ? <a className="link" href="./signIn">Hier registrieren</a></p>
                                    </div>
                                    <span className="divider-center text-muted mb-4">ODER</span>
                                </div>

                                <div className="mb-4">
                                    <label className="form-label" htmlFor='signinSrEmail'>Deine Emailadresse</label>
                                    <input type="email" id="emailInput" className="form-control form-control-lg" tabIndex="1" placeholder="email@address.com" aria-label="email@address.com" required onChange={(e) => { setEmail(e.target.value) }} />
                                    <span className="invalid-feedback">Bitte gib eine valide Email Adresse an .</span>
                                </div>

                                <div className="mb-4">
                                    <label className="form-label w-100" htmlFor="signupSrPassword" tabIndex="0">
                                        <span className="d-flex justify-content-between align-items-center">
                                            <span>Passwort</span>
                                            <a className="form-label-link mb-0" href="./authentication-reset-password-basic.html">Passwort vergessen?</a>
                                        </span>
                                    </label>

                                    <div className="input-group input-group-merge" data-hs-validation-validate-classname>
                                        <input type="password" id="passwordInput" className="js-toggle-password form-control form-control-lg" placeholder="Mindestenes 8+ Zeichen" aria-label="8+ characters required" required onChange={(e) => { setPassword(e.target.value) }} />
                                    </div>

                                    <span className="invalid-feedback">Bitte gib ein valides Passwort an .</span>
                                </div>

                                <div className="form-check mb-4">
                                    <input className="form-check-input" type="checkbox" value="" id="termsCheckbox" />
                                    <label className="form-check-label" htmlFor="termsCheckbox">Angemeldet bleiben</label>
                                </div>

                                <div className="d-grid">
                                    <button className="btn btn-primary btn-lg" onClick={(event) => { login(); event.preventDefault() }}>Einloggen</button>
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
