import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useAppContext } from "../context/AppContextProvider";
import { baseUrl } from "../main";
import ListTodos from "../components/ListTodos";
import AddTodo from "../components/AddTodo";
import Navbar from "../components/Navbar";

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

function Home() {
  const [filter, setFilter] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { user, tasks, updateTasks } = useAppContext();

  const fetchTasks = async () => {
    try {
      const data = await fetch(`${baseUrl}/task?filter=${filter}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: user.id,
        },
      });

      const dataJson = await data.json();

      updateTasks(dataJson.tasks);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [user, filter]);

  return (
    <Box>
      <Navbar />
      <Container>
        <Box
          sx={{
            display: "flex",
            gap: "2rem",
          }}
        >
          <Button sx={buttonStyle} onClick={handleOpen}>
            Add Task
          </Button>
          <Box
            sx={{
              minWidth: "10rem",
            }}
          >
            <FormControl sx={{ mt: "1rem" }} fullWidth>
              <InputLabel id="demo-simple-select-label">
                Filter By Priority
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filter}
                label="priority"
                onChange={(e) => setFilter(e.target.value)}
              >
                <MenuItem value={""}>All</MenuItem>
                <MenuItem value={"low"}>Low</MenuItem>
                <MenuItem value={"medium"}>Medium</MenuItem>
                <MenuItem value={"high"}>High</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box
          sx={{
            marginTop: "2rem",
          }}
        >
          <ListTodos tasks={tasks} fetchTasks={fetchTasks} />
        </Box>
        {user && (
          <AddTodo
            open={open}
            handleClose={handleClose}
            fetchTasks={fetchTasks}
          />
        )}
      </Container>
    </Box>
  );
}

export default Home;
