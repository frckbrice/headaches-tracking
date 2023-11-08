"use client";
import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Calender from "./components/Calendar";
import UserHeader from "./components/User/Header";
import { Event } from "../../types";
import Form from "./components/Form";
import supabase from "../../supabase";
import { useAuthContext } from "./context";

export default function Home() {
  // thes events will come from the user
  const [events, setEvents] = useState<Event[]>([]);
  const [open, setOpen] = useState(false);

  const { user } = useAuthContext();

  const fetchEvents = async () => {
    try {
      let { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("user_id", user.id);

      if (data) setEvents(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <Container>
      <Grid>
        <UserHeader />
      </Grid>
      <Grid>
        {!open && <Calender events={events} setOpen={setOpen} />}
        {open && <Form setEvents={setEvents} setOpen={setOpen} />}
      </Grid>
    </Container>
  );
}
