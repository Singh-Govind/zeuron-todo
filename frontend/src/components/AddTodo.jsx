import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, TextField } from "@mui/material";
import { baseUrl } from "../main";
import { useAppContext } from "../context/AppContextProvider";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

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

const buttonStyle = {
  textTransform: "none",
  mt: "1rem",
  backgroundColor: "#00AAC3",
  padding: "0.1rem 3rem",
  color: "white",
  boxShadow: "0",
  borderRadius: "0",
  "&:hover": {
    backgroundColor: "#00AAC3",
    boxShadow: "none",
  },
};

export default function AddTodo({ open, handleClose, fetchTasks }) {
  const { user } = useAppContext();

  const [data, setData] = useState({
    id: user.id,
    name: "",
  });

  const setValues = (e, key) => {
    setData({
      ...data,
      [key]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask();
  };

  const addTask = async () => {
    try {
      let res = await fetch(`${baseUrl}/task/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json", authorization: user.id },
        body: JSON.stringify(data),
      });
      res = await res.json();
      fetchTasks();
      setData({ id: user.id, name: "" });
      handleClose();
    } catch (e) {
      console.log("err", e.message);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Add Task
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              sx={textField}
              variant="standard"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoFocus
              value={data.name}
              onChange={(e) => setValues(e, "name")}
            />

            <Button
              sx={{
                mt: "1rem",
                backgroundColor: "#00AAC3",
                padding: "0.1rem 3rem",
                color: "white",
                boxShadow: "0",
                borderRadius: "0",
                "&:hover": {
                  backgroundColor: "#00AAC3",
                  boxShadow: "none",
                },
              }}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
            >
              Add Task
            </Button>
          </form>

          <Box
            sx={{
              display: "flex",
              width: "100%",
              marginTop: "2rem",
              justifyContent: "space-around",
            }}
          >
            <Button onClick={handleClose} sx={buttonStyle}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
