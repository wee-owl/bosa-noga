import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorPage from './components/ErrorPage/ErrorPage';
import HomePage from './components/HomePage/HomePage';
import Contacts from './components/Contacts/Contacts';
import Catalog from './components/Catalog/Catalog';
import Product from './components/Product/Product';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import About from './components/About/About';
import banner from './assets/img/banner.jpg';
import Cart from './components/Cart/Cart';
import './App.css';


function App() {
  return (
    <BrowserRouter>
      <Header/>
      <main className="container">
        <div className="row">
          <div className="col">
            <div className="banner">
              <img src={banner} className="img-fluid" alt="К весне готовы!"/>
              <h2 className="banner-header">К весне готовы!</h2>
            </div>
            <Routes>
              <Route path='/bosa-noga/cart' Component={Cart}/>
              <Route path='/bosa-noga/about' Component={About}/>
              <Route path='/bosa-noga' Component={HomePage}/>
              <Route path='/bosa-noga/catalog' Component={Catalog}/>
              <Route path='/bosa-noga/error' Component={ErrorPage}/>
              <Route path='/bosa-noga/contacts' Component={Contacts}/>
              <Route path='/bosa-noga/catalog/:id' Component={Product}/>
            </Routes>
          </div>
        </div>
      </main>
      <Footer/>
    </BrowserRouter>
  );
};

export default App;
