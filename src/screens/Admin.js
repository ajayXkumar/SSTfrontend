// AdminPage.js
import React, { useState } from 'react';
import tilesdata from './../data';
import Modal from '././model';
import './../styles/admin.css';

function AdminPage() {
  const [products, setProducts] = useState(tilesdata);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    category: '',
    quantity: '',
    image: '',
    size: '',
    box: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewProduct({ ...newProduct, image: URL.createObjectURL(e.target.files[0]) });
  };

  const addProduct = () => {
    setProducts([...products, { ...newProduct, id: products.length + 1 }]);
    setShowModal(false);
  };

  const editProduct = (product) => {
    setEditingProduct(product);
    setNewProduct(product);
    setShowModal(true);
  };

  const saveProduct = () => {
    setProducts(products.map(product => (product.id === newProduct.id ? newProduct : product)));
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleSubmit = () => {
    editingProduct ? saveProduct() : addProduct();
  };

  return (
    <div className="admin-page">
      <h1>Admin Page</h1>
      <button onClick={() => setShowModal(true)}>Add Product</button>
      <Modal show={showModal} handleClose={() => setShowModal(false)}>
        <div className="form">
          <input type="text" name="name" placeholder="Name" value={newProduct.name} onChange={handleInputChange} />
          <textarea name="description" placeholder="Description" value={newProduct.description} onChange={handleInputChange} />
          <input type="number" name="price" placeholder="Price" value={newProduct.price} onChange={handleInputChange} />
          <select name="category" value={newProduct.category} onChange={handleInputChange}>
            <option value="floor">Floor</option>
            <option value="washbasin">Washbasin</option>
            <option value="wall">Wall</option>
            <option value="kitchen">Kitchen</option>
          </select>
          <input type="number" name="quantity" placeholder="Quantity" value={newProduct.quantity} onChange={handleInputChange} />
          <input type="file" name="image" placeholder="Image" onChange={handleFileChange} />
          <input type="text" name="size" placeholder="Size" value={newProduct.size} onChange={handleInputChange} />
          <input type="text" name="box" placeholder="Box" value={newProduct.box} onChange={handleInputChange} />
          <button onClick={handleSubmit}>{editingProduct ? 'Save' : 'Add'} Product</button>
        </div>
      </Modal>
      <h2>Products</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <img src={product.image} alt={product.name} width="50" height="50" />
            <span>{product.name} - ${product.price}</span>
            <button onClick={() => editProduct(product)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPage;
