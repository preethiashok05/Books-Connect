import React ,{useState} from 'react'
import './styles/signin.css'
import { host } from '../utils/apiRoutes'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signin() {
  
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email:'',
        password:'',
      });
     
      const handleSubmit = async (e) => {
        e.preventDefault();

        alert('Form Submitted Successfully');
        setFormData({
          email:'',
          password:'',
        })

        const config = {     
          headers: { 'content-type': 'application/json' }
        }
        
        let data = new FormData();
        data.append('email', formData.email); 
        data.append('password', formData.password); 

        axios.post(`${host}/post/signin`, data, config)
        .then(response => {
            console.log(response.status);
            if(response.status === 200){
              localStorage.setItem('books_connect_email',formData.email);
              navigate('/')
            }else if(response.status === 500){
              console.log('server error')
            }else{
              console.log(response.data.message);
            }
        })
        .catch(error => {
            console.log(error);
        });
    }
  return (
    <>
    <div className="signin_container" >

      <label htmlFor="email"><b>Enter Email</b></label>
      <input type="text" placeholder="Enter Enter Email" name="email" value={formData.email}
        onChange={(e) => {
          setFormData({ ...formData, email: e.target.value });
        }} required/>

      <label htmlFor="password"><b>Password</b></label>
      <input type="password" placeholder="Enter Password" name="password" value={formData.password}
      onChange={(e) => {
          setFormData({ ...formData, password: e.target.value });
      }} required/>

      <button onClick={handleSubmit} type="submit">Login</button>

      <div className="buttons" style={{display:'flex' , gap:'10px'}}>
      <button style={{backgroundColor:'green'}} ><a href='/signup'>Signup</a> </button>
      <button style={{backgroundColor:'green'}} ><a href='/'>Back to Home</a> </button>
    </div>
</div>
  
    </>
  )
}
