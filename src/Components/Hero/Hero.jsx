import './Hero.css'
import { useState } from 'react'

const Hero = ({heroData,setHeroCount,heroCount,setPlayStatus,PlayStatus}) => {
    return(
      <div className='hero'>
        <div className='hero-text'>
            <p>{heroData.text1}</p>
            <p>{heroData.text2}</p>
        </div>
        <div className='hero-dot-play'>
            <ul className='hero-dots'>
                <li onClick={()=>setHeroCount(0)} className={heroCount===0?"hero-dot oranges":"hero-dot"}></li>
                <li onClick={()=>setHeroCount(1)} className={heroCount===1?"hero-dot oranges":"hero-dot"}></li>
                <li onClick={()=>setHeroCount(2)} className={heroCount===2?"hero-dot oranges":"hero-dot"}></li>
            </ul>
        </div>
      </div>
    )
  }
  
  export default Hero