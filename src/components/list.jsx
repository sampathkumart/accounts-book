import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Table,
  TableRow,
  IconButton,
  TableCell,
  TableBody,
  TableContainer,
  TableHead,
  Button,
} from "@material-ui/core";

import EditIcon from "@material-ui/icons/EditOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import { db } from "../firebase";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const useStyles = makeStyles({
  table: {
    minWidth: 800,
  },
});

export default function UserList(props) {
  const [list, setList] = useState([]);
  useEffect(() => {
    fetchUsers();
  }, []);

  const classes = useStyles();

  const editUser = (id) => {
    props.history.push(`/editList/${id}`);
  };

  const fetchUsers = () => {
    db.collection("books")
      .get()
      .then((snapshot) => {
        let users = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          users.push({ id: doc.id, ...data });
        });
        setList(users);
      })
      .catch((error) => console.log(error));
  };

  const deleteUser = (id) => {
    db.collection("books").doc(id).delete();
    fetchUsers();
  };

  return (
    <TableContainer component={Paper} style={{ marginTop: "1rem" }}>
      <Button>
        <Link to="/">NewUser</Link>
      </Button>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Amount</StyledTableCell>
            <StyledTableCell align="right">Receiver</StyledTableCell>
            <StyledTableCell align="right">Giver</StyledTableCell>
            <StyledTableCell align="right">Type</StyledTableCell>
            <StyledTableCell align="right">Date</StyledTableCell>
            <StyledTableCell align="right">Reason</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((lists) => (
            <TableRow key={lists.Id}>
              <StyledTableCell component="th" scope="row">
                {lists.amount}
              </StyledTableCell>
              <StyledTableCell align="right">{lists.receiver}</StyledTableCell>
              <StyledTableCell align="right">{lists.giver}</StyledTableCell>
              <StyledTableCell align="right">{lists.type}</StyledTableCell>
              <StyledTableCell align="right">{lists.date}</StyledTableCell>
              <StyledTableCell align="right">{lists.reason}</StyledTableCell>
              <StyledTableCell align="right">
                <IconButton
                  aria-label="delete"
                  onClick={() => editUser(lists.id)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => deleteUser(lists.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
