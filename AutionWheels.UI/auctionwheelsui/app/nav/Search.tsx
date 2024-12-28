"use client";

import React from "react";
import { FaSearch } from "react-icons/fa";
import { useParamsStore } from "../hooks/useParamStore";

const Search = () => {
  const setParams = useParamsStore((state) => state.setParams);
  const setSearchValue = useParamsStore((state) => state.setSearchValue);
  const searchValue = useParamsStore((state) => state.searchValue);

  function onChange(event: any) {
    setSearchValue(event.target.value);
  }

  function search() {
    setParams({ searchTerm: searchValue });
  }

  return (
    <div className="flex w-[30%] items-center border-2 rounded-full py-2 shadow-sm h-[40px]">
      <input
        type="text"
        value={searchValue}
        placeholder="Search..."
        className="flex-grow pl-5 bg-transparent focus:outline-none border-transparent focus:border-transparent focus:ring-0 text-sm text-gray text-gray-600"
        onChange={onChange}
        onKeyDown={(event: any) => {
          if (event.key === "Enter") {
            search();
          }
        }}
      />
      <button onClick={search}>
        <FaSearch
          size={34}
          className="bg-red-500 text-white rounded-full p-2 cursor-pointer mx-2 hover:bg-red-400"
        ></FaSearch>
      </button>
    </div>
  );
};

export default Search;
