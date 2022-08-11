import { usePostsContext, PostsProvider } from "./posts/postsContext";
import { useGlobalContext, GlobalProvider } from "./global/globalContext";
import { useAuthContext, AuthProvider } from "./auth/authContext";

export {
  usePostsContext,
  useAuthContext,
  useGlobalContext,
  AuthProvider,
  PostsProvider,
  GlobalProvider,
};
