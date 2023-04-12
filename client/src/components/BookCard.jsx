import React from 'react'
import './styles/bookcard.css'

export default function BookCard({id,book}) {


    // const sendEmail = (e) => {
    //     e.preventDefault();
    //     // emailjs.send("service_hm7hog8","template_7oy5vff",{
    //     //         // book_name: `${book_name}`,
    //     //         // reciever: `${reciever_mailid}`,
    //     //         })
    //     //         .then(function(response) {
    //     //             alert("Request sent successfully");
    //     //             console.log('SUCCESS!', response.status, response.text);
    //     //          }, function(error) {
    //     //             console.log('FAILED...', error);
    //     //          });
    // };
    console.log(book);
    
  return (
    <div className="book_card">
       <div className="flip-card">
            <div className="flip-card-inner">
                <div className="flip-card-front">
                <img src={require(`../images/${book.image}`)} alt={`${book.bookname}`} style={{maxWidth :"250px" , height :"300px"  }}/>
                <div className="book_details">
                    <div className="book_name">Book name : {book.bookname}</div>
                    <div className="author">Author : {book.author}</div>
                    <div className="other">Book details : {book.other}</div>
                </div>
                </div>
                <div className="flip-card-back">
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
                <p>
                    {/* <button class="mailsend" onClick={sendEmail}> <a href="#"  className="mail">Request Book</a></button> */}
                </p>
                <p>
                <button class="cntbtn">
                    <a href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=preethiashok05@gmail.com" target="_blank" rel='noreferrer' className="mail">Contact</a>
                    </button></p>
                </div>
            </div>
            </div>
    </div>
  )
}
