"use client";
// import { useState } from "react";
const UseLocalStorage = () => {
  // const [itemTotal, setItemTotal] = useState(0);
  const setLocalStorage = (key: string, value: string) => {
    const state = localStorage.setItem(key, value);
    return state;
  };
  const removeLocalStorage = (key: string) => {
    const state = localStorage.removeItem(key);
    return state;
  };
  const getLocalStorage = (key: string) => {
    const state = localStorage.getItem(key);
    return state;
  };
  // const addCartTotalItems = () => {
  //   const existingCartItems = JSON.parse(
  //     localStorage.getItem("Carted") || "[]"
  //   );
  //   const itemTotalCart = existingCartItems.length;
  //   setItemTotal(itemTotalCart);
  //   console.log("item total in hook lib ", itemTotal);
  //   return itemTotal;
  // };
  return {
    setLocalStorage,
    removeLocalStorage,
    getLocalStorage,
    // addCartTotalItems,
  };
};

export default UseLocalStorage;
