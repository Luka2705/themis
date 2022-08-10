import './style.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { doc, setDoc } from "firebase/firestore";

function Dashboard() {

  const [billentries, addBillEntrie] = useState(new Map());
  const [quantityCounter, setCounter] = useState(1);
  const [pricePerUnit, setpricePerUnit] = useState(0.0);

  useEffect(() => {
    addBillEntrie(new Map(billentries.set(0, ["Item", 1, 0])));
    Array.from(billentries.values()).map((item, key) => {
      console.log(item);
    })
    
  }, []);

  if (billentries.size == 0) {
    return (
      <div>

      </div>
    );
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
                  <button className="navbar-toggler splitted-content-toggle">
                    <i>Open Bills</i>
                  </button>
                </li>
              </ul>
            </div>
            <div className="mt-xl-10">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card card-lg">
                    <div className="card-body">

                      <div className="row justify-content-lg-between">
                        <div className="col-sm">
                          <div className="mb-1">
                            <dl className="row align-items-sm-center mb-3">
                              <h2 className="col-md mb-2 mb-sm-0">Date: </h2>
                              <dd className="col-md-auto mb-0">
                                <input type="text" className="form-control col-md mb-2 mb-sm-0" placeholder="" aria-label="" defaultValue={"12.Mai.2021"} />
                              </dd>
                            </dl>
                          </div>
                        </div>
                        <div className="col-sm order-1 order-sm-2 text-sm-end mb-1">
                          <div className="col-sm">
                            <div className="mb-1">
                              <dl className="row align-items-sm-center mb-3">
                                <h1 className="text-primary col-md mb-2 mb-sm-0">Store: </h1>
                                <dd className="col-md-auto mb-0">
                                  <input type="text" className="form-control w-auto" placeholder="" aria-label="" defaultValue={"Lidl"} />
                                </dd>
                              </dl>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-auto order-1 order-sm-2 text-sm-end mb-1">
                          <div className="mb-1">
                            <dl className="row align-items-sm-center mb-3">
                              <h2 className="col-md text-sm-end mb-2 mb-sm-0">Invoice #</h2>
                              <dd className="col-md-auto mb-0">
                                <input type="text" className="form-control w-auto" placeholder="" aria-label="" defaultValue={"0982131"} />
                              </dd>
                            </dl>
                          </div>
                        </div>
                      </div>

                      <hr className="my-5" />

                      <div className="bg-light border-bottom p-2 mb-3">
                        <div className="row">
                          <div className="col-sm-5">
                            <h6 className="card-title text-cap">Item</h6>
                          </div>

                          <div className="col-sm-3 d-none d-sm-inline-block">
                            <h6 className="card-title text-cap">Quantity</h6>
                          </div>

                          <div className="col-sm-2 d-none d-sm-inline-block">
                            <h6 className="card-title text-cap">Rate</h6>
                          </div>

                          <div className="col-sm-2 d-none d-sm-inline-block">
                            <h6 className="card-title text-cap">Amount</h6>
                          </div>
                        </div>
                      </div>

                      {
                        Array.from(billentries.values()).map((item, key) => {
                          return (
                            <div key={key} className="row">
                              <div className="col-md-5">
                                <input type="text" className="form-control mb-3" placeholder={item[0]} aria-label="Item name"/>
                              </div>

                              <div className="col-12 col-sm-auto col-md-3">
                                <div className="quantity-counter mb-3">
                                  <div className="js-quantity-counter row align-items-center">
                                    <div className="col">
                                      <input className="js-result form-control form-control-quantity-counter" type="text" value={quantityCounter} onChange={(e) => {}}/>
                                    </div>

                                    <div className="col-auto">
                                      <a className="js-minus btn btn-white btn-xs btn-icon rounded-circle" onClick={() => setCounter(quantityCounter - 1)}>
                                        <svg width="8" height="2" viewBox="0 0 8 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M0 1C0 0.723858 0.223858 0.5 0.5 0.5H7.5C7.77614 0.5 8 0.723858 8 1C8 1.27614 7.77614 1.5 7.5 1.5H0.5C0.223858 1.5 0 1.27614 0 1Z" fill="currentColor" />
                                        </svg>
                                      </a>
                                      <a className="js-plus btn btn-white btn-xs btn-icon rounded-circle" onClick={() => setCounter(quantityCounter + 1)}>
                                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M4 0C4.27614 0 4.5 0.223858 4.5 0.5V3.5H7.5C7.77614 3.5 8 3.72386 8 4C8 4.27614 7.77614 4.5 7.5 4.5H4.5V7.5C4.5 7.77614 4.27614 8 4 8C3.72386 8 3.5 7.77614 3.5 7.5V4.5H0.5C0.223858 4.5 0 4.27614 0 4C0 3.72386 0.223858 3.5 0.5 3.5H3.5V0.5C3.5 0.223858 3.72386 0 4 0Z" fill="currentColor" />
                                        </svg>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="col-12 col-sm col-md-2">
                                <div className="mb-3">
                                  <input id="pricePerUnitIndicator" type="number" className="form-control" aria-label="00" value={pricePerUnit} onChange={(e) => setpricePerUnit(e.target.value)}/>
                                </div>
                              </div>

                              <div className="col col-md-2">
                                <input type="number" className="form-control-plaintext mb-3" placeholder="$0.00" aria-label="$0.00" />
                              </div>
                            </div>
                          );

                        })
                      }



                      <a className="js-create-field form-link" onClick={() => addBillEntrie(new Map(billentries.set(billentries.size + 1, ["Item", 1, 0])))}><i className="bi-plus"></i>Add item</a>

                      <hr className="my-5" />

                      <div className="row justify-content-md-end mb-3">
                        <div className="col-md-auto">
                          <dl className="row text-md-end">
                            <dt className="col-md-6">Subtotal:</dt>
                            <dd className="col-md-6">$0.00</dd>
                            <dt className="col-md-6">Total:</dt>
                            <dd className="col-md-6">$0.00</dd>
                          </dl>
                        </div>
                      </div>
                      <button className="btn btn-primary">Submit</button>
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

export default Dashboard;
