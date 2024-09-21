"use client";
import Link from "next/link";
import * as React from "react";
import Card from "@mui/material/Card";
// import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import PaginationRounded from "./PaginationRounded";
import { UseDataContext } from "../contexts/UseDataContext";
import { RotatingLoader } from "./Loader/NewLoader";
import { AllProductsProps } from "../interfaces";
import { getAllProducts, addSingleProductToCart } from "../api";
// import { getAllProducts } from "../api";
import { useRouter } from "next/navigation";
import { Authorization } from "../lib/Authorization";
// import { AddToCart } from "../lib/AddToCart";

const pageSize = 3;

export default function CardsAllProducts() {
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  // const { RotatingLoader } = Loader();
  const router = useRouter();

  const { addCartTotalContext, isLoading, setLoadingState } = UseDataContext();
  // const { isLoading, setLoadingState } = UseDataContext();

  const [dataProducts, setDataProducts] = useState<
    AllProductsProps[] | undefined
  >([]);
  async function loader(value: boolean) {
    setLoadingState(value);
    await delay(2000);
  }

  async function fetchData() {
    const data = await getAllProducts();
    setDataProducts(data);
  }
  useEffect(() => {
    loader(true)
      .then(() => {
        fetchData();
      })
      .then(() => {
        loader(false);
      });
  }, []);

  const [pagination, setPagination] = useState({
    count: 5, // initial of anything
    from: 0,
    to: pageSize,
  });

  const addToCart = async (id?: string | number) => {
    const rememberMe: string | null = localStorage.getItem("rememberMe");

    const authorized = await Authorization();

    if (
      rememberMe === "true" &&
      authorized !== null &&
      authorized !== undefined
    ) {
      console.log("remember me", rememberMe);
      await addSingleProductToCart(id);
      addCartTotalContext();
    } else {
      if (authorized === null || authorized === undefined) {
        alert(`You must login first to add product to cart`);
        console.log("authorized from products", authorized);
        // console.log(accessTokenCookies);
        router.push("/login");
      } else {
        await addSingleProductToCart(id);
        addCartTotalContext();
      }
    }
  };

  // console.log(pagination.count, pagination.from, pagination.to);
  if (!dataProducts) {
    return (
      <div className="flex gap-10 p-10 justify-center">
        <RotatingLoader />
      </div>
    );
  }
  const productsSlice = dataProducts.slice(pagination.from, pagination.to);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;
    setPagination({
      ...pagination,
      count: dataProducts.length,
      from: from,
      to: to,
    });
  };

  const renderProducts = productsSlice.map((products, index) => (
    <Card
      sx={{
        maxWidth: "20rem",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        borderColor: "black",
        borderWidth: "medium",
        p: "0.5rem",
      }}
      key={index}
    >
      <CardMedia
        component="img"
        height="2rem"
        // image={
        //   products.images?.[0] ? products.images[0] : "fallback-image-url"
        // }
        image={products.image}
        alt="Gaonok gambar e slurr"
        sx={{
          maxHeight: "20rem",
          width: "full",
        }}
      />
      <div>
        <CardContent>
          <Typography
            variant="body2"
            sx={{ color: "black", fontSize: "1rem", m: 1 }}
          >
            {`Category: ${products.category}`}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", fontSize: 20, m: 1 }}
          >
            {`Price: $${products.price},00`}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            onClick={() => addToCart(products.id)}
            color="primary"
            aria-label="add to shopping cart"
          >
            <AddShoppingCartIcon />
          </IconButton>
          <Button variant="contained">
            {/* <Link to={`${products.id}`}>See Details</Link> */}
            <Link href={`/products/${products.id}`}> See Details </Link>
          </Button>
        </CardActions>
      </div>
    </Card>
  ));

  return (
    <>
      <div className="flex gap-10 p-10 justify-center">
        {isLoading ? <RotatingLoader /> : <>{renderProducts}</>}
      </div>
      <div className="flex justify-center items-center p-10 mx-auto">
        <PaginationRounded
          count={Math.ceil(pagination.count / pageSize)}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
}
