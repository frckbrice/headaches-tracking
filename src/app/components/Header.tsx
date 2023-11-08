"use client ";

import * as React from "react";
import { Avatar, Grid, Switch, FormControlLabel } from "@mui/material";
import Logo from "./logo";
import { usePathname, useRouter } from "next/navigation";
import { useAuthContext } from "../context";
import AvatarComponent from "./Avatar";

type Props = {
  switchTheme: any;
  label: string;
  user?: any;
};

export default function Header({ switchTheme, label, user }: Props) {
  const pathName = usePathname();
  // const router = useRouter();

  // const { user } = useAuthContext();

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
          item={true}
          rowSpacing={1}
          direction="row"
          container
          alignItems="center"
          justifyContent="flex-end"
        >
          <p>{user?.email} </p>
          {user && (
            <Grid
              direction="row"
              container
              alignItems="center"
              justifyContent="flex-end"
            >
              <FormControlLabel
                control={
                  <Switch
                    onChange={switchTheme}
                    name="gilard"
                    color="primary"
                  />
                }
                label={`${label}`}
              />
              {/* <AvatarComponent user={user} /> */}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
