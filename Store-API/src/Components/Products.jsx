import React, { useEffect, useState } from "react";
import "../index.css";
import axios from "axios";
import { IoMdCart } from "react-icons/io";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import NavBar from "../NavBar/NavBar";
import Filter from "./Filter";
import Search from "./Search";
const Products = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [company, setCompany] = useState(null); 
  const [rating, setRating] = useState(null);
  const [featured, setFeatured] = useState(false);
  const [sort, setSort] = useState(null);
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSortChange = (sortOption) => {
    setSort(sort === sortOption ? null : sortOption);
  };
  const handleCompanyChange = (sortOption) => {
    setCompany(company === sortOption ? null : sortOption);
  };
  const handleRatingChange = (rateOption) => {
    setRating(rating === rateOption ? null : rateOption);
  };
  const handleFeatured = () => {
    setFeatured(!featured);
  };
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const getData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5500/api/v1/products",
        {
          params: {
            sort: sort ? sort : null,
            name: search,
            page,
            limit,
            company: company ? company : null,
            numericFilters: rating ? rating : null,
            featured: featured,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.setItem("userId", response.data.userId);

      setName(response.data.user);
      setData(response.data.product);
      const totalProduct = response.data.totalItems;
      setTotalPages(Math.ceil(totalProduct / limit));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [sort, search, page, limit, company, rating, featured]);

  const addToCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5500/api/v1/products/cart",

        {
          productId: productId,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCart((prevCart) => {
        const currentQuantity = prevCart[productId] || 0;
        return {
          ...prevCart,
          [productId]: currentQuantity + 1,
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavBar name={name} />
      <div className="container">
        <Filter
          sort={sort}
          rating={rating}
          company={company}
          featured={featured}
          handleCompanyChange={handleCompanyChange}
          handleFeatured={handleFeatured}
          handleRatingChange={handleRatingChange}
          handleSortChange={handleSortChange}
        />
        <div className="products-container">
          <h1 style={{ margin: "3px", WebkitTextStroke: "2px black" }}>
            Products
          </h1>
          <Search setSearch={setSearch} />
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            <div className="products">
              {data.map((product) => {
                const { _id, name, price, featured, rating, company } = product;
                const quantityInCart = cart[_id] || 0;
                return (
                  <div className="product" key={_id}>
                    <div className="img-section">
                      <img src="" alt="Product Image" />
                    </div>
                    <div className="details" style={{ position: "relative" }}>
                      <p>
                        <strong>Name: </strong>
                        {name}
                      </p>
                      <p>
                        <strong>Price: </strong>Rs. {price}
                      </p>
                      <p
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "3px",
                        }}
                      >
                        <strong>Rating: </strong> {rating} <FaRegStar />
                      </p>
                      <p>
                        <strong>Company:</strong> {company}
                      </p>
                      <p
                        style={{
                          color: "yellow",
                          fontWeight: "600",
                          position: "absolute",
                          right: "0",
                        }}
                      >
                        {featured ? <FaStar /> : ""}
                      </p>
                    </div>
                    <button onClick={() => addToCart(_id)}>
                      <IoMdCart />
                      Add to Cart ({quantityInCart})
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div className="page-num">
        {[...Array(totalPages)].map((_, index) => (
          <button
            className="page-btn"
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            disabled={page === index + 1} // Disable current page button
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default Products;
