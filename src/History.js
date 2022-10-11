import './style.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { db, auth } from './firebase-config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, getDocs, query, where } from "firebase/firestore";
import badge from './img/icons/person-badge.svg';
import clipboard from './img/icons/clipboard-data.svg'
import plus from './img/icons/plus-square.svg'
import hourglass from './img/icons/hourglass-split.svg'

function History() {
    const [currentUser, setUser] = useState({});
    const [billsMap, setBillsMap] = useState(new Map());
    const [keys, setKeys] = useState([]);
    const keysWithoutDuplicates = [...new Set(keys)];
    let stores = [];
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
                        <div className="page-header">
                            <div className="row align-items-end">
                                <div className="col-sm mb-2 mb-sm-0">
                                    <h1 className="page-header-title">Verlauf</h1>
                                    <span>Dein gesamter Kassenzettel Verlauf</span>
                                </div>

                                <div className="col-sm-auto">
                                    <a className="btn btn-primary" href="/createBill" data-bs-toggle="modal" data-bs-target="#newProjectModal">
                                        <i className="bi-plus me-1"></i> Neuer Kassenzettel
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="card mb-3 mb-lg-5">
                            <div className="card-body">
                                <div className="d-flex align-items-md-center">
                                    <div className="flex-shrink-0">
                                        <span className="display-5 text-muted">Du hast insgesamt </span><span className="display-3 text-dark"> {keysWithoutDuplicates.length} Kassenzettel</span>
                                    </div>

                                    <div className="flex-grow-1 ms-3">
                                        <div className="row mx-md-n3">
                                            <div className="col-md px-md-4">
                                                <span className="d-block"></span>
                                                <span className="badge bg-soft-danger text-danger rounded-pill p-1">
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-header-title">Kassenzettel Verlauf</h4>
                            </div>

                            <div className="table-responsive position-relative">
                                <table className="table table-borderless table-thead-bordered table-nowrap table-align-middle card-table">
                                    <thead className="thead-light">
                                        <tr>
                                            <th>Identifikation</th>
                                            <th>Status</th>
                                            <th>Preis</th>
                                            <th>Datum</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            keysWithoutDuplicates.map((key) => {
                                                return (
                                                    <tr>
                                                        <td><a href="#">#{key}</a></td>
                                                        <td><span className="badge bg-soft-success text-success">Finished</span></td>
                                                        <td>{billsMap.get(key).payedPrice}</td>
                                                        <td>{billsMap.get(key).date}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default History;