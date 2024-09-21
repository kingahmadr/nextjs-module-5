"use client";

import { AllProductsProps } from "@/app/interfaces";
// import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Navbar from "@/app/components/Navbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// import { useDataContext } from "../contexts/UseDataContext";
import { maxWidthMediaQuery, fontSizeMediaQuery } from "@/app/constans";
import { useEffect, useState } from "react";
import { addSingleProductToCart, getSingleProducts } from "@/app/api";
import { RotatingLoader } from "@/app/components/Loader/NewLoader";
import { getCookie, hasCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { UseDataContext } from "@/app/contexts/UseDataContext";

// import Loader from "@/app/components/Loader/Loader";

interface SingleProductProps extends AllProductsProps {
  images: string[];
  title: string;
  // other properties...
}

const ProductDetailPage = ({ params }: { params: { productsID: string } }) => {
  //   const { singleDataProduct, getSingleProducts, addSingleProductToCart } =
  //     useFecthData();
  //   const { userToken } = UseDataContext();
  // const { RotatingLoader } = Loader();
  const [singleDataProduct, setSingleDataProduct] = useState<
    AllProductsProps[] | undefined
  >([]);
  const router = useRouter();
  const { addCartTotalContext } = UseDataContext();
  useEffect(() => {
    async function fetchData() {
      const data = await getSingleProducts(params.productsID);
      setSingleDataProduct(data);
      console.log("data", data);
    }
    fetchData();
  }, [params.productsID]);
  //   const singleDataProduct: AllProductsProps[] | undefined =
  //     await getSingleProducts(params.productsID);
  console.log("Data products", singleDataProduct);
  if (!singleDataProduct) {
    return (
      <div className="flex gap-10 p-10 justify-center">
        <RotatingLoader />
        {/* <p>Loading ...</p> */}
      </div>
    );
  }
  const addToCart = async (id?: string | number) => {
    // const accessTokenLocal: unknown = localStorage.getItem("token");
    const isAccessTokenCookies = hasCookie("token");
    const accessTokenCookies = getCookie("token");
    const rememberMe: string | null = localStorage.getItem("rememberMe");

    if (rememberMe === "true" && isAccessTokenCookies) {
      console.log("remember me", rememberMe);
      // const result =
      await addSingleProductToCart(id);
      addCartTotalContext();
      // if (result) {
      //   router.push("/");
      // }
    } else {
      if (!isAccessTokenCookies) {
        alert(`You must login first to add product to cart`);
        console.log(accessTokenCookies);
        router.push("/login");
      } else {
        await addSingleProductToCart(id);
        addCartTotalContext();
      }
    }
  };

  const renderSingleProduct = Array.isArray(singleDataProduct) ? (
    singleDataProduct.map((product, index) => (
      <Box
        component="section"
        key={index}
        sx={{
          p: 4,
          display: "flex",
          border: 1,
          borderColor: "grey.500",
          m: "2rem",
          maxWidth: maxWidthMediaQuery,
          mx: "auto",
          mt: "10rem",
        }}
      >
        <Card
          sx={{ maxWidth: 345, maxHeight: 250, p: 1, alignContent: "center" }}
        >
          <CardMedia
            component="img"
            height="auto"
            // image={
            //   product.images?.[0] ? product.images[0] : "fallback-image-url"
            // }
            image={product.image}
            alt="Product image"
          />
        </Card>
        <div>
          <Typography
            variant="subtitle2"
            sx={{
              color: "text.secondary",
              // fontSize: 40,
              fontSize: fontSizeMediaQuery,
              ml: "1.5rem",
              textTransform: "capitalize",
              fontWeight: "bold",
            }}
          >
            {product.title}
          </Typography>
          <Typography
            variant="body2"
            display={{
              xs: "none",
              sm: "block",
              md: "block",
            }}
            sx={{
              color: "text.secondary",
              fontSize: {
                xs: 15,
                sm: 15,
                md: 20,
              },
              m: "1.5rem",
            }}
          >
            {product.description}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              fontSize: 20,
              m: "1.5rem",
              fontWeight: "bold",
            }}
          >
            {`Price: $${product.price},00`}
          </Typography>
          <Button
            sx={{ p: 1, m: "1rem" }}
            onClick={() => {
              addToCart(product.id);
            }}
            variant="contained"
          >
            Add To Cart
          </Button>
        </div>
      </Box>
    ))
  ) : (
    <Box
      component="section"
      sx={{
        p: 4,
        display: "flex",
        border: 1,
        borderColor: "grey.500",
        m: "2rem",
        maxWidth: "md",
        mx: "auto",
        mt: "10rem",
      }}
    >
      <Card
        sx={{ maxWidth: 345, maxHeight: 250, p: 1, alignContent: "center" }}
      >
        <CardMedia
          component="img"
          height="auto"
          image={(singleDataProduct as SingleProductProps).image}
          alt="Product image"
        />
      </Card>
      <div>
        <Typography
          variant="subtitle2"
          sx={{
            color: "text.secondary",
            fontSize: {
              xs: 10,
              sm: 20,
              md: 40,
            },
            ml: "1.5rem",
            textTransform: "capitalize",
            fontWeight: "bold",
          }}
        >
          {(singleDataProduct as SingleProductProps).title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            fontSize: {
              xs: 5,
              sm: 10,
              md: 20,
            },
            m: "1.5rem",
          }}
        >
          {(singleDataProduct as SingleProductProps).description}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            fontSize: 20,
            m: "1.5rem",
            fontWeight: "bold",
          }}
        >
          {`Price: $${(singleDataProduct as SingleProductProps).price},00`}
        </Typography>
        <Button
          sx={{ p: 1, m: "1rem" }}
          onClick={() => {
            if (
              (singleDataProduct as SingleProductProps) &&
              (singleDataProduct as SingleProductProps).id
            ) {
              addToCart((singleDataProduct as SingleProductProps).id);
            } else {
              console.error("Product ID is not available");
            }
          }}
          variant="contained"
        >
          Add To Cart
        </Button>
      </div>
    </Box>
  );
  return (
    <div>
      <Navbar />
      {renderSingleProduct}
    </div>
  );
};

export default ProductDetailPage;
