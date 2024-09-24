import React from "react";
import { FaStar } from "react-icons/fa";

const Filter = ({
  sort,
  company,
  featured,
  rating,
  handleCompanyChange,
  handleFeatured,
  handleRatingChange,
  handleSortChange,
}) => {
  return (
    <>
      <div className="options">
        <div className="filter">
          <h3>Filter</h3>
        </div>
        <div className="filter-options">
          <h3>Price</h3>
          <div className="sort">
            <div>
              <label htmlFor="ascending">Highest to lowest</label>
              <input
                type="checkbox"
                name="sort"
                value="-price"
                id="ascending"
                checked={sort === "-price"}
                onChange={() => handleSortChange("-price")}
              />
            </div>
            <div>
              <label htmlFor="decending">Lowest to highest</label>
              <input
                type="checkbox"
                name="sort"
                id="decending"
                value="price"
                checked={sort === "price"}
                onChange={() => handleSortChange("price")}
              />
            </div>
          </div>
          <h3>Company</h3>
          <div className="companies">
            <div>
              <label htmlFor="ikea">Ikea</label>
              <input
                type="checkbox"
                name="company"
                id="ikea"
                onChange={() => handleCompanyChange("ikea")}
                value="ikea"
                checked={company === "ikea"}
              />
            </div>
            <div>
              <label htmlFor="ikea">Liddy</label>
              <input
                type="checkbox"
                name="company"
                id="liddy"
                onChange={() => handleCompanyChange("liddy")}
                value="liddy"
                checked={company === "liddy"}
              />
            </div>
            <div>
              <label htmlFor="ikea">Caressa</label>
              <input
                type="checkbox"
                name="company"
                id="caressa"
                onChange={() => handleCompanyChange("caressa")}
                value="caressa"
                checked={company === "caressa"}
              />
            </div>
            <div>
              <label htmlFor="ikea">Marcos</label>
              <input
                type="checkbox"
                name="company"
                id="marcos"
                onChange={() => handleCompanyChange("marcos")}
                value="marcos"
                checked={company === "marcos"}
              />
            </div>
          </div>
          <h3>Rating</h3>
          <div className="ratings">
            <div>
              <label htmlFor="lessThan4.5">4 - 4.5</label>
              <input
                type="checkbox"
                name="rating"
                id="lessThan4.5"
                value="rating<4.5"
                onChange={() => handleRatingChange("rating<4.5")}
                checked={rating === "rating<4.5"}
              />
            </div>
            <div>
              <label htmlFor="greaterThan4.5">4.5 - 5</label>
              <input
                type="checkbox"
                name="rating"
                id="greaterThan4.5"
                value="rating>4.5"
                onChange={() => handleRatingChange("rating>=4.5")}
                checked={rating === "rating>=4.5"}
              />
            </div>
          </div>
          <h3>Featured</h3>
          <div className="featured">
            <label htmlFor="featured">
              Featured <FaStar style={{color: 'yellow'}}/>
            </label>

            <input
              type="checkbox"
              onChange={handleFeatured}
              checked={featured}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
