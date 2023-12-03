import React from 'react';
import "./Footer.scss";
function Footer(props) {
    return (
        <>

            <footer class="text-center text-lg-start bg-body-tertiary text-muted">

                <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">

                    <div class="me-5 d-none d-lg-block">
                        <span>Get connected with us on social networks:</span>
                    </div>
                    <div>
                        <a href="" class="me-4 ">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a href="" class="me-4 ">
                            <i class="fab fa-twitter"></i>
                        </a>
                        <a href="" class="me-4 ">
                            <i class="fab fa-google"></i>
                        </a>
                        <a href="" class="me-4 ">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a href="" class="me-4 ">
                            <i class="fab fa-linkedin"></i>
                        </a>
                        <a href="" class="me-4 ">
                            <i class="fab fa-github"></i>
                        </a>
                    </div>

                </section>

                <div class="container mt-5">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3835.1532887821254!2d108.21256849999999!3d16.0055339!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31421a3d754e4957%3A0xc8c39ea720d77676!2zNTAgVsSDbiBUaeG6v24gRMWpbmcsIEhvw6AgWHXDom4sIEPhuqltIEzhu4csIMSQw6AgTuG6tW5nIDU1MDAwMA!5e0!3m2!1svi!2s!4v1701194734685!5m2!1svi!2s" width="100%" height="450" style={{border:"0"}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>

                <section class="">
                    <div class="container text-center text-md-start mt-5">

                        <div class="row mt-3">

                            <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">

                                <h6 class="text-uppercase fw-bold mb-4">
                                    <i class="fas fa-gem me-3"></i>Company name
                                </h6>
                                <p>
                                    Here you can use rows and columns to organize your footer content. Lorem ipsum
                                    dolor sit amet, consectetur adipisicing elit.
                                </p>
                            </div>
                            <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">

                                <h6 class="text-uppercase fw-bold mb-4">
                                    Products
                                </h6>
                                <p>
                                    <a href="#!" class="text-reset">Angular</a>
                                </p>
                                <p>
                                    <a href="#!" class="text-reset">React</a>
                                </p>
                                <p>
                                    <a href="#!" class="text-reset">Vue</a>
                                </p>
                                <p>
                                    <a href="#!" class="text-reset">Laravel</a>
                                </p>
                            </div>

                            <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">

                                <h6 class="text-uppercase fw-bold mb-4">
                                </h6>
                                <p>
                                    <a href="#!" class="text-reset">Pricing</a>
                                </p>
                                <p>
                                    <a href="#!" class="text-reset">Settings</a>
                                </p>
                                <p>
                                    <a href="#!" class="text-reset">Orders</a>
                                </p>
                                <p>
                                    <a href="#!" class="text-reset">Help</a>
                                </p>
                            </div>



                            <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">

                                <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
                                <p><i class="fas fa-home me-3"></i> New York, NY 10012, US</p>
                                <p>
                                    <i class="fas fa-envelope me-3"></i>
                                    info@example.com
                                </p>
                                <p><i class="fas fa-phone me-3"></i> + 01 234 567 88</p>
                                <p><i class="fas fa-print me-3"></i> + 01 234 567 89</p>
                            </div>

                        </div>

                    </div>
                </section>
            </footer>
        </>
    );
}

export default Footer;