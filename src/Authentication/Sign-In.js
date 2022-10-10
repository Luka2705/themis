import '../style.css';
import React from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from "../firebase-config";
import { useState } from 'react';
import Swal from 'sweetalert2';

function SignIn() {
    const [emailInput, setEmail] = useState("");
    const [preName, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [passwordInput, setPassword] = useState("");
    const [validationPassword, setValidationPassword] = useState("");
    const [pictureMetadata, setPic] = useState("");

    const validatePassword = () => {
        if (validationPassword === passwordInput) {
            signIn();
        } else {
            Swal.fire({
                title: 'Ups!',
                text: 'Die Passwörter die du eingegeben hast, stimmen nicht überein, überprüfe deine Eingabe',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
    }

    const signIn = async () => {
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                emailInput,
                passwordInput
            );
            updateProfile(auth.currentUser, {
                displayName: preName + " " + lastName
            }).then(() => {
                Swal.fire({
                    title: 'Herzlich Willkommen ' + preName + ' !',
                    text: 'Dein Account wurde erstellt und du wurdest erfolgreich eingeloggt',
                    icon: 'success',
                    confirmButtonText: 'Zum Dashboard'
                }).then(() => {
                    window.location.href = "/dashboard";
                })
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
                                        <h1 className="display-5">Erstelle deinen Account</h1>
                                        <p>Du hast schon einen Account ? <a className="link" href="./login">Hier einloggen</a></p>
                                    </div>

                                    <span className="divider-center text-muted mb-4">ODER</span>
                                </div>

                                <label className="form-label" htmlFor="fullNameSrEmail">Name</label>

                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="mb-4">
                                            <input type="text" className="form-control form-control-lg" name="fullName" id="fullNameSrEmail" placeholder="Max" aria-label="Mark" required onChange={(e) => { setName(e.target.value) }} />
                                            <span className="invalid-feedback">Vorname.</span>
                                        </div>
                                    </div>

                                    <div className="col-sm-6">
                                        <div className="mb-4">
                                            <input type="text" className="form-control form-control-lg" placeholder="Mustermann" aria-label="Williams" required onChange={(e) => { setLastName(e.target.value) }} />
                                            <span className="invalid-feedback">Nachname.</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="form-label" htmlFor="signupSrEmail">Email Adresse</label>
                                    <input type="email" className="form-control form-control-lg" name="email" id="signupSrEmail" placeholder="maxmustermann@email.com" aria-label="Markwilliams@site.com" required onChange={(e) => { setEmail(e.target.value) }} />
                                    <span className="invalid-feedback">Please enter a valid email address.</span>
                                </div>

                                <div className="mb-4">
                                    <label className="form-label" htmlFor="signupSrPassword">Passwort</label>

                                    <div className="input-group input-group-merge">
                                        <input type="password" className="js-toggle-password form-control form-control-lg" placeholder="Mindestens 8 Zeichen" aria-label="8+ characters required" required minLength='8' onChange={(e) => { setPassword(e.target.value) }} />
                                        <a className="js-toggle-password-target-1 input-group-append input-group-text">
                                            <i className="js-toggle-password-show-icon-1 bi-eye"></i>
                                        </a>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="form-label" htmlFor="signupSrConfirmPassword">Passwort wiederholen</label>

                                    <div className="input-group input-group-merge" data-hs-validation-validate-class>
                                        <input type="password" className="js-toggle-password form-control form-control-lg" placeholder="Mindestens 8 Zeichen" aria-label="8+ characters required" required minLength='8' onChange={(e) => { setValidationPassword(e.target.value) }} />
                                    </div>
                                </div>

                                <div className="d-grid gap-2">
                                    <button className="btn btn-primary btn-lg" onClick={(event) => { validatePassword(); event.preventDefault() }}>Account erstellen und einloggen</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </div>

    );
}

export default SignIn;
