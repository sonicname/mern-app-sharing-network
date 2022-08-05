import { Button, IconRemove, SharedLayout } from "../components";
import ImageUploading, {
  ImageListType,
  ImageType,
} from "react-images-uploading";
import { useState } from "react";
import classNames from "classnames";
import { Swiper, SwiperSlide } from "swiper/react";
import { v4 } from "uuid";
import { Pagination } from "swiper";
// TODO
const UploadPage = () => {
  const [images, setImages] = useState<ImageType[]>([]);

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
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
          <Button className="w-full" primary>
            Upload
          </Button>
        )}
      </div>
    </SharedLayout>
  );
};

export default UploadPage;
