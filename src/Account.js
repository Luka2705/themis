import './style.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { db, auth } from './firebase-config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, getDocs, query, where } from "firebase/firestore";
import Swal from 'sweetalert2';
import badge from './img/icons/person-badge.svg';
import clipboard from './img/icons/clipboard-data.svg'
import plus from './img/icons/plus-square.svg'
import hourglass from './img/icons/hourglass-split.svg'
import image from './img/img2.jpg'
import person from './img/no-user-image.gif'

function Account() {
    const [currentUser, setUser] = useState({});
    const [billsMap, setBillsMap] = useState(new Map());
    const [keys, setKeys] = useState([]);
    const keysWithoutDuplicates = [...new Set(keys)];
    let stores = [];
    let styles = ["bg-primary", "bg-success", "bg-warning", "bg-info", "bg-danger", "bg-dark", "bg-secondary"]
    var count = {};

    //Set Current User
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            fetchData(currentUser.uid)
        });
    }, []);

    async function fetchData(prop) {
        const q = query(collection(db, "bills"), where("user", "==", prop));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setKeys(keys => [...keys, doc.id]);
            setBillsMap(new Map(billsMap.set(doc.id, doc.data())));
        });
    }

    keysWithoutDuplicates.map((key, value) => {
        stores.push(billsMap.get(key).store)
    })
    stores.forEach(function (i) { count[i] = (count[i] || 0) + 1; });

    if (currentUser === undefined) {

    } else {
        return (
            <div className="has-navbar-vertical-aside navbar-vertical-aside-show-xl" style={{ backgroundColor: "#f2efe5" }}>
                <aside className="js-navbar-vertical-aside navbar navbar-vertical-aside navbar-vertical navbar-vertical-fixed navbar-expand-xl navbar-bordered bg-white  ">
                    <div className="navbar-vertical-footer-offset">
                        <div className="navbar-vertical-container">
                            <div className="navbar-vertical-content">
                                <div id="navbarVerticalMenu" className="nav nav-pills nav-vertical card-navbar-nav">
                                    <h1 className="navbar-header">Themis</h1>
                                    <span className="dropdown-header mt-4">Willkommen bei Themis</span>
                                    <small className="bi-three-dots nav-subtitle-replacer"></small>
                                    <div className="nav-item">
                                        <a className="nav-link " href="/dashboard" data-placement="left">
                                            <img src={clipboard} className="bi-person nav-icon" width={20} height={20} />
                                            <span className="nav-link-title">Dashboard</span>
                                        </a>
                                    </div>
                                    <div className="nav-item">
                                        <a className="nav-link " href="/createBill" data-placement="left">
                                            <img src={plus} className="bi-person nav-icon" width={20} height={20} />
                                            <span className="nav-link-title">Kassenzettel erstellen</span>
                                        </a>
                                    </div>
                                    <div className="nav-item">
                                        <a className="nav-link " href="/history" data-placement="left">
                                            <img src={hourglass} className="bi-person nav-icon" width={20} height={20} />
                                            <span className="nav-link-title">Historie</span>
                                        </a>
                                    </div>
                                    <div className="nav-item">
                                        <a className="nav-link " href="/account" data-placement="left">
                                            <img src={badge} className="bi-person nav-icon" width={20} height={20} />
                                            <span className="nav-link-title">Dein Konto</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="navbar-vertical-footer">
                                <a className="btn btn-ghost-secondary" style={{ marginLeft: 50 }} onClick={() => signOut(auth).then(() => { window.location.href = "/" })}>Ausloggen</a>
                            </div>
                        </div>
                    </div>
                </aside>

                <div className="main splitted-content-main">

                    <div className="splitted-content-fluid content-space" id="bill">
                        <div className="content container-fluid">
                            <div className="row justify-content-lg-center">
                                <div className="col-lg-10">
                                    <div className="profile-cover">
                                        <div className="profile-cover-img-wrapper">
                                            <img id="profileCoverImg" className="profile-cover-img" src={image} />

                                            <div className="profile-cover-content profile-cover-uploader p-3">
                                                <input type="file" className="js-file-attach profile-cover-uploader-input"
                                                    id="profileCoverUplaoder" data-hs-file-attach-options='{
                                "textTarget": "#profileCoverImg",
                                "mode": "image",
                                "targetAttr": "src",
                                "allowTypes": [".png", ".jpeg", ".jpg"]
                             }' />
                                                <label className="profile-cover-uploader-label btn btn-sm btn-white" htmlFor="profileCoverUplaoder">
                                                    <span className="d-none d-sm-inline-block ms-1">Upload header</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-center mb-5">
                                        <label className="avatar avatar-xxl avatar-circle avatar-uploader profile-cover-avatar" htmlFor="editAvatarUploaderModal">
                                            <img id="editAvatarImgModal" className="avatar-img" src={person} alt="Profile Image" />
                                        </label>

                                        <h1 className="page-header-title">{currentUser.displayName}</h1>

                                        <ul className="list-inline list-px-2">
                                            <li className="list-inline-item">
                                                <i className="bi-calendar-week me-1"></i>
                                                <h4>Account ID: <span className='text-muted'>{currentUser.uid}</span></h4>
                                            </li>
                                        </ul>
                                    </div>

                                    <hr />

                                    <div className="row">
                                        <div className="col-lg-4">
                                            <div className="card mb-3 mb-lg-5">
                                                <div className="card-header card-header-content-between">
                                                    <h4 className="card-header-title">Deine Daten</h4>
                                                </div>
                                                <div className="card-body">
                                                    <ul className="list-unstyled list-py-2 text-dark mb-0">
                                                        <li className="pb-0"><span className="card-subtitle">Name</span></li>
                                                        <li><i className="bi-person dropdown-item-icon"></i>{currentUser.displayName}</li>
                                                        <li className="pt-4 pb-0"><span className="card-subtitle">Email Adresse</span></li>
                                                        <li><i className="bi-at dropdown-item-icon"></i>{currentUser.email}</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-8">
                                            <div className="card mb-3 mb-lg-5">
                                                <div className="card-header card-header-content-between">
                                                    <h4 className="card-header-title">Wo kaufst du ein ?</h4>
                                                </div>
                                                <div className="card-body">
                                                    <div className="row align-items-center flex-grow-1 mb-2">
                                                        <div className="col">
                                                            <h4 className="card-header-title">Stores</h4>
                                                        </div>
                                                        <div className="col-auto">
                                                            <span className="text-dark bold">{stores.length}</span> Einkäufe
                                                        </div>
                                                    </div>
                                                    <div className="progress rounded-pill mb-3">
                                                        {
                                                            Object.entries(count).map((key, value) => {
                                                                return (
                                                                    <div key={value} className={"progress-bar " + styles[value]} role="progressbar" style={{ width: Math.round((key[1] / stores.length) * 100) + "%" }}
                                                                        aria-valuenow="33" aria-valuemin="0" aria-valuemax="100"></div>
                                                                )
                                                            })
                                                        }
                                                    </div>

                                                    <ul className="list-inline list-px-2">
                                                        <li className="list-inline-item">Stores: </li>
                                                        {
                                                            Object.entries(count).map((key, value) => {
                                                                return (
                                                                    <li className="list-inline-item"><span className={"legend-indicator " + styles[value]}></span>{key[0]} : {key[1]}</li>
                                                                )
                                                            })
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card card-lg mb-3 mb-lg-5">
                                            <div className="card-body text-center">

                                                <div className="mb-3">
                                                    <h3>Email Verifikation</h3>
                                                    <p>Schütze dein Account und bestätige deine Email</p>
                                                </div>

                                                <a className="btn btn-primary" >Verifikation starten</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }


}

export default Account;