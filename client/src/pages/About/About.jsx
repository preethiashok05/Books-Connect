import React from 'react'
import Banner from '../../components/Banner'
import donating from '../../utils/pics/Bookexchange.webp'
import Footer from '../../components/Footer.jsx'
import './about.css'
export default function About() {
  return (
   <>
    <section className="banner">
        <Banner img={donating}/>
      </section>
      <section className='about_container'>
        <div className="about_title">Our Story</div>
        <div className="text__t">
        <p>The rising cost of and access to  textbooks are influencing students quality of learning experience .</p>
        <p>Poor students find it difficult to buy textbooks , and cultivate alternative resource-seeking behaviours. Perceptions about affordability and academic value, access issues and consequential influences on 
study-related behaviours and attitudes are taken under consideration.</p>
        <p>Inorder to help underpriviliged students and increase their education quality , we are on a mission to create an ecosystem where students can get books for free by connecting with people who have them and are not using them any more .</p>
        <p>Students can find the required textbooks  and find the nearest donor via the pickup address provided behind every book info . </p>
        <p className='donor_rules' >Donor can donate new or gently used textbooks/guides related to any field of study to inspire a child and promote literacy .</p>
        <p>Students can even get in touch with the donor for any study related queries through their email provided.</p>
        </div>
      </section>
      <Footer/>
   </>
   
  )
}
