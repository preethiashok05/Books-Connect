import React from 'react'
import './styles/banner.css'

import TextScroller from './TextScroller';


export default function Banner({img}) {

  return (
    <>
    <div className="images">
        <img  src={img} style = {{width:'100%'}}/>
    </div>
    <div class="main slide-right">
       {/* <TextScroller text={'Get free books , donated to promote literacy.'}/> */}
    </div>
    <br/>
    </>
  )
}

