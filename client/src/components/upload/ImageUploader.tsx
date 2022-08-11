import ImageUploading from "react-images-uploading";
import { v4 } from "uuid";

import { Button } from "../index";
import { ImageUploaderProps } from "../../interfaces/components";

const ImageUploader = ({
  images,
  max,
  multiple,
  onChange,
  label,
  onRemove,
}: ImageUploaderProps) => {
  return (
    <ImageUploading
      onChange={onChange}
      value={images}
      maxNumber={max}
      multiple={multiple}
    >
      {({ onImageUpload, isDragging, dragProps, onImageRemove }) => (
        <div className="w-full max-h-[350px] flex flex-col gap-y-2">
          <h3 className="text-md font-medium">{label}</h3>
          {images.length > 0 ? (
            <div className="flex flex-wrap gap-x-1">
              {images.map((image, index) => (
                <span
                  key={v4()}
                  className="p-1 bg-secondary rounded shadow-md hover:opacity-70 cursor-pointer"
                  onClick={() => {
                    if (!multiple || !onRemove) {
                      onImageRemove(index);
                    } else {
                      onRemove(index);
                    }
                  }}
                >
                  {image.name}
                </span>
              ))}
            </div>
          ) : (
            <Button
              className={`w-full ${isDragging && "opacity-70"}`}
              type={"button"}
              onClick={onImageUpload}
              {...dragProps}
            >
              Browser Images
            </Button>
          )}
        </div>
      )}
    </ImageUploading>
  );
};

export default ImageUploader;
