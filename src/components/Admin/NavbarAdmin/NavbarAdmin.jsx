import React from 'react';
import "./NavbarAdmin.css";

function NavbarAdmin(props) {
    return (
        <>
            <header>
                <div className="header_left">
                   <i class="fa-solid fa-magnifying-glass"></i>
                   <i class="fa-solid fa-bell"></i>
                   <i class="fa-regular fa-envelope"></i>
                </div>
                <div className="header_right">
                     <div className="logo">
                        <img src="https://investone-law.com/wp-content/uploads/2019/06/quoc-ky-viet-nam.jpg" alt="" />
                     </div>
                     <div className="avatar">
                        <img src="https://ict-imgs.vgcloud.vn/2020/09/01/19/huong-dan-tao-facebook-avatar.jpg" alt="" />
                     </div>
                </div>
            </header>
        </>
    );
}

export default NavbarAdmin;