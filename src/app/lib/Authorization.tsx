import { getAllUsers } from "../api";
// import { cookies } from "next/headers";
import { getCookie } from "cookies-next";
import { registerUserProps } from "../interfaces";
import jwt, { JwtPayload } from "jsonwebtoken";

export const Authorization = async () => {
  //   const cookieStore = cookies();
  //   const token = cookieStore.get("token");

  const token = getCookie("token");
  const decodedToken = jwt.decode(token || " ") as JwtPayload | null;
  let response = null;
  if (decodedToken) {
    const allUsers = await getAllUsers();

    const authorizedUser = allUsers.find(
      (user: registerUserProps) => decodedToken.user === user.username
    );

    if (authorizedUser) {
      console.log("Authorized User:", authorizedUser.username);
      response = authorizedUser.username;
      //   return authorizedUser;
    } else {
      console.log("No authorized user found");
      return null; // Handle case where no user matches
    }
    // console.log("all Users", allUsers);
    // return allUsers;
  }
  console.log("response from lib Authorization", response);
  return response;

  //   return (
  //     <div>Authorization</div>
  //   )
};
