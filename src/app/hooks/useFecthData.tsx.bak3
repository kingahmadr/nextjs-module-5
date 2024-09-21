// import { useState } from "react";
// import { AllProductsProps, registerUserProps, UserProps } from "../interfaces";
// import { useNavigate } from "react-router-dom";
// import { useDataContext } from "../contexts/UseDataContext";

// interface LoginProps extends UserProps {
//   username?: string;
// }
// const useFecthData = () => {
//   const [dataProducts, setDataProducts] = useState<AllProductsProps[]>([]);
//   const [dataProductInCategories, setDataProductInCategories] = useState<
//     AllProductsProps[]
//   >([]);
//   const [jeweleryProducts, setJewelryProducts] = useState<AllProductsProps[]>(
//     []
//   );
//   const [mensClothing, setMensClothingProducts] = useState<AllProductsProps[]>(
//     []
//   );
//   const [womensClothing, setWomensClothing] = useState<AllProductsProps[]>([]);
//   const [dataShoes, setDataShoes] = useState<AllProductsProps[]>([]);
//   const [singleDataProduct, setSingleDataProduct] = useState<
//     AllProductsProps[]
//   >([]);
//   const [itemInCart, setItemInCart] = useState(0);
//   const { userToken, handleToken, addCartTotalContext, login } =
//     UseDataContext();

//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   const navigate = useNavigate();

//   // const API_URL = "https://api.escuelajs.co/api/v1";
//   const delay = (ms: number) =>
//     new Promise((resolve) => setTimeout(resolve, ms));
//   const API_URL = "https://fakestoreapi.com";
//   const userAuth = async (data: LoginProps, isChecked: boolean) => {
//     const bodyData = JSON.stringify(data);

//     try {
//       setIsLoading(true);
//       await delay(5000);
//       const response = await fetch(`${API_URL}/auth/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: bodyData,
//       });
//       if (!response.ok) {
//         alert(`Error On Login: ${response.statusText}`);
//         return;
//       }
//       const responseData = await response.json();
//       handleToken(responseData.token);
//       console.log(userToken);
//       if (isChecked) {
//         localStorage.setItem("rememberMe", "true");
//       }
//       login();
//       alert(`Login Success`);

//       localStorage.setItem("token", responseData.token);
//       console.log(responseData.token);
//       navigate("/products");
//     } catch (error) {
//       alert(`Error On Login: ${error}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   const userLogin = async (data: UserProps, isChecked: boolean) => {
//     const bodyData = JSON.stringify(data);

//     try {
//       setIsLoading(true);
//       await delay(5000);
//       const response = await fetch(`${API_URL}/auth/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: bodyData,
//       });
//       if (!response.ok) {
//         alert(`Error On Login: ${response.statusText}`);
//         return;
//       }
//       const responseData = await response.json();
//       handleToken(responseData.access_token);
//       console.log(userToken);
//       if (isChecked) {
//         localStorage.setItem("rememberMe", "true");
//       }
//       login();
//       alert(`Login Success`);

//       localStorage.setItem("access_token", responseData.access_token);
//       console.log(responseData.access_token);
//       navigate("/products");
//     } catch (error) {
//       alert(`Error On Login: ${error}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   const addUsersMultiStep = async (data: registerUserProps) => {
//     const bodyData = JSON.stringify(data);
//     try {
//       setIsLoading(true);
//       await delay(5000);
//       const response = await fetch(`${API_URL}/users/`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: bodyData,
//       });
//       if (!response.ok) {
//         alert(`Error Adding new user: ${response.statusText}`);
//         return;
//       }
//       const responseData = await response.json();
//       alert(`Success adding new user`);
//       navigate("/login");

//       console.log(responseData);
//     } catch (error) {
//       alert(`Error Adding new user: ${error}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const registerUser = async (data: UserProps) => {
//     const bodyData = JSON.stringify(data);

//     try {
//       const response = await fetch(`${API_URL}/users/`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: bodyData,
//       });
//       if (!response.ok) {
//         alert(`Error Adding new user: ${response.statusText}`);
//         return;
//       }
//       const responseData = await response.json();
//       alert(`Success adding new user`);
//       navigate("/login");

//       console.log(responseData);
//     } catch (error) {
//       alert(`Error Adding new user: ${error}`);
//     }
//   };

//   const getAllProducts = async () => {
//     try {
//       setIsLoading(true);
//       const trailing: string = "/products?limit=30";

//       await delay(5000);

//       const response = await fetch(`${API_URL}${trailing}`, {
//         method: "GET",
//       });
//       if (!response.ok) {
//         alert(`Error fetching Products: ${response.statusText}`);
//       }
//       const responseData = await response.json();
//       setDataProducts(responseData);

//       console.log(responseData);
//     } catch (error) {
//       alert(`Error fetching data Products: ${error}`);
//     } finally {
//       setIsLoading(false);
//       console.log("isLoading", isLoading);
//     }
//   };
// const getSingleProducts = async (id: string | undefined) => {
//   try {
//     const response = await fetch(`${API_URL}/products/${id}`, {
//       method: "GET",
//     });
//     if (!response.ok) {
//       alert(`Error fetching Single Products: ${response.statusText}`);
//       navigate("/products");
//     }
//     const responseData = await response.json();
//     setSingleDataProduct([responseData]);
//     console.log("single products ", responseData);
//   } catch (error) {
//     alert(`Error fetching data Single Products: ${error}`);
//     navigate("/products");
//   }
// };
//   const addSingleProductToCart = async (id: string | undefined | number) => {
//     try {
//       const response = await fetch(`${API_URL}/products/${id}`, {
//         method: "GET",
//       });
//       if (!response.ok) {
//         alert(`Error fetching Single Products: ${response.statusText}`);
//         navigate("/products");
//       }
//       const responseData = await response.json();

//       const existingCartItems = JSON.parse(
//         localStorage.getItem("Carted") || "[]"
//       );
//       // Check if the item already exists in the cart
//       // const itemExists = existingCartItems.find(
//       //   (item: { id: string }) => item.id === id
//       // );

//       // if (itemExists) {
//       //   alert("This item is already in your cart.");
//       //   return;
//       // }

//       existingCartItems.push(responseData);

//       localStorage.setItem("Carted", JSON.stringify(existingCartItems));

//       const itemTotal = existingCartItems.length;
//       setItemInCart(itemTotal);
//       addCartTotalContext();
//       console.log("Hook item Total", itemTotal);
//       return responseData;
//     } catch (error) {
//       alert(`Error fetching data Single Products: ${error}`);
//       navigate("/products");
//     }
//   };

//   const getJewelryProducts = async () => {
//     const trailing: string = "/products/category/jewelery";
//     try {
//       setIsLoading(true);
//       await delay(5000);
//       const response = await fetch(`${API_URL}${trailing}`, {
//         method: "GET",
//       });
//       if (!response.ok) {
//         alert(
//           `Error fetching Product In Categories Jewelry: ${response.statusText}`
//         );
//       }
//       const responseData = await response.json();
//       setJewelryProducts(responseData);

//       console.log(responseData);
//     } catch (error) {
//       alert(`Error fetching Product In Categories Jewelry: ${error}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   const getMensClothing = async () => {
//     const trailing: string = "/products/category/men's%20clothing";
//     try {
//       setIsLoading(true);
//       await delay(5000);
//       const response = await fetch(`${API_URL}${trailing}`, {
//         method: "GET",
//       });
//       if (!response.ok) {
//         alert(
//           `Error fetching Product In Categories Mens Clothing: ${response.statusText}`
//         );
//       }
//       const responseData = await response.json();
//       setMensClothingProducts(responseData);

//       console.log(responseData);
//     } catch (error) {
//       alert(`Error fetching Product In Categories Jewelry: ${error}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   const getWomensClothing = async () => {
//     const trailing: string = "/products/category/women's%20clothing";
//     try {
//       setIsLoading(true);
//       await delay(5000);
//       const response = await fetch(`${API_URL}${trailing}`, {
//         method: "GET",
//       });
//       if (!response.ok) {
//         alert(
//           `Error fetching Product In Categories womens clothing: ${response.statusText}`
//         );
//       }
//       const responseData = await response.json();
//       setWomensClothing(responseData);

//       console.log(responseData);
//     } catch (error) {
//       alert(`Error fetching Product In Categories womens clothing: ${error}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   const getProductInCategories = async (id: number) => {
//     try {
//       setIsLoading(true);
//       await delay(5000);
//       const response = await fetch(
//         `${API_URL}/categories/${id}/products?limit=30&offset=1`,
//         {
//           method: "GET",
//         }
//       );
//       if (!response.ok) {
//         alert(`Error fetching Product In Categories: ${response.statusText}`);
//       }
//       const responseData = await response.json();
//       setDataProductInCategories(responseData);

//       console.log(responseData);
//     } catch (error) {
//       alert(`Error fetching Product In Categories: ${error}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const getShoesProducts = async () => {
//     try {
//       setIsLoading(true);
//       await delay(5000);
//       const response = await fetch(
//         `${API_URL}/categories/4/products?limit=30&offset=1`,
//         {
//           method: "GET",
//         }
//       );
//       if (!response.ok) {
//         alert(`Error fetching Books: ${response.statusText}`);
//       }
//       const responseData = await response.json();
//       setDataShoes(responseData);

//       console.log(responseData);
//     } catch (error) {
//       alert(`Error fetching Books: ${error}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return {
//     isLoading,
//     dataProducts,
//     dataProductInCategories,
//     dataShoes,
//     singleDataProduct,
//     itemInCart,
//     jeweleryProducts,
//     mensClothing,
//     womensClothing,
//     userAuth,
//     userLogin,
//     getSingleProducts,
//     getAllProducts,
//     getProductInCategories,
//     getJewelryProducts,
//     getMensClothing,
//     getWomensClothing,
//     getShoesProducts,
//     addSingleProductToCart,
//     registerUser,
//     addUsersMultiStep,
//   };
// };

// export default useFecthData;
