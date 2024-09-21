import * as Yup from "yup";

const CategoreisValidationScheme = Yup.object().shape({
  name: Yup.string().required("Please fill the Name Input"),
  description: Yup.string().required("Please fill the Description Input"),
});

const LoginValidationScheme = Yup.object().shape({
  username: Yup.string().required("Username is Required"),
  password: Yup.string().required("Password is required"),
});

const RegisterValidationForm = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  name: Yup.string().required("Username is Required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Required"),
});
const LoginValidationForm = Yup.object().shape({
  // email: Yup.string().email("Invalid email").required("Email is required"),
  username: Yup.string().required("Usename is required"),
  password: Yup.string().required("Password is required"),
});
const ProfileValidationForm = Yup.object().shape({
  name: Yup.object({
    firstname: Yup.string().required("Firstname is Required"),
    lastname: Yup.string().required("Lastname is Required"),
  }),
  phone: Yup.string().required("Phone number is required"),
});
const AccountValidationForm = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  username: Yup.string().required("Username is Required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Required"),
});
const AddressValidationForm = Yup.object().shape({
  address: Yup.object({
    street: Yup.string().required("Street is required"),
    city: Yup.string().required("City is required"),
    zipcode: Yup.number().required("Zip Code is required"),
  }),
});

export {
  CategoreisValidationScheme,
  LoginValidationScheme,
  RegisterValidationForm,
  LoginValidationForm,
  ProfileValidationForm,
  AccountValidationForm,
  AddressValidationForm,
};
