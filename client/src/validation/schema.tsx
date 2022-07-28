import * as yup from "yup";

export const schemaLogin = yup.object({
  email: yup
    .string()
    .required("Email không được để trống!")
    .email("Email không hợp lệ"),
  password: yup
    .string()
    .required("Mật khẩu không được để trống")
    .min(8, "Mật khẩu phải dài hơn 8 kí tự"),
});

export const schemaSignUp = yup.object({
  email: yup
    .string()
    .required("Email không được để trống!")
    .email("Email không hợp lệ"),
  password: yup
    .string()
    .required("Mật khẩu không được để trống")
    .min(8, "Mật khẩu phải dài hơn 8 kí tự"),
  username: yup
    .string()
    .required("Username không được để trống!")
    .min(3, "Username khẩu phải dài hơn 3 kí tự")
    .max(30, "Username khẩu phải dài hơn 30 kí tự"),
});
