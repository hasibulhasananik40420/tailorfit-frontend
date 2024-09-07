// /* eslint-disable @typescript-eslint/no-unused-vars */

import { useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import icon from "../../assets/Vector (4).png";
import dress1 from "../../assets/dress/01.png";
import dress2 from "../../assets/dress/02.png";
import dress3 from "../../assets/dress/03.png";
import dress4 from "../../assets/dress/04.png";
import dress5 from "../../assets/dress/05.png";
import dress6 from "../../assets/dress/06.png";
import dress7 from "../../assets/dress/07.png";
import dress8 from "../../assets/dress/08.png";
import dress9 from "../../assets/dress/09.png";
import dress10 from "../../assets/dress/10.png";
import dress11 from "../../assets/dress/11.png";
import dress12 from "../../assets/dress/12.png";
import { FiPlus } from "react-icons/fi";
import { FieldValues, useForm } from "react-hook-form";
import { useAppSelector } from "../../redux/features/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useCreateGallaryMutation } from "../../redux/api/imageGallary";

const data = [
  {
    _id: 1,
    image: dress1,
  },
  {
    _id: 2,
    image: dress2,
  },
  {
    _id: 3,
    image: dress3,
  },
  {
    _id: 4,
    image: dress4,
  },
  {
    _id: 5,
    image: dress5,
  },
  {
    _id: 6,
    image: dress6,
  },
  {
    _id: 7,
    image: dress7,
  },
  {
    _id: 8,
    image: dress8,
  },
  {
    _id: 9,
    image: dress9,
  },
  {
    _id: 10,
    image: dress10,
  },
  {
    _id: 11,
    image: dress11,
  },
  {
    _id: 12,
    image: dress12,
  },
];

//added

const ChoosedesignModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedImage] = useState<string | null>(null);
  const [activeImageId, setActiveImageId] = useState<number | null>(null);

  const handleImageClick = (id: number) => {
    setActiveImageId(id === activeImageId ? null : id);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  //   console.log(handleFileChange)

  const userData = useAppSelector(selectCurrentUser);
  const [createGallary] = useCreateGallaryMutation();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: FieldValues) => {
    console.log(data);

    const formData = new FormData();
    formData.append("data", JSON.stringify({ admin: userData?.id }));
    formData.append("file", data.file[0]);

    try {
      const res = await createGallary(formData);
      console.log(res);
    } catch (err) {
      console.log(err);
    }

  };

  return (
    <div className="relative">
      <dialog
        id="my_modal_4"
        className={`modal ${isOpen ? "modal-open" : ""}`}
        ref={modalRef}
      >
        <div className="modal-box lg:max-w-[804px] mx-auto w-full rounded-[8px] border-[1px] 2xl:p-[50px] 2large:p-[50px] lg:p-[30px] p-4 border-[#F6F6F6]">
          <div>
            <div className="relative mt-2 lg:mt-0">
              <input
                className="w-full 2xl:h-[50px] lg:h-[40px] h-[40px] bg-white rounded-[40px] outline-0 pl-12 text-[#999] 2xl:text-[18px] text-[16px] font-normal font-Poppins placeholder-[#999] 2xl:placeholder:text-[18px] placeholder:text-[14px] placeholder:font-Poppins placeholder:font-normal"
                type="text"
                placeholder="Search design"
                style={{
                  border: "1px solid rgba(0, 0, 0, 0.10)",
                  boxShadow: "0px 0px 25px 0px rgba(25, 93, 142, 0.05)",
                }}
              />
              <span className="absolute top-2 lg:top-[10px] 2xl:top-[14px] left-5">
                <CiSearch className="text-[#999999] size-6" />
              </span>
            </div>

            <div className="2xl:mt-[30px] lg:mt-5 mt-4 flex items-center gap-[15px]">
              <h1 className="lg:text-[24px] text-[18px] text-secondaryColor font-Poppins font-semibold">
                Choose a related category photo 
              </h1>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="2xl:mt-[30px] lg:mt-5 mt-4 grid grid-cols-4 lg:grid-cols-4 2xl:gap-1 lg:gap-x-[0] lg:gap-y-4 gap-2 2large:gap-1"
            >
              <div className="lg:block hidden">
                <label className="2xl:w-[170px] 2xl:h-[170px] lg:w-[170px] lg:h-[150px] 2makbook:h-[130px] w-[62px] h-[62px] bg-activeDhcolor rounded border-[1.5px] border-dashed border-[#F00C89] flex flex-col gap-5 items-center justify-center cursor-pointer">
                  {selectedFile ? (
                    <img
                      className="w-full h-full p-1 rounded"
                      src={URL.createObjectURL(selectedFile)}
                      alt="Selected file"
                    />
                  ) : (
                    <>
                      <img className="w-[53px] h-[40px]" src={icon} alt="" />
                      <p className="text-[#F00C89] text-[16px] font-semibold font-Noto-Sans-Bengali">
                        ছবি আপলোড করুন
                      </p>
                    </>
                  )}
                  <input
                    type="file"
                    {...register("file")}
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>

              {/* for mobile */}
              <div className="lg:hidden block">
                <label className="w-full h-[72px] bg-activeDhcolor rounded border-[1.5px] border-dashed border-[#F00C89] flex flex-col gap-5 items-center justify-center cursor-pointer">
                  {selectedFile ? (
                    <img
                      className="2xl:w-[170px] 2xl:h-[170px] lg:w-[170px] lg:h-[150px] 2makbook:h-[130px] w-full h-[72px] rounded"
                      src={URL.createObjectURL(selectedFile)}
                      alt="Selected file"
                    />
                  ) : selectedImage ? (
                    <img
                      className="w-full h-[72px] rounded"
                      src={selectedImage}
                      alt="Selected image"
                    />
                  ) : (
                    <>
                      <FiPlus className="size-6 text-[#F00C89]" />
                    </>
                  )}
                  <input
                    type="file"
                    {...register("file")}
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>

              {/* Render dress images */}
              {data.map((item) => (
                <div key={item._id}>
                  <img
                    className={`2xl:w-[170px] 2xl:h-[170px] lg:w-[170px] lg:h-[150px] 2makbook:h-[130px] w-full h-[72px] cursor-pointer rounded ${
                      item._id === activeImageId
                        ? "border-2 border-[#F00C89] p-1"
                        : "rounded"
                    }`}
                    src={item.image}
                    alt=""
                    onClick={() => handleImageClick(item._id)}
                  />
                </div>
              ))}
            </form>

            <div className="flex justify-center 2xl:mt-[27px] lg:mt-5 mt-4">
              <button
                type="submit"
                className="h-[50px] lg:h-[40px] 2xl:h-[50px] 2large:h-[50px] 2mid75:h-[50px] 2makbook:h-[40px] lg:px-[36px] bg-[#F00C89] text-white lg:text-[18px] text-[14px] font-Noto-Sans-Bengali font-medium rounded-md w-full lg:w-[150px]"
              >
                সেভ করুন
              </button>
            </div>
          </div>

          <button onClick={onClose} className="absolute right-4 lg:top-2 top-0">
            ✕
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default ChoosedesignModal;
