import React from 'react'
import './Footer.css'
import footer_image from '../assets/logo.png'
import insta_img from '../assets/instagram.png'
import fb_img from '../assets/facebook.png'
import print_img from '../assets/pinterest.jpg'
import whatsup_img from '../assets/whatsapp.png'

export const Footer = () => {
  return (
    <div className='footer'>
        <div className='footer-logo'>
            <img src={footer_image} alt=""/>
            <p>TRENDORA</p>
        </div>
        <ul className='footer-links'>
            <li>Company</li>
            <li>Products</li>
            <li>Offices</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
        <div className='footer-social-icons'>
            <div className='footer-icons-container'>
                <img src={insta_img} alt=""/>
            </div>
            <div className='footer-icons-container'>
                <img src={fb_img} alt=""/>
            </div>
            <div className='footer-icons-container'>
                <img src={print_img} alt=""/>
            </div>
            <div className='footer-icons-container'>
                <img src={whatsup_img} alt=""/>
            </div>
        </div>
        <div className="footer-copyright">
            <hr/>
            <p>copyright @ 2026 - All Right Reservrd</p>
        </div>
    </div>

  )
}
