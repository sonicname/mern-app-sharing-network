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
import { ITag, UploadPageStates } from "../interfaces";
import axios from "axios";
import { toast } from "react-toastify";
import classNames from "classnames";
import { v4 } from "uuid";
import useOnClickOutSide from "../hooks/useOnClickOutSide";
import ImageUploader from "../components/upload/ImageUploader";
import { ImageListType } from "react-images-uploading";
import { usePosts } from "../contexts/posts/postsContext";

const UploadPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const {
    createPost,
    filterTags,
    selectTags,
    show,
    images,
    thumbnail,
    showFilter,
    getAllTags,
    handleChangeSelect,
    handleSelectTag,
    removeSelectedTag,
    getImagesFromDisk,
    getThumbnailFromDisk,
    removeImages,
  } = usePosts();

  const selectRef = useRef(null);
  useOnClickOutSide(selectRef, showFilter);

  useEffect(() => {
    getAllTags();
  }, []);

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
                tags: selectTags,
                title: values.title,
                description: values.description,
                thumbnail,
                attachments: images,
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
              error={errors.title?.message as unknown as string}
            />

            <Field
              control={control}
              type={"text"}
              name={"description"}
              icon={<IconDescription />}
              placeholder={"Enter description images collection..."}
              error={errors.title?.message as unknown as string}
            />

            <div className="flex flex-col gap-y-2">
              <Select
                handleClickSelect={showFilter}
                handleChangeSelect={handleChangeSelect}
              >
                {show && filterTags.length > 0 && (
                  <div
                    className="absolute top-full w-full mt-2 bg-white dark:bg-[#212833] z-20 rounded-md flex flex-col shadow-lg border border-strock dark:border-darkStroke"
                    ref={selectRef}
                  >
                    {filterTags.slice(0, 4).map((tag) => (
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
                {selectTags.length > 0 ? (
                  <div className="flex gap-x-1 flex-wrap">
                    {selectTags.map((tag) => (
                      <div
                        key={v4()}
                        className="flex gap-x-1 p-1 rounded bg-primary text-white hover:opacity-70 cursor-pointer"
                        onClick={() => removeSelectedTag(tag)}
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
              images={thumbnail}
              max={1}
              multiple={false}
              onChange={getThumbnailFromDisk}
              label={"Thumbnail"}
            />

            <ImageUploader
              images={images}
              max={10}
              multiple={true}
              onChange={getImagesFromDisk}
              label={"Images"}
              onRemove={removeImages}
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
