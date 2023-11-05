"use client ";

import * as React from "react";
import { Avatar, Grid, Button, Switch, FormControlLabel } from "@mui/material";
import Logo from "./logo";
import { usePathname, useRouter } from "next/navigation";
import { Rowdies } from "next/font/google";

export default function Header({ switchTheme }: { switchTheme: any }) {
  const pathName = usePathname();
  const router = useRouter();

  return (
    <Grid sx={{ p: 2 }}>
      <Grid
        container
        direction="row"
        justifyContent={pathName === "/" ? "center" : "space-between"}
        alignItems="center"
      >
        <Grid item lg={6}>
          <Logo />
        </Grid>
        <Grid
          xs={6}
          rowSpacing={1}
          container
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
        >
          <FormControlLabel
            control={
              <Switch onChange={switchTheme} name="gilard" color="primary" />
            }
            label="Night mode"
          />
          <Avatar
            className="pointer"
            onClick={() => router.push("/profile")}
            sx={{ width: 56, height: 56, backgroundColor: "#1F6FFF" }}
          >
            H
          </Avatar>
        </Grid>
      </Grid>
    </Grid>
  );
}
