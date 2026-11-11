
import React from 'react'
import './Hero.css'

import hero_hand from '../assets/herohand.png'
import arrow from '../assets/arrow.jpg'
import hero_img from '../assets/homebanner.png'

export const Hero = () => {
  return (
    <div className='hero'>

      <div className="hero-left">

        <h2>NEW ARRIVALS ONLY</h2>

        <div className="hero-text">

          <div className="hero-hand-icon">
            <p>New</p>
            <img src={hero_hand} alt="hand" />
          </div>

          <p>collections</p>
          <p>for everyone</p>

        </div>

        <div className="hero-latest-btn">
          <div>Latest Collections</div>
          <span>→</span>
        </div>

      </div>

      <div className="hero-right">
        <img src={hero_img} alt="New collections" />
      </div>

    </div>
  )
}
