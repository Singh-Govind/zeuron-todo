import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { baseUrl } from "../main";
import { useAppContext } from "../context/AppContextProvider";
import EditCategory from "./EditTodo";

const borderStyle = {
  border: "1px solid rgba(0, 0, 0, 1)",
};

const spanStyle = {
  fontWeight: "bold",
  cursor: "pointer",
  marginInline: "0.5rem",
};

export default function ListTodos({ tasks, fetchTasks }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [editData, setEditData] = useState({});

  const { user } = useAppContext();

  useEffect(() => {
    if (editData.name || editData.title) {
      handleOpen();
    }
  }, [editData]);

  const deleteData = async (id) => {
    let res = await fetch(`${baseUrl}/task/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", authorization: user.id },
    });
    res = res.json();
    fetchTasks();
  };

  return (
    <TableContainer
      sx={{ borderRadius: "0", boxShadow: "0" }}
      component={Paper}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "#4b95d4",
            }}
          >
            <TableCell sx={{ ...borderStyle, fontWeight: "bold" }}>
              Task Name
            </TableCell>
            <TableCell sx={{ ...borderStyle, fontWeight: "bold" }}>
              Priority
            </TableCell>
            <TableCell sx={{ ...borderStyle, fontWeight: "bold" }}>
              Status
            </TableCell>
            <TableCell sx={{ ...borderStyle, fontWeight: "bold" }}>
              Is Finished
            </TableCell>
            <TableCell sx={{ ...borderStyle, fontWeight: "bold" }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((item) => (
            <TableRow
              key={item.id}
              sx={{ border: "1px solid rgba(0, 0, 0, 0.12)" }}
            >
              <TableCell sx={borderStyle}>{item.name}</TableCell>
              <TableCell sx={borderStyle}>{item.priority}</TableCell>
              <TableCell sx={borderStyle}>{item.category}</TableCell>
              <TableCell sx={borderStyle}>{item.finished.toString()}</TableCell>
              <TableCell sx={borderStyle}>
                <span
                  onClick={() => {
                    setEditData(item);
                  }}
                  style={spanStyle}
                >
                  Edit
                </span>{" "}
                |{" "}
                <span
                  style={{ ...spanStyle, color: "red" }}
                  onClick={() => deleteData(item.id)}
                >
                  Delete
                </span>
              </TableCell>
              {
                <EditCategory
                  item={editData}
                  open={open}
                  handleClose={handleClose}
                  fetchTasks={fetchTasks}
                />
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
