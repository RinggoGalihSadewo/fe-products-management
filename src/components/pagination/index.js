import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Link from "next/link";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const Pagination = ({
  totalProducts,
  productsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pages.push(i);
  }

  const btnPrevDisable = pages[0];
  const btnNextDisable = pages[pages.length - 1];

  return (
    <Box my={2} className="flex items-center md:justify-end justify-center">
      <button
        type="button"
        className={`btn-prev-next w-[5rem] ${
          currentPage === btnPrevDisable
            ? "bg-[#dedede] cursor-not-allowed"
            : "bg-black hover:bg-[#383838]"
        }`}
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === btnPrevDisable ? true : false}
      >
        <div className="flex items-center justify-center">
          <span>
            <KeyboardArrowLeftIcon />
          </span>
          <span className="mr-3">Prev</span>
        </div>
      </button>
      <span className="mx-5 pagination">
        {pages.map((page, index) => {
          return (
            <button
              className={`btn-pagination ${
                page === currentPage ? "active" : ""
              }`}
              key={index}
              onClick={() => {
                setCurrentPage(page);
              }}
            >
              {page}
            </button>
          );
        })}
      </span>
      <button
        type="button"
        className={`btn-prev-next w-[5rem] ${
          currentPage === btnNextDisable
            ? "bg-[#dedede] cursor-not-allowed"
            : "bg-black hover:bg-[#383838]"
        }`}
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === btnNextDisable ? true : false}
      >
        <div className="flex items-center justify-center">
          <span className="ml-3">Next</span>
          <span>
            <KeyboardArrowRightIcon />
          </span>
        </div>
      </button>
    </Box>
  );
};

export default Pagination;
