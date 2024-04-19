import { TextField, Button, Paper, Box } from "@mui/material";
import React, { Component } from "react";
import withComponent from "./WithComponent.tsx";

interface PropsType {
  navigate: (
    data: string,
    state: any
) => void;
}

interface CountryState {
  country: string;
  errorMessage: string;
}

class CountryForm extends Component<PropsType, CountryState> {
  constructor(props: any) {
    super(props);
    this.state = 
    {
      country: "",
      errorMessage: "",
    };
  }
  componentDidUpdate(): void {
    if(this.state.errorMessage){
      setTimeout(()=>{this.setState({errorMessage:''})},2000)
    }
  }

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${this.state.country.toLowerCase()}?fullText=true`
      ).then((res) => res.json());
      const { capital, population, latlng, flags } = await response[0];
      const data = { capital, population, latlng, flags };
      this.props.navigate("/getCountryDetalis", {state:data});
    } catch (err) {
      this.setState({ errorMessage: "error Found" });
    }
  };
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!/[\s\d]/.test(event.target.value)) {
      this.setState({ country: event.target.value });
    }
  };
  render() {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh",
          background: `url('https://t3.ftcdn.net/jpg/06/38/82/84/360_F_638828406_PzMZUd8vOJVt27D5rL89jC6x9oD4DCjE.jpg') no-repeat center center fixed`,
          backgroundSize: "cover",
        }}
      >
        <form
          onSubmit={this.handleSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <TextField
            variant="outlined"
            label={this.state.country === "" ? "Enter Country Name" : ""}
            placeholder="Enter Country"
            color="info"
            value={this.state.country}
            onChange={this.handleChange}
            autoComplete="off"
            sx={{ background: "#fff", borderRadius: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2, borderRadius: 2 }}
            disabled={this.state.country === ""}
          >
            Search Country
          </Button>
        </form>
        <Paper
          elevation={3}
          sx={{
            color: "red",
            width: "200px",
            height: "50px",
            position: "absolute",
            bottom: 30,
            right: 20,
            textAlign: "center",
            pt: 2,
            display: this.state.errorMessage ? "block" : "none",
          }}
        >
          {"Not Found: " + this.state.country}
        </Paper>
      </Box>
    );
  }
}

export default withComponent(CountryForm);
