import dayjs from "dayjs";
import { config } from "../../../public/data/dummyData";
import { useState, useEffect } from "react";
import React from "react";
import {
  Card,
  CardContent,
  Grid,
  Slider,
  Stack,
  Button,
  Box,
  FormControl,
  Checkbox,
  Alert,
  IconButton,
  FormControlLabel,
} from "@mui/material";

import CardActions from "@mui/joy/CardActions";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Event } from "../../../types";
import {} from "@mui/lab";
import { useAuthContext } from "../context";
import supabase from "../../../supabase";

type Props = {
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Form = ({ setEvents, setOpen }: Props) => {
  const [state, setState] = useState<any>({
    loading: false,
    error: undefined,
  });

  const { user } = useAuthContext();

  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs(new Date().toDateString())
  );

  const [event, setEvent] = useState<Event>({
    user_id: undefined,
    date: value?.toString(),
    duration: 1,
    locations: [],
    symptomes: [],
    medications: [],
    count: 0,
  });
  //pw: marginLeft: 10, marginRight: 10
  const handleChange = (index: number, key: string) => {
    if (event[key].includes(index)) {
      setEvent(() => ({
        ...event,
        [key]: event[key].filter((x: number) => x !== index),
      }));
      console.log(
        "[key]: ",
        event[key].filter((x: number) => x !== index)
      );
      return;
    }
    setEvent(() => ({
      ...event,
      [key]: [...event[key], index],
    }));
    console.log("event: ", event);
    console.log("[key]: ", [...event[key], index]);
  };

  const saveEvent = async () => {
    setState({ ...state, error: undefined });
    if (!event.date) {
      setState({ ...state, error: "You must provide a date" });
      return;
    }
    try {
      setEvent({ ...event, user_id: user.id });
      const { data, error } = await supabase
        .from("events")
        .insert(event)
        .select();

      if (data) {
        console.log(data);
        setEvents((prevEvent) => [...prevEvent, event]);
      }

      setState({ ...state, loading: true });
      setEvents((prevEvent) => [...prevEvent, event]);
      setOpen(false);
      console.log(event);
    } catch (error) {
      console.log(error);
    } finally {
      setState({ ...state, loading: false });
    }
  };

  useEffect(() => {
    console.log(event);
  }, []);

  useEffect(() => {
    setEvent({ ...event, date: dayjs().format() });
  }, []);

  return (
    <Card
      variant="outlined"
      sx={{ minWidth: 255, maxWidth: 600, mx: "auto", px: 2, py: 1, my: 2 }}
    >
      <CardContent>
        <Grid sx={{ mb: 3 }}>
          <h2>Add a new crisis</h2>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} sx={{ mb: 3 }}>
            <h2 style={{ fontWeight: "bold" }}> Provide the date</h2>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker", "DatePicker"]}>
                <DatePicker
                  label="pick the date"
                  value={value}
                  onChange={(newValue) => setValue(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ mb: 3 }}>
          <h2>How long dit it last ?</h2>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              gap: "10",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span style={{ marginLeft: 10, marginRight: 10 }}>0</span>
            <Slider
              defaultValue={0}
              aria-label="Default"
              valueLabelDisplay="auto"
            />
            <span style={{ margin: 10 }}>100</span>
          </Box>
        </Grid>
        <Grid item xs={12} sx={{ mb: 3 }}>
          <h2>Evaluate your pain from 0 to 10</h2>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span style={{ marginLeft: 10, marginRight: 10 }}>0</span>
            <Slider
              aria-label="Custom marks"
              defaultValue={0}
              step={1}
              marks
              min={0}
              max={10}
            />
            <span style={{ margin: 10 }}>10</span>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <p>Symptomes</p>
          <Grid>
            {config.symptomes.map((eventName: any, index: any) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    name={eventName}
                    onChange={() => handleChange(index, "symptomes")}
                  />
                }
                label={eventName}
              />
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <p>Medications</p>
          <Grid>
            {config.medications.map((eventName: any, index: any) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    name={eventName}
                    onChange={() => handleChange(index, "medications")}
                  />
                }
                label={eventName}
              />
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <p>Locations</p>
          <Grid>
            {config.locations.map((eventName: any, index: any) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    name={eventName}
                    onChange={() => handleChange(index, "locations")}
                  />
                }
                label={eventName}
              />
            ))}
          </Grid>
        </Grid>
      </CardContent>
      <CardActions buttonFlex="0 1 120px">
        <Button variant="outlined">Cancel</Button>
        <Button color="primary" onClick={() => saveEvent()}>
          Save
        </Button>
      </CardActions>
    </Card>
  );
};

export default Form;
