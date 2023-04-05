import React ,{useState} from 'react'
import './styles/signup.css'
import { host } from '../utils/apiRoutes'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const initialdata = {
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    education:'',
    confirmP:''
  }
  const [formData, setFormData] = useState(initialdata);
  
  const sendEmail = () => {
    // emailjs.send("service_hm7hog8","template_7oy5vff",{
    //         // book_name: `${book_name}`,
    //         // reciever: `${reciever_mailid}`,
    //         })
    //         .then(function(response) {
    //             alert("Request sent successfully");
    //             console.log('SUCCESS!', response.status, response.text);
    //          }, function(error) {
    //             console.log('FAILED...', error);
    //          });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {     
      headers: { 'content-type': 'application/json' }
    }

    let data = new FormData();
    data.append('firstName', formData.firstName); 
    data.append('lastName', formData.lastName); 
    data.append('email', formData.email); 
    data.append('password', formData.password); 
    data.append('education', formData.education); 
    setFormData(initialdata);
    
    axios.post(`${host}/post/signup`, data, config)
    .then(response => {
        console.log(response);
        navigate('/')
    })
    .catch(error => {
        console.log(error);
    });
  }
  return (
    <>
    <div  className="signup_form"  >
    <form className="signup_container" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <p>Please fill in this form to create an account.</p>
        <hr/>
        <label htmlFor="firstname"><b>First Name</b></label>
        <input type="text" maxLength={60} placeholder="Enter first name" name="firstname"  value={formData.firstName}
        onChange={(e) => {
          setFormData({ ...formData, firstName: e.target.value });
        }} required/>

        <label htmlFor="lastname"><b>Last Name</b></label>
        <input type="text" maxLength={60} placeholder="Enter last name" name="lastname" value={formData.lastName}
         onChange={(e) => {
          setFormData({ ...formData, lastName: e.target.value });
        }} required/>

        <label htmlFor="email"><b>Email</b></label>
        <input type="text" maxLength={60} placeholder="Enter Email" name="email"  value={formData.email}
        onChange={(e) => {
          setFormData({ ...formData, email: e.target.value });
        }} required/>

        <label htmlFor="education"><b>Current Education Status</b></label>
        <input type="text" maxLength={60} placeholder="eg.Pursuing MBBS,8th grade, Graduate etc" name="education"  value={formData.education}
        onChange={(e) => {
          setFormData({ ...formData, education: e.target.value });
        }} required/>

        <label htmlFor="password"><b>Password</b></label>
        <input maxLength={20} type="password" placeholder="Enter Password" name="password" value={formData.password}
         onChange={(e) => {
          setFormData({ ...formData, password: e.target.value });
        }} required/>

        <div className="clearfix">
        <button type='submit' >Submit</button>
        </div>
    </form>
    <p style={{paddingLeft:'10px'}}>Already have an account ?</p>
    <div className="buttons" style={{display:'flex' , gap:'10px' , margin:'20px'}}>
    <button><a href='/signin'>Signin</a> </button>
    <button><a href='/'>Back to Home</a> </button>
    </div>
    </div>
    </>
  )
}
