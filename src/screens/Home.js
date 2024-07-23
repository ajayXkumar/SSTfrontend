import React from "react";
import TuneIcon from "@mui/icons-material/Tune";
import WindowIcon from "@mui/icons-material/Window";
import "../styles/Home.css";
import { useState } from "react";
import tilesdata from "../data";
import { Link } from "react-router-dom";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const [cat, setcat] = useState(tilesdata);
  const navigate = useNavigate();
  const handleall = () => {
    setcat(tilesdata);
  };

  const handleClick = () => {
    navigate('/cart');
  };

  const handlewall = () => {
    const wall = tilesdata.filter((item) => item.catagory === "wall");
    setcat(wall);
  };
  const handleWash = () => {
    const wash = tilesdata.filter((item) => item.catagory === "washbasin");
    setcat(wash);
  };
  const handlefloor = () => {
    const floor = tilesdata.filter((item) => item.catagory === "floor");
    setcat(floor);
  };

  return (
    <div className="home">
      <div className="page-title">Shree shyam tiles , nohar</div>
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
        <div onClick={handleClick}>
         <ShoppingBagIcon />
         </div>
      </div>
      <div
        className="introcard"
        style={{ color: "white", fontSize: "30px", fontWeight: "bold" }}
      >
      </div>
      <div className="catagory">
        <button className="catagory-button" onClick={handleall}>
          <WindowIcon /> All
        </button>
        <div className="catagory-icons" onClick={handlefloor}>
          <img
            src="./1.jpeg"
            style={{ width: "20px", height: "20px", marginRight: "5px" }}
            alt="Description"
          />
          floor
        </div>
        <div className="catagory-icons" onClick={handleWash}>
          <img
            src="./wash.jpeg"
            style={{ width: "20px", height: "20px", marginRight: "5px" }}
            alt="Description"
          />
          washbasin
        </div>

        <div className="catagory-icons" onClick={handlewall}>
          <img
            src="./5.jpeg"
            style={{ width: "20px", height: "20px", marginRight: "5px" }}
            alt="Description"
          />
          wall
        </div>
      </div>

      <div className="products">
        <p style={{ fontWeight: "bold", width: "100vw", marginTop: "20px" }}>
          products
        </p>
        {cat.map((product) => (
          <React.Fragment key={product.id}>
            <Link
              style={{textDecoration: 'none'}}
              to={`/product/${product.id}`}
              key={product.id}
              className="product-link"
            >
              <div key={product.id} className="product-card">
                <img
                  src={product.image}
                  style={{
                    width: "150px",
                    height: "150px",
                    marginLeft: "20px",
                    marginTop: "20px",
                    borderRadius: "7px",
                  }}
                  alt={product.name}
                />
              
                <div className="details">
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
