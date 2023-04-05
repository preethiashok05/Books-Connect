import React , {useState , useEffect} from 'react'
import './styles/navbar.css'
import logo  from "../utils/pics/girl_kids_logo.jpeg";

export default function Navbar() {

    const [email, setemail] = useState("");
    function myFunction() {
        var x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
          x.className += " responsive";
        } else {
          x.className = "topnav";
        }
      }

      useEffect(() => {
        const donoremail = localStorage.getItem('books_connect_email');
        setemail(donoremail);
      }, []);

      const Logout = () =>{
        setemail("");
        localStorage.removeItem('books_connect_email')
      }
  return (
   <>
   <div className="topnav" id="myTopnav">
   <span className='logotitle'>BOOKS CONNECT</span>
    {/* <img src={logo} className='logo' height='45px' width='45px'  alt="logo"/> */}
    <a href="/" >Home</a>
    <a href="/donate">Donate Books</a>
    {email ? <a href="javascript:void(0);" onClick={Logout}>Logout</a> : <a href="/signup">SignUp / SignIn</a>}
    <a href="/about">About</a>
    <a href="javascript:void(0);" className="icon" onClick={myFunction}>
        <i className="fa fa-bars"></i>
    </a>
    </div>
   </>
  )
}
