import { Table, Image, Modal, Button, Form, FormControl, InputGroup, Navbar, Nav } from 'react-bootstrap';
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import {
    collection,
    addDoc,
    getDocs,
    doc,
    deleteDoc,
    updateDoc,
} from "firebase/firestore";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Products(props) {
    const productsCollectionRef = collection(db, "Products");
    const categoriesCollectionRef = collection(db, "Categories");
    const [categories, setCategories] = useState([]);
    const [Products, setProducts] = useState([]);
    const [update, setUpdate] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [imgUpload, setImgUpload] = useState(null);
    const [previewImg, setPreviewImg] = useState(null);
    const [editProducts, seteditProducts] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    // Get Products
    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(productsCollectionRef);
            const ProductsData = [];
            querySnapshot.forEach((doc) => {
                ProductsData.push({ id: doc.id, ...doc.data() });
            });
            setProducts(ProductsData);
        };
        fetchData();
    }, [update]);
    // Get Categories
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
    }, [update]);
    console.log(categories);
    // Add User
    const handleAddProduct = async (event) => {
        event.preventDefault();

        // Get form data
        const formData = new FormData(event.target);
        const productName = formData.get("formProductName");
        const priceOld = formData.get("formPriceOld");
        const priceNew = formData.get("formPriceNew");
        const discount = formData.get("formDiscount");
        const stock = formData.get("formStock");
        const category = formData.get("formCategory");

        // Upload product image to storage
        const productImgRef = ref(storage, `products/${uuidv4()}`);
        await uploadBytes(productImgRef, imgUpload);

        // Get download URL for the product image
        const productImgURL = await getDownloadURL(productImgRef);

        // Add product to Firestore
        await addDoc(productsCollectionRef, {
            productImgURL,
            productName,
            priceOld,
            priceNew,
            discount,
            stock,
            category,
        });

        // Display success message
        toast("Product added successfully");

        // Close the modal
        handleClose();
        setPreviewImg(null);
        setUpdate(!update);
    };

    // Handle img Change
    const handleImageChange = (e) => {
        const selectedImg = e.target.files[0];

        if (selectedImg) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewImg(reader.result);
            };
            reader.readAsDataURL(selectedImg);
            setImgUpload(selectedImg);
        } else {
            setPreviewImg(null);
            setImgUpload(null);
        }
    };
    // Delete User
    const handleDeleteProduct = async (productId, productImgURL) => {
        try {
            const filename = productImgURL.split('%2F').pop().split('?').shift();
            await deleteDoc(doc(productsCollectionRef, productId));
            // Create a reference to the file to delete
            const desertRef = ref(storage, `products/${filename}`);

            // Delete the file
            deleteObject(desertRef);
            // Update the state to trigger a re-render
            setUpdate(!update);

            toast("User deleted successfully");
        } catch (error) {
            console.error("Error deleting user: ", error);
            toast.error("Error deleting user");
        }
    };
    // Edit User
    const handleShowEditModal = (product) => {
        seteditProducts(product);
        setPreviewImg(product.productImgURL);
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        seteditProducts(null);
        setShowEditModal(false);
        setPreviewImg(null);
    };
    // Get Category Name By Id
    const getCategoryName = (id) => {
        const categoryById = categories.find((category) => category.id == id);
        // Check if categoryById is defined and has nameCategory property
        if (categoryById) {
            return categoryById.nameCategory;
        }
    }
    const handleUpdateProduct = async (event) => {
        event.preventDefault();

        // Get form data
        const formData = new FormData(event.target);
        const productName = formData.get("formProductName");
        const priceOld = formData.get("formPriceOld");
        const priceNew = formData.get("formPriceNew");
        const discount = formData.get("formDiscount");
        const stock = formData.get("formStock");
        const category = formData.get("formCategory");

        // Upload product image to storage
        const productImgRef = ref(storage, `products/${uuidv4()}`);
        await uploadBytes(productImgRef, imgUpload);

        // Get download URL for the product image
        const productImgURL = await getDownloadURL(productImgRef);

        // Update product in Firestore
        await updateDoc(doc(productsCollectionRef, editProducts.id), {
            productImgURL,
            productName,
            priceOld,
            priceNew,
            discount,
            stock,
            category,
        });

        // Close the modal
        handleCloseEditModal();
        setUpdate(!update);
        setPreviewImg(null);
    };

    // Pagination state
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage] = useState(5); // You can adjust the number of items per page
    const totalPages = Math.ceil(Products.length / itemsPerPage);
    // Pagination logic
    const indexOfLastItem = (currentPage + 1) * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = Products.slice(indexOfFirstItem, indexOfLastItem);
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <>
            <div className="container">
                <div className="row mt-4">
                    <div className="col-12 col-md-4">
                        <h4>List Products</h4>
                    </div>
                    <div className="col-12 col-md-4">
                        <InputGroup className="mb-3">
                            <FormControl placeholder="Search Products" />
                            <Button variant="outline-secondary">Search</Button>
                        </InputGroup>
                    </div>
                    <div className="col-12 col-md-4 text-md-end">
                        <Button variant="success" onClick={handleShow}>
                            Add Products
                        </Button>
                    </div>
                </div>
                <div className="table-responsive mt-2">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Img Product</th>
                                <th>Name</th>
                                <th>Price Old (VND)</th>
                                <th>Price New (VND)</th>
                                <th>Discount (%)</th>
                                <th>Stock</th>
                                <th>Category Product</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((product, index) => (
                                <tr key={product.id}>
                                    <td>{index + 1 + currentPage * itemsPerPage}</td>
                                    <td>
                                        <Image src={product.productImgURL}
                                            alt={`Avatar of ${product.firstName}`}
                                            style={{ width: '50px', height: '50px' }} />
                                    </td>
                                    <td>{product.productName}</td>
                                    <td>{product.priceOld}</td>
                                    <td>{product.priceNew}</td>
                                    <td>{product.discount}</td>
                                    <td>{product.stock}</td>
                                    <td>{getCategoryName(product.category)}</td>
                                    <td>
                                        <Button variant="primary" className='me-2' onClick={() => handleShowEditModal(product)}>
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </Button>
                                        <Button variant="danger" onClick={() => handleDeleteProduct(product.id, product.productImgURL)}>
                                            <i className="fa-solid fa-trash-can"></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
                {/* Pagination */}
                <nav aria-label="Page navigation example" className='mt-2'>
                    <ul className="pagination justify-content-center">
                        <li className={`page-item ${currentPage === 0 ? "disabled" : ""}`}>
                            <a
                                className="page-link"
                                href="#"
                                tabIndex="-1"
                                aria-disabled="true"
                                onClick={() => setCurrentPage(currentPage - 1)}
                            >
                                <i className="fa-solid fa-arrow-left"></i>
                            </a>
                        </li>
                        {Array.from({ length: Math.ceil(Products.length / itemsPerPage) }, (_, index) => (
                            <li className={`page-item ${currentPage === index ? 'active' : ''}`} key={index}>
                                <a className="page-link" href="#" onClick={() => paginate(index)}>
                                    {index + 1}
                                </a>
                            </li>
                        ))}
                        <li
                            className={`page-item ${currentPage === totalPages - 1 ? "disabled" : ""}`}
                        >
                            <a
                                className="page-link"
                                href="#"
                                onClick={() => setCurrentPage(currentPage + 1)}
                            >
                                <i className="fa-solid fa-arrow-right"></i>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Your form for adding a product */}
                    <Form onSubmit={handleAddProduct}>
                        <Form.Group controlId="formProductName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="formProductName" placeholder="Enter product name" />
                        </Form.Group>
                        <Form.Group controlId="formPriceOld">
                            <Form.Label>Price Old (VND)</Form.Label>
                            <Form.Control type="number" name="formPriceOld" placeholder="Enter price old" />
                        </Form.Group>
                        <Form.Group controlId="formPriceNew">
                            <Form.Label>Price New (VND)</Form.Label>
                            <Form.Control type="number" name="formPriceNew" placeholder="Enter price new" />
                        </Form.Group>
                        <Form.Group controlId="formDiscount">
                            <Form.Label>Discount</Form.Label>
                            <Form.Control type="number" name="formDiscount" placeholder="Enter discount percentage" />
                        </Form.Group>
                        <Form.Group controlId="formStock">
                            <Form.Label>Stock</Form.Label>
                            <Form.Control type="number" name="formStock" placeholder="Enter stock quantity" />
                        </Form.Group>
                        <Form.Group controlId="formCategory">
                            <Form.Label>Category Product</Form.Label>
                            <Form.Select name="formCategory" aria-label="Select product category">
                                {categories.map((category) => (
                                    <option value={category.id}>{category.nameCategory}</option>
                                ))}
                                {/* Add more options as needed */}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="formImgProduct">
                            <Form.Label>Img Product</Form.Label>
                            <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
                            <Image
                                className='my-2'
                                src={previewImg ? previewImg : 'https://suno.vn/blog/wp-content/uploads/2018/05/cach-chup-anh-san-pham-co-concept-758x400.jpg'}
                                class="mt-2"
                                style={{ maxWidth: "100%", maxHeight: "350px" }}
                                alt="Selected Product Image"
                            />
                        </Form.Group>
                        <Button variant="success" type="submit">
                            Add Product
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={showEditModal} onHide={handleCloseEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Products</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleUpdateProduct}>
                        <Form.Group controlId="formEditProductName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="formProductName"
                                placeholder="Enter product name"
                                defaultValue={editProducts ? editProducts.productName : ""}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEditPriceOld">
                            <Form.Label>Price Old (VND)</Form.Label>
                            <Form.Control
                                type="number"
                                name="formPriceOld"
                                placeholder="Enter price old"
                                defaultValue={editProducts ? editProducts.priceOld : ""}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEditPriceNew">
                            <Form.Label>Price New (VND)</Form.Label>
                            <Form.Control
                                type="number"
                                name="formPriceNew"
                                placeholder="Enter price new"
                                defaultValue={editProducts ? editProducts.priceNew : ""}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEditDiscount">
                            <Form.Label>Discount</Form.Label>
                            <Form.Control
                                type="number"
                                name="formDiscount"
                                placeholder="Enter discount percentage"
                                defaultValue={editProducts ? editProducts.discount : ""}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEditStock">
                            <Form.Label>Stock</Form.Label>
                            <Form.Control
                                type="number"
                                name="formStock"
                                placeholder="Enter stock quantity"
                                defaultValue={editProducts ? editProducts.stock : ""}
                            />
                        </Form.Group>
                        <Form.Group controlId="formCategory">
                            <Form.Label>Category Product</Form.Label>
                            <Form.Select name="formCategory"
                                defaultValue={editProducts ? editProducts.category : ""}
                                aria-label="Select product category">
                                {categories.map((category) => (
                                    <option value={category.id}>{category.nameCategory}</option>
                                ))}
                                {/* Add more options as needed */}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="formEditImgProduct">
                            <Form.Label>Img Product</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            <Image
                                className="my-2"
                                src={previewImg ? previewImg : 'https://suno.vn/blog/wp-content/uploads/2018/05/cach-chup-anh-san-pham-co-concept-758x400.jpg'}
                                class="mt-2"
                                style={{ maxWidth: "100%", maxHeight: "350px" }}
                                alt="Selected Product Image"
                            />
                        </Form.Group>
                        {/* You may need to add similar code for other fields */}
                        <Button variant="success" type="submit">
                            Update Products
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

        </>
    );
}

export default Products;