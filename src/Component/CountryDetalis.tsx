import React, { Component } from "react";
import withComponent from "./WithComponent.tsx";
import { Box, Button, Paper, Typography } from "@mui/material";

interface PropsType {
  location: {
    state: {
      capital: [string];
      flags: { png: string; svg: string; alt: string };
      latlng: [number, number];
      population: number;
    };
  };
  navigate:(data:any)=>void;
}
interface ResponseState {
  temp: number;
  speed: number;
  open: boolean;
}
class CountryDetalis extends Component<PropsType, ResponseState> {
  constructor(props: any) {
    super(props);
    this.state = {
      temp: 0,
      speed: 0,
      open: false,
    };
  }
  handleClick = async (latlng: [number, number]) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=a80e7dc04639cfc4193d55970d07c503`
      ).then((res) => res.json());
      const { main, wind } = response;
      const { temp } = main;
      const { speed } = wind;
      this.setState({ temp: temp, speed: speed,open: true });
    } catch (err) {
      this.setState({ open: false });
    }
  };
  
  render() {
    const { capital, population, latlng, flags } = this.props.location.state;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh",
          background: `url(${flags.svg}) no-repeat center center fixed`,
          backgroundSize: "cover",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: 350,
              height: 390,
              padding: 1,
              textAlign: "center",
            },
          }}
        >
          <Paper elevation={3}>
            <Typography>Capital: {capital}</Typography>
            <Typography>Population: {population}</Typography>
            <Typography title="lat">Latitude: {latlng[0]}</Typography>
            <Typography title="lon">Longitude: {latlng[1]}</Typography>
            <Typography>
              Flags: <img src={flags.png} alt={flags.alt} />
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => this.handleClick(latlng)}
                sx={{ display: this.state.open ? "none" : "block",mt:1 }}
              >
                Capital Weather
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => this.setState({ open: false })}
                sx={{ display: this.state.open ? "block" : "none",mt:1 }}
              >
                Close Capital Weather
              </Button>              
              <Button
                variant="contained"
                color="secondary"
                onClick={() => this.props.navigate('/')}
                sx={{ml:2,mt:1}}
              >
                Go Back
              </Button>
            </Box>
          </Paper>
        </Box>
        <Paper
          elevation={2}
          sx={{
            width: 350,
            height: 100,
            padding: 1,
            display: this.state.open ? "flex" : "none",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography>Temparature: {this.state.temp} </Typography>
          <Typography>Wind Speed: {this.state.speed}</Typography>
        </Paper>
      </div>
    );
  }
}

export default withComponent(CountryDetalis);
