"use client";

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Navbar from "../../components/Navbar";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
// import { hasCookie } from "cookies-next";

// import { useLocalStorage } from "../hooks/useLocalStorage";
import { useEffect, useState } from "react";
import { UseDataContext } from "../../contexts/UseDataContext";
import { Authorization } from "@/app/lib/Authorization";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
interface valueProps {
  price: number;
  quantity: number;
  title: string;
  id: number;
  // other properties...
}

// interface ItemProps {
//   title: string;
//   quantity?: number; // Optional, as it will be added during aggregation
// }

export default function Page() {
  const router = useRouter();

  const [value, setValue] = useState<valueProps[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  //   const [trigger, setTrigger] = useState(false);
  const [open, setOpen] = useState(false);
  const { triggerInContext, handleTrigger } = UseDataContext();
  // const navigate = useNavigate();

  useEffect(() => {
    const storeData = localStorage.getItem("Carted");
    const itemArray = storeData ? JSON.parse(storeData) : [];

    const aggregatedItems = itemArray.reduce(
      (acc: valueProps[], item: valueProps) => {
        const existingItem = acc.find(
          (i: valueProps) => i.title === item.title
        );
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          acc.push({ ...item, quantity: 1 });
        }
        return acc;
      },
      []
    );
    setValue(aggregatedItems);
    console.log(aggregatedItems);
  }, [triggerInContext]);

  useEffect(() => {
    const totalPriceAggregate = value.reduce((accumulator, product) => {
      return accumulator + product.price * product.quantity;
    }, 0);
    setTotalPrice(totalPriceAggregate);

    console.log("Total Price Aggregate", totalPriceAggregate);
  }, [value]);

  const handleOpen = async () => {
    // const isAccessTokenCookies = hasCookie("token");
    // const accessTokenCookies = getCookie("token");
    const authorized = await Authorization();
    const rememberMe: string | null = localStorage.getItem("rememberMe");

    if (
      rememberMe === "true" &&
      authorized !== null &&
      authorized !== undefined
    ) {
      console.log("remember me", rememberMe);

      setOpen(true);
    } else {
      if (authorized === null || authorized === undefined) {
        alert(`You must login first to checkout product from cart`);
        router.push("/login");
      } else {
        setOpen(true);
      }
    }
  };
  const handleClose = () => setOpen(false);
  const returnHome = () => {
    localStorage.removeItem("Carted");
    handleTrigger();
    //   navigate("/products");
    router.push("/");
  };
  const handleRemoveFromCart = (idToRemove: number) => {
    const storeData = localStorage.getItem("Carted");
    const itemArray = storeData ? JSON.parse(storeData) : [];

    // Filter out the item with the given id
    const filteredItems = itemArray.filter(
      (i: valueProps) => i.id !== idToRemove
    );

    // Update localStorage with the filtered array
    // setTrigger(!trigger);
    handleTrigger();
    localStorage.setItem("Carted", JSON.stringify(filteredItems));

    console.log("Updated item array in localStorage", filteredItems);
  };

  return (
    <>
      <Navbar />
      <div className="mx-auto mt-24">
        <TableContainer
          component={Paper}
          sx={{
            p: 4,
            width: "auto",
            mx: "auto",
            m: "2rem",
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell>Items</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {value.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell align="right">{`$ ${row.price},00`}</TableCell>
                  <TableCell align="right">{row.quantity}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      // color="primary.contrastText"
                      aria-label="add to shopping cart"
                      onClick={() => handleRemoveFromCart(row.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell rowSpan={3} />
                <TableCell colSpan={2}>Total Price</TableCell>
                <TableCell align="right">{`$ ${totalPrice},00`}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="absolute right-8">
        <Button
          variant="contained"
          onClick={handleOpen}
          sx={{ p: 1, marginBottom: "3rem" }}
        >
          Checkout
        </Button>
        <Modal
          keepMounted
          open={open}
          onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="keep-mounted-modal-description"
              variant="body1"
              sx={{ mt: 2, fontSize: "1rem", fontWeight: "medium" }}
            >
              Your Order was successful! Check your email for the order
              confirmation. Thank you for shopping with Mad Store!
            </Typography>
            <div className="mt-3">
              <Button variant="contained" onClick={returnHome}>
                Return Home
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
}
