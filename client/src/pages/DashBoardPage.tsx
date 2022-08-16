import { Container, SharedLayout } from "../components";
import customAPI from "../apis/CustomAPI";
import { useAuthContext } from "../contexts";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IPendingPost, IRequestGetPosts } from "../interfaces/post";
import { toast } from "react-toastify";
import { v4 } from "uuid";

const DashBoardPage = () => {
  const [pendingPosts, setPendingPosts] = useState<IPendingPost[]>([]);
  const [page, setPage] = useState<number>(1);
  const { token, logout } = useAuthContext();
  const navigate = useNavigate();
  const adminAPI = customAPI({ token, navigate, logout });

  useEffect(() => {
    adminAPI
      .get<IRequestGetPosts>(`/admin/posts?search=pending&${page}`)
      .then((res) => {
        setPendingPosts(res.data.posts);
      })
      .catch((err) => {
        toast.error("Something went wrong!");
      });
  }, []);

  return (
    <SharedLayout>
      <Container isFluid>
        <h1 className="text-xl font-semibold text-center">Admin Page</h1>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {pendingPosts.length > 0 &&
            pendingPosts.map((post) => (
              <div
                key={v4()}
                className="group rounded-md flex flex-col gap-y-2 relative shadow-md cursor-pointer"
                onClick={() => navigate(`/post/${post._id}`)}
              >
                <img
                  className="w-full h-[250px] object-cover rounded-md"
                  src={post.storages.thumbnail.proxy_url}
                  alt=""
                />

                <div className="absolute inset-0 bg-black bg-opacity-40 rounded-md scale-0 group-hover:scale-100 duration-200 flex flex-col gap-y-2 items-center justify-center text-white font-semibold">
                  <h4 className="text-xl">{post.title}</h4>
                  <p className="text-[12px] text-">
                    by{" "}
                    <span className="text-primary underline">
                      {post.uploadBy.username}
                    </span>
                  </p>
                </div>
              </div>
            ))}
        </div>
      </Container>
    </SharedLayout>
  );
};

export default DashBoardPage;
