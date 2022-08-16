import { useForm } from "react-hook-form";
import {
  Button,
  Container,
  Field,
  IconDescription,
  IconDocument,
  SharedLayout,
  ImageUploader,
} from "../components";
import { usePostsContext } from "../contexts";

const UploadPage = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const { images, createPost, getImagesFromDisk, removeImages, loading } =
    usePostsContext();

  return (
    <SharedLayout>
      <Container className="flex items-center justify-center">
        <div className="bg-white shadow-md rounded-xl dark:bg-darkSecondary mt-6 max-w-[520px] w-full py-6 px-[20px] lg:p-[40px]">
          <h1 className="text-text1 text-3xl dark:text-white font-bold text-center">
            Upload Images
          </h1>
          <p className="text-text2 text-[12px] lg:text-sm font-medium dark:text-text3 mt-5 text-center">
            Upload and share images to everyone!
          </p>

          <form
            onSubmit={handleSubmit((values) =>
              createPost({
                title: values.title,
                description: values.description,
                attachment: images,
              })
            )}
            className="mt-5 flex flex-col gap-y-5"
          >
            <Field
              control={control}
              type={"text"}
              name={"title"}
              icon={<IconDocument />}
              placeholder={"Enter your title images collection..."}
            />

            <Field
              control={control}
              type={"text"}
              name={"description"}
              icon={<IconDescription />}
              placeholder={"Enter description images collection..."}
            />

            <ImageUploader
              images={images}
              multiple={false}
              onChange={getImagesFromDisk}
              onRemove={removeImages}
              max={1}
            />

            <Button type="submit" isLoading={isSubmitting && loading} primary>
              Upload
            </Button>
          </form>
        </div>
      </Container>
    </SharedLayout>
  );
};

export default UploadPage;
