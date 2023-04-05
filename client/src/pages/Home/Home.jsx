import React from 'react'
import './home.css'
import { Link } from 'react-router-dom'
import { grades , fields} from '../../utils/booksData';
import Navbar from '../../components/Navbar';
import Banner from '../../components/Banner';
import Footer from '../../components/Footer';
import img1 from '../../utils/pics/book.jpeg';

export default function Home() {
  
  const school_options = grades.map((el) => <a href={`/books/school/${el}`} key={el}>{el}</a>); 
  const college_options = fields.map((el) => <a href={`/books/college/${el}`} key={el}>{el}</a>); 
  
  return (
    <>
      
     <div className="home_sweet_home">
     <section className="banner">
        <Banner img={img1} />
      </section>
      <section className="find_books" >
        <div className="dntbtn">Find Books</div>
        <div className="container">
        <div className="dropdown">
          <button className="dropbtn">Grade 1st to 12th 
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-content">
            {
              school_options
            }
          </div>
        </div>

        <div className="dropdown">
          <button className="dropbtn">College / Degree
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-content">
            {
              college_options
            }
          </div>
        </div>

      </div>
      </section>
     <footer className='home_footer'>
      <Footer/>
     </footer>
     </div>
    </>
   
  )
}
