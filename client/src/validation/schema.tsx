import * as yup from "yup";

export const schemaLogin = yup.object({
  email: yup
    .string()
    .required("Email cannot be empty!")
    .email("Invalid email!"),
  password: yup
    .string()
    .required("Password cannot be empty!")
    .min(8, "Password must be longer than 8 characters!"),
});

export const schemaSignUp = yup.object({
  email: yup
    .string()
    .required("Email cannot be empty!")
    .email("Invalid email!"),
  password: yup
    .string()
    .required("Password cannot be empty!")
    .min(8, "Password must be longer than 8 characters!"),
  username: yup
    .string()
    .required("Username cannot be empty!")
    .min(3, "Username must be longer than 3 characters!")
    .max(30, "Username must be less than 30 characters!"),
});

export const schemaUpdateUser = yup.object({
  email: yup
    .string()
    .required("Email cannot be empty!")
    .email("Invalid email!"),
  password: yup
    .string()
    .required("Password cannot be empty!")
    .min(8, "Password must be longer than 8 characters!"),
  confirmPassword: yup
    .string()
    .required("Password cannot be empty!")
    .min(8, "Password must be longer than 8 characters!"),
  username: yup
    .string()
    .required("Username cannot be empty!")
    .min(3, "Username must be longer than 3 characters!")
    .max(30, "Username must be less than 30 characters!"),
});