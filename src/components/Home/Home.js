import React, { useEffect, useState } from 'react';
import './Home.css'
import axios from 'axios';
import loadingImg from '../../images/loading.gif'
import BookDetails from '../BookDetails/BookDetails';
const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        axios.get('https://damp-everglades-00089.herokuapp.com/books').then((response) => {
            setBooks(response.data)
            setLoading(false)
        })
    }, [])
    return (
        <div className="row mt-5">
             {
                 loading ? <img className="text-center m-auto" src={loadingImg} alt=""/> :   books.map(name => <BookDetails name={name}></BookDetails>)
             }
            
        </div>
      
    );
};

export default Home;