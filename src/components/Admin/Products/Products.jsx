import React from 'react';

function Products(props) {
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
                                <form>
                                    <div class="mb-3">
                                        <label for="productName" class="form-label">Product Name</label>
                                        <input type="text" class="form-control" id="productName" required />
                                    </div>
                                    <div class="mb-3">
                                        <label for="productImage" class="form-label">Product Image</label>
                                        <input type="file" class="form-control" id="productImage" accept="image/*" onchange="displayImage(this)" required />
                                        <img id="previewImage" src='https://suno.vn/blog/wp-content/uploads/2018/05/cach-chup-anh-san-pham-co-concept-758x400.jpg' class="mt-2" style={{ maxWidth: "100%", maxHeight: "200px" }} alt="Preview" />
                                    </div>
                                    <div class="mb-3">
                                        <label for="priceOld" class="form-label">Price (Old)</label>
                                        <input type="number" class="form-control" id="priceOld" required />
                                    </div>
                                    <div class="mb-3">
                                        <label for="priceNew" class="form-label">Price (New)</label>
                                        <input type="number" class="form-control" id="priceNew" required />
                                    </div>
                                    <div class="mb-3">
                                        <label for="quantity" class="form-label">Quantity</label>
                                        <input type="number" class="form-control" id="quantity" required />
                                    </div>
                                    <div class="mb-3">
                                        <label for="category" class="form-label">Category</label>
                                        <select class="form-select" id="category" required>
                                            <option value="electronics">Electronics</option>
                                            <option value="clothing">Clothing</option>
                                            <option value="books">Books</option>

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

                <table class="table table-striped mt-5">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">NameCategory</th>
                            <th scope="col">IconCategory</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody> </tbody>
                </table>
            </div>
        </>
    );
}

export default Products;