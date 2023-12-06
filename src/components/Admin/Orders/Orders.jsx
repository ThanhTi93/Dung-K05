import React, { useState } from 'react';
import { Button, Modal, Table, Form } from 'react-bootstrap';

function Orders(props) {
    const [showModal, setShowModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const handleProductChange = (product) => {
        setSelectedProduct(product);      
    };

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    const handleAddProduct = () => {
        console.log("vsff",selectedProduct);
        if (selectedProduct !== null) {
            // Clone the selectedOrder to avoid mutating the state directly
            const updatedOrder = { ...selectedOrder };
            
            // Get the selected product based on the index
            const selectedProductIndex = parseInt(selectedProduct, 10);
            const selectedProduct = selectedOrder.products[selectedProductIndex];
    
            // Add the new product with the specified quantity
            const newProduct = {
                img: selectedProduct.img,
                price: selectedProduct.price,
                quantity: parseInt(quantity, 10),
                sum: selectedProduct.price * parseInt(quantity, 10),
            };
    
            updatedOrder.products = [...updatedOrder.products, newProduct];
    
            // Update the state with the modified order
            setSelectedOrder(updatedOrder);
    
            // Close the modal or perform any other necessary actions
            setShowModal(false);
    
            // Log the updated order for demonstration
            console.log("Updated Order:", updatedOrder);
        } else {
            console.error("Please select a product before adding.");
        }
    };
    
    const handleShowModal = (order) => {
        setSelectedOrder(order);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
  // Sample data for demonstration
  const products =  [
    {id:1, img: 'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-max-den-thumb-600x600.jpg', price: 20, quantity: 2, sum: 40 },
    {id:2, img: 'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-max-den-thumb-600x600.jpg', price: 30, quantity: 1, sum: 30 },
  ];
  const orders = [
    {
      orderId: 1,
      customer: 'John Doe',
      description: 'Sample Order',
      status: 'Processing',
      employee: 'Jane Doe',
      products: [],
    },
    // Add more orders as needed
  ];
    return (
        <>
            <Button onClick={() => handleShowModal(orders[0])}>View Order Details</Button>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Order Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th>Employee</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{selectedOrder?.orderId}</td>
                                <td>{selectedOrder?.customer}</td>
                                <td>{selectedOrder?.description}</td>
                                <td>{selectedOrder?.status}</td>
                                <td>{selectedOrder?.employee}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Sum</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedOrder?.products.map((product, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <img src={product.img} alt={`Product ${index}`} style={{ maxWidth: '50px' }} />
                                    </td>
                                    <td>{product.price}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.sum}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Form>
                        <Form.Group controlId="productSelect">
                            <Form.Label>Select Product</Form.Label>
                            <Form.Control as="select" onChange={(e) => handleProductChange(e.target.value)}>
                                <option value="" disabled selected>Select a product</option>
                                {products.map((product, index) => (
                                    <option key={index} value={product.id}>
                                        {`Product ${index + 1}`}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="quantityInput">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control type="number" value={quantity} onChange={handleQuantityChange} />
                        </Form.Group>
                        <Button variant="primary mt-3" onClick={handleAddProduct}>
                            Add Product
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Orders;