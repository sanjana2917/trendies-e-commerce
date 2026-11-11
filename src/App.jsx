
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Shop } from './Pages/Shop'
import { ShopCategory } from './Pages/ShopCategory'
import { Product } from './Pages/Product'
import { LoginSignup } from './Pages/LoginSignup'
import { Cart } from './Pages/Cart'
import { Footer } from './Components/Footer/Footer'
import { Navbar } from './Components/Navbar/Navbar'
import { ProtectedRoute } from './Components/ProtectedRoute/ProtectedRoute'

import men_banner from './Components/assets/menbanner1.webp'
import women_banner from './Components/assets/womenbanner2.jpg'
import kids_banner from './Components/assets/kidsbanner.jpg'

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Shop />} />

        <Route path="/mens" element={
          <ShopCategory banner={men_banner} category="mens" />
        } />

        <Route path="/womens" element={
          <ShopCategory banner={women_banner} category="women" />
        } />

        <Route path="/kids" element={
          <ShopCategory banner={kids_banner} category="kids" />
        } />

        <Route path="/product/:productId" element={<Product />} />

        <Route path="/login" element={<LoginSignup />} />

        <Route path="/cart" element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        } />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App
