"use client";
import * as React from "react";
import { Button, TextField, Grid } from "@mui/material";
import Image from "next/image";
import doctor from "../../../public/doctor.png";
import supabase from "../../../supabase";

export default function Landing() {
  const [email, setEmail] = React.useState<string>("");
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const login = async () => {
    if (!email) alert("Please enter a valid email");

    try {
      setLoading(true);
      let { data, error } = await supabase.auth.signInWithOtp({
        email,
      });
      data ? console.log(data.user) : error ? error : "";
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid
      className="Landing"
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid
        item
        container
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <h1>Track your migraines, help doctors find a cure</h1>
        <p style={{ maxWidth: "800px", lineHeight: "1.45" }}>
          Our app helps you track your migraine events, and provides opportunty
          for you to help doctor cure migraines
        </p>
      </Grid>
      <Grid
        direction="row"
        container
        justifyContent="center"
        alignContent="center"
        sx={{ py: 2 }}
        item
        color="#1F6FFF"
      >
        <TextField
          sx={{ mr: 2 }}
          size="small"
          label="me@mail.com"
          variant="outlined"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        <Button
          variant="contained"
          onClick={login}
          style={{ backgroundColor: "#1F6FFF" }}
        >
          signup{" "}
        </Button>
      </Grid>
      <Grid
        item
        container
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Image
          style={{
            maxWidth: "30%",
            width: "100%",
            height: "auto",
            margin: "auto",
          }}
          alt="doctor"
          src={doctor}
          className="pointer"
        />
      </Grid>
    </Grid>
  );
}
