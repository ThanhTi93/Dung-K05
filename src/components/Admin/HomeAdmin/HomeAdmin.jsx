import React from 'react';
import "./HomeAdmin.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Dashboard from '../Dashboard/Dashboard';
import Categories from '../Categories/Categories';
import NavbarAdmin from '../NavbarAdmin/NavbarAdmin';
function HomeAdmin(props) {
  return (
    <BrowserRouter>
      <div className='container-fluid admin'>
        <div className="admin_left">
          <div className="left_laptop">
            <h1>Sufee Admin</h1>
            <div className="icon">
              <i class="fa-solid fa-graduation-cap"></i>
            </div>
            <hr />
            <Link className="group" as={Link} to="/">
              <i class="fa-solid fa-chart-simple"></i>
              <p>Dashboard</p>
            </Link>
            <Link className="group" as={Link} to="/categories">
              <i class="fa-solid fa-building-columns"></i>
              <p>Categories</p>
            </Link>
            <div className="group">
              <i class="fa-solid fa-chart-simple"></i>
              <p>Products</p>
            </div>
            <div className="group">
              <i class="fa-solid fa-chart-simple"></i>
              <p>Orders</p>
            </div>
            <div className="group">
              <i class="fa-solid fa-chart-simple"></i>
              <p>User</p>
            </div>
            <div className="group">
              <i class="fa-solid fa-chart-simple"></i>
              <p>Profile</p>
            </div>
          </div>
          <div className="left_laptop_small">
            <h1>S</h1>
            <div className="icon">
              <i class="fa-solid fa-building-columns"></i>
            </div>
            <hr />
            <div className="group">
              <i class="fa-solid fa-chart-simple"></i>
            </div>
            <div className="group">
              <i class="fa-solid fa-building-columns"></i>
            </div>
            <div className="group">
              <i class="fa-solid fa-chart-simple"></i>
            </div>
            <div className="group">
              <i class="fa-solid fa-chart-simple"></i>
            </div>
            <div className="group">
              <i class="fa-solid fa-chart-simple"></i>
            </div>
            <div className="group">
              <i class="fa-solid fa-chart-simple"></i>
            </div>
          </div>
          <div className="left_laptop_mobile">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
              <div class="container-fluid">
                <a class="navbar-brand" href="#">Navbar</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                      <a class="nav-link active" aria-current="page" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">Link</a>
                    </li>
                    <li class="nav-item dropdown">
                      <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Dropdown
                      </a>
                      <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><hr class="dropdown-divider" /></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                      </ul>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link disabled">Disabled</a>
                    </li>
                  </ul>
                  <form class="d-flex">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button class="btn btn-outline-success" type="submit">Search</button>
                  </form>
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
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default HomeAdmin;