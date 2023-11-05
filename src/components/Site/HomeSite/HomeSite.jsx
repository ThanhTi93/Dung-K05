import React from 'react';
import NavbarSite from "../NavbarSite/NavbarSite";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import Login from "../Login/Login";
function HomeSite(props) {
    return (
        <>
             <BrowserRouter>
                  <NavbarSite></NavbarSite>
                  <Routes>
                      <Route exact path="/" element={<Login></Login>} />
                  </Routes>
                  <Footer></Footer>
             </BrowserRouter>
        </>
    );
}

export default HomeSite;