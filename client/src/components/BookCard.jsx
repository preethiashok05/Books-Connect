import React , {useState , useEffect} from 'react'
import './styles/bookcard.css'
import DatePicker   from  'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { clienthost } from '../utils/apiRoutes';

export default function BookCard({id,book}) {

    const [startDate, setStartDate] = useState(null);
    const [message, setmessage] = useState("");
    const [r_name, setr_name] = useState("");
    const [r_mail, setr_mail] = useState("");
    const navigate = useNavigate();
    
    const sendEmail = (e) => {
        let r_url = `${clienthost}/recievedinfo/${book.id}/${r_mail}`;
        let o_url = `${clienthost}/opinion/${book.id}/${r_mail}`;
        console.log(r_url);
        console.log(o_url);

        e.preventDefault();
        if(startDate === "" || r_name == ""){
            alert("Pickup date or Reciever name not mentioned. kindly fill it and try again");
            return;
        }
        alert('Loading ... ');
        off();
        // emailjs.send("service_l9bfzmq", "template_2y4vvn9",{
        //     book_name: `${book.bookname}`,
        //     donor: `${book.email}`,
        //     date : `${startDate}`,
        //     message : `${message}`,
        //     r_name : `${r_name}`,
        //     r_mail : `${r_mail}`,
        //     city : `${book.city}`,
        //     opinion :`${o_url}`,
        //     rcvd_info :`${r_url}`, 
        //     details : `${book.detail}`,
        //     pincode : `${book.pincode}`
        // } , "3rgEG2b-fIFbhlRd1")
        // .then(function(response) {
        //     alert("Request sent successfully ,You will recieve a mail once donor approves/rejects the request. Keep Reading Books !! ");
        //     console.log('SUCCESS!', response.status, response.text);
        //     }, function(error) {
        //     alert("Request failed , try some other time.")
        //     console.log('FAILED...', error);
        // });

        setr_mail('');
        setStartDate('');
        setmessage('');
    };
    
    useEffect(() => {
       if(book.down){
        document.getElementById(`bookimage${book.id}`).style.opacity = 0.3;
        document.getElementById(`flip-card-back${book.id}`).style.opacity = 0.3;
        document.getElementById(`contact${book.id}`).disabled = true;
        document.getElementById(`contact${book.id}`).style.cursor = 'none';
        document.getElementById(`down${book.id}`).style.opacity = 1;
       }
    }, [book.down]);

    function on() {
        const user_email = localStorage.getItem('books_connect_email');
        setr_mail(user_email);
        if(user_email === null){
        navigate('/signin');
        }
        document.getElementById(`overlay${book.id}`).style.display = "block";
      }
    function off() {
    document.getElementById(`overlay${book.id}`).style.display = "none";
    }
    
  return (
    <div className="book_card">
       <div className="flip-card">
            <div className="flip-card-inner">
                <div id={`flip-card-front${book.id}`} className='flip-card-front'>
                <img id = {`bookimage${book.id}`} src={require(`../images/${book.image}`)} alt={`${book.bookname}`} style={{maxWidth :"250px" , height :"300px"  }}/>
                <div className="book_details">
                    <div className="book_name">Book name : {book.bookname}</div>
                    <div className="author">Author : {book.author}</div>
                    <div className="other">Book details : {book.other}</div>
                </div>
                <div id={`down${book.id}`} className='down'>
                    <div className="downtext">Temporarily unavailable</div>
                </div>
                </div>

                <div className="flip-card-back" id={`flip-card-back${book.id}`}>
                    <p className='dnrdtls' >DONOR DETAILS</p>
                    <div className="donorinfo">
                        <div className="capitalise">{book.firstname} {book.lastname}</div>
                        <div className="edu">{book.education}</div>
                        <div className="em_ail">{book.email}</div>
                    </div>
                    
                    <div className="bla">Book Pickup Address :</div>
                    <div className="pickup">
                        <a className='link' href={`https://waze.com/ul?ll=${book.lat},${book.lng}&navigate=yes`} target="_blank" rel = 'noreferrer'>
                        Open Address in Waze </a>
                        <div className='details small'>destination address :</div>
                        <div className=" details small" id="clipboard">{book.lat} , {book.lng} </div>
                        <div className="details small">country : {book.country}</div>
                        <div className="details small">state :{book.state}</div>
                        <div className="details small">city : {book.city}</div>
                        <div className="details small">{book.detail}</div>
                        <div className="details small">pincode : {book.pincode}</div>             
                    </div>
                    <button class="cntbtn" id={`contact${book.id}`}  onClick={on}>Contact Donor</button>
                    {/* <a href={`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${book.email}`} target="_blank" rel='noreferrer' className="mail">Contact Donnor</a> */}
            
                    <div id={`overlay${book.id}`} className='overlay'>
                            <form id = "form-box" onSubmit={sendEmail} >
                            <DatePicker
                                    selected={startDate} 
                                    onChange={(date) => setStartDate(date)}
                                    minDate={new Date()}
                                    placeholderText="Select any date"  
                                />
                            <label>Kindly specify the date on which you will be collecting the book , so the donor can keep the books ready. </label>
                                <input type="text" placeholder='Your full name' onChange={(e) => setr_name(e.target.value)} />
                                <input type="text" placeholder='Additional message' onChange={(e) => setmessage(e.target.value)} />
                                <input type="checkbox" id='agree' required/>
                                <label for="agree">I agree to collect the books on above mentioned date . Incase failed we would consider you are not interested to collect the book. </label>
                                <p className='btns' onClick={off} >Cancel</p>
                                <button className='btn' type='submit' > Send </button>
                            </form>
                    </div>
                </div>
            </div>
            </div>
    </div>
  )
}
