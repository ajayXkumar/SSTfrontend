// AdminPage.js
import React, { useState, useEffect } from "react";
import tilesdata from "./../data";
import Modal from "././model";
import "./../styles/admin.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.config";
import AdminLogin from "./AdminLogin";

import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase.config"; // Import your Firebase configuration

function AdminPage() {
  const [user, setUser] = useState(null);

  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    image: "",
    size: "",
  });

  const productsCollection = collection(db, "products");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);
  
  useEffect(() => {
    
    if (user) {
    
      const fetchProducts = async () => {
       
        const data = await getDocs(productsCollection);
        setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        console.log(productsCollection)
      };
      fetchProducts();
    }
  }, [user]);
  
  if (!user) {
    return <AdminLogin onLogin={() => setUser(auth.currentUser)} />;
  }
  



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewProduct({ ...newProduct, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const addProduct = async () => {
    await addDoc(productsCollection, newProduct);
    setProducts([...products, { ...newProduct }]);
    resetForm();
  };

  const editProduct = (product) => {
    setEditingProduct(product);
    setNewProduct(product);
    setShowModal(true);
  };

  const saveProduct = async () => {
    const productDoc = doc(db, "products", editingProduct.id);
    await updateDoc(productDoc, newProduct);
    setProducts(
      products.map((product) =>
        product.id === editingProduct.id ? newProduct : product
      )
    );
    resetForm();
  };

  const deleteProduct = async (id) => {
    const productDoc = doc(db, "products", id);
    await deleteDoc(productDoc);
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleSubmit = () => {
    editingProduct ? saveProduct() : addProduct();
  };

  const resetForm = () => {
    setNewProduct({
      name: "",
      description: "",
      price: "",
      category: "",
      quantity: "",
      image: "",
      size: "",
    });
    setEditingProduct(null);
    setShowModal(false);
  };

  return (
    <div className="admin-page">
      <h1>Admin Page</h1>
     
      <Modal show={showModal} handleClose={() => setShowModal(false)}>
        <div className="form">
          <input
            type="file"
            name="image"
            placeholder="Image"
            onChange={handleFileChange}
          />

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newProduct.name}
            onChange={handleInputChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={newProduct.description}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newProduct.price}
            onChange={handleInputChange}
          />
          <select
            name="category"
            value={newProduct.category}
            onChange={handleInputChange}
          >
            <option value="Laddoo gopal ">Laddoo gopal</option>
            <option value="phone stand">Phone stand</option>
            <option value="bed">Bed</option>
            <option value="table">Table</option>
          </select>
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={newProduct.quantity}
            onChange={handleInputChange}
          />

          <input
            type="text"
            name="size"
            placeholder="Size"
            value={newProduct.size}
            onChange={handleInputChange}
          />
          <button onClick={handleSubmit}>
            {editingProduct ? "Save" : "Add"} Product
          </button>
        </div>
      </Modal>
      <h2>Products</h2>

      <button 
      style={{backgroundColor:"blue"}}
      onClick={() => setShowModal(true)}>Add Product</button>
      
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <img
              src={product.image}
              alt={product.name}
              width="50"
              height="50"
            />
            <span>
              {product.name} - ${product.price}
            </span>
            <button style={{backgroundColor:"black"}}onClick={() => editProduct(product)}>✏️</button>
            <button style={{backgroundColor:"black"}} onClick={() => deleteProduct(product.id)}>🗑️</button>
          </li>
        ))}
      </ul>

      <button onClick={() => auth.signOut()}>Logout</button>
    </div>
  );
}

export default AdminPage;
