"use client";
import * as React from "react";
import { Avatar, Grid, Button } from "@mui/material";
import AvatarComponent from "../Avatar";
import { useAuthContext } from "@/app/context";
import { useRouter } from "next/navigation";

export default function UserHeader() {
  const { user, signout } = useAuthContext();
  console.log(user);
  const router = useRouter();

  const logout = () => {
    signout();
    router.push("/");
  };

  return (
    <Grid sx={{ mr: 4 }} container alignItems={"center"}>
      <Grid sx={{ mr: 4 }} item>
        <Avatar sx={{ width: 115, height: 115, backgoundColor: "#1F6FFF" }}>
          {" "}
          F
        </Avatar>
        {/* <AvatarComponent /> */}
      </Grid>
      {user && (
        <Grid item>
          <h1>{user.email}</h1>
          <p style={{ marginBottom: "12px" }}>{user.email}</p>
          <Button className="info border" onClick={logout}>
            SignOut
          </Button>
        </Grid>
      )}
    </Grid>
  );
}
