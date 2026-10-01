import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import { useState } from "react";
import "./search.css";

const ROUTE_STEPS = [
  "Head east on May Ln toward Church St/R108/R132",
  "Turn right onto Church St/R108/R132",
  "Continue onto R108",
  "Turn right onto Wormwood Gate",
  "Continue onto Oliver Bond St",
  "Turn left onto Bridgefoot St/R804",
  "Turn right onto Thomas St/R804/R810",
  "Turn left onto Thomas Ct/R804",
  "Turn right onto Rainsford St",
  "Turn left onto Sugar House Ln",
  "Destination will be on the right",
];

export default function SearchBars() {
  const [showRoute, setShowRoute] = useState(false);

  function search(formData: FormData) {
    // Hardcoded values
    const start = formData.get("start")?.toString();
    const end = formData.get("end")?.toString();

    // show route after submit
    setShowRoute(true);
  }
  return (
    <>
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <form action={search}>
          <TextField
            id="input-with-icon-textfield"
            variant="outlined"
            label="Start"
            name="start"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            id="input-with-icon-textfield"
            variant="outlined"
            label="End"
            name="end"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
          <Button variant="contained" type="submit">
            Search
          </Button>
          <Button variant="contained" type="reset">
            Reset
          </Button>
        </form>
      </Box>

      {showRoute && (
        <Box sx={{ mt: 2 }}>
          <h3>Directions</h3>
          <ol>
            {ROUTE_STEPS.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </Box>
      )}
    </>
  );
}
