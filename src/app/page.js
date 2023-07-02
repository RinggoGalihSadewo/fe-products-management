"use client";

import React, { useId, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, CircularProgress, Stack } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Image from "next/image";
import Logo from "../assets/img/logo/logo.png";
import "../assets/css/globals.css";
import axios from "axios";
import { Url } from "@/utils";

const ModalValidationLogin = ({ errors }) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Errors Validation</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <ul>
              <li>{errors}.</li>
            </ul>
          </DialogContentText>
        </DialogContent>
        <Box className="flex justify-end my-3 mr-3">
          <button
            className="btn py-[0.7rem] px-[0.8rem] sm:px-[2rem] m-[0.5rem]"
            onClick={handleClose}
          >
            Close
          </button>
        </Box>
      </Dialog>
    </div>
  );
};

const Login = () => {
  const [login, setLogin] = useState({
    username: "admin",
    password: "admin123",
  });
  const [errors, setErrors] = useState(false);
  const idUsername = useId();
  const idPassword = useId();
  const router = useRouter();
  const [loadingBtn, setLoadingBtn] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    setErrors(false);
    setLoadingBtn(true);
    e.preventDefault();

    const response = await axios.post(`${Url}/login`, login);
    const data = response.data;

    if (login.username !== "admin" || login.password !== "admin123") {
      setErrors(true);
      setLoadingBtn(false);
      return false;
    } else {
      setLoadingBtn(false);
      localStorage.setItem("access_token", data);
      router.push("/products");
    }
  };

  return (
    <Box className="flex items-center justify-center h-screen w-screen rounded">
      <Box className="border shadow-lg p-10 sm:w-2/5 lg:w-1/4 w-[85%]">
        <Stack className="flex items-center">
          <Image src={Logo} alt="Logo Sistem" className="w-32" />
        </Stack>
        <Stack mt={3}>
          <form>
            <Stack>
              <label htmlFor={idUsername}>Username</label>
              <input
                id={idUsername}
                type="text"
                name="username"
                className="input-form"
                value={login.username}
                onChange={handleChange}
              />
            </Stack>
            <Stack my={3}>
              <label htmlFor={idPassword}>Password</label>
              <Stack className="flex">
                <input
                  id={idPassword}
                  type="password"
                  name="password"
                  className="input-password"
                  value={login.password}
                  onChange={handleChange}
                />
              </Stack>
            </Stack>
            <Stack my={3}>
              <button type="button" className="btn-login" onClick={handleLogin}>
                {loadingBtn ? (
                  <Box className="flex justify-center">
                    <CircularProgress
                      align="center"
                      sx={{ color: "white" }}
                      size={22}
                    />
                  </Box>
                ) : (
                  "LOGIN"
                )}
              </button>
            </Stack>
          </form>
        </Stack>
      </Box>
      {errors && <ModalValidationLogin errors="Wrong username or password" />}
    </Box>
  );
};

export default Login;
