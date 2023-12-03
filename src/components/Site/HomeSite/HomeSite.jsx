import React from 'react';
import NavbarSite from "../NavbarSite/NavbarSite";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import Login from "../Login/Login";
import Main from "../Main/Main";
import Demo from "../Demo/Demo";
import ProductDetail from '../ProductDetail/ProductDetail';
function HomeSite(props) {
    return (
        <>
             <BrowserRouter>
                  <NavbarSite></NavbarSite>
                  <Routes>
                      <Route exact path="/" element={<Main></Main>} />
                      <Route exact path="/productdetail" element={<ProductDetail></ProductDetail>} />
                      <Route exact path="/demo" element={<Demo></Demo>} />
                  </Routes>
                  <Footer></Footer>
             </BrowserRouter>
        </>
    );
}

export default HomeSite;