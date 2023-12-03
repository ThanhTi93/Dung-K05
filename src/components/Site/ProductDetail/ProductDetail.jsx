import React from 'react';
import "./ProductDetail.css";
function ProductDetail(props) {
  return (
    <>
      <div className="container mt-3">
        <p>Shopee {'>'} Thiết bị điện tử {'>'} Iphone 15 Pro max</p>
        <div className="row product-briefing p-2 py-5">
          <div className="col-12 col-lg-5 ">
            <div className="product-img mb-3">
            <img src="https://cdn.tgdd.vn/Products/Images/42/317624/realme-c53-black-thumb-600x600.jpg" alt="" />
            </div>   
            <div className="img-demo">
               <div className="box">
               <img src="https://cdn.tgdd.vn/Products/Images/42/317624/realme-c53-black-thumb-600x600.jpg" alt="" />
               </div>
               <div className="box">
               <img src="https://cdn.tgdd.vn/Products/Images/42/317624/realme-c53-black-thumb-600x600.jpg" alt="" />
               </div>
               <div className="box">
               <img src="https://cdn.tgdd.vn/Products/Images/42/317624/realme-c53-black-thumb-600x600.jpg" alt="" />
               </div>
               <div className="box">
               <img src="https://cdn.tgdd.vn/Products/Images/42/317624/realme-c53-black-thumb-600x600.jpg" alt="" />
               </div>
               <div className="box">
               <img src="https://cdn.tgdd.vn/Products/Images/42/317624/realme-c53-black-thumb-600x600.jpg" alt="" />
               </div>
            </div>
          </div>
          <div className="col-12 col-lg-7">
            <h3>Tws Tai Nghe Chụp Tai bluetooth 5.2 Âm Thanh hifi Kiểu Dáng</h3>
            <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i
              class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
            <div className="img-sale mt-2">
              <img src="https://cdn.tgdd.vn/2023/09/banner/1200x150-tgdd-1200x150-1.png" alt="" />
            </div>
            <div className="price">
              <span className='price-old'>447.290đ</span> <span className='price-new ms-3'>347.290đ</span>
            </div>
            <div className="convert">
              <div className="convert-box">
                <p>Vận chuyển</p>
              </div>
              <div className="convert-box">
                <p> <i class="fa-solid fa-truck-arrow-right"></i> <strong> Miễn phí vận chuyển</strong></p>
                <p><i class="fa-solid fa-truck-plane"></i> <strong>Vận chuyển từ nước ngoài đến</strong> </p>
                <p><i class="fa-solid fa-location-dot"></i> <strong>50 Văn Tiến Dũng, Hoà Xuân Cẩm Lệ, Đà Nẵng</strong></p>
              </div>
            </div>
            <div className="convert">
              <div className="box">
                <p style={{ marginBottom: "0" }}>Số lượng</p>
              </div>
              <div class="input-group">
                <button class="btn btn-outline-secondary" type="button" id="decrementBtn">-</button>
                <input type="text" class="quantity text-center " id="quantity" value="1" />
                <button class="btn btn-outline-secondary" type="button" id="incrementBtn">+</button>
              </div>
            </div>  
            <p className='btn-add mt-3 '>
            <button type="button" class="btn btn-outline-danger addcart "><i class="fa-solid fa-cart-plus"></i> Thêm vào giỏ hàng</button>
            <button type="button" class="btn btn-danger ms-3 ">Mua Ngay</button>
              </p>      
            
          </div>
        </div>
        <div className="row products-view mt-3">
          <h3>Các sản phẩm tương tự khác</h3>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;