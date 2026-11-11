import React from 'react'
import './BreadCrums.css';
import arrow_img from '../assets/right.png';


export const BreadCrums = (props) => {
    const {product} = props;

  return (
    <div className='breadcrum'>
        HOME <img src={arrow_img} alt=""/> SHOP <img src={arrow_img} alt=""/> {product.category} <img src={arrow_img} alt=""/> {product.name}
    </div>
  )
}
