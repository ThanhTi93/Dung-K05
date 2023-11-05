import React from 'react';
import "./NavbarAdmin.css";

function NavbarAdmin(props) {
    return (
        <>
            <header>
                <div className="header_left">
                   <i class="fa-solid fa-magnifying-glass"></i>
                   <i class="fa-solid fa-bell"></i>
                   <i class="fa-solid fa-film"></i>
                </div>
                <div className="header_right">
                     <div className="logo">
                        <img src="https://luatduonggia.vn/wp-content/uploads/2022/03/Co-My-co-bao-nhieu-mau.jpg" alt="" />
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