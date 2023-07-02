import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const ModalValidationFile = ({ errors }) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Errors Validation</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <ul>
              {errors.map((value, index) => {
                return (
                  <li key={index}>
                    {index + 1}. {value}
                  </li>
                );
              })}
            </ul>
          </DialogContentText>
        </DialogContent>
        <Box className="flex justify-end my-3 mr-3">
          <button
            className="btn py-[0.7rem] px-[0.8rem] sm:px-[2rem] m-[0.5rem]"
            onClick={() => setOpen(false)}
          >
            Close
          </button>
        </Box>
      </Dialog>
    </div>
  );
};

export default ModalValidationFile;
