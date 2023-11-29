import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
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

    const categoriesCollectionRef = collection(db, "Categories");
    const [update, setUpdate] = useState(false);
    const [categories, setCategories] = useState([]);

    const productsCollectionRef = collection(db, "Products");
    const [products, setProducts] = useState([]);
    const [imgUpload, setImgUpload] = useState(null);
    const [previewImg, setPreviewImg] = useState(null);
    const [product, setProduct] = useState({
        nameProduct: "",
        imgProduct: "",
        priceOld: "",
        priceNew: "",
        quantity: "",
        categoryId: "",
    });

    const handleInputChange = (e) => {

        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

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
    }, [update]);

    const addProduct = async (e) => {
        e.preventDefault();

        try {
            const imageRef = ref(storage, `images/${uuidv4()}_${imgUpload.name}`);
            await uploadBytes(imageRef, imgUpload);
            const downloadURL = await getDownloadURL(imageRef);
            const newProduct = { ...product, imgProduct: downloadURL };
            const docRef = await addDoc(productsCollectionRef, newProduct);

            toast("Add Product Success!");
            setUpdate(!update); // Trigger a re-fetch of categories

            // Clear the form fields
            setProduct({
                nameProduct: "",
                imgProduct: "",
                priceOld: "",
                priceNew: "",
                quantity: "",
                categoryId: "",
            });
        } catch (error) {
            console.error('Error adding product: ', error);
            toast.error('Error adding product. Please try again.');
        }
    };

    return (
        <>
            <div className="container categories p-3">
                {/* modal open  */}
                <div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Add Product</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form onSubmit={addProduct}>
                                    <div class="mb-3">
                                        <label for="productName" class="form-label">Product Name</label>
                                        <input type="text" class="form-control" name="nameProduct"
                                            value={product.nameProduct}
                                            onChange={handleInputChange} required />
                                    </div>
                                    <div class="mb-3">
                                        <label for="productImage" class="form-label">Product Image</label>
                                        <input type="file" class="form-control" id="productImage" accept="image/*" onChange={handleImageChange} required />
                                        <img id="previewImage" src={previewImg ? previewImg : 'https://suno.vn/blog/wp-content/uploads/2018/05/cach-chup-anh-san-pham-co-concept-758x400.jpg'} class="mt-2" style={{ maxWidth: "100%", maxHeight: "200px" }} alt="Preview" />
                                    </div>
                                    <div class="mb-3">
                                        <label for="priceOld" class="form-label">Price (Old)</label>
                                        <input type="number" class="form-control" name="priceOld"
                                            value={product.priceOld}
                                            onChange={handleInputChange} required />
                                    </div>
                                    <div class="mb-3">
                                        <label for="priceNew" class="form-label">Price (New)</label>
                                        <input type="number" class="form-control" name="priceNew"
                                            value={product.priceNew}
                                            onChange={handleInputChange} required />
                                    </div>
                                    <div class="mb-3">
                                        <label for="quantity" class="form-label">Quantity</label>
                                        <input type="number" class="form-control" name="quantity"
                                            value={product.quantity}
                                            onChange={handleInputChange} required />
                                    </div>
                                    <div class="mb-3">
                                        <label for="category" class="form-label">Category</label>
                                        <select class="form-select" name="categoryId"
                                            value={product.categoryId}
                                            onChange={handleInputChange} required>
                                            <option value="" default disabled >Select product category</option>
                                            {
                                                categories.map((element, index) => (
                                                    <option value={element.id}>{element.nameCategory}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <button type="submit" class="btn btn-primary">Add Product</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                {/* modal close */}
                <div className="row mt-3 ">
                    <div className="col-12 col-md-4 col-xl-3">
                        <h4>List Products</h4>
                    </div>
                    <div className="col-12 col-md-5 col-xl-6">
                        <form class="d-flex">
                            <input class="form-control me-2" type="search" placeholder="Search..." aria-label="Search" />
                            <button class="btn btn-success" type="submit">Search</button>
                        </form>
                    </div>

                    <div className="col-12 col-md-3 col-xl-3 add-category">
                        <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#productModal">
                            Add Product
                        </button>
                    </div>
                </div>
                <div className="table-responsive mt-5">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Image</th>
                                <th scope="col">Price (Old)</th>
                                <th scope="col">Price (New)</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Category</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{product.nameProduct}</td>
                                    <td>
                                        <img src={product.imgProduct} alt="Product" style={{ maxWidth: "50px", maxHeight: "50px" }} />
                                    </td>
                                    <td>{product.priceOld}</td>
                                    <td>{product.priceNew}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.categoryName}</td>
                                    <td>
                                        <button type="button" class="btn btn-primary"><i class="fa-solid fa-pen-to-square"></i></button>
                                        <button type="button" class="btn btn-danger ms-2"><i class="fa-solid fa-trash-can"></i></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Products;