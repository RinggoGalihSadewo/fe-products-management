"use client";

import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import NextJs from "../../assets/img/technology/next.png";
import ReactJs from "../../assets/img/technology/react-js.png";
import NodeJs from "../../assets/img/technology/node-js.png";
import ExpressJs from "../../assets/img/technology/express-js.png";
import MongoDb from "../../assets/img/technology/mongo-db.png";
import MaterialUi from "../../assets/img/technology/material-ui.png";
import TailwindCss from "../../assets/img/technology/tailwind-css.png";
import Github from "../../assets/img/technology/github.png";
import Vercel from "../../assets/img/technology/vercel.png";
import Netlify from "../../assets/img/technology/netlify.png";
import Laravel from "../../assets/img/technology/laravel.png";

const About = () => {
  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const storedValue = localStorage.getItem("access_token");

      if (storedValue) {
        // console.log("Value found in local storage:", storedValue);
      } else {
        window.location.href = "/";
      }
    } else {
      console.log("Local storage is not supported by the browser.");
    }
  });

  return (
    <Grid container className="mt-28 md:mt-32">
      <Grid item xs={12} md={8}>
        <Box>
          <Box className="flex justify-between">
            <h2 className="font-bold text-lg">About</h2>
          </Box>
          <Box className="mt-2">
            <p>Name: Ringgo Galih Sadewo, S.Kom.</p>
            <p>
              Email:{" "}
              <a
                href="mailto:ringgogalihsadewoo@gmail.com"
                className="font-bold"
              >
                ringgogalihsadewoo@gmail.com
              </a>
            </p>
            <p>
              Website Portfolio: {""}
              <a
                href="https://ringgogalihsadewo.com"
                className="font-bold"
                target="_blank"
              >
                ringgogalihsadewo.com
              </a>
            </p>
            <p>
              Mobile Phone Number:{" "}
              <a
                href="https://api.whatsapp.com/send?phone=+6283177117265&text=Halo, saya%20sudah%20cek%20Test%20Praktek%20React%20JS%20Programmer%20kamu"
                className="font-bold"
              >
                083177117265
              </a>
            </p>
          </Box>
          <Box>
            <h2 className="font-bold text-black text-lg mt-2">
              Technology Used
            </h2>
            <Grid container mt={1} spacing={2}>
              <Grid item xs={2}>
                <Image
                  src={NextJs}
                  alt="Next JS logo"
                  className="w-[30px] h-[30px]"
                />
              </Grid>
              <Grid item xs={2}>
                <Image
                  src={ReactJs}
                  alt="React JS logo"
                  className="w-[30px] h-[30px]"
                />
              </Grid>
              <Grid item xs={2}>
                <Image src={NodeJs} alt="Node JS logo" className="w-[50px]" />
              </Grid>
              <Grid item xs={2}>
                <Image
                  src={ExpressJs}
                  alt="Express JS logo"
                  className="w-[50px]"
                />
              </Grid>
              <Grid item xs={2}>
                <Image
                  src={MongoDb}
                  alt="MongoDB logo"
                  className="w-[30px] h-[30px]"
                />
              </Grid>
              <Grid item xs={2}>
                <Image
                  src={MaterialUi}
                  alt="Material UI logo"
                  className="w-[30px] h-[30px]"
                />
              </Grid>
              <Grid item xs={2}>
                <Image
                  src={TailwindCss}
                  alt="Tailwind Css logo"
                  className="w-[30px] h-[30px]"
                />
              </Grid>
              <Grid item xs={2}>
                <Image
                  src={Github}
                  alt="Github logo"
                  className="w-[30px] h-[30px]"
                />
              </Grid>
              <Grid item xs={2}>
                <Image
                  src={Vercel}
                  alt="Vercel logo"
                  className="w-[52px]"
                  style={{ marginTop: "-0.3rem" }}
                />
              </Grid>
              <Grid item xs={2}>
                <Image
                  src={Laravel}
                  alt="Laravel logo"
                  className="w-[52px]"
                  style={{ marginTop: "-0.3rem" }}
                />
              </Grid>
              <Grid>
                <Image
                  src={Netlify}
                  alt="Netlify logo"
                  className="w-[52px]"
                  style={{ marginTop: "1.2rem", marginLeft: "0.5rem" }}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default About;
