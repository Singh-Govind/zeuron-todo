import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
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

export default function EditTodo({ open, handleClose, item, fetchTasks }) {
  const [data, setData] = useState({});

  const { user } = useAppContext();

  useEffect(() => {
    setData({
      id: item._id,
      name: item.name,
      category: item.category,
      finished: item.finished,
      priority: item.priority,
    });
  }, [item]);

  const setValues = (e, key) => {
    setData({
      ...data,
      [key]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editCategory();
  };

  const editCategory = async () => {
    try {
      let res = await fetch(`${baseUrl}/task/update/${item.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", authorization: user.id },
        body: JSON.stringify(data),
      });
      res = await res.json();
      fetchTasks();
      handleClose();
      setData({
        id: "",
        name: "",
        category: "",
        finished: "",
        priority: "",
      });
    } catch (e) {
      console.log("err", e.message);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Update Task
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

            <FormControl sx={{ mt: "1rem" }} fullWidth>
              <InputLabel id="demo-simple-select-label">Priority</InputLabel>
              <Select
                sx={textField}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={data.priority}
                label="priority"
                onChange={(e) => setValues(e, "priority")}
              >
                <MenuItem value={"low"}>Low</MenuItem>
                <MenuItem value={"medium"}>Medium</MenuItem>
                <MenuItem value={"high"}>High</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ mt: "1rem" }} fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                sx={textField}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={data.category}
                label="category"
                onChange={(e) => setValues(e, "category")}
              >
                <MenuItem value={"pending"}>Pending</MenuItem>
                <MenuItem value={"done"}>Done</MenuItem>
                <MenuItem value={"started"}>In Progress</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ mt: "1rem" }} fullWidth>
              <InputLabel id="demo-simple-select-label">Is Finished</InputLabel>
              <Select
                sx={textField}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={data.finished}
                label="finished"
                onChange={(e) => setValues(e, "finished")}
              >
                <MenuItem value={true}>True</MenuItem>
                <MenuItem value={false}>False</MenuItem>
              </Select>
            </FormControl>

            <Button
              sx={{
                mt: "1rem",
                backgroundColor: "#00AAC3",
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
              Update Task
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
