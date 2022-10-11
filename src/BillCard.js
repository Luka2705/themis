import './style.css';
import React from 'react';
import { db } from './firebase-config';
import { doc, deleteDoc } from "firebase/firestore";
import Swal from 'sweetalert2'


function BillCard({ billID, bills }) {
    if (billID === "") {
        return (
            <div style={{ marginLeft: "30%", marginTop: "25%" }}>
                <h1 style={{ color: "#96684a" }}>Wähle links einen Kassenzettel aus, oder erstelle <a href="/createBill">hier</a> einen Kassenzettel</h1>
            </div >
        );
    }
    return (
        <div className="card card-lg " id="cardBill">
            <div className="card-body">
                <div className="row justify-content-lg-between">
                    <div className="col-sm">
                        <div className="col-sm">
                            <h2 className="col-sm-4">{bills.get(billID).date}</h2>
                        </div>

                    </div>
                    <div className="col-sm">
                        <div className="col-sm">
                            <h1 className="h2 col-sm-4 text-primary">{bills.get(billID).store}</h1>
                        </div>
                    </div>
                    <div className="col-sm-auto order-1 order-sm-2 text-sm-end mb-3">
                        <div className="mb-3">
                            <h2>Bill-ID</h2>
                            <span className="d-block" id="Bill-ID">#{billID}</span>
                        </div>
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="table table-borderless table-nowrap table-align-middle">
                        <thead className="thead-light">
                            <tr>
                                <th>Einkaufartikel</th>
                                <th>Anzahl</th>
                                <th>Preis pro Artikel</th>
                                <th className="table-text-end">Preis</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                Object.entries(bills.get(billID).boughtArticles).map((item, key) => {
                                    return (
                                        <tr key={key}>
                                            <th>{item[1].name}</th>
                                            <td>{item[1].quantity}</td>
                                            <td>{item[1].pricePerUnit}</td>
                                            <td className="table-text-end">{item[1].price}</td>
                                        </tr>
                                    );
                                })
                            }

                        </tbody>
                    </table>
                </div>
                <hr className="my-5" />
                <div className="row justify-content-md-end mb-3">
                    <div className="col-md-8 col-lg-7">
                        <dl className="row text-sm-end">
                            <h1 className="col-sm-6">Total:</h1>
                            <h1 className="col-sm-6">{bills.get(billID).payedPrice}</h1>
                        </dl>
                    </div>
                </div>
                <div className="row justify-content-lg-between">

                    <div className="col-sm">
                        <button className="btn btn-danger" onClick={() => deleteBill(billID)}>Weg Damit !</button>
                    </div>
                </div>
            </div>
        </div >

    );
}

async function deleteBill(billID) {
    Swal.fire({
        title: 'Warning!',
        text: 'Willst du den Kassenzettel wirklich löschen',
        icon: 'warning',
        showDenyButton: true,
        confirmButtonText: 'Löschen',
        denyButtonText: 'Abbrechen'
    }).then(async (result) => {
        if (result.isConfirmed) {
            await deleteDoc(doc(db, "bills", billID)).then(() => {
                Swal.fire({
                    title: 'Geschafft',
                    text: 'Kassenzettel wurde gelöscht',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    window.location.href = "/dashboard";
                });
            })
        } else if (result.isDenied) {
            Swal.fire({
                title: 'Info',
                text: 'Kassenzettel wurde nicht gelöscht',
                icon: 'info',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.href = "/dashboard";
            });
        }

    })
    /*
     
     */

}

export default BillCard;