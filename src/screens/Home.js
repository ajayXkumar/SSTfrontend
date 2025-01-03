import React, { useEffect } from "react";
import TuneIcon from "@mui/icons-material/Tune";
import WindowIcon from "@mui/icons-material/Window";
import "../styles/Home.css";
import { useState } from "react";
import tilesdata from "../data";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.config";

const Home = () => {
  const [cat, setcat] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, "products");
        const snapshot = await getDocs(productsCollection);
        const productList = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setcat(productList);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, []);

  const navigate = useNavigate();
  const handleall = () => {
    setcat(cat);
  };

  const handleClick = () => {
    navigate("/cart");
  };

  const handleladoo = () => {
    const ladoo = tilesdata.filter((item) => item.catagory === "ladoo");
    setcat(ladoo);
  };
  const handlebed = () => {
    const bed = tilesdata.filter((item) => item.catagory === "bed");
    setcat(bed);
  };
  const handlephone = () => {
    const phone = tilesdata.filter((item) => item.catagory === "phone");
    setcat(phone);
  };

  return (
    <div
      className="home"
      style={{ padding: "20px", width: "100vw", height: "100vh" }}
    >
      <div className="page-title"></div>
      <div className="search-filter">
        <div>
          <input
            className="search-box"
            type="text"
            placeholder="Search..."
            // value={}
            // onChange={}
          />
        </div>
        <div onClick={handleClick}></div>

        <div>
          <Link
            style={{ textDecoration: "none" }}
            to={`/admin`}
            className="product-link"
          >
            <AdminPanelSettingsIcon />
          </Link>
        </div>
      </div>
      <div
        className="introcard"
        style={{ color: "white", fontSize: "30px", fontWeight: "bold" }}
      ></div>
      <div className="catagory">
        <button className="catagory-button" onClick={handleall}>
          <WindowIcon /> All
        </button>
        <div className="catagory-icons" onClick={handleladoo}>
          {/* <img
            src="./1.jpeg"
            style={{ width: "20px", height: "20px", marginRight: "5px" }}
            alt="Description"
          /> */}
          ladoo gopal
        </div>
        <div className="catagory-icons" onClick={handlebed}>
          {/* <img
            src="./wash.jpeg"
            style={{ width: "20px", height: "20px", marginRight: "5px" }}
            alt="Description"
          /> */}
          bed
        </div>

        <div className="catagory-icons" onClick={handlephone}>
          {/* <img
            src="./5.jpeg"
            style={{ width: "20px", height: "20px", marginRight: "5px" }}
            alt="Description"
          /> */}
          phone stand
        </div>
      </div>

      <div className="products">
        <p style={{ fontWeight: "bold", width: "100vw", marginTop: "20px" }}>
          products
        </p>
        {cat.map((product) => (
          <React.Fragment key={product.id}>
            <Link
              style={{ textDecoration: "none" }}
              to={`/product/${product.id}`}
              key={product.id}
              className="product-link"
            >
              <div key={product.id} className="product-card">
                <img
                  src={product.image}
                  style={{
                    width: "150",
                    height: "150px",
                    marginLeft: "20px",
                    marginTop: "20px",
                    borderRadius: "7px",
                  }}
                  alt={product.name}
                />

                <div className="details-home">
                  <p>{product.name}</p>
                  <p style={{ fontWeight: "bold" }}>
                    <span style={{ fontSize: "small" }}>Rs.</span>
                    {product.price}/-
                  </p>
                </div>
              </div>
            </Link>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Home;
