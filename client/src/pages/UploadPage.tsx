import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  Button,
  Container,
  Field,
  IconDescription,
  IconDocument,
  IconHashTag,
  SharedLayout,
  Select,
} from "../components";
import { useForm } from "react-hook-form";
import { ITag } from "../interfaces";
import axios from "axios";
import { toast } from "react-toastify";
import classNames from "classnames";
import { v4 } from "uuid";
import useOnClickOutSide from "../hooks/useOnClickOutSide";
import ImageUploader from "../components/upload/ImageUploader";
import { ImageListType } from "react-images-uploading";

const UploadPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [data, setData] = useState<{
    tags: ITag[];
    filterTags: ITag[];
    selectTags: ITag[];
    show: boolean;
    thumbnail: File[];
    images: File[];
  }>({
    tags: [],
    filterTags: [],
    selectTags: [],
    show: false,
    images: [],
    thumbnail: [],
  });

  const selectRef = useRef(null);
  useOnClickOutSide(selectRef, () =>
    setData({
      ...data,
      show: false,
    })
  );

  useEffect(() => {
    axios
      .get<{ message: string; tags: ITag[] }>("/api/v1/tags")
      .then((res) => {
        setData({
          ...data,
          tags: res.data.tags,
          filterTags: res.data.tags,
        });
      })
      .catch((errors) => {
        toast.error("Something went wrong! Please try again!");
      });
  }, []);

  const handleChangeSelect = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      show: true,
    });
    let newFilterTags: ITag[] = [];
    if (!e.target.value) {
      newFilterTags = data.tags;
    } else {
      data.tags.forEach((tag) => {
        if (tag.name.includes(e.target.value)) {
          newFilterTags.push(tag);
        }
      });
    }

    setData({
      ...data,
      filterTags: newFilterTags,
    });
  };

  const handleClickSelect = () => {
    setData({
      ...data,
      show: true,
    });
  };

  const handleSelectTag = (tag: ITag) => {
    if (data.selectTags.includes(tag)) return;
    setData({
      ...data,
      selectTags: [...data.selectTags, tag],
      show: false,
    });
  };

  const handleRemoveTagSelected = (tag: ITag) => {
    setData({
      ...data,
      selectTags: data.selectTags.filter((t) => t.name !== tag.name),
    });
  };

  const handleBrowserPhotos = (images: ImageListType) => {
    setData({
      ...data,
      images: images.map((img) => img.file) as File[],
    });
  };

  const handleBrowserThumbnail = (images: ImageListType) => {
    setData({
      ...data,
      thumbnail: images.map((img) => img.file) as File[],
    });
  };

  const handleRemovePhotos = (index: number) => {
    setData({
      ...data,
      images: data.images.filter((img, i) => index !== i),
    });
  };

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
            onSubmit={handleSubmit((values) => console.log(values))}
            className="mt-5 flex flex-col gap-y-5"
          >
            <Field
              control={control}
              type={"text"}
              name={"title"}
              icon={<IconDocument className="h-4 w-4" />}
              placeholder={"Enter your title images collection..."}
              error={errors.title?.message as unknown as string}
            />

            <Field
              control={control}
              type={"text"}
              name={"description"}
              icon={<IconDescription className="h-4 w-4" />}
              placeholder={"Enter description images collection..."}
              error={errors.title?.message as unknown as string}
            />

            <div className="flex flex-col gap-y-2">
              <Select
                handleClickSelect={handleClickSelect}
                handleChangeSelect={handleChangeSelect}
              >
                {data.show && data.filterTags.length > 0 && (
                  <div
                    className="absolute top-full w-full mt-2 bg-white dark:bg-[#212833] z-20 rounded-md flex flex-col shadow-lg border border-strock dark:border-darkStroke"
                    ref={selectRef}
                  >
                    {data.filterTags.slice(0, 4).map((tag) => (
                      <div
                        key={tag._id}
                        className={classNames(
                          "group p-2 hover:bg-green-200 hover:dark:bg-white rounded-md cursor-pointer"
                        )}
                        onClick={() => handleSelectTag(tag)}
                      >
                        <span
                          className={
                            "group-hover:text-text1 font-semibold text-[14px] flex items-center gap-x-1"
                          }
                        >
                          <IconHashTag className="w-3 h-3" />
                          {tag.name}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </Select>

              <div className="flex items-center gap-x-1 font-medium text-[14px]">
                <span className="font-bold text-md">Tags:</span>
                {data.selectTags.length > 0 ? (
                  <div className="flex gap-x-1 flex-wrap">
                    {data.selectTags.map((tag) => (
                      <div
                        key={v4()}
                        className="flex gap-x-1 p-1 rounded bg-primary text-white hover:opacity-70 cursor-pointer"
                        onClick={() => handleRemoveTagSelected(tag)}
                      >
                        <span className="font-semibold">{tag.name}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  "..."
                )}
              </div>
            </div>

            <ImageUploader
              images={data.thumbnail}
              max={1}
              multiple={false}
              onChange={handleBrowserThumbnail}
              label={"Thumbnail"}
            />

            <ImageUploader
              images={data.images}
              max={10}
              multiple={true}
              onChange={handleBrowserPhotos}
              label={"Images"}
              onRemove={handleRemovePhotos}
            />

            <Button type="submit" isLoading={isSubmitting} primary>
              Upload
            </Button>
          </form>
        </div>
      </Container>
    </SharedLayout>
  );
};

export default UploadPage;
