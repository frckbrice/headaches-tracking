"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { useEffect, useState } from "react";
import { lightTheme, darkTheme } from "./theme/theme";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers"; //* to add date picker
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import Header from "./components/Header";
import Landing from "./components/LandingPage";
import supabase from "../../supabase";
import { User } from "@supabase/supabase-js";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDark, setIsDark] = useState(false);
  const [label, setLabel] = useState("Night");
  const [user, setUser] = useState<User>();
  // const [user, setUser] = useState(false);
  const switchTheme: any = () => {
    setIsDark(!isDark);

    setLabel(() => {
      if (label === "Light") return "Night";
      else return "Light";
    });
  };

  const authUserChange = async () => {
    console.log(await supabase.auth.getUser());
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUser(user);
        console.log(user);
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  console.log(user);

  useEffect(() => {
    authUserChange();
  }, []);
  return (
    <html lang="en">
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CssBaseline />
          <body>
            <Header switchTheme={switchTheme} label={label} />
            {user ? <Landing /> : children}
          </body>
        </LocalizationProvider>
      </ThemeProvider>
    </html>
  );
}
