import React from 'react'
import './styles/banner.css'



export default function Banner({img}) {

  return (
    <>
    <div className="images">
        <img  alt='donate-books' src={img} style = {{width:'100%'}}/>
    </div>
    <div class="main slide-right">
       {/* <TextScroller text={'Get free books , donated to promote literacy.'}/> */}
    </div>
    <br/>
    </>
  )
}

