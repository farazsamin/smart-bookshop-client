import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import loadingImg from '../../images/loading.gif'
const Admin = () => {
    const [bookName, setBookName] = useState('');
    const [bookAuthor, setBookAuthor] = useState('');
    const [bookPrice, setBookPrice] = useState(0);
    const [books, setBooks] = useState([])
    const [imageUrl, setImageUrl] = useState(null)
    const [date, setDate] = useState(0)
    const [loading, setLoading] = useState(true)
    const handleAddBook = () => {
        axios.post('https://damp-everglades-00089.herokuapp.com/addBook', {
            bookName: bookName,
            bookAuthor: bookAuthor,
            bookPrice: bookPrice,
            imageUrl: imageUrl,
            date: date
        })
            .then((response) => {
                console.log(response)
            })
        // window.location.reload();
    }

    useEffect(() => {
        axios.get('https://damp-everglades-00089.herokuapp.com/books').then((response) => {
            setBooks(response.data)
            setLoading(false)
        })
    }, [])

    const deleteBook = (id) => {
        axios.delete(`https://damp-everglades-00089.herokuapp.com/delete/${id}`, {
        })
        // window.location.reload();
    }

    const handleImageUpload = event => {
        console.log(event.target.files[0])
        const imageData = new FormData();
        imageData.set('key', 'dadd1c340e709dfd345e92ae94e9f9ba')
        imageData.append('image', event.target.files[0])
        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(function (response) {
                setImageUrl(response.data.data.display_url);

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className="d-flex text-center row">
            <div className="col-md-3">
                <div className="nav flex-column nav-pills sidebar mx-auto" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <a className="nav-link bg-secondary p-2 ml-3 mr-3 mt-3" id="v-pills-manage-books-tab" data-toggle="pill" href="#v-pills-manage-books" role="tab" aria-controls="v-pills-manage-books" aria-selected="true">Manage Books</a>
                    <a className="nav-link bg-secondary p-2 m-3" id="v-pills-add-book-tab" data-toggle="pill" href="#v-pills-add-book" role="tab" aria-controls="v-pills-add-book" aria-selected="false">Add Book</a>
                </div>
            </div>

            <div className="col-md-9">
                <div className="tab-content ml-5 content" id="v-pills-tabContent">
                    <div className="tab-pane fade show active" id="v-pills-manage-books" role="tabpanel" aria-labelledby="v-pills-manage-books-tab">
                        <table class="table mt-3">
                            <thead>
                                <tr>
                                    <th scope="col">Book Name </th>
                                    <th scope="col">Book Author</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    loading ? <img className="text-center m-auto" src={loadingImg} alt="" /> : books.map((val, key) => {
                                        return (
                                            <tr>
                                                <td>{val.bookName}</td>
                                                <td>{val.bookAuthor}</td>
                                                <td>$ {val.bookPrice}</td>
                                                <td>{<button className="btn btn-danger" onClick={() => deleteBook(val._id)}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button>}</td>
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </table>
                    </div>
                    <div className="tab-pane fade mt-3" id="v-pills-add-book" role="tabpanel" aria-labelledby="v-pills-add-book-tab">
                        <div className="form-group">
                            <label htmlFor="">Book Name : </label>
                            <input type="text" name="book-name" id="" onChange={
                                (event) => {
                                    setBookName(event.target.value);
                                }
                            } />
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Book Author : </label>
                            <input type="text" name="book-author" id="" onChange={
                                (event) => {
                                    setBookAuthor(event.target.value);
                                }
                            } />
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Book Price : </label>
                            <input type="text" name="price" id="" onChange={
                                (event) => {
                                    setBookPrice(event.target.value);
                                }
                            } />
                        </div>

                        <div className="form-group">
                            <label className="ml-5 mt-3" htmlFor="">Image :   </label>
                            <input className="ml-3" type="file" name="book-cover" id="" onChange={handleImageUpload} />
                        </div>


                        <button onClick={handleAddBook} className="btn btn-success mt-3">Add Book</button>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default Admin;