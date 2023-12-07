import React, { useState } from 'react';
import "./HomeAdmin.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Dashboard from '../Dashboard/Dashboard';
import Categories from '../Categories/Categories';
import NavbarAdmin from '../NavbarAdmin/NavbarAdmin';
import Products from '../Products/Products';
import Orders from '../Orders/Orders';
import Users from '../Users/Users';
import Profile from '../Profile/Profile';
import dataArray1 from '../DataAdmin';
import Employees from "../Employees/Employees";

function HomeAdmin(props) {
  const [hidden, setHidden] = useState(false);
  const [clickedLinkId, setClickedLinkId] = useState(1);
  return (
    <BrowserRouter>
      <div className='container-fluid admin'>
        <div className="admin_left">
          <div className="left_laptop">
            <div className="header_admin_left">
              <h1 className={hidden ? '' : 'hidden'}>Sufee Admin</h1>
              <h1 className={hidden ? 'hidden' : ''}>S</h1>
              <div className="icon" onClick={() => setHidden(!hidden)}>
                <i class={`fa-solid fa-bars ${hidden ? '' : 'hidden'}`}></i>
                <i class={`fa-solid fa-hand-point-right ${hidden ? 'hidden' : ''}`}></i>
              </div>
            </div>
            <hr />
            {dataArray1.map(item => (
              <Link key={item.id}
                className={`group ${clickedLinkId === item.id ? 'clicked' : ''}`}
                as={Link}
                to={item.link}
                onClick={() => setClickedLinkId(item.id)}
              >
                <i className={item.icon}></i>
                <p className={hidden ? '' : 'hidden'}>{item.name}</p>
              </Link>
            ))}
          </div>
          <div className="left_mobile">
            <nav class="navbar navbar-expand-lg navbar-light">
              <div class="container-fluid">
                <a class="navbar-brand" href="#">Sufee Admin</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler">
                  <i class="fa-solid fa-bars"></i>
                  </span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    {dataArray1.map(item => (
                      <Link
                        key={item.id}
                        className={`nav-item ${clickedLinkId === item.id ? 'clicked' : ''}`}
                        as={Link}
                        to={item.link}
                        onClick={() => setClickedLinkId(item.id)}
                      >
                        <i className={item.icon}></i>
                        <a class={`nav-link ${clickedLinkId === item.id ? 'clicked' : ''}`} href="#">{item.name}</a>
                      </Link>                  
                    ))}
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
        <div className="admin_right">
          <NavbarAdmin></NavbarAdmin>
          <Routes>
            <Route exact path="/" element={<Dashboard></Dashboard>} />
            <Route exact path="/categories" element={<Categories></Categories>} />
            <Route exact path="/products" element={<Products></Products>} />
            <Route exact path="/orders" element={<Orders></Orders>} />
            <Route exact path="/users" element={<Users></Users>} />
            <Route exact path="/employees" element={<Employees></Employees>} />
            <Route exact path="/profile" element={<Profile></Profile>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default HomeAdmin;