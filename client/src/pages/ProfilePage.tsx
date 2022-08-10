import {
  Button,
  Container,
  Field,
  IconEmail,
  IconLock,
  IconUser,
  SharedLayout,
} from "../components";
import { IAuthState, useAuthContext } from "../contexts/auth";
import { IGlobalState, useGlobalContext } from "../contexts/global";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { schemaSignUp } from "../validation/schema";

const ProfilePage = () => {
  const { username, email, updateUser } = useAuthContext() as IAuthState;
  const { showPass, toggleShowPass } = useGlobalContext() as IGlobalState;
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
            Profile <span className="text-secondary">{username}</span>
          </h1>
          <p className="text-text2 text-sm font-medium dark:text-text3 mt-5 text-center">
            Change your profile, Change your life
          </p>

          <form
            onSubmit={handleSubmit((values) =>
              updateUser({
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
              defaultValue={email as string}
              error={errors.email?.message as unknown as string}
            />

            <Field
              control={control}
              type={"text"}
              name={"username"}
              icon={<IconUser className="h-4 w-4" />}
              defaultValue={username as string}
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

            <Button type="submit" isLoading={isSubmitting} primary>
              Update
            </Button>
          </form>
        </div>
      </Container>
    </SharedLayout>
  );
};

export default ProfilePage;
