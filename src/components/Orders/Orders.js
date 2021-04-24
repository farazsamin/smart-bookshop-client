import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios'
import { UserContext } from '../../App';
import loadingImg from '../../images/loading.gif'
const Orders = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    useEffect(() => {
        axios.get('https://damp-everglades-00089.herokuapp.com/orders?email='+ loggedInUser.email).then((response) => {
            setOrders(response.data)
            setLoading(false)
        })
    }, [])

    return (
        <div>
            <table className="table text-center mt-3">
                <thead>
                    <tr>
                        <th scope="col">Book Name</th>
                        <th scope="col">Order Time</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                       
                    </tr>
                </thead>
                <tbody>
                    { 
                        loading ? <img className="text-center m-auto" src={loadingImg} alt=""/> : 
                        orders.map((val, key) => {
                            return (
                                <tr>
                                    <td>{val.bookName}</td>
                                    <td>{val.date}</td>
                                    <td>{val.quantity}</td>
                                    <td>${val.bookPrice}</td>
                                </tr>
                            )
                        })

                    }

                </tbody>
            </table>
        </div>
    );
};

export default Orders;