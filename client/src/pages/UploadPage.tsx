import { v4 } from "uuid";
import ImageUploading, {
  ImageListType,
  ImageType,
} from "react-images-uploading";
import { useState } from "react";
import { Pagination } from "swiper";
import classNames from "classnames";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button, IconRemove, SharedLayout } from "../components";
import { IStorageState, useStorageContext } from "../contexts/storage";
// TODO
const UploadPage = () => {
  const { uploadImage, uploadLoading } = useStorageContext() as IStorageState;
  const [images, setImages] = useState<ImageType[]>([]);

  const onChange = (imageList: ImageListType) => {
    setImages(imageList as never[]);
  };

  return (
    <SharedLayout>
      <div className="p-2 lg:p-4 max-w-[450px] mx-auto flex flex-col gap-y-3">
        <ImageUploading
          maxNumber={5}
          multiple
          value={images}
          onChange={onChange}
        >
          {({ onImageUpload, onImageRemove, isDragging, dragProps }) => (
            <div className="flex flex-col gap-y-3">
              <Button
                onClick={onImageUpload}
                className={classNames(
                  "w-full bg-secondary border-none !text-white duration-200",
                  isDragging && "opacity-70"
                )}
                {...dragProps}
              >
                Browser images in disk
              </Button>
              <div
                className={classNames(
                  "duration-200 max-h-[350px]",
                  images.length > 0 ? "scale-100" : "scale-0"
                )}
              >
                {images.length > 0 && (
                  <Swiper
                    pagination={{
                      type: "fraction",
                    }}
                    modules={[Pagination]}
                  >
                    {images.map((image, index) => (
                      <SwiperSlide key={v4()}>
                        <div className="relative">
                          <img
                            className="w-full max-h-[350px] object-contain"
                            src={image.dataURL}
                            alt=""
                          />
                          <IconRemove
                            className={
                              "w-6 h-6 absolute top-1 right-1 bg-white dark:bg-darkSecondary rounded-full p-1 cursor-pointer"
                            }
                            onClick={() => onImageRemove(index)}
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
              </div>
            </div>
          )}
        </ImageUploading>
        {images.length > 0 && (
          <Button
            className="w-full"
            isLoading={uploadLoading}
            primary
            onClick={() =>
              uploadImage(images.map((image) => image.file as File))
            }
          >
            Upload
          </Button>
        )}
      </div>
    </SharedLayout>
  );
};

export default UploadPage;
