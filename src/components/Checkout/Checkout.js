import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import axios from 'axios';

const Book = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [data, setData] = useState([])
    const [bookName, setBookName] = useState('')
    const [bookPrice, setBookPrice] = useState()
    const [quantity, setQuantity] = useState(1)
    const [date, setDate] = useState(0)
    const {name,price} = useParams();

    useEffect(() => {
            setBookName(name)
            setBookPrice(price);
            setDate(new Date())
    }, [])
   

   const handleCheckout =() =>{
    axios.post('https://damp-everglades-00089.herokuapp.com/checkout', {
        bookName: bookName,
        bookPrice: bookPrice,
        quantity : quantity,
        date : date,
        email : loggedInUser.email
    })
        .then((response) => {
            console.log(response)
        })
    
   }


    return (

        <div>

            <table class="table text-center mt-3">
                <thead>
                    <tr>
                        <th scope="col">Book Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                    </tr>
                </thead>
                <tbody>

                {
                    <tr>
                        <td>
                            {bookName}
                        </td>
                        <td>
                            {quantity}
                        </td>
                        <td>
                            $ {price}
                        </td>
                    </tr>
                }  
                </tbody>
            </table>
            <button className="btn btn-success d-flex mx-auto mt-5" onClick={handleCheckout}>Checkout</button>

        </div>
    );
};

export default Book;