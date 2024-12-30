import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import tilesdata from "../data";
import "../styles/productdetails.css";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";

const ProductDetails = ({ onAddToCart }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setproduct] = useState();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const findProduct = async () => {
      try {
        // Fetch the product from Firestore
        const productDoc = doc(db, "products", productId);
        const productSnap = await getDoc(productDoc);

        if (productSnap.exists()) {
          console.log(productSnap.data());
          setproduct(productSnap.data()); // Log the product data
        } else {
          console.log("No such product!");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (productId) {
      findProduct();
    }
  }, [productId]);

  const handleClick = () => {
    navigate("/cart");
  };
  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = (product) => {
    onAddToCart(product); // Assuming onAddToCart adds the product to the cart
    setShowPopup(true); // Show the popup when the product is added

    // Hide the popup after 3 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 1300);
  };

  return (
    <div className="product-page">
      <div className="top-bar">
        <p>
          <Link
            style={{
              textDecoration: "none",
              color: "black",
              fontWeight: "bold",
            }}
            to="/"
          >
            Home
          </Link>
        </p>
        <div onClick={handleClick}>
          <ShoppingBagIcon />
        </div>
      </div>

      <div className="alldetails">
        <img
          src={process.env.PUBLIC_URL + "/" + product.image}
          alt={product.name}
          style={{ width: "200px", height: "200px", borderRadius: "7px" }}
        />
        <div className="details">
          <h2>{product.name}</h2>
          <p>Price: Rs. {product.price}/-</p>
          <p>Size : {product.size} </p>
          <p>Box: {product.box}</p>
          <p>Description: {product.description}</p>
          <p>Category: {product.catagory}</p>
        </div>
        <button className="addtocart" onClick={() => handleAddToCart(product)}>
          Add to Cart
        </button>

        <button className="addtocart2" onClick={() =>  handleClick()}>
          Go to Cart
        </button>

        {showPopup && (
          <div className="popup">
            <p>Product added to cart successfully!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
