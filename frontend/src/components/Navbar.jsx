import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContextProvider";

const linkStyle = {
  textDecoration: "none",
  color: "inherit",
};

const buttonStyle = {
  textTransform: "none",
  mt: "1rem",
  backgroundColor: "#00AAC3",
  padding: "0.25rem 1.5rem",
  color: "white",
  boxShadow: "0",
  borderRadius: "0",
  "&:hover": {
    backgroundColor: "#00AAC3",
    boxShadow: "none",
  },
};

function Navbar() {
  const { user, logout } = useAppContext();

  return (
    <Box sx={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px", mb: "2rem" }}>
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem 0",
          }}
        >
          <Box>
            <Link style={linkStyle} to="/">
              <Typography
                sx={{
                  fontSize: "2rem",
                  backgroundColor: "#00AAC3",
                  color: "white",
                  padding: "0.2rem 1.5rem",
                }}
                variant="h1"
              >
                Zeuron
              </Typography>
            </Link>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "2rem",
              alignItems: "center",
            }}
          >
            <Button sx={buttonStyle} paddingBlock="0.5rem" onClick={logout}>
              Logout
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Navbar;
