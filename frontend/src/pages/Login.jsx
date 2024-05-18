import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../main";
import { useAppContext } from "../context/AppContextProvider";

const textField = {
  "& .MuiInput-underline:before": {
    borderBottom: `2px solid #00AAC3`,
  },
  "& .MuiInput-underline:after": {
    borderBottom: `2px solid #00AAC3`,
  },
  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
    borderBottom: `2px solid #00AAC3`,
  },
};

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { user, loginUser } = useAppContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      navigate("/");
    }
  }, [user]);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      alert("please provide all details!");
      return;
    }
    login();
  };

  const login = async () => {
    try {
      let res = await fetch(`${baseUrl}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      res = await res.json();

      if (res.msg === "user") {
        loginUser(res.user);
        navigate("/");
      } else {
        alert("Incorrect username or Password");
      }
    } catch (e) {
      alert("somethign went wrong, please try again");
      console.log("something went wrong while login", e.message);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100lvh",
      }}
    >
      <Box
        sx={{
          minWidth: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingBlock: "3rem",
        }}
      >
        <Box
          sx={{
            width: "100px",
            height: "100px",
            backgroundColor: "#00AAC3",
            borderRadius: "50%",
            marginBottom: "1rem",
          }}
        ></Box>
        <h1>Login</h1>
        <Box
          sx={{
            maxWidth: "400px",
            mt: "1rem",
          }}
        >
          <form onSubmit={handleSubmit}>
            <TextField
              sx={textField}
              variant="standard"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              sx={textField}
              variant="standard"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handlePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              sx={{
                mt: "1rem",
                backgroundColor: "#00AAC3",
                borderRadius: "20px",
                "&:hover": {
                  backgroundColor: "#00AAC3",
                },
              }}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
            >
              Login
            </Button>
          </form>

          <Box
            sx={{
              mt: "2rem",
            }}
          >
            <Typography>
              Don't have an account?{" "}
              <Link
                style={{
                  textDecoration: "none",
                  color: "#00AAC3",
                }}
                to="/register"
              >
                Sign up
              </Link>{" "}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
