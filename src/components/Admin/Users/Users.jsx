import { Table, Image, Modal, Button, Form, FormControl, InputGroup } from 'react-bootstrap';
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

function Users(props) {
    const usersCollectionRef = collection(db, "Users");
    const [users, setUsers] = useState([]);
    const [update, setUpdate] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [imgUpload, setImgUpload] = useState(null);
    const [previewImg, setPreviewImg] = useState(null);
    const [editUser, setEditUser] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(usersCollectionRef);
            const usersData = [];
            querySnapshot.forEach((doc) => {
                usersData.push({ id: doc.id, ...doc.data() });
            });
            setUsers(usersData);
        };
        fetchData();
    }, [update]);
    // Add User
    const handleAddUser = async (event) => {
        event.preventDefault();
        // Get form data
        const formData = new FormData(event.target);
        const firstName = formData.get("formFirstName");
        const lastName = formData.get("formLastName");
        const email = formData.get("formEmail");
        const address = formData.get("formAddress");
        const phoneNumber = formData.get("formPhoneNumber");
        const birthday = formData.get("formBirthday"); // Make sure the input type is 'date'       
        // Upload avatar to storage
        const avatarRef = ref(storage, `avatars/${uuidv4()}`);
        await uploadBytes(avatarRef, imgUpload);
        // Get download URL for the avatar
        const avatarURL = await getDownloadURL(avatarRef);
        // Add user to Firestore
        await addDoc(usersCollectionRef, {
            firstName,
            lastName,
            email,
            address,
            phoneNumber,
            birthday,
            avatarURL,
        });
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
    const handleDeleteUser = async (userId, avatarURL) => {
        try {
            console.log(avatarURL);
            const filename = avatarURL.split('%2F').pop().split('?').shift();
            await deleteDoc(doc(usersCollectionRef, userId));
            // Create a reference to the file to delete
            const desertRef = ref(storage, `avatars/${filename}`);

            // Delete the file
            deleteObject(desertRef);
            // Update the state to trigger a re-render
            setUpdate(!update);

            toast.success("User deleted successfully");
        } catch (error) {
            console.error("Error deleting user: ", error);
            toast.error("Error deleting user");
        }
    };
    // Edit User
    const handleShowEditModal = (user) => {
        setEditUser(user);
        setPreviewImg(user.avatarURL);
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setEditUser(null);
        setShowEditModal(false);
        setPreviewImg(null);
    };

    const handleUpdateUser = async (event) => {
        event.preventDefault();
        // Get form data
        const formData = new FormData(event.target);
        const firstName = formData.get("formFirstName");
        const lastName = formData.get("formLastName");
        const email = formData.get("formEmail");
        const address = formData.get("formAddress");
        const phoneNumber = formData.get("formPhoneNumber");
        const birthday = formData.get("formBirthday");
        // Upload avatar to storage
        const avatarRef = ref(storage, `avatars/${uuidv4()}`);
        await uploadBytes(avatarRef, imgUpload);
        // Get download URL for the avatar
        const avatarURL = await getDownloadURL(avatarRef);
        // Update user in Firestore
        await updateDoc(doc(usersCollectionRef, editUser.id), {
            firstName,
            lastName,
            email,
            address,
            phoneNumber,
            birthday,
            avatarURL,
        });
        // Close the modal
        handleCloseEditModal();
        setUpdate(!update);
        setPreviewImg(null);
    };

    // Pagination state
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage] = useState(5); // You can adjust the number of items per page
    const totalPages = Math.ceil(users.length / itemsPerPage);
    // Pagination logic
    const indexOfLastItem = (currentPage + 1) * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <>
            <div className="container">
                <div className="row mt-4">
                    <div className="col-12 col-md-4">
                        <h4>List Users</h4>
                    </div>
                    <div className="col-12 col-md-4">
                        <InputGroup className="mb-3">
                            <FormControl placeholder="Search users" />
                            <Button variant="outline-secondary">Search</Button>
                        </InputGroup>
                    </div>
                    <div className="col-12 col-md-4 text-md-end">
                        <Button variant="success" onClick={handleShow}>
                            Add User
                        </Button>
                    </div>
                </div>
                <div className="table-responsive">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Avatar</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Phone Number</th>
                                <th>Birthday</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((user, index) => (
                                <tr key={user.id}>
                                    <td>{index + 1 + currentPage * itemsPerPage}</td>
                                    <td>
                                        <Image src={user.avatarURL}
                                            alt={`Avatar of ${user.firstName}`}
                                            roundedCircle
                                            style={{ width: '50px', height: '50px' }} />
                                    </td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.address}</td>
                                    <td>{user.phoneNumber}</td>
                                    <td>{user.birthday}</td>
                                    <td>
                                        <Button variant="primary" className='me-2' onClick={() => handleShowEditModal(user)}>
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </Button>
                                        <Button variant="danger" onClick={() => handleDeleteUser(user.id, user.avatarURL)}>
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
                        {Array.from({ length: Math.ceil(users.length / itemsPerPage) }, (_, index) => (
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
                    <Modal.Title>Add User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Your form for adding a user */}
                    <Form onSubmit={handleAddUser}>
                        <Form.Group controlId="formFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" name="formFirstName" placeholder="Enter first name" />

                        </Form.Group>
                        <Form.Group controlId="formLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" name="formLastName" placeholder="Enter last name" />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="formEmail" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group controlId="formAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" name="formAddress" placeholder="Enter address" />
                        </Form.Group>
                        <Form.Group controlId="formPhoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="tel" name="formPhoneNumber" placeholder="Enter phone number" />
                        </Form.Group>
                        <Form.Group controlId="formBirthday">
                            <Form.Label>Birthday</Form.Label>
                            <Form.Control type="date" name="formBirthday" placeholder="Enter birthday" />
                        </Form.Group>
                        <Form.Group controlId="formAvatar">
                            <Form.Label>Avatar</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*" onChange={handleImageChange} />
                            <Image className='my-2'
                                src={previewImg ? previewImg : 'https://suno.vn/blog/wp-content/uploads/2018/05/cach-chup-anh-san-pham-co-concept-758x400.jpg'} class="mt-2" style={{ maxWidth: "100%", maxHeight: "200px" }}
                                alt="Selected Avatar" />
                        </Form.Group>
                        <Button variant="success" type="submit">
                            Add User
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
            <Modal show={showEditModal} onHide={handleCloseEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleUpdateUser}>
                        <Form.Group controlId="formEditFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="formFirstName"
                                placeholder="Enter first name"
                                defaultValue={editUser ? editUser.firstName : ""}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEditLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="formLastName"
                                placeholder="Enter last name"
                                defaultValue={editUser ? editUser.lastName : ""}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEditEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="formEmail"
                                placeholder="Enter email"
                                defaultValue={editUser ? editUser.email : ""}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEditAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                name="formAddress"
                                placeholder="Enter address"
                                defaultValue={editUser ? editUser.address : ""}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEditPhoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="tel"
                                name="formPhoneNumber"
                                placeholder="Enter phone number"
                                defaultValue={editUser ? editUser.phoneNumber : ""}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEditBirthday">
                            <Form.Label>Birthday</Form.Label>
                            <Form.Control
                                type="date"
                                name="formBirthday"
                                placeholder="Enter birthday"
                                defaultValue={editUser ? editUser.birthday : ""}
                            />
                        </Form.Group>
                        <Form.Group controlId="formAvatar">
                            <Form.Label>Avatar</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*" onChange={handleImageChange} />
                            <Image className='my-2'
                                src={previewImg ? previewImg : 'https://suno.vn/blog/wp-content/uploads/2018/05/cach-chup-anh-san-pham-co-concept-758x400.jpg'} class="mt-2" style={{ maxWidth: "100%", maxHeight: "200px" }}
                                alt="Selected Avatar" />
                        </Form.Group>
                        {/* You may need to add similar code for the avatar field */}
                        <Button variant="success" type="submit">
                            Update User
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

        </>
    );
}

export default Users;