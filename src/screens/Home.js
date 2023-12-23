import React from "react";
import TuneIcon from "@mui/icons-material/Tune";
import WindowIcon from "@mui/icons-material/Window";
import "../styles/Home.css";
import tilesdata from "../data";
const Home = () => {
  return (
    <div className="home">
      <div className="page-title">Home</div>
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
        <div className="filterIcon">
          <TuneIcon />
        </div>
      </div>
      <div className="introcard" style={{ color: "white" }}>
        this is tiles store
      </div>
      <div className="catagory">
        <button className="catagory-button">
          <WindowIcon /> All
        </button>
        <div className="catagory-icons">
          <img
            src="./1.jpg"
            style={{ width: "20px", height: "20px" }}
            alt="Description"
          />
          floor
        </div>
      </div>

      <div className="products">
        <p style={{ fontWeight: "bold", width: "100vw", marginTop: "20px" }}>
          products
        </p>
        {tilesdata.map((product) => (
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
            <button className="addtocart">+</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
