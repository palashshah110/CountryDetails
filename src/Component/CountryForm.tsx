import { TextField, Button, Paper, Box } from "@mui/material";
import React, { Component } from "react";
import withComponent from "./WithComponent.tsx";

interface PropsType {
  navigate: (data: string, state: any) => void;
}

interface CountryState {
  country: string;
  errorMessage: string;
}

class CountryForm extends Component<PropsType, CountryState> {
  constructor(props: any) {
    super(props);
    this.state = {
      country: "",
      errorMessage: "",
    };
  }
  componentDidUpdate(): void {
    if (this.state.errorMessage) {
      setTimeout(() => {
        this.setState({ errorMessage: "" });
      }, 2000);
    }
  }

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${this.state.country.toLowerCase()}?fullText=true`
      ).then((res) => res.json());
      if (response.status === undefined) {
        this.props.navigate("/getCountryDetalis", { state: await response[0] });
      } else {
        this.setState({ errorMessage: "Error Found"});
      }
    } catch (err) {
      this.setState({ errorMessage: "Error Found"});
    }
  };
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (/^[a-zA-Z]*$/.test(event.target.value)) {
      this.setState({ country: event.target.value });
    }
  };
  render() {
    return (
      <Box
        sx={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url('https://t3.ftcdn.net/jpg/06/38/82/84/360_F_638828406_PzMZUd8vOJVt27D5rL89jC6x9oD4DCjE.jpg')`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            opacity: 0.5, // Adjust opacity value here (0.0 to 1.0)
          }}
        />
        <Paper
          sx={{
            height: "230px",
            width: "300px",
            background: "#fff",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            flexDirection:'column'
          }}
        >
          <h2>Find Country Details</h2>
          <form
            onSubmit={this.handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              background: "#fff",
            }}
          >
            <TextField
              variant="outlined"
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
        </Paper>

        {this.state.errorMessage !== '' && (
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
            }}
          >
            {"Not Found: " + this.state.country}
          </Paper>
        )}
      </Box>
    );
  }
}

export default withComponent(CountryForm);
