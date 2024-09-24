import React from 'react'
import { CiSearch } from "react-icons/ci";

const Search = ({setSearch}) => {
  return (
   <>
     <div className="search-con">
            <input
              type="text"
              name="search"
              id="search"
              className="search"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
            />
            <CiSearch className="search-icon" />
          </div>
   </>
  )
}

export default Search