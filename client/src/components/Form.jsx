import React, { useState ,useEffect } from "react";
import AddressDetails from "./AddressDetails";
import BookDetails from "./BookDetails";
import './styles/form.css'
import axios from 'axios'
import { useNavigate} from 'react-router-dom'
import { host } from "../utils/apiRoutes";
import TextScroller from './TextScroller';

function Form() {
  const navigate = useNavigate();
  const initialdata = {
    email: "",
    country : "",
    state :"",
    city :"",
    detail : "",
    pincode :"",
    lat:"",
    lng:"",
    category :"",
    subcategory :"",
    field :"",
    subject:"",
    bookname :"",
    author:"",
    other:"",
    file:[],
    filepreview:null,
  }
  const [page, setPage] = useState(0);
  const FormTitles = ["BookDetails" , "Pickup Address"];
  const [formData, setFormData] = useState(initialdata);

  useEffect(() => {
    const user_email = localStorage.getItem('books_connect_email');
    if(user_email === null){
      navigate('/signin');
    }
    setFormData({ ...formData, email:user_email });
  }, [formData.email]);

  
  const formSubmit = async () =>{
    const donordata = new FormData(); 
     donordata.append('avatar', formData.file);
    donordata.append('email', formData.email);
    donordata.append('country', formData.country);
    donordata.append('detail', formData.detail);
    donordata.append('state', formData.state);
    donordata.append('city', formData.city);
    donordata.append('pincode', formData.pincode);
    donordata.append('lat', formData.lat);
    donordata.append('lng', formData.lng);
    donordata.append('bookname', formData.bookname);
    donordata.append('author', formData.author);
    donordata.append('other', formData.other);
    donordata.append('category', formData.category);
    donordata.append('subcategory', formData.subcategory);
    donordata.append('field', formData.field);
    donordata.append('subject', formData.subject);
    setFormData(initialdata);

    const config = {     
      headers: { 'content-type': 'multipart/form-data' }
    }
    axios.post( `${host}/post/addbook`, donordata, config)
    .then(res => { 
      console.log(res);
    })
  }

  const PageDisplay = () => {
    if (page === 0) {
      return <BookDetails formData={formData} setFormData={setFormData} />;
    } else {
      return <AddressDetails formData={formData} setFormData={setFormData} />;
    } 
  };

  return (

    <>
  
    <form className="form" encType="multipart/form-data">
      <div className="form-container">
        <div className="header">
          <h2>{FormTitles[page]}</h2>
        </div>
        <div className="body">
          {PageDisplay()}
          </div>
        
        <div className="footer">
          <button disabled={page == 0}  onClick={() => {setPage((currPage) => currPage - 1);}}> Prev  </button>
          <button
          onClick={(e) => {
            if (page === FormTitles.length - 1) {
              if(  
              formData.detail === ""  || 
              formData.country === ""  || 
              formData.state === ""  || 
              formData.city === ""  || 
              formData.pincode === ""  ||
              formData.lat === ""  || 
              formData.lng === ""  ||
              // Book details
              formData.category === ""  || 
              formData.subcategory === ""  || 
              formData.bookname === ""  || 
              formData.author=== ""  
              )
              {
                console.log(formData);
                alert("kindly fill all the fields");
                return;
              }
              alert("FORM SUBMITTED");
              console.log(formData);
              formSubmit(e);
            } else {
              setPage((currPage) => currPage + 1);
            }
          }}
        >
          {page === FormTitles.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </form>
    </>
  
  );
}

export default Form;
