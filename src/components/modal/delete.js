import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { Url } from "../../utils";
import { CircularProgress } from "@mui/material";

const ModalDelete = ({ name, SetCloseParentModal, FnModalDelete }) => {
  const [open, setOpen] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const HandleDeleteData = (name) => {
    setLoadingBtn(true);
    axios
      .delete(`${Url}/${name}`)
      .then((res) => {
        setLoadingBtn(false), (window.location.href = "/products");
      })
      .catch((err) => {
        console.log(err), setLoadingBtn(false);
      });
    setOpen(false);
    SetCloseParentModal();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={FnModalDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Product</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This data will be deleted permanently
            {/* <p className="text-sm text-red-600">
              An error occurred when uploading to the server, sometimes it
              works, sometimes it doesnt. but on the local server the delete
              feature can already be used
            </p> */}
          </DialogContentText>
        </DialogContent>
        <Box className="flex justify-end my-3 mr-3">
          <button
            className="btn-delete py-[0.7rem] px-[0.8rem] sm:px-[2rem] m-[0.5rem]"
            onClick={() => HandleDeleteData(name)}
          >
            {loadingBtn ? (
              <Box className="flex justify-center">
                <CircularProgress
                  align="center"
                  sx={{ color: "white" }}
                  size={22}
                />
              </Box>
            ) : (
              "DELETE"
            )}
          </button>
          <button
            className="btn py-[0.7rem] px-[0.8rem] sm:px-[2rem] m-[0.5rem]"
            onClick={FnModalDelete}
          >
            Close
          </button>
        </Box>
      </Dialog>
    </div>
  );
};

export default ModalDelete;
