import React, { useId, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Image from "next/image";
import ModalDelete from "./delete";
import { SaveProduct, UpdateProduct, UrlImg, Url } from "../../utils";
import axios from "axios";
import ModalValidation from "./validation";
import ModalValidationFile from "./validation-file";
import { CircularProgress } from "@mui/material";

const Modal = ({ FnModal, type, data }) => {
  const [open, setOpen] = useState(true);
  const [isValidation, setIsValidation] = useState(false);
  const [isValidationFile, setIsValidationFile] = useState(false);
  const [errorsMsg, setErrorsMsg] = useState({});
  const [isType, setIsType] = useState(type);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [selectedImage, setSelectedImage] = useState(
    `${UrlImg}/${
      isType === "add"
        ? "default.png"
        : isType === "show" || isType === "edit"
        ? data.photo
        : ""
    }`
  );

  const idName = useId();
  const idPurchasePrice = useId();
  const idSellingPrice = useId();
  const idStock = useId();
  const [product, setProduct] = useState({
    _id: data ? data._id : "",
    name: data ? data.name : "",
    purchase_price: data ? data.purchase_price : "",
    purchase_sell: data ? data.purchase_sell : "",
    stock: data ? data.stock : "",
    photo: data ? data.photo : "",
  });
  const [modalDelete, setModalDelete] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProduct((prev) => ({
        ...prev,
        photo: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
    }
  };

  const handleModalDelete = () => {
    setModalDelete((prev) => (!modalDelete ? true : false));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const formData = new FormData();
    const filePhoto = new FormData();
    let photoName = "";

    setErrorsMsg("");
    setIsValidation(false);
    setIsValidationFile(false);
    setLoadingBtn(true);

    if (product.photo) {
      filePhoto.append("photo", product.photo);

      try {
        const response = await axios.post(
          "https://ringgogalihsadewo.com/products-management/public/api/file-upload",
          filePhoto,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        photoName = response.data.filename;
      } catch (error) {
        setErrorsMsg(error.response.data.errors.photo);
        setIsValidationFile(true);
        setLoadingBtn(false);
        return false;
      }
    }

    formData.append("name", product.name);
    formData.append("purchase_price", product.purchase_price);
    formData.append("purchase_sell", product.purchase_sell);
    formData.append("stock", product.stock);
    formData.append("photo", photoName !== "" ? photoName : "default.png");

    axios
      .post(Url, formData)
      .then((res) => {
        (window.location.href = "/products"), setLoadingBtn(false);
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          const errors = err.response.data.errors;
          setErrorsMsg(errors);
          setIsValidation(true);
          setLoadingBtn(false);
        }
      });
  };

  const handleUpdate = async () => {
    const filePhoto = new FormData();
    let photoName = "";

    setErrorsMsg("");
    setIsValidation(false);
    setIsValidationFile(false);
    setLoadingBtn(true);

    if (product.photo) {
      filePhoto.append("photo", product.photo);

      try {
        const response = await axios.post(
          "https://ringgogalihsadewo.com/products-management/public/api/file-upload",
          filePhoto,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        photoName = response.data.filename;
      } catch (error) {
        setErrorsMsg(error.response.data.errors.photo);
        setIsValidationFile(true);
        setLoadingBtn(false);
        return false;
      }
    }

    axios
      .patch(`${Url}/${product._id}`, {
        _id: product._id,
        name: product.name,
        purchase_price: product.purchase_price,
        purchase_sell: product.purchase_sell,
        stock: product.stock,
        photo: photoName !== "" ? photoName : product.photo,
      })
      .then((res) => {
        (window.location.href = "/products"), setLoadingBtn(false);
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          const errors = err.response.data.errors;
          setErrorsMsg(errors);
          setIsValidation(true);
          setLoadingBtn(false);
        }
      });
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={FnModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {isType === "add"
            ? "Add Product"
            : isType === "show"
            ? "Show Product"
            : isType === "edit"
            ? "Edit Product"
            : ""}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {isType === "add" || isType === "show" || isType === "edit" ? (
              <form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box>
                      <Stack>
                        <center>
                          <img
                            src={selectedImage}
                            className="rounded border"
                            alt={data ? `Photo ${data.name}` : "Photo Product"}
                            width={250}
                            height={250}
                          />
                        </center>
                      </Stack>
                      {(!data && isType === "add") || isType === "edit" ? (
                        <Stack my={2}>
                          <center>
                            <input
                              type="file"
                              name="photo"
                              className="input-form md:w-[300px] w-full"
                              onChange={handleImageChange}
                            />
                          </center>
                        </Stack>
                      ) : (
                        ""
                      )}
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    {isType === "edit" ? (
                      <input
                        id={idName}
                        type="hidden"
                        name="id"
                        className="input-form w-full"
                        value={product._id}
                        onChange={handleChange}
                        required
                        disabled={isType === "show" ? true : false}
                      />
                    ) : (
                      ""
                    )}
                    <Stack>
                      <label htmlFor={idName}>Name</label>
                      <input
                        id={idName}
                        type="text"
                        name="name"
                        className="input-form w-full capitalize"
                        value={product.name}
                        onChange={handleChange}
                        required
                        disabled={isType === "show" ? true : false}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack>
                      <label htmlFor={idPurchasePrice}>Purchase Price</label>
                      <input
                        id={idPurchasePrice}
                        type="number"
                        name="purchase_price"
                        className="input-form w-full"
                        value={product.purchase_price}
                        onChange={handleChange}
                        required
                        disabled={isType === "show" ? true : false}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack>
                      <label htmlFor={idSellingPrice}>Purchase Sell</label>
                      <input
                        id={idSellingPrice}
                        type="number"
                        name="purchase_sell"
                        className="input-form w-full"
                        value={product.purchase_sell}
                        onChange={handleChange}
                        required
                        disabled={isType === "show" ? true : false}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack>
                      <label htmlFor={idStock}>Stock</label>
                      <input
                        id={idStock}
                        type="number"
                        name="stock"
                        className="input-form w-full"
                        value={product.stock}
                        onChange={handleChange}
                        required
                        disabled={isType === "show" ? true : false}
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </form>
            ) : (
              ""
            )}
          </DialogContentText>
        </DialogContent>
        {data && isType === "show" ? (
          <Box className="flex justify-end my-3 mr-3">
            <button
              className="btn-delete py-[0.7rem] px-[0.8rem] sm:px-[2rem] m-[0.5rem]"
              onClick={handleModalDelete}
            >
              Delete
            </button>
            <button
              className="btn-edit py-[0.7rem] px-[0.8rem] sm:px-[2rem] m-[0.5rem]"
              onClick={() => setIsType("edit")}
            >
              Edit
            </button>
            <button
              className="btn py-[0.7rem] px-[0.8rem] sm:px-[2rem] m-[0.5rem]"
              onClick={FnModal}
            >
              Close
            </button>
          </Box>
        ) : (
          <Box className="flex justify-end mb-3 mr-3">
            <button
              className="btn py-[0.7rem] px-[0.8rem] sm:px-[2rem] m-[0.5rem]"
              onClick={FnModal}
            >
              Close
            </button>
            <button
              className="btn py-[0.7rem] px-[0.8rem] sm:px-[2rem] m-[0.5rem]"
              onClick={isType === "add" ? handleSave : handleUpdate}
            >
              {loadingBtn ? (
                <Box className="flex justify-center">
                  <CircularProgress
                    align="center"
                    sx={{ color: "white" }}
                    size={22}
                  />
                </Box>
              ) : isType === "add" ? (
                "SAVE"
              ) : (
                "UPDATE"
              )}
            </button>
          </Box>
        )}
      </Dialog>
      {modalDelete ? (
        <ModalDelete
          FnModalDelete={handleModalDelete}
          name={data.name}
          SetCloseParentModal={FnModal}
        />
      ) : (
        ""
      )}
      {isValidation && <ModalValidation errors={errorsMsg} />}
      {isValidationFile && <ModalValidationFile errors={errorsMsg} />}
    </div>
  );
};

export default Modal;
