import React from 'react'
import './DescriptionBox.css'

export const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">Description</div>
            <div className="descriptionbox-nav-box fade">Reviews (125)</div>
        </div>
        <div className="descriptionbox-description">
            <p>Our e-commerce website, Shopora, is an online clothing shopping platform developed using React.js. It offers a wide range of fashion collections for men, women, and kids. Users can browse products, view product details, check prices, and select their preferred sizes. The website includes features like product categories, product filtering, and a shopping cart. It provides a user-friendly and responsive design for desktop, tablet, and mobile devices. Our main goal is to provide customers with a simple, smooth, and convenient online shopping experience.</p>
            <p>
              Shopora is a modern online fashion store designed to make shopping easy and enjoyable. It provides different clothing options, including casual wear, formal wear, traditional outfits, and trendy collections. Customers can explore various products, compare prices, and view detailed product information. The website is built with React components to make the application reusable and easy to maintain. It also focuses on responsive design, allowing users to shop conveniently from any device. Shopora aims to deliver a better shopping experience with attractive designs and easy navigation.
            </p>
        </div>
    </div>
  )
}
