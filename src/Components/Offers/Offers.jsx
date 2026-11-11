import React from 'react'
import './Offers.css'
import ex_img from '../assets/eximg.png'

export const Offers = () => {
  return (
    <div className='offers'>
        <div className='offers-left'>
            <h1>Exclusive</h1>
            <h1>Offers for you</h1>
            <p>ONLY ON BEST SELLERS PRODUCTS</p>
            <button>Check now</button>
        </div>
        <div className='offers-right'>
            <img src={ex_img} alt=" " />
        </div>
    </div>
  )
}
