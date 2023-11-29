import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import "./Categories.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Categories(props) {
  const categoriesCollectionRef = collection(db, "Categories");
  const [nameCategory, setNameCategory] = useState("");
  const [iconCategory, setIconCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [update, setUpdate] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(5); // You can adjust the number of items per page
  const totalPages = Math.ceil(categories.length / itemsPerPage);
  // Pagination logic
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

  const addCategory = async () => {
    try {
      await addDoc(categoriesCollectionRef, {
        nameCategory: nameCategory,
        iconCategory: iconCategory
      });
      setNameCategory("");
      setIconCategory("");
      setUpdate(!update);
      toast("Add Category Success!");
    } catch (error) {
      console.error("Error adding category: " + error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      const categoryDocRef = doc(db, "Categories", id);
      await deleteDoc(categoryDocRef);
      setUpdate(!update);
    } catch (error) {
      console.error("Error deleting category: " + error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0); // Reset page to 0 when the search term changes
  };

  useEffect(() => {
    // Filter categories based on the search term
    const filteredCategories = categories.filter(category =>
      category.nameCategory.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCategories(filteredCategories);
  }, [searchTerm]);



  return (
    <div className="container categories p-3">       
      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Add Category</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label for="categoryName" className="form-label">Name Category:</label>
                <input type="text" value={nameCategory} onChange={(e) => setNameCategory(e.target.value)} className="form-control" id="categoryName" placeholder="Enter category name" required/>               
              </div>
              <div className="mb-3">
                <label for="categoryIcon" className="form-label">Icon Category:</label>
                <input  type="text" value={iconCategory} onChange={(e) => setIconCategory(e.target.value)} className="form-control" id="categoryIcon" placeholder="Enter category icon" required/>    
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" onClick={addCategory} className="btn btn-success">Add Category</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3 ">
        <div className="col-12 col-md-4 col-xl-3">
          <h4>List Categories</h4>
        </div>
        <div className="col-12 col-md-5 col-xl-6">
          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search..." aria-label="Search" value={searchTerm}
              onChange={handleSearchChange} />
            <button className="btn btn-success" type="submit">Search</button>
          </form>
        </div>

        <div className="col-12 col-md-3 col-xl-3 add-category">
          <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Add Category
          </button>
        </div>
      </div>

      <table className="table table-striped mt-5">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">NameCategory</th>
            <th scope="col">IconCategory</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((element, index) => (
            <tr>
              <th scope="row">{index + 1 + currentPage * itemsPerPage}</th>
              <td>{editingIndex === element.id ? (
                <input
                  type="text"
                  value={element.nameCategory}
                />
              ) : (
                element.nameCategory
              )}</td>
              <td><i className={element.iconCategory}></i></td>
              <td>
                {
                  editingIndex === element.id ? (
                    <>
                      <button type="button" className="btn btn-success"><i className="fa-solid fa-check"></i></button>
                      <button type="button" onClick={() => deleteCategory(element.id)} className="btn btn-danger ms-2"><i className="fa-solid fa-trash-can"></i></button>
                    </>

                  ) : (
                    <>
                      <button type="button" onClick={() => setEditingIndex(element.id)} className="btn btn-primary"><i className="fa-solid fa-pen-to-square"></i></button>
                      <button type="button" onClick={() => deleteCategory(element.id)} className="btn btn-danger ms-2"><i className="fa-solid fa-trash-can"></i></button>
                    </>
                  )
                }

              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav aria-label="Page navigation example">
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
          {Array.from({ length: Math.ceil(categories.length / itemsPerPage) }, (_, index) => (
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
  );
}

export default Categories;