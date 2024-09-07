/* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */

// import { ChangeEvent, useState } from "react";
// import { Controller, useFormContext } from "react-hook-form";
// // import logo from "../../assets/dashbardLogo.png";
// import camera from "../../assets/Photo Editor.png";
// import { useAppSelector } from "../../redux/features/hooks";
// import { selectCurrentUser } from "../../redux/features/auth/authSlice";

// type TInputFileProps = {
//   name: string;
//   className?: string;
//   defaultImage?: string;
//   selectedFile?: any;
//   setSelectedFile?: any;
// };

// const ReuseInputFile = ({
//   name,
//   defaultImage,
//   setSelectedFile,
// }: TInputFileProps) => {
//   const { control } = useFormContext();
//   const [selectedImage, setSelectedImage] = useState<string | null>(
//     defaultImage || null
//   );

//   const user = useAppSelector(selectCurrentUser)
//   // console.log(selectedFile)

//   const handleFileChange =
//     (onChange: (value: any) => void) =>
//     (event: ChangeEvent<HTMLInputElement>) => {
//       const file = event.target.files?.[0];
//       if (file) {
//         const objectUrl = URL.createObjectURL(file);
//         setSelectedImage(objectUrl);
//         setSelectedFile(file);
//         onChange(file); // Pass the file directly to onChange
//       }
//     };

//   return (
//     <Controller
//       control={control}
//       name={name}
//       defaultValue={null}
//       render={({ field: { onChange, onBlur }, fieldState: { error } }) => (
//         <div className="relative inline-block">
//           <div className="relative">
//             <div className="2xl:w-[154px] 2xl:h-[154px] lg:w-[120px] lg:h-[120px] w-[90px] h-[90px] rounded-full bg-[#F0F2F5] flex justify-center items-center overflow-hidden">
//               {selectedImage ? (
//                 <img
//                   className="2xl:w-[154px] 2xl:h-[154px] lg:w-[120px] lg:h-[120px] w-[90px] h-[90px] rounded-full "
//                   src={selectedImage}
//                   alt="Profile"
//                 />
//               ) : (
//                 // <img className="w-[35px] h-[63px]" src={logo} alt="Logo" />
//                  <h1 className="text-[#333] text-[38px] font-semibold font-Poppins"> {user?.companyName?.slice(0, 1)}</h1>
//               )}
//             </div>
//             <img
//               className="2xl:w-[44px] 2xl:h-[44px] lg:w-[35px] lg:h-[35px] w-[30px] h-[30px] rounded-full absolute right-[-5px] lg:bottom-[0px] 2xl:bottom-[0px] bottom-0"
//               src={camera}
//               alt="Camera"
//             />
//           </div>
//           <input
//             type="file"
//             className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
//             onChange={handleFileChange(onChange)}
//             onBlur={onBlur}
//           />
//           {error && (
//             <p className="text-[#F00C89] text-[18px] font-Noto-Sans-Bengali font-normal">
//               {error.message}
//             </p>
//           )}
//         </div>
//       )}
//     />
//   );
// };

// export default ReuseInputFile;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useState, useCallback } from "react";
import { Controller, useFormContext } from "react-hook-form";
import camera from "../../assets/Photo Editor.png";
import { useAppSelector } from "../../redux/features/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import ReactModal from "react-modal";
import Cropper from "react-easy-crop";

type TInputFileProps = {
  name: string;
  className?: string;
  defaultImage?: string;
  selectedFile?: any;
  setSelectedFile?: any;
  croppedImage?: any;
  setCroppedImage?: any;
};

type Crop = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const ReuseInputFile = ({
  name,
  defaultImage,
  setSelectedFile,
}: TInputFileProps) => {
  const { control } = useFormContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(
    defaultImage || null
  );
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  // console.log(selectedImage)

  const user = useAppSelector(selectCurrentUser);

  const handleFileChange =
    (_onChange: (value: any) => void) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const objectUrl = URL.createObjectURL(file);
        setSelectedImage(objectUrl);
        setIsModalOpen(true); // Open the modal
      }
    };

  const onCropComplete = useCallback(
    (_croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );


  const showCroppedImage = useCallback(async () => {
    try {
      if (selectedImage && croppedAreaPixels) {
        const croppedImgBlob = await getCroppedImg(
          selectedImage,
          croppedAreaPixels
        );
        const croppedImgFile = new File([croppedImgBlob], "cropped-image.jpg", {
          type: "image/jpeg",
        });
        setCroppedImage(URL.createObjectURL(croppedImgFile));
        setSelectedFile(croppedImgFile);
        setIsModalOpen(false);
      }
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, selectedImage, setSelectedFile]);

  // Example getCroppedImg function returning Blob
  async function getCroppedImg(imageSrc: string, crop: Crop): Promise<Blob> {
    const image = new Image();
    image.src = imageSrc;
    await new Promise<void>((resolve) => (image.onload = () => resolve()));

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) throw new Error("Could not get canvas context");

    canvas.width = crop.width;
    canvas.height = crop.height;

    ctx.drawImage(
      image,
      crop.x,
      crop.y,
      crop.width,
      crop.height,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Canvas toBlob failed"));
        }
      }, "image/jpeg");
    });
  }

  return (
    <>
      <Controller
        control={control}
        name={name}
        defaultValue={null}
        render={({ field: { onChange, onBlur }, fieldState: { error } }) => (
          <div className="relative inline-block bg-white">
            <div className="relative">
              <div className="2xl:w-[154px] 2xl:h-[154px] lg:w-[120px] lg:h-[120px] w-[90px] h-[90px] rounded-full bg-[#F0F2F5] flex justify-center items-center overflow-hidden">
                {croppedImage ? (
                  <img
                    className="2xl:w-[154px] 2xl:h-[154px] lg:w-[120px] lg:h-[120px] w-[90px] h-[90px] rounded-full bg-white"
                    src={croppedImage}
                    alt="Profile"
                  />
                ) : (
                  <h1 className="text-[#333] text-[38px] font-semibold font-Poppins">
                    {user?.companyName?.slice(0, 1).toUpperCase()}
                  </h1>
                )}
              </div>
              <img
                className="2xl:w-[44px] 2xl:h-[44px] lg:w-[35px] lg:h-[35px] w-[30px] h-[30px] rounded-full absolute right-[-5px] lg:bottom-[0px] 2xl:bottom-[0px] bottom-0 bg-white"
                src={camera}
                alt="Camera"
              />
            </div>
            <input
              type="file"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer !bg-white"
              onChange={handleFileChange(onChange)}
              onBlur={onBlur}
            />
            {error && (
              <p className="text-[#F00C89] text-[18px] font-Noto-Sans-Bengali font-normal">
                {error.message}
              </p>
            )}
          </div>
        )}
      />

      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "400px",
            height: "500px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "30px",
            backgroundColor:"#F9FAFE"
            
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex:"50"
          },
        }}
      >
        {selectedImage && (
          <div
            className="crop-container"
            style={{ position: "relative", width: "100%", height: 400 }}
          >
            <Cropper
              image={selectedImage}
              crop={crop}
              zoom={zoom}
              aspect={1 / 1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
        )}
        <div className="flex justify-between items-center mt-4 w-full">
        <button className="bg-primaryColor px-6 py-1 rounded-md font-Poppins text-[18px] font-normal text-white" onClick={showCroppedImage}>
          Save
        </button>
        <button className="bg-activeDhcolor px-6 py-1 rounded-md font-Poppins text-[18px] font-normal" onClick={() => setIsModalOpen(false)}>
          Cancel
        </button>
        </div>
      </ReactModal>
    </>
  );
};

export default ReuseInputFile;
