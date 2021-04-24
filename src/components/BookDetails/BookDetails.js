import { useHistory } from 'react-router';
import './BookDetails.css'
const BookDetails = (props) => {
    const history = useHistory();
    const {bookName,bookAuthor,imageUrl,bookPrice} =props.name;
    const handlebook=(name,price)=>{
        history.push(`/checkout/${name}/${price}`) 
    }
    return (
        <div className="col-md-3 mt-3">
             <div className="card text-center">
             <img className="mx-auto p-2" src={imageUrl} alt="Card  cap"/>
                <div className="card-body">
                    <h5 className="card-title">{bookName}</h5>
                    <p className="text-secondary">Written By : {bookAuthor}</p>
                     <span className="text-primary mr-5" style={{fontSize : "25px" , fontWeight : 'bold'}}>${bookPrice}</span>
                    <button className="btn btn-primary ml-5" onClick={()=>handlebook(bookName,bookPrice)}>Buy Now</button>
                </div>
             </div>
        </div>
    );
};

export default BookDetails;