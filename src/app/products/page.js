"use client";

import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@/components/modal";
import CircularProgress from "@mui/material/CircularProgress";
import useSWR from "swr";
import { Fetcher, Url, UrlImg } from "../../utils";
import FormatRupiah from "../../helpers";
import Pagination from "../../components/pagination";

const Products = () => {
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [showData, setShowData] = useState({});
  const [searchProduct, setSearchProduct] = useState("");
  const [resSearchProduct, setResSearchProduct] = useState({});

  const { data, error, isLoading } = useSWR(Url, Fetcher);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);
  const lastProductsIndex = currentPage * productsPerPage;
  const firstProductsIndex = lastProductsIndex - productsPerPage;

  const [products, setProducts] = useState([]);

  const handleModal = (type, value) => {
    setModal((prev) => (!modal ? true : false));
    setModalType(type);
    setShowData(value);
  };

  const handleSearch = () => {
    const filtered = products?.filter((value) =>
      value.name.toLowerCase().includes(searchProduct.toLowerCase())
    );
    setResSearchProduct(filtered);
  };

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const storedValue = localStorage.getItem("access_token");

      if (!storedValue) window.location.href = "/";
    } else {
      console.log("Local storage is not supported by the browser.");
    }

    const resProducts = data?.slice(firstProductsIndex, lastProductsIndex);
    setProducts(resProducts);

    handleSearch();
  }, [searchProduct, data, firstProductsIndex, lastProductsIndex]);

  return (
    <Box className="mt-28 md:mt-32">
      <Box className="flex justify-between">
        <h2 className="font-bold text-lg">List Products</h2>
        <button className="btn" onClick={() => handleModal("add")}>
          Add Products <AddIcon className="text-[1rem]" />
        </button>
      </Box>
      <Box my={3} align="right">
        <input
          type="text"
          placeholder="Search Product"
          value={searchProduct}
          onChange={(e) => {
            setSearchProduct(e.target.value);
          }}
          className="input-form w-full md:w-[15rem]"
        />
      </Box>
      <Box my={3}>
        {isLoading ? (
          <Box className="flex justify-center">
            <CircularProgress align="center" sx={{ color: "black" }} />
          </Box>
        ) : (
          <>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">No.</TableCell>
                    <TableCell align="center">Name Product</TableCell>
                    <TableCell align="center">Purchase Price</TableCell>
                    <TableCell align="center">Purchase Sell</TableCell>
                    <TableCell align="center">Stock</TableCell>
                    <TableCell align="center">Photo Product</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {resSearchProduct?.length > 0 && searchProduct !== ""
                    ? resSearchProduct.map((value, index) => {
                        return (
                          <TableRow
                            className="hover:bg-[#e3e4e6] hover:text-white transition duration-200 cursor-pointer"
                            onClick={() => handleModal("show", value)}
                            key={value._id}
                          >
                            <TableCell align="left">{index + 1}</TableCell>
                            <TableCell
                              align="center"
                              className="capitalize text-red"
                            >
                              {value.name}
                            </TableCell>
                            <TableCell align="center">
                              <FormatRupiah value={value.purchase_price} />
                            </TableCell>
                            <TableCell align="center">
                              <FormatRupiah value={value.purchase_sell} />
                            </TableCell>
                            <TableCell align="center">{value.stock}</TableCell>
                            <TableCell>
                              <Box align="center" className="border">
                                <img
                                  src={`${UrlImg}/${value.photo}`}
                                  alt={`${value.name}`}
                                  width={115}
                                  height={115}
                                />
                              </Box>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    : ""}
                  {resSearchProduct?.length === 0 || searchProduct === ""
                    ? products?.map((value, index) => {
                        return (
                          <TableRow
                            className="hover:bg-[#e3e4e6] hover:text-white transition duration-200 cursor-pointer"
                            onClick={() => handleModal("show", value)}
                            key={value._id}
                          >
                            <TableCell align="left">{index + 1}</TableCell>
                            <TableCell align="center" className="capitalize">
                              {value.name}
                            </TableCell>
                            <TableCell align="center">
                              <FormatRupiah value={value.purchase_price} />
                            </TableCell>
                            <TableCell align="center">
                              <FormatRupiah value={value.purchase_sell} />
                            </TableCell>
                            <TableCell align="center">{value.stock}</TableCell>
                            <TableCell>
                              <Box align="center">
                                <img
                                  src={`${UrlImg}/${value.photo}`}
                                  alt={`${value.name}`}
                                  className="border hover:border-black"
                                  width={115}
                                  height={115}
                                />
                              </Box>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    : ""}
                </TableBody>
              </Table>
            </TableContainer>
            <Pagination
              totalProducts={data?.length}
              productsPerPage={productsPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </>
        )}
      </Box>
      {modal && (
        <Modal FnModal={handleModal} type={modalType} data={showData} />
      )}
    </Box>
  );
};

export default Products;
