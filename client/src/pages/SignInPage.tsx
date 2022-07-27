import { Container, SharedLayout } from "../components/layouts";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaLogin } from "../validation/schema";
import { IconLock, IconEmail } from "../components/icons";
import { FieldAuth } from "../components/form";
import { Button } from "../components";
import { NavLink } from "react-router-dom";

const SignInPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schemaLogin),
  });

  return (
    <SharedLayout>
      <Container className="flex items-center justify-center">
        <div className="bg-white shadow-md rounded-xl dark:bg-darkSecondary mt-6 max-w-[580px] w-full py-6 px-[20px] lg:p-[40px]">
          <h1 className="text-text1 text-3xl dark:text-white font-bold text-center">
            Sign In
          </h1>
          <p className="text-text2 text-[12px] lg:text-sm font-medium dark:text-text3 mt-5 text-center">
            Login to continue and connect with the people.
          </p>

          <form
            onSubmit={handleSubmit((values) => console.log(values))}
            className="mt-5 flex flex-col gap-y-5"
          >
            <FieldAuth
              control={control}
              type={"email"}
              name={"email"}
              icon={<IconEmail className="h-4 w-4" />}
              placeholder={"Enter your email address..."}
              error={errors.email?.message as unknown as string}
            />

            <FieldAuth
              control={control}
              type={"password"}
              name={"password"}
              icon={<IconLock className="h-4 w-4" />}
              placeholder={"Enter your password..."}
              error={errors.password?.message as unknown as string}
            />

            <p className="text-text1 text-sm text-center font-medium dark:text-text4">
              Don't have an account?{" "}
              <NavLink
                className="text-primary font-semibold text-sm underline"
                to={"/signup"}
              >
                Sign up
              </NavLink>
            </p>

            <Button isLoading={isSubmitting} primary onClick={() => {}}>
              Login
            </Button>
          </form>
        </div>
      </Container>
    </SharedLayout>
  );
};

export default SignInPage;
