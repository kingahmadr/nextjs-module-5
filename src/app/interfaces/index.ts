// interface CategoryProps {
//   name: string;
// }
export interface AllProductsProps {
  image: string | undefined;
  id?: number;
  title?: string;
  price?: number;
  description?: string;
  // category?: CategoryProps;
  category?: string;
  name: string;
  images?: string[];
}

export interface UserProps {
  id?: number;
  name?: string;
  role?: string;
  email?: string;
  password: string;
  avatar?: string;
  confirmPassword?: string;
}

interface nameProps {
  firstname: string;
  lastname: string;
}
interface addressProps {
  city: string;
  street: string;
  zipcode: number;
}
export interface registerUserProps {
  email: string;
  username: string;
  password: string;
  name: nameProps;
  address: addressProps;
  phone: string;
  confirmPassword?: string;
}
