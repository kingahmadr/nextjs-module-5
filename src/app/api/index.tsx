// import LoaderState from "./LoaderState";
import { AllProductsProps, registerUserProps, UserProps } from "../interfaces";
import UseLocalStorage from "../lib/UseLocalStorage";
import { setCookie } from "cookies-next";
// import { useLoaderState } from "./LoaderState";

interface LoginProps extends UserProps {
  username?: string;
}

// const { setLoaderState } = LoaderState();
const { setLocalStorage, removeLocalStorage, getLocalStorage } =
  UseLocalStorage();

const API_URL: string = "https://fakestoreapi.com";
// const { addCartTotalContext } = UseDataContext();
// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
// const { setLoaderState } = useLoaderState();
const userAuth = async (data: LoginProps, isChecked: boolean) => {
  const bodyData = JSON.stringify(data);

  try {
    // setLoaderState(true);
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: bodyData,
    });
    if (!response.ok) {
      alert(`Error On Login: ${response.statusText}`);
      return;
    }
    const responseData = await response.json();
    //   handleToken(responseData.token);
    console.log(responseData);
    if (isChecked) {
      setLocalStorage("rememberMe", "true");
    } else {
      removeLocalStorage("rememberMe");
    }

    alert(`Login Success`);

    setCookie("token", responseData.token, {
      maxAge: 60 * 60 * 5, // 1 day
      path: "/", // Set the cookie for the entire site
      httpOnly: false,
      sameSite: "strict", // Prevent CSRF attacks
    });
    return responseData;
  } catch (error) {
    alert(`Error On Login: ${error}`);
  } finally {
    // setLoaderState(true);
  }
};
const addUsersMultiStep = async (data: registerUserProps) => {
  const bodyData = JSON.stringify(data);
  try {
    // setIsLoading(true);
    // await delay(5000);
    const response = await fetch(`${API_URL}/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: bodyData,
    });
    if (!response.ok) {
      alert(`Error Adding new user: ${response.statusText}`);
      return;
    }
    const responseData = await response.json();
    alert(`Success adding new user`);
    console.log(responseData);
    return responseData;
  } catch (error) {
    alert(`Error Adding new user: ${error}`);
  } finally {
    // setIsLoading(false);
  }
};

const getAllUsers = async () => {
  const trailing = "/users";
  try {
    const response = await fetch(`${API_URL}${trailing}`, {
      method: "GET",
    });
    if (!response.ok) {
      alert(`Error fetching Products Users: ${response.statusText}`);
      return;
    }
    const responseData = await response.json();
    console.log(responseData);
    return responseData; // Return the data here
  } catch (error) {
    alert(`Error fetching data Products: ${error}`);
  }
};

const getAllProducts = async (): Promise<AllProductsProps[] | undefined> => {
  const trailing: string = "/products?limit=30";
  // const trailing: string = "/product?limit=30";
  try {
    // await delay(5000);
    const response = await fetch(`${API_URL}${trailing}`, {
      method: "GET",
    });
    if (!response.ok) {
      alert(`Error fetching Products: ${response.statusText}`);
      return;
    }
    const responseData: AllProductsProps[] = await response.json();
    console.log(responseData);
    return responseData; // Return the data here
  } catch (error) {
    alert(`Error fetching data Products: ${error}`);
  }
};

const getSingleProducts = async (
  id: string | undefined
): Promise<AllProductsProps[] | undefined> => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: "GET",
    });
    if (!response.ok) {
      alert(`Error fetching Products: ${response.statusText}`);
      return;
    }
    const responseData: AllProductsProps[] = await response.json();
    // console.log(responseData);
    // setSingleDataProduct([responseData]);
    console.log("single products ", responseData);
    return responseData;
  } catch (error) {
    alert(`Error fetching data Single Products: ${error}`);
  }
};
const getMensClothing = async () => {
  const trailing: string = "/products/category/men's%20clothing";
  try {
    // setIsLoading(true);
    // await delay(5000);
    const response = await fetch(`${API_URL}${trailing}`, {
      method: "GET",
    });
    if (!response.ok) {
      alert(
        `Error fetching Product In Categories Mens Clothing: ${response.statusText}`
      );
    }
    const responseData: AllProductsProps[] = await response.json();
    console.log("Mens products ", responseData);
    return responseData;
  } catch (error) {
    alert(`Error fetching Product In Categories Mens: ${error}`);
  }
};

const getJewelryProducts = async () => {
  const trailing: string = "/products/category/jewelery";
  try {
    const response = await fetch(`${API_URL}${trailing}`, {
      method: "GET",
    });
    if (!response.ok) {
      alert(
        `Error fetching Product In Categories Jewelry: ${response.statusText}`
      );
    }
    const responseData: AllProductsProps[] = await response.json();
    console.log("Jewelry products ", responseData);
    return responseData;
  } catch (error) {
    alert(`Error fetching Product In Categories Jewelry: ${error}`);
  }
};

const getWomensClothing = async () => {
  const trailing: string = "/products/category/women's%20clothing";
  try {
    const response = await fetch(`${API_URL}${trailing}`, {
      method: "GET",
    });
    if (!response.ok) {
      alert(
        `Error fetching Product In Categories womens clothing: ${response.statusText}`
      );
    }
    const responseData: AllProductsProps[] = await response.json();
    console.log("Women's clothes products ", responseData);
    return responseData;
  } catch (error) {
    alert(`Error fetching Product In Categories womens clothing: ${error}`);
  }
};

const addSingleProductToCart = async (id: string | undefined | number) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: "GET",
    });
    if (!response.ok) {
      alert(`Error fetching Single Products: ${response.statusText}`);
    }
    const responseData = await response.json();

    const existingCartItems = JSON.parse(getLocalStorage("Carted") || "[]");
    // Check if the item already exists in the cart
    // const itemExists = existingCartItems.find(
    //   (item: { id: string }) => item.id === id
    // );

    // if (itemExists) {
    //   alert("This item is already in your cart.");
    //   return;
    // }

    existingCartItems.push(responseData);

    // localStorage.setItem("Carted", JSON.stringify(existingCartItems));
    setLocalStorage("Carted", JSON.stringify(existingCartItems));

    const itemTotal = existingCartItems.length;
    console.log("Hook item Total", itemTotal);
    return responseData;
  } catch (error) {
    alert(`Error fetching data Single Products: ${error}`);
  }
};

export {
  getSingleProducts,
  getAllProducts,
  getMensClothing,
  getJewelryProducts,
  getWomensClothing,
  userAuth,
  getAllUsers,
  addUsersMultiStep,
  addSingleProductToCart,
};
