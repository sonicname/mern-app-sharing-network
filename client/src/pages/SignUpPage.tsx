import {
  Button,
  Container,
  Field,
  IconEmail,
  IconLock,
  IconUser,
  SharedLayout,
} from "../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaSignUp } from "../validation/schema";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../contexts/auth";
import { useGlobalContext } from "../contexts/global";

const SignUpPage = () => {
  const { showPass, toggleShowPass } = useGlobalContext();
  const { signUp } = useAuthContext();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schemaSignUp),
  });
  return (
    <SharedLayout>
      <Container className="flex items-center justify-center">
        <div className="bg-white shadow-md rounded-xl dark:bg-darkSecondary mt-6 max-w-[520px] w-full py-6 px-[20px] lg:p-[40px]">
          <h1 className="text-text1 text-3xl dark:text-white font-bold text-center">
            Getting Started
          </h1>
          <p className="text-text2 text-sm font-medium dark:text-text3 mt-5 text-center">
            Create an account to continue and connect with the people.
          </p>

          <form
            onSubmit={handleSubmit((values) =>
              signUp({
                username: values.username,
                email: values.email,
                password: values.password,
              })
            )}
            className="mt-5 flex flex-col gap-y-5"
          >
            <Field
              control={control}
              type={"email"}
              name={"email"}
              icon={<IconEmail className="h-4 w-4" />}
              placeholder={"Enter your email address..."}
              error={errors.email?.message as unknown as string}
            />

            <Field
              control={control}
              type={"text"}
              name={"username"}
              icon={<IconUser className="h-4 w-4" />}
              placeholder={"Enter your username..."}
              error={errors.username?.message as unknown as string}
            />

            <Field
              control={control}
              type={showPass ? "text" : "password"}
              name={"password"}
              icon={<IconLock className="h-4 w-4" />}
              placeholder={"Enter your password..."}
              error={errors.password?.message as unknown as string}
              isPasswordField={true}
              onClickIconPass={toggleShowPass}
              showPass={showPass}
            />

            <p className="text-text1 text-sm text-center font-medium dark:text-text4">
              Already have an account?{" "}
              <NavLink
                className="text-primary font-semibold text-sm underline"
                to={"/signin"}
              >
                Login
              </NavLink>
            </p>

            <Button type={"submit"} isLoading={isSubmitting} primary>
              Sign Up
            </Button>
          </form>
        </div>
      </Container>
    </SharedLayout>
  );
};

export default SignUpPage;
