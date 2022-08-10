import './style.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { db } from './firebase-config';
import { collection, getDocs } from "firebase/firestore";
import BillCard from './BillCard';

function Dashboard() {
    const [currentBill, setCurrentBill] = useState("");
    const [billsMap, setBillsMap] = useState(new Map());
    const [keys, setKeys] = useState([]);
    const [billStyleIndicator, setStyleIndicator] = useState("visible");
    const [billClassIndicator, setClassIndicator] = useState("js-offcanvas-start offcanvas offcanvas-start splitted-content-small splitted-content-bordered d-flex flex-column");
    const [count, increaseCount] = useState(0);


    useEffect(() => { window.addEventListener("resize", handleResize) })

    useEffect(() => { fetchData() }, []);

    async function fetchData() {
        const querySnapshot = await getDocs(collection(db, "bills"));
        querySnapshot.forEach((doc) => {
            setBillsMap(new Map(billsMap.set(doc.id, doc.data())));
            setKeys(currentArray => [...currentArray, doc.id]);
        });
    }

    function handleCardToggle() {
        if (count % 2 === 0) {
            setStyleIndicator("visible");
            setClassIndicator("js-offcanvas-start offcanvas offcanvas-start splitted-content-small splitted-content-bordered d-flex flex-column show");
        } else {
            setStyleIndicator("hidden");
            setClassIndicator("js-offcanvas-start offcanvas offcanvas-start splitted-content-small splitted-content-bordered d-flex flex-column");
        }
        increaseCount(count => count + 1);
    }

    const handleResize = () => {
        if (window.innerWidth <= 720) {
            setStyleIndicator("hidden");
        }
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
                                    <a className="nav-link " data-placement="left">
                                        <span className="nav-link-title">Dashboard</span>
                                    </a>
                                </div>
                                <div className="nav-item">
                                    <a className="nav-link " href="/history" data-placement="left">
                                        <span className="nav-link-title">Historie</span>
                                    </a>
                                </div>
                                <div className="nav-item">
                                    <a className="nav-link " href="/createBill" data-placement="left">
                                        <span className="nav-link-title">Kassenzettel erstellen</span>
                                    </a>
                                </div>
                                <div className="nav-item">
                                    <a className="nav-link " href="/account" data-placement="left">
                                        <span className="nav-link-title">Dein Konto</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </aside>

            <div className="main splitted-content-main">
                <div className={billClassIndicator} tabIndex="-1" id="splittedOffcanvasContent" style={{ visibility: billStyleIndicator }}>
                    <div className="offcanvas-body">
                        {
                            keys.map((item, key) => {
                                return (
                                    <div id={key}>
                                        <a className="card card-center card-transition" onClick={() => setCurrentBill(item)}>
                                            <div className="card-body">
                                                <span className="card-subtitle">{billsMap.get(item).store}</span>
                                                <h3 className="card-title">{billsMap.get(item).date} - {billsMap.get(item).time}</h3>
                                                <p className="card-text text-body">#{item}</p>
                                            </div>
                                        </a>
                                        <hr />
                                    </div>

                                );
                            })
                        }
                    </div>
                </div>

                <div className="splitted-content-fluid content-space" id="bill">
                    <div className="d-flex d-xl-none justify-content-end mt-3 me-3">
                        <ul className="list-inline">
                            <li className="list-inline-item">
                                <button className="navbar-toggler splitted-content-toggle">
                                    <span className="navbar-toggler-default">
                                        <i></i>
                                    </span>
                                    <span className="navbar-toggler-toggled">
                                        <i className="bi-x"></i>
                                    </span>
                                </button>
                            </li>

                            <li className="list-inline-item">
                                <button className="navbar-toggler splitted-content-toggle" onClick={() => { handleCardToggle() }}>
                                    <i>Open Bills</i>
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="mt-xl-10">
                        <div className="row">
                            <div className="col-lg-12"> {<BillCard props={currentBill} bills={billsMap} />}</div>
                        </div>
                    </div>
                </div>

            </div>

        </div >
    );

}

export default Dashboard;
