import ImageUploading from "react-images-uploading";
import { v4 } from "uuid";

import { Button, IconImage } from "../index";
import { ImageUploaderProps } from "../../interfaces/components";
import classNames from "classnames";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

const ImageUploader = ({
  images,
  max,
  multiple,
  onChange,
  onRemove,
}: ImageUploaderProps) => {
  return (
    <ImageUploading
      onChange={onChange}
      value={images}
      maxNumber={max}
      multiple={multiple}
    >
      {({ imageList, onImageUpload, isDragging, dragProps, onImageRemove }) => {
        return (
          <div className="flex flex-col gap-y-2">
            {imageList.length > 0 ? (
              <Swiper
                grabCursor={true}
                pagination={{
                  type: "fraction",
                }}
                modules={[Pagination]}
                className="w-full max-h-[350px]"
              >
                {imageList.map((image, index) => (
                  <SwiperSlide key={v4()} className="hover:opacity-70">
                    <img
                      src={image.dataURL}
                      className="w-full h-full object-cover"
                      onClick={() => {
                        if (!multiple || !onRemove) {
                          onImageRemove(index);
                        } else {
                          onRemove(index);
                        }
                      }}
                      alt={image.file?.name}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div
                className={classNames(
                  "w-full h-[350px] text-text1 dark:bg-gray-500 dark:text-white font-medium rounded-lg shadow-md flex items-center justify-center duration-200",
                  isDragging && "opacity-70 scale-110"
                )}
                {...dragProps}
              >
                <div className="flex flex-col gap-y-2 items-center">
                  <IconImage className="w-6 h-6" />
                  <span>Drop your photo here</span>
                  <span>or</span>
                  <Button type="button" primary onClick={onImageUpload}>
                    Browse disk
                  </Button>
                </div>
              </div>
            )}
          </div>
        );
      }}
    </ImageUploading>
  );
};

export default ImageUploader;
