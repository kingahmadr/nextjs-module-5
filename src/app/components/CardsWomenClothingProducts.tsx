import * as React from "react";
// import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
// import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { UseDataContext } from "../contexts/UseDataContext";
import { RotatingLoader } from "./Loader/NewLoader";
import { AllProductsProps } from "../interfaces";
import { getWomensClothing, addSingleProductToCart } from "../api";
import { useRouter } from "next/navigation";
import { Authorization } from "../lib/Authorization";
import Link from "next/link";

// import useFecthData from "../hooks/useFecthData";
import { useEffect, useState } from "react";
import PaginationRounded from "./PaginationRounded";
// import { useDataContext } from "../contexts/UseDataContext";
import { createTheme, ThemeProvider } from "@mui/material";
// import Loader from "./Loader/Loader";

const pageSize = 3;

const theme = createTheme({
  components: {
    // Name of the component
    MuiCardHeader: {
      styleOverrides: {
        // Name of the slot
        subheader: {
          // Some CSS
          color: "white",
        },
      },
    },
  },
});

export default function CardsWomensClothing() {
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  const router = useRouter();
  const { addCartTotalContext, isLoading, setLoadingState } = UseDataContext();
  const [dataProducts, setDataProducts] = useState<
    AllProductsProps[] | undefined
  >([]);

  async function loader(value: boolean) {
    setLoadingState(value);
    await delay(2000);
  }

  async function fetchData() {
    const data = await getWomensClothing();
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

  if (!dataProducts) {
    return (
      <div className="flex gap-10 p-10 justify-center">
        <RotatingLoader />
      </div>
    );
  }
  const productsSlice = dataProducts.slice(pagination.from, pagination.to);

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
      <ThemeProvider theme={theme}>
        {/* <CardHeader
          sx={{ color: "white", fontSize: "0.5rem" }}
          title={products.title}
          // subheader={products.description}
          subheader={`Categories: ${products.category?.name}`}
        /> */}
      </ThemeProvider>
      <CardMedia
        component="img"
        sx={{
          maxHeight: "20rem",
          width: "full",
        }}
        // image={products.images?.[0] ? products.images[0] : "fallback-image-url"}
        image={products.image}
        alt="Gaonok gambar e slur"
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
      <div className="flex justify-center items-center p-10 my-4 mx-auto">
        <PaginationRounded
          count={Math.ceil(pagination.count / pageSize)}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
}
