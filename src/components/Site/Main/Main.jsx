import React, { useEffect, useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import "./Main.scss";
import { db } from "../../../firebase";
import {
    collection,
    addDoc,
    getDocs,
    doc,
    deleteDoc,
    updateDoc,
} from "firebase/firestore";

function Main(props) {
    const categoriesCollectionRef = collection(db, "Categories");
    const productsCollectionRef = collection(db, "Products");
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [listMobile, setListMobile] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(categoriesCollectionRef);
            const categoriesData = [];
            querySnapshot.forEach((doc) => {
                categoriesData.push({ id: doc.id, ...doc.data() });
            });
            setCategories(categoriesData);
        };
        fetchData();
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            // Fetch categories
            const categoriesSnapshot = await getDocs(categoriesCollectionRef);
            const categoriesData = [];
            categoriesSnapshot.forEach((doc) => {
                categoriesData.push({ id: doc.id, ...doc.data() });
            });
            setCategories(categoriesData);

            // Fetch products with category names
            const productsSnapshot = await getDocs(productsCollectionRef);
            const productsData = [];
            productsSnapshot.forEach((doc) => {
                const productData = { id: doc.id, ...doc.data() };

                // Find the category name based on categoryId
                const category = categoriesData.find(cat => cat.id === productData.categoryId);
                if (category) {
                    productData.categoryName = category.nameCategory;
                }

                productsData.push(productData);
            });
            setProducts(productsData);
        };

        fetchData();
    }, []);
    console.log(listMobile);

    return (
        <>
            <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"
                        aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                        aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                        aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="https://cdn.tgdd.vn/2023/11/banner/SDP-Xmobile-S2032-1200-300-1200x300.png" class="d-block w-100"
                            alt="..." />
                    </div>
                    <div class="carousel-item">
                        <img src="https://cdn.tgdd.vn/2023/11/banner/Camera-IP-1200-300-1200x300.png" class="d-block w-100" alt="..." />
                    </div>
                    <div class="carousel-item">
                        <img src="https://cdn.tgdd.vn/2023/10/banner/PKIP15-1200-300-1200x300.png" class="d-block w-100" alt="..." />
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
            <div className="container-fluid main pb-5">
                <div class="container">
                    <div class="row">
                        <div class="col-6 col-md-3 mt-3">
                            <img
                                src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/10/banner/samsung-390-210-390x210.png"
                                alt="..." />
                        </div>
                        <div class="col-6 col-md-3 mt-3">
                            <img
                                src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/05/banner/chuyentrang-APPLEDT-390x210.png"
                                alt="..." />
                        </div>
                        <div class="col-6 col-md-3 mt-3">
                            <img
                                src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/08/banner/chuyentrang-lenovo-390x210-1.png"
                                alt="..." />
                        </div>
                        <div class="col-6 col-md-3 mt-3">
                            <img
                                src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/08/banner/chuyentrang-HP-390x210.png"
                                alt="..." />
                        </div>
                    </div>
                    <div class="container mt-4">
                        <img src="https://cdn.tgdd.vn/2023/11/campaign/Dien-thoai-1200x123.png" alt="..." />
                        <div class="row products-mobile">
                            {products.map((element, index) => (
                                <Link class="col-6 col-md-4 col-lg-2 mt-3" as={Link}
                                to={`/productdetail`}>
                                    <div class="product-mobile">
                                        <p>Trả góp 0%</p>
                                        <div class="img-mobile">
                                            <img src={element.imgProduct} alt="..." />
                                        </div>
                                        <span><img src="https://firebasestorage.googleapis.com/v0/b/dung-k05.appspot.com/o/images%2Ficon5-50x50.webp?alt=media&token=5ea7e879-c0c1-41dd-9f12-4f41b053ff3f" alt="..." /><strong>GIÁ RẺ QUÁ</strong></span>
                                        <h6>{element.nameProduct}</h6>
                                        <h5>{element.priceOld.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}₫</h5>
                                        <h3>{element.priceNew.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}₫</h3>
                                        <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i
                                            class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                                    </div>
                                </Link>
                            ))}

                        </div>
                    </div>
                    <div class="container mt-4">
                        <img src="https://firebasestorage.googleapis.com/v0/b/dung-k05.appspot.com/o/images%2Fdh-3-1200x120.png?alt=media&token=28ef4dde-a737-434b-bfea-c05fb6188e23" alt="..." />
                        <div class="row products-mobile">
                            <div class="col-6 col-md-4 col-lg-2 mt-3">
                                <div class="product-mobile">
                                    <p>Trả góp 0%</p>
                                    <div class="img-mobile">
                                        <img src="./img/xiaomi-redmi-13c-xanh-la-1-2-3-600x600.webp" alt="..." />
                                    </div>
                                    <span><img src="./img/icon5-50x50.webp" alt="..." /><strong>GIÁ RẺ QUÁ</strong></span>
                                    <h6>Iphone 5 Pro Max vdfvdfv vsfvbsfvbsvfsvsfv sfvfvsdvsfdvsfv</h6>
                                    <h5>12.990.000₫</h5>
                                    <h3>11.990.000₫</h3>
                                    <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i
                                        class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                                </div>
                            </div>
                            <div class="col-6 col-md-4 col-lg-2 mt-3">
                                <div class="product-mobile">
                                    <p>Trả góp 0%</p>
                                    <div class="img-mobile">
                                        <img src="./img/xiaomi-redmi-13c-xanh-la-1-2-3-600x600.webp" alt="..." />
                                    </div>
                                    <span><img src="./img/icon5-50x50.webp" alt="..." /><strong>GIÁ RẺ QUÁ</strong></span>
                                    <h6>Iphone 5 Pro Max</h6>
                                    <h5>12.990.000₫</h5>
                                    <h3>11.990.000₫</h3>
                                    <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i
                                        class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                                </div>
                            </div>
                            <div class="col-6 col-md-4 col-lg-2 mt-3">
                                <div class="product-mobile">
                                    <p>Trả góp 0%</p>
                                    <div class="img-mobile">
                                        <img src="./img/xiaomi-redmi-13c-xanh-la-1-2-3-600x600.webp" alt="..." />
                                    </div>
                                    <span><img src="./img/icon5-50x50.webp" alt="..." /><strong>GIÁ RẺ QUÁ</strong></span>
                                    <h6>Iphone 5 Pro Max</h6>
                                    <h5>12.990.000₫</h5>
                                    <h3>11.990.000₫</h3>
                                    <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i
                                        class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                                </div>
                            </div>
                            <div class="col-6 col-md-4 col-lg-2 mt-3">
                                <div class="product-mobile">
                                    <p>Trả góp 0%</p>
                                    <div class="img-mobile">
                                        <img src="./img/xiaomi-redmi-13c-xanh-la-1-2-3-600x600.webp" alt="..." />
                                    </div>
                                    <span><img src="./img/icon5-50x50.webp" alt="..." /><strong>GIÁ RẺ QUÁ</strong></span>
                                    <h6>Iphone 5 Pro Max</h6>
                                    <h5>12.990.000₫</h5>
                                    <h3>11.990.000₫</h3>
                                    <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i
                                        class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                                </div>
                            </div>
                            <div class="col-6 col-md-4 col-lg-2 mt-3">
                                <div class="product-mobile">
                                    <p>Trả góp 0%</p>
                                    <div class="img-mobile">
                                        <img src="./img/mi-band-8-active-den-tb-2-600x600.jpg" alt="..." />
                                    </div>
                                    <span><img src="./img/icon5-50x50.webp" alt="..." /><strong>GIÁ RẺ QUÁ</strong></span>
                                    <h6>Iphone 5 Pro Max</h6>
                                    <h5>12.990.000₫</h5>
                                    <h3>11.990.000₫</h3>
                                    <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i
                                        class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                                </div>
                            </div>
                            <div class="col-6 col-md-4 col-lg-2 mt-3">
                                <div class="product-mobile">
                                    <p>Trả góp 0%</p>
                                    <div class="img-mobile">
                                        <img src="./img/xiaomi-redmi-13c-xanh-la-1-2-3-600x600.webp" alt="..." />
                                    </div>
                                    <span><img src="./img/icon5-50x50.webp" alt="..." /><strong>GIÁ RẺ QUÁ</strong></span>
                                    <h6>Iphone 5 Pro Max</h6>
                                    <h5>12.990.000₫</h5>
                                    <h3>11.990.000₫</h3>
                                    <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i
                                        class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                                </div>
                            </div>
                            <div class="col-6 col-md-4 col-lg-2 mt-3">
                                <div class="product-mobile">
                                    <p>Trả góp 0%</p>
                                    <div class="img-mobile">
                                        <img src="./img/xiaomi-redmi-13c-xanh-la-1-2-3-600x600.webp" alt="..." />
                                    </div>
                                    <span><img src="./img/icon5-50x50.webp" alt="..." /><strong>GIÁ RẺ QUÁ</strong></span>
                                    <h6>Iphone 5 Pro Max</h6>
                                    <h5>12.990.000₫</h5>
                                    <h3>11.990.000₫</h3>
                                    <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i
                                        class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                                </div>
                            </div>
                            <div class="col-6 col-md-4 col-lg-2 mt-3">
                                <div class="product-mobile">
                                    <p>Trả góp 0%</p>
                                    <div class="img-mobile">
                                        <img src="./img/xiaomi-redmi-13c-xanh-la-1-2-3-600x600.webp" alt="..." />
                                    </div>
                                    <span><img src="./img/icon5-50x50.webp" alt="..." /><strong>GIÁ RẺ QUÁ</strong></span>
                                    <h6>Iphone 5 Pro Max</h6>
                                    <h5>12.990.000₫</h5>
                                    <h3>11.990.000₫</h3>
                                    <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i
                                        class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                                </div>
                            </div>
                            <div class="col-6 col-md-4 col-lg-2 mt-3">
                                <div class="product-mobile">
                                    <p>Trả góp 0%</p>
                                    <div class="img-mobile">
                                        <img src="./img/xiaomi-redmi-13c-xanh-la-1-2-3-600x600.webp" alt="..." />
                                    </div>
                                    <span><img src="./img/icon5-50x50.webp" alt="..." /><strong>GIÁ RẺ QUÁ</strong></span>
                                    <h6>Iphone 5 Pro Max</h6>
                                    <h5>12.990.000₫</h5>
                                    <h3>11.990.000₫</h3>
                                    <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i
                                        class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                                </div>
                            </div>
                            <div class="col-6 col-md-4 col-lg-2 mt-3">
                                <div class="product-mobile">
                                    <p>Trả góp 0%</p>
                                    <div class="img-mobile">
                                        <img src="./img/xiaomi-redmi-13c-xanh-la-1-2-3-600x600.webp" alt="..." />
                                    </div>
                                    <span><img src="./img/icon5-50x50.webp" alt="..." /><strong>GIÁ RẺ QUÁ</strong></span>
                                    <h6>Iphone 5 Pro Max</h6>
                                    <h5>12.990.000₫</h5>
                                    <h3>11.990.000₫</h3>
                                    <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i
                                        class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                                </div>
                            </div>
                            <div class="col-6 col-md-4 col-lg-2 mt-3">
                                <div class="product-mobile">
                                    <p>Trả góp 0%</p>
                                    <div class="img-mobile">
                                        <img src="./img/xiaomi-redmi-13c-xanh-la-1-2-3-600x600.webp" alt="..." />
                                    </div>
                                    <span><img src="./img/icon5-50x50.webp" alt="..." /><strong>GIÁ RẺ QUÁ</strong></span>
                                    <h6>Iphone 5 Pro Max</h6>
                                    <h5>12.990.000₫</h5>
                                    <h3>11.990.000₫</h3>
                                    <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i
                                        class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                                </div>
                            </div>
                            <div class="col-6 col-md-4 col-lg-2 mt-3">
                                <div class="product-mobile">
                                    <p>Trả góp 0%</p>
                                    <div class="img-mobile">
                                        <img src="./img/xiaomi-redmi-13c-xanh-la-1-2-3-600x600.webp" alt="..." />
                                    </div>
                                    <span><img src="./img/icon5-50x50.webp" alt="..." /><strong>GIÁ RẺ QUÁ</strong></span>
                                    <h6>Iphone 5 Pro Max</h6>
                                    <h5>12.990.000₫</h5>
                                    <h3>11.990.000₫</h3>
                                    <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i
                                        class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Main;