import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const AddProductModal = () => {
  const [showModal, setShowModal] = useState(false);

  const handleAddProduct = () => {
    // Xử lý logic thêm sản phẩm ở đây
    // Sau khi thêm thành công, đóng modal bằng cách sử dụng setShowModal(false)
    setShowModal(true);
  };

  return (
    <>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Mở Modal
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Nội dung của modal ở đây */}
          {/* Đặt các trường nhập và nút thêm sản phẩm */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleAddProduct}>
            Thêm sản phẩm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddProductModal;
