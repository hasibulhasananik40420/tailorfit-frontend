/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { FaCamera, FaRegTrashAlt } from "react-icons/fa";
import { FiPlus, FiSave } from "react-icons/fi";
import { IoIosCloseCircle } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { useCreateMeasurementMutation } from "../../redux/api/measurementApi";
import { useAppSelector } from "../../redux/features/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { FieldValues, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { CiSearch } from "react-icons/ci";
import data from "../../utils/CatelogImage";

interface Category {
  admin?: string | undefined;
  image?: string;
}

type ModalState = {
  isOpenModal: boolean;
  isCloseModal: () => void;
};

interface Style {
  category: string;
  subCategories: string[];
}

interface Category {
  name: string;
  subCategories: string[];
  measurements: string[];
  looseItems?: string[];
  styles: Style[];
}

const MeasurementSettingsModal = ({
  isOpenModal,
  isCloseModal,
}: ModalState) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // Update this to allow changing the image URL
  const [activeImageId, setActiveImageId] = useState<number | null>(null);

  const handleImageClick = (id: number, imageUrl: string) => {
    setActiveImageId(id === activeImageId ? null : id);
    setSelectedFile(null)
    setSelectedImage(imageUrl); // Store the selected image URL
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedImage(URL.createObjectURL(file));
      setSelectedFile(file);
    }
  };

  const [categories, setCategories] = useState<Category[]>([
    {
      name: "",
      subCategories: [],
      measurements: [""],
      looseItems: [],
      styles: [],
    },
  ]);

  const handleCategoryNameChange = (index: number, value: string) => {
    const newCategories = [...categories];
    newCategories[index].name = value;
    setCategories(newCategories);
  };

  const addSubCategory = (categoryIndex: number) => {
    const newCategories = [...categories];
    newCategories[categoryIndex].subCategories.push("");
    setCategories(newCategories);
  };

  const removeSubCategory = (
    categoryIndex: number,
    subCategoryIndex: number
  ) => {
    // if (subCategoryIndex > 0) {
    const newCategories = [...categories];
    newCategories[categoryIndex].subCategories = newCategories[
      categoryIndex
    ].subCategories.filter((_, i) => i !== subCategoryIndex);
    setCategories(newCategories);
    // }
  };

  const handleSubCategoryChange = (
    categoryIndex: number,
    subCategoryIndex: number,
    value: string
  ) => {
    const newCategories = [...categories];
    newCategories[categoryIndex].subCategories[subCategoryIndex] = value;
    setCategories(newCategories);
  };

  const addMeasurement = (categoryIndex: number) => {
    const newCategories = [...categories];
    newCategories[categoryIndex].measurements.push("");
    setCategories(newCategories);
  };

  const handleMeasurementChange = (
    categoryIndex: number,
    measurementIndex: number,
    value: string
  ) => {
    const newCategories = [...categories];
    newCategories[categoryIndex].measurements[measurementIndex] = value;
    setCategories(newCategories);
  };

  const addLooseItem = (categoryIndex: number) => {
    const newCategories = [...categories];

    if (!newCategories[categoryIndex].looseItems) {
      newCategories[categoryIndex].looseItems = [];
    }

    newCategories[categoryIndex].looseItems!.push("");
    setCategories(newCategories);
  };
  const handleLooseItemChange = (
    categoryIndex: number,
    looseItemIndex: number,
    value: string
  ) => {
    const newCategories = [...categories];

    if (!newCategories[categoryIndex].looseItems) {
      newCategories[categoryIndex].looseItems = [];
    }

    newCategories[categoryIndex].looseItems![looseItemIndex] = value;
    setCategories(newCategories);
  };

  const addStyle = (categoryIndex: number) => {
    const newCategories = [...categories];
    newCategories[categoryIndex].styles.push({
      category: "",
      subCategories: [""],
    });
    setCategories(newCategories);
  };

  const removeStyle = (categoryIndex: number, styleIndex: number) => {
    // if (styleIndex > 0) {
    const newCategories = [...categories];
    newCategories[categoryIndex].styles = newCategories[
      categoryIndex
    ].styles.filter((_, i) => i !== styleIndex);
    setCategories(newCategories);
    // }
  };

  const handleStyleCategoryChange = (
    categoryIndex: number,
    styleIndex: number,
    value: string
  ) => {
    const newCategories = [...categories];
    newCategories[categoryIndex].styles[styleIndex].category = value;
    setCategories(newCategories);
  };

  const addStyleSubCategory = (categoryIndex: number, styleIndex: number) => {
    const newCategories = [...categories];
    newCategories[categoryIndex].styles[styleIndex].subCategories.push("");
    setCategories(newCategories);
  };

  const handleStyleSubCategoryChange = (
    categoryIndex: number,
    styleIndex: number,
    subCategoryIndex: number,
    value: string
  ) => {
    const newCategories = [...categories];
    newCategories[categoryIndex].styles[styleIndex].subCategories[
      subCategoryIndex
    ] = value;
    setCategories(newCategories);
  };

  const removeStyleSubCategory = (
    categoryIndex: number,
    styleIndex: number,
    subCategoryIndex: number
  ) => {
    const newCategories = [...categories];
    newCategories[categoryIndex].styles[styleIndex].subCategories =
      newCategories[categoryIndex].styles[styleIndex].subCategories.filter(
        (_, i) => i !== subCategoryIndex
      );
    setCategories(newCategories);
  };

  const removeMeasurement = (categoryIndex: number, index: number) => {
    const newCategories = [...categories];
    newCategories[categoryIndex].measurements = newCategories[
      categoryIndex
    ].measurements.filter((_, i) => i !== index);
    setCategories(newCategories);
  };
  const removeLoose = (categoryIndex: number, index: number) => {
    const newCategories = [...categories];

    if (newCategories[categoryIndex].looseItems) {
      newCategories[categoryIndex].looseItems = newCategories[
        categoryIndex
      ].looseItems!.filter((_, i) => i !== index);
    }

    setCategories(newCategories);
  };

  //   handle all logic here
  const userData = useAppSelector(selectCurrentUser);

  const [createMeasurement, { isLoading }] = useCreateMeasurementMutation();

  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    //  console.log(data.categories)

    const category: Category = data.categories.reduce(
      (acc: Category, cur: Category) => {
        return { ...acc, ...cur };
      },
      {} as Category
    );

    //  console.log(category)

    category.admin = userData?.id;

    // const formData = new FormData();
    // formData.append("data", JSON.stringify(category));
    // formData.append("file", selectedFile as any);

    const formData = new FormData();
    formData.append("data", JSON.stringify(category));

    if (selectedFile) {
      formData.append("file", selectedFile);
    } else if (selectedImage) {
      const response = await fetch(selectedImage); // Fetch the image from the URL
      const blob = await response.blob(); // Convert the response to a Blob
      const file = new File([blob], "selectedImage.jpg", { type: blob.type });
      formData.append("file", file);
    }

    try {
      const res = await createMeasurement(formData).unwrap();
      // console.log(res);
      if (res?.success) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: res?.message,
          showConfirmButton: false,
          timer: 3000,
        });
        isCloseModal();
        // reset();
        // window.location.reload();
      }
    } catch (err) {
      // console.log(err);
      // console.log(err.data.message);
      const error = err as { data: { message: string } };

      Swal.fire({
        icon: "error",
        title: error?.data?.message,
      });
    }
  };

  return (
    <div>
      {isOpenModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" bg-white w-[100%] h-[100%] overflow-y-scroll"
          >
            {categories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="border rounded-[10px] ">
                <div className="border-b-[1px] border-[#BCBEC6] 2xl:p-[20px] lg:p-[15px] md:p-5 p-3">
                  <div className="lg:flex items-center justify-between">
                    <div className="flex flex-col gap-3 lg:flex-row lg:gap-5 lg:items-center">
                      <label className="text-switchColor md:text-[18px] text-[14px] font-Noto-Sans-Bengali font-semibold lg:block hidden">
                        ক্যাটাগরি
                      </label>
                      {/* for mobile device */}
                      <div className="flex justify-between">
                        <label className="text-switchColor md:text-[18px] text-[14px] font-Noto-Sans-Bengali font-semibold lg:hidden block">
                          ক্যাটাগরি
                        </label>

                        <div className="lg:hidden block">
                          <div className="flex gap-2 items-center ">
                            <button
                              type="button"
                              className="bg-activeDhcolor w-[30px] h-[30px] rounded flex justify-center items-center"
                            >
                              <FaRegTrashAlt className="text-[#F00C89] size-4" />
                            </button>

                            <button
                              type="button"
                              className="p-2 rounded flex items-center justify-center"
                            >
                              <IoClose
                                onClick={isCloseModal}
                                className="text-black size-4"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                      <input
                        type="text"
                        {...register(`categories[${categoryIndex}].name`, {
                          required: " ক্যাটেগরির নাম লিখুন",
                          // validate: {
                          //   pattern: (value) =>
                          //     !/^\d+$/.test(value) ||
                          //     "শুধু সংখ্যা হতে পারবে না",
                          // },
                        })}
                        value={category.name}
                        onChange={(e) =>
                          handleCategoryNameChange(
                            categoryIndex,
                            e.target.value
                          )
                        }
                        placeholder="Type"
                        className={`border border-secondaryColor lg:w-[210px] w-full h-[50px] rounded-[8px] bg-white text-secondaryColor outline-0 placeholder:text-[#BCBEC6] placeholder:text-[18px] font-Poppins pl-4 ${
                          errors.categories &&
                          Array.isArray(errors.categories) &&
                          (errors.categories as unknown as any[])[categoryIndex]
                            ?.name
                            ? "border-[#F00C89]"
                            : "border-[#BCBEC6]"
                        }`}
                      />

                      {errors.categories &&
                        (errors.categories as unknown as any[])[categoryIndex]
                          ?.name && (
                          <span className="text-[#F00C89] md:text-[18px] text-[14px] font-Noto-Sans-Bengali font-normal">
                            {
                              (errors.categories as unknown as any[])[
                                categoryIndex
                              ]?.name?.message
                            }
                          </span>
                        )}
                    </div>

                    <div className="lg:block hidden">
                      <div className="flex gap-4 items-center ">
                        <button
                          type="button"
                          className="p-2 rounded flex items-center justify-center"
                        >
                          <IoClose
                            onClick={isCloseModal}
                            className={`md:size-8 size-3 text-black cursor-pointer`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
                  <div className="md:border-r border-r-0 border-[#BCBEC6]">
                    <div className="2xl:p-5 lg:p-[15px] md:p-5 p-3 pb-0">
                      <label className="text-[#333] md:text-[24px] text-[18px] font-semibold font-Noto-Sans-Bengali">
                        পরিমাপের নাম
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:gap-5 2mid75:gap-4 2large:gap-3 lg:gap-3 gap-3 2xl:mt-[20px] md:mt-4 mt-3">
                        {category.measurements.map((measurement, index) => (
                          <div
                            key={index}
                            className="flex flex-col items-center relative lg:block !w-full"
                          >
                            <input
                              style={{ width: "100%" }}
                              type="text"
                              {...register(
                                `categories[${categoryIndex}].measurements[${index}]`,
                                {
                                  required: "পরিমাপের নাম লিখুন",
                                  // validate: {
                                  //   pattern: (value) =>
                                  //     !/^\d+$/.test(value) ||
                                  //     "শুধু সংখ্যা হতে পারবে না",
                                  // },
                                }
                              )}
                              value={measurement}
                              onChange={(e) =>
                                handleMeasurementChange(
                                  categoryIndex,
                                  index,
                                  e.target.value
                                )
                              }
                              placeholder="Type"
                              className={`border border-secondaryColor block 2xl:w-[210px] 2mid75:w-[210px] 2large:w-[180px] !lg:w-full 2mid80:w-[160px] 2makbook:w-[120px] w-full h-[50px] rounded-[8px] bg-white text-secondaryColor outline-0 placeholder:text-[#BCBEC6] md:placeholder:text-[18px] placeholder:text-[14px] font-Poppins pl-4 ${
                                errors.categories &&
                                Array.isArray(errors.categories) &&
                                errors.categories[categoryIndex]
                                  ?.measurements &&
                                Array.isArray(
                                  errors.categories[categoryIndex].measurements
                                ) &&
                                errors.categories[categoryIndex].measurements[
                                  index
                                ]
                                  ? "border-[#F00C89]"
                                  : "border-[#BCBEC6]"
                              }`}
                            />

                            {errors.categories &&
                              Array.isArray(errors.categories) &&
                              errors.categories[categoryIndex]?.measurements &&
                              Array.isArray(
                                errors.categories[categoryIndex].measurements
                              ) &&
                              errors.categories[categoryIndex].measurements[
                                index
                              ] && (
                                <span className="text-[#F00C89] md:text-[18px] text-[14px] font-Noto-Sans-Bengali font-normal">
                                  {
                                    errors.categories[categoryIndex]
                                      .measurements[index].message
                                  }
                                </span>
                              )}

                            <button
                              type="button"
                              onClick={() =>
                                removeMeasurement(categoryIndex, index)
                              }
                              className={`${
                                index === 0 ? "hidden" : " absolute"
                              }  2xl:right-[-7px] top-[-7px] right-[-7px] lg:top-[-7px] 2mid75:right-[-7px] 2large:right-[-9px] 2mid80:right-[-5px]`}
                            >
                              <IoIosCloseCircle className="text-errorColor size-6" />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          style={{ width: "100%" }}
                          onClick={() => addMeasurement(categoryIndex)}
                          className="bg-primaryRgbaColor text-primaryColor 2xl:w-[210px] 2mid75:w-[210px] 2large:w-[180px]  lg:max-w-[100%] lg:min-w-[100%]  2makbook:w-[120px] w-full h-[50px] rounded-md flex items-center justify-center 2large:gap-2 gap-1 2xl:gap-2 2mid75:gap-2 2xl:text-[18px] 2large:text-[16px] lg:text-[18px] 2makbook:text-[10px] md:text-[18px] text-[14px] font-Noto-Sans-Bengali font-medium "
                        >
                          <FiPlus className="2xl:size-6 2mid75:size-6 2large:size-6 lg:size-5 2makbook:size-4" />{" "}
                          পরিমাপ যোগ করুন
                        </button>
                      </div>
                    </div>

                    {/* need to fixed */}

                    <div className="2xl:p-5 lg:p-[15px] md:p-5 p-3 pb-0 md:mt-[100px] mt-[32px]">
                      <label className="text-[#333] md:text-[24px] text-[18px] font-semibold font-Noto-Sans-Bengali">
                        লুজের মাপ (ঐচ্ছিক)
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:gap-5 2mid75:gap-4 2large:gap-3 lg:gap-3 gap-3 2xl:mt-[20px] md:mt-4 mt-3">
                        {category?.looseItems?.map((looseItem, index) => (
                          <div
                            key={index}
                            className="flex flex-col md:flex-row items-center relative lg:block !w-full"
                          >
                            <input
                              style={{ width: "100%" }}
                              type="text"
                              {...register(
                                `categories[${categoryIndex}].looseItems[${index}]`
                              )}
                              value={looseItem}
                              onChange={(e) =>
                                handleLooseItemChange(
                                  categoryIndex,
                                  index,
                                  e.target.value
                                )
                              }
                              placeholder="Type"
                              className={`border border-secondaryColor 2xl:w-[210px] 2mid75:w-[210px] 2large:w-[180px] lg:w-[150px] 2mid80:w-[160px] 2makbook:w-[120px] w-full h-[50px] rounded-[8px] bg-white text-secondaryColor outline-0 placeholder:text-[#BCBEC6] md:placeholder:text-[18px] placeholder:text-[14px] font-Poppins pl-4 ${
                                errors.categories &&
                                Array.isArray(errors.categories) &&
                                errors.categories[categoryIndex]?.looseItems &&
                                Array.isArray(
                                  errors.categories[categoryIndex].looseItems
                                ) &&
                                errors.categories[categoryIndex].looseItems[
                                  index
                                ]
                                  ? "border-[#F00C89]"
                                  : "border-[#BCBEC6]"
                              }`}
                            />

                            {errors.categories &&
                              Array.isArray(errors.categories) &&
                              errors.categories[categoryIndex]?.looseItems &&
                              Array.isArray(
                                errors.categories[categoryIndex].looseItems
                              ) &&
                              errors.categories[categoryIndex].looseItems[
                                index
                              ] && (
                                <span className="text-[#F00C89] md:text-[18px] text-[14px] font-Noto-Sans-Bengali font-normal">
                                  {
                                    errors.categories[categoryIndex].looseItems[
                                      index
                                    ].message
                                  }
                                </span>
                              )}

                            <button
                              type="button"
                              onClick={() => removeLoose(categoryIndex, index)}
                              className={`absolute top-[-7px] 2xl:right-[-7px] right-[-7px] 2mid75:right-[-7px] 2large:right-[-9px] lg:top-[-7px]  lg:right-[-7px] 2mid80:right-[-5px]`}
                            >
                              <IoIosCloseCircle className="text-errorColor size-6" />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => addLooseItem(categoryIndex)}
                          className="bg-primaryRgbaColor text-primaryColor 2xl:w-[210px] 2mid75:w-[210px] 2large:w-[180px]  2makbook:w-[120px] lg:w-[100%] w-full h-[50px] rounded-md flex items-center justify-center 2large:gap-2 gap-1 2xl:gap-2 2mid75:gap-2 2xl:text-[18px] 2mid75:text-[18px] 2large:text-[16px] lg:text-[18px] 2makbook:text-[10px] md:text-[18px] text-[14px] font-Noto-Sans-Bengali font-medium "
                        >
                          <FiPlus className="2xl:size-6 2mid75:size-6 2large:size-6 lg:size-5 2makbook:size-4" />{" "}
                          লুজ যোগ করুন
                        </button>
                      </div>
                    </div>

                    {/* image modal  */}

                    <div className="md:mt-[100px] mt-[48px] 2xl:p-5 lg:p-[15px] md:p-5 p-4  lg:border-b-0 border-b border-[#BCBEC6]">
                      {
                      selectedFile ? (
                        <div
                          onClick={handleOpenModal}
                          className="bg-activeDhcolor relative rounded-[8px] border-[1px] border-[#F00C89] flex flex-col justify-center items-center gap-[15px] w-[91px] h-[81px] text-[#F00C89]"
                        >
                          <img
                            className="w-[91px] h-[81px] p-1 rounded-lg object-contain"
                            src={URL.createObjectURL(selectedFile)}
                            alt="Selected file"
                          />
                          <FaCamera className="size-7 absolute flex text-black justify-center items-center h-[81px] cursor-pointer" />
                        </div>
                      ) : 
                      selectedImage ? (
                        <div
                          onClick={handleOpenModal}
                          className="bg-activeDhcolor relative rounded-[8px] border-[1px] border-[#F00C89] flex flex-col justify-center items-center gap-[15px] w-[91px] h-[81px] text-[#F00C89]"
                        >
                          <img
                            className="w-[91px] h-[81px] p-1 rounded-lg object-contain"
                            src={selectedImage}
                            alt="Selected image"
                          />

                          <FaCamera className="size-7 absolute flex text-black justify-center items-center h-[81px] cursor-pointer" />
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={handleOpenModal}
                          className="bg-activeDhcolor rounded-[8px] border-[1px] border-[#F00C89] flex flex-col justify-center items-center gap-[15px] w-[91px] h-[81px] text-[#F00C89]"
                        >
                          <FaCamera className="size-7" />
                          <span className="text-[10px] font-Noto-Sans-Bengali font-semibold">
                            ছবি বাছাই করুন
                          </span>
                        </button>
                      )}

                      {isModalOpen && (
                        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center  ">
                          <div className="relative bg-white lg:max-w-[904px] mx-auto w-full rounded-[8px] border-[1px] 2xl:p-[50px] 2large:p-[50px] lg:p-[30px] p-4 border-[#F6F6F6] overflow-y-auto max-h-[550px] 2xl:max-h-[600px]">
                            <div>
                              <div className="relative mt-2 lg:mt-0">
                                <input
                                  className="w-full 2xl:h-[50px] lg:h-[40px] h-[40px] bg-white rounded-[40px] outline-0 pl-12 text-[#999] 2xl:text-[18px] text-[16px] font-normal font-Poppins placeholder-[#999] 2xl:placeholder:text-[18px] placeholder:text-[14px] placeholder:font-Poppins placeholder:font-normal"
                                  type="text"
                                  placeholder="Search design"
                                  style={{
                                    border: "1px solid rgba(0, 0, 0, 0.10)",
                                    boxShadow:
                                      "0px 0px 25px 0px rgba(25, 93, 142, 0.05)",
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

                              <div className="2xl:mt-[30px] lg:mt-5 mt-4 grid grid-cols-4 lg:grid-cols-4 2xl:gap-1 lg:gap-x-[0] lg:gap-y-4 gap-2 2large:gap-1">
                                <div className="lg:block hidden">
                                  <label className="2xl:w-[180px] 2xl:h-[220px] lg:w-[180px] lg:h-[220px] 2makbook:h-[130px] w-[62px] h-[62px] bg-activeDhcolor rounded border-[1.5px] border-dashed border-[#F00C89] flex flex-col gap-5 items-center justify-center cursor-pointer">
                                    {selectedFile ? (
                                      <img
                                        className="w-full h-full p-1 rounded object-contain"
                                        src={URL.createObjectURL(selectedFile)}
                                        alt="Selected file"
                                      />
                                    ) : (
                                      <>
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="53"
                                          height="40"
                                          viewBox="0 0 53 40"
                                          fill="none"
                                        >
                                          <path
                                            d="M18.4351 0.000795785C10.8127 0.000795785 4.60884 6.33526 4.60884 14.1182C4.60884 14.1461 4.60844 14.1646 4.60884 14.1917C1.83804 16.3422 0 19.7117 0 23.5296C0 30.013 5.17218 35.2941 11.5219 35.2941H35.8072C37.4046 38.1052 40.3811 40 43.7823 40C48.8593 40 53 35.7725 53 30.5882C53 26.9951 51.0144 23.8643 48.103 22.2793C47.2784 18.7255 44.6917 15.8714 41.3338 14.7056C41.3828 14.3121 41.4777 13.9408 41.4777 13.5293C41.4777 8.02044 37.0794 3.52955 31.6842 3.52955C30.4537 3.52955 29.3029 3.82374 28.2274 4.24636C25.7215 1.65155 22.2804 0 18.434 0L18.4351 0.000795785ZM18.4351 2.35349C21.8942 2.35349 24.9808 3.902 27.0946 6.36057L27.0942 6.36098C27.4381 6.75611 27.9975 6.86895 28.4625 6.63671C29.4514 6.15254 30.534 5.88297 31.6849 5.88297C35.8348 5.88297 39.1742 9.29268 39.1742 13.53C39.1742 14.1159 39.1055 14.6896 38.9761 15.2578C38.9062 15.5627 38.958 15.8831 39.1203 16.149C39.2823 16.4145 39.5415 16.6032 39.8405 16.6734C42.3206 17.2565 44.3641 18.9983 45.3851 21.3239C44.8635 21.2295 44.3303 21.177 43.783 21.177C38.706 21.177 34.5653 25.4044 34.5653 30.5888C34.5653 31.4029 34.6794 32.1878 34.8715 32.9415H11.5213C6.41697 32.9415 2.30357 28.7416 2.30357 23.5297C2.30357 20.2508 3.92949 17.3672 6.40802 15.6803H6.40842C6.74759 15.4546 6.9457 15.064 6.93042 14.6512C6.92199 14.451 6.91274 14.2787 6.91274 14.1178C6.91274 7.6066 12.0577 2.35331 18.4346 2.35331L18.4351 2.35349ZM43.7831 23.5296C47.6148 23.5296 50.6961 26.6759 50.6961 30.5883C50.6961 34.5006 47.6148 37.6469 43.7831 37.6469C39.9515 37.6469 36.8701 34.5006 36.8701 30.5883C36.8701 26.6759 39.9515 23.5296 43.7831 23.5296ZM43.7831 25.2944C43.4508 25.2944 43.1655 25.4503 42.9549 25.6805C42.0126 26.5709 41.0296 27.6221 40.0926 28.5847C39.6337 29.0578 39.6425 29.7795 40.0926 30.2391C40.5426 30.6986 41.2628 30.6986 41.7128 30.2391L42.6311 29.3015V34.7057C42.6311 35.3557 43.147 35.8821 43.7831 35.8821C44.4197 35.8821 44.9352 35.3552 44.9352 34.7057V29.3015L45.8535 30.2391C46.3035 30.6986 47.0236 30.6986 47.4737 30.2391C47.9238 29.7795 47.937 29.0578 47.4737 28.5847C46.5161 27.643 45.5705 26.5532 44.6114 25.6805C44.4012 25.4508 44.1159 25.2944 43.7831 25.2944Z"
                                            fill="#F00C89"
                                          />
                                        </svg>
                                        <p className="text-[#F00C89] text-[16px] font-semibold font-Noto-Sans-Bengali">
                                          ছবি আপলোড করুন 
                                        </p>
                                      </>
                                    )}
                                    <input
                                      type="file"
                                      {...register("file", {
                                        required: "ইমেজ প্রদান করুন",
                                      })}
                                      className="hidden"
                                      onChange={handleFileChange}
                                    />
                                  </label>

                                  {/* {errors.file && <p className="text-red-500">{errors.file.message}</p>} */}
                                </div>

                                {/* for mobile */}
                                <div className="lg:hidden block">
                                  <label className="w-full h-[92px] bg-activeDhcolor rounded border-[1.5px] border-dashed border-[#F00C89] flex flex-col gap-5 items-center justify-center cursor-pointer">
                                    {
                                    selectedFile ? (
                                      <img
                                        className="2xl:w-[170px] 2xl:h-[170px] lg:w-[170px] lg:h-[150px] 2makbook:h-[130px] w-full h-[92px] rounded"
                                        src={URL.createObjectURL(selectedFile)}
                                        alt="Selected file"
                                      />
                                    ) : selectedImage ?
                                     (
                                      <img
                                        className="w-full h-[92px] rounded object-contain"
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
                                      {...register("file", {
                                        required: "ইমেজ প্রদান করুন",
                                      })}
                                      className="hidden"
                                      onChange={handleFileChange}
                                    />
                                  </label>
                                </div>

                                {data?.map((item) => (
                                  <div key={item._id}>
                                    <img
                                      className={`2xl:w-[180px] 2xl:h-[220px] lg:w-[180px] lg:h-[220px] 2makbook:h-[130px] w-full h-[92px] cursor-pointer rounded object-contain ${
                                        item._id === activeImageId
                                          ? "border-2 border-primaryColor p-1"
                                          : "rounded"
                                      }`}
                                      src={item.image}
                                      alt=""
                                      onClick={() =>
                                        handleImageClick(item._id, item.image)
                                      }
                                    />
                                  </div>
                                ))}
                              </div>

                              <div className="flex justify-center 2xl:mt-[27px] lg:mt-5 mt-4 ">
                                <button
                                  onClick={handleCloseModal}
                                  type="button"
                                  className="h-[50px] lg:h-[40px] 2xl:h-[50px] 2large:h-[50px] 2mid75:h-[50px] 2makbook:h-[40px] lg:px-[36px] bg-primaryColor text-white lg:text-[18px] text-[14px] font-Noto-Sans-Bengali font-medium rounded-md px-4"
                                >
                                  সংযুক্ত করুন
                                </button>
                              </div>

                              <IoClose
                                onClick={handleCloseModal}
                                className={`absolute top-2 right-2 md:size-6 size-5 text-primaryColor cursor-pointer`}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* item 2 */}

                  <div className="bg-[#F8F9FD] rounded-r-[10px] 2xl:p-5 lg:p-[15px] md:p-5 p-3 ">
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 2xl:gap-[30px] 2mid75:gap-[30px] 2large:gap-[15px] lg:gap-[15px] 2makbook:gap-[10px]">
                      <div className=" ">
                        <label className="text-secondaryColor md:text-[24px] text-[18px] font-semibold font-Noto-Sans-Bengali">
                          স্টাইল (ড্রপডাউন)
                        </label>
                        {category.styles.map((style, styleIndex) => (
                          <div key={styleIndex} className="md:mt-5 mt-3">
                            <div className="relative lg:block !w-full">
                              <input
                                style={{ width: "100%" }}
                                type="text"
                                {...register(
                                  `categories[${categoryIndex}].styles[${styleIndex}].category`,
                                  {
                                    required:
                                      "মেইন স্টাইল ক্যাটাগরির নাম লিখুন",
                                    // validate: {
                                    //   pattern: (value) =>
                                    //     !/^\d+$/.test(value) ||
                                    //     "শুধু সংখ্যা হতে পারবে না",
                                    // },
                                  }
                                )}
                                value={style?.category}
                                onChange={(e) =>
                                  handleStyleCategoryChange(
                                    categoryIndex,
                                    styleIndex,
                                    e.target.value
                                  )
                                }
                                placeholder="ক্যাটাগরি"
                                className={`border border-secondaryColor 2xl:w-[330px] 2mid75:w-[330px] 2large:w-[270px] lg:w-[230px] 2makbook:w-[200px] w-full h-[50px] rounded-[8px] bg-white text-secondaryColor outline-0 placeholder:text-[#BCBEC6] md:placeholder:text-[18px] placeholder:text-[14px] pl-4 font-Noto-Sans-Bengali ${
                                  errors.categories &&
                                  Array.isArray(errors.categories) &&
                                  errors.categories[categoryIndex]?.styles &&
                                  Array.isArray(
                                    errors.categories[categoryIndex].styles
                                  ) &&
                                  errors.categories[categoryIndex].styles[
                                    styleIndex
                                  ]?.category
                                    ? "border-primaryColor"
                                    : "border-[#BCBEC6]"
                                }`}
                              />

                              {errors.categories &&
                                Array.isArray(errors.categories) &&
                                errors.categories[categoryIndex]?.styles &&
                                Array.isArray(
                                  errors.categories[categoryIndex].styles
                                ) &&
                                errors.categories[categoryIndex].styles[
                                  styleIndex
                                ]?.category && (
                                  <span className="text-[#F00C89] md:text-[18px] text-[14px] font-Noto-Sans-Bengali font-normal">
                                    {
                                      errors.categories[categoryIndex].styles[
                                        styleIndex
                                      ].category.message
                                    }
                                  </span>
                                )}

                              {/* {styleIndex > 0 && ( */}
                              <IoIosCloseCircle
                                onClick={() =>
                                  removeStyle(categoryIndex, styleIndex)
                                }
                                className="text-errorColor size-6 absolute top-[-5px] right-[-7px] 2xl:top-[-7px] 2xl:right-[-7px]  cursor-pointer"
                              />
                              {/* )} */}
                            </div>

                            {style.subCategories.map(
                              (subCategory, subCategoryIndex) => (
                                <div
                                  key={subCategoryIndex}
                                  className="flex flex-col lg:flex-row lg:items-center lg:mt-5 mt-3  lg:ml-5 mr-5 lg:mr-5  relative lg:block  2xl:!w-[310px] 2mid75:!w-[92%] 2large:!w-[92%] lg:!w-[90%] !w-[80%]"
                                >
                                  <input
                                    style={{}}
                                    type="text"
                                    {...register(
                                      `categories[${categoryIndex}].styles[${styleIndex}].subCategories[${subCategoryIndex}]`,
                                      {
                                        required: " সাবক্যাটেগরি প্রদান করুন",
                                        // validate: {
                                        //   pattern: (value) =>
                                        //     !/^\d+$/.test(value) ||
                                        //     "শুধু সংখ্যা হতে পারবে না",
                                        // },
                                      }
                                    )}
                                    value={subCategory}
                                    onChange={(e) =>
                                      handleStyleSubCategoryChange(
                                        categoryIndex,
                                        styleIndex,
                                        subCategoryIndex,
                                        e.target.value
                                      )
                                    }
                                    placeholder="সাব ক্যাটাগরি"
                                    className={`border border-secondaryColor 2xl:w-[310px] 2mid75:w-[310px] 2large:w-[250px] 2makbook:w-[180px] lg:!w-full h-[50px] rounded-[8px] bg-white text-secondaryColor outline-0 placeholder:text-[#BCBEC6] md:placeholder:text-[18px] placeholder:text-[14px] pl-4 font-Noto-Sans-Bengali ${
                                      errors.categories &&
                                      Array.isArray(errors.categories) &&
                                      errors.categories[categoryIndex]
                                        ?.styles &&
                                      Array.isArray(
                                        errors.categories[categoryIndex].styles
                                      ) &&
                                      errors.categories[categoryIndex].styles[
                                        styleIndex
                                      ]?.subCategories &&
                                      Array.isArray(
                                        errors.categories[categoryIndex].styles[
                                          styleIndex
                                        ].subCategories
                                      ) &&
                                      errors.categories[categoryIndex].styles[
                                        styleIndex
                                      ].subCategories[subCategoryIndex]
                                        ? "border-primaryColor"
                                        : "border-[#BCBEC6]"
                                    }`}
                                  />

                                  {errors.categories &&
                                    Array.isArray(errors.categories) &&
                                    errors.categories[categoryIndex]?.styles &&
                                    Array.isArray(
                                      errors.categories[categoryIndex].styles
                                    ) &&
                                    errors.categories[categoryIndex].styles[
                                      styleIndex
                                    ]?.subCategories &&
                                    Array.isArray(
                                      errors.categories[categoryIndex].styles[
                                        styleIndex
                                      ].subCategories
                                    ) &&
                                    errors.categories[categoryIndex].styles[
                                      styleIndex
                                    ].subCategories[subCategoryIndex] && (
                                      <span className="text-[#F00C89] md:text-[18px] text-[14px] font-Noto-Sans-Bengali font-normal">
                                        {
                                          errors.categories[categoryIndex]
                                            .styles[styleIndex].subCategories[
                                            subCategoryIndex
                                          ].message
                                        }
                                      </span>
                                    )}
                                  <button
                                    type="button"
                                    onClick={() =>
                                      removeStyleSubCategory(
                                        categoryIndex,
                                        styleIndex,
                                        subCategoryIndex
                                      )
                                    }
                                    className="absolute lg:top-[-7px] top-[-7px] right-[-7px] 2xl:right-[-7px] 2mid75:right-[-7px] 2large:right-[-9px] lg:right-[-7px] 2mid80:right-[8px]"
                                  >
                                    <IoIosCloseCircle className="text-errorColor size-6" />
                                  </button>
                                </div>
                              )
                            )}

                            <button
                              type="button"
                              onClick={() =>
                                addStyleSubCategory(categoryIndex, styleIndex)
                              }
                              className="mt-[10px] flex items-center ml-5"
                            >
                              <FiPlus className="size-[18px] text-primaryColor" />
                              <span className="text-primaryColor text-[16px] 2makbook:text-[14px] font-medium font-Noto-Sans-Bengali">
                                সাব ক্যাটাগরি যোগ করুন
                              </span>
                            </button>
                          </div>
                        ))}

                        <button
                          type="button"
                          onClick={() => addStyle(categoryIndex)}
                          className="bg-primaryRgbaColor md:mt-5 mt-3 lg:!w-full 2makbook:w-[200px] h-[50px] rounded-md flex items-center justify-center gap-2 w-full "
                        >
                          <FiPlus className="size-6 text-primaryColor" />
                          <span className="text-primaryColor text-[18px] font-medium font-Noto-Sans-Bengali">
                            স্টাইল যোগ করুন
                          </span>
                        </button>
                      </div>

                      <div className="mt-10 lg:mt-0  ">
                        <label className="text-[#333] md:text-[24px] text-[18px] font-semibold font-Noto-Sans-Bengali">
                          একক স্টাইল
                        </label>
                        {category.subCategories.map(
                          (subCategory, subCategoryIndex) => (
                            <div
                              key={subCategoryIndex}
                              className="flex flex-col md:flex-row items-center lg:mt-5 md:mt-3 mt-3"
                            >
                              <div className="relative lg:block !w-full">
                                <input
                                  style={{ width: "100%" }}
                                  type="text"
                                  {...register(
                                    `categories[${categoryIndex}].subCategories[${subCategoryIndex}]`,
                                    {
                                      required: "সিঙ্গেল স্টাইল প্রদান করুন",
                                      // validate: {
                                      //   pattern: (value) =>
                                      //     !/^\d+$/.test(value) ||
                                      //     "শুধু সংখ্যা হতে পারবে না",
                                      // },
                                    }
                                  )}
                                  value={subCategory}
                                  onChange={(e) =>
                                    handleSubCategoryChange(
                                      categoryIndex,
                                      subCategoryIndex,
                                      e.target.value
                                    )
                                  }
                                  placeholder="ক্যাটাগরি"
                                  className={`border border-secondaryColor 2xl:w-[330px] 2mid75:w-[330px] 2large:w-[270px] lg:w-[230px] 2makbook:w-[200px] w-full h-[50px] rounded-[8px] bg-white text-secondaryColor outline-0 placeholder:text-[#BCBEC6] placeholder:text-[18px] pl-4 font-Noto-Sans-Bengali ${
                                    errors.categories &&
                                    Array.isArray(errors.categories) &&
                                    errors.categories[categoryIndex]
                                      ?.subCategories &&
                                    Array.isArray(
                                      errors.categories[categoryIndex]
                                        .subCategories
                                    ) &&
                                    errors.categories[categoryIndex]
                                      .subCategories[subCategoryIndex]
                                      ? "border-primaryColor"
                                      : "border-[#BCBEC6]"
                                  }`}
                                />

                                {errors.categories &&
                                  Array.isArray(errors.categories) &&
                                  errors.categories[categoryIndex]
                                    ?.subCategories &&
                                  Array.isArray(
                                    errors.categories[categoryIndex]
                                      .subCategories
                                  ) &&
                                  errors.categories[categoryIndex]
                                    .subCategories[subCategoryIndex] && (
                                    <span className="text-primaryColor md:text-[18px] text-[14px] font-Noto-Sans-Bengali font-normal">
                                      {
                                        errors.categories[categoryIndex]
                                          .subCategories[subCategoryIndex]
                                          .message
                                      }
                                    </span>
                                  )}

                                {/* {subCategoryIndex > 0 && ( */}
                                <IoIosCloseCircle
                                  onClick={() =>
                                    removeSubCategory(
                                      categoryIndex,
                                      subCategoryIndex
                                    )
                                  }
                                  className="text-errorColor size-6 absolute top-[-5px] right-[-5px] cursor-pointer"
                                />
                                {/* )} */}
                              </div>
                            </div>
                          )
                        )}
                        <button
                          type="button"
                          onClick={() => addSubCategory(categoryIndex)}
                          className="bg-primaryRgbaColor text-primaryColor md:mt-5 mt-3 lg:!w-full 2makbook:w-[200px] h-[50px] rounded-md flex items-center justify-center gap-2 w-full "
                        >
                          <FiPlus className="size-6 " />
                          <span className=" text-[18px] font-medium font-Noto-Sans-Bengali">
                            স্টাইল যোগ করুন
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div className="fixed bottom-10 md:right-16 right-6  my-3 flex justify-end ">
                  <button
                    type="submit"
                    className="bg-[#F00C89] border-[1px] border-[#F00C89] lg:w-[152px] w-full h-[50px] md:px-0 px-4 rounded-[6px] flex justify-center items-center gap-2 text-white text-[18px] font-medium font-Noto-Sans-Bengali"
                  >
                    {isLoading ? (
                      <span className="loading loading-infinity loading-lg"></span>
                    ) : (
                      <>
                        <FiSave className="size-6" /> সেভ করুন
                      </>
                    )}
                  </button>
                </div> */}
              </div>
            ))}

            <div className="my-3 w-full flex justify-end px-4 lg:px-0">
              <button
                type="submit"
                className="bg-primaryColor border-[1px] border-primaryColor lg:w-[152px] w-full h-[50px] rounded-[6px] flex justify-center items-center gap-2 text-white text-[18px] font-medium font-Noto-Sans-Bengali "
              >
                {isLoading ? (
                  <span className="loading loading-infinity loading-lg"></span>
                ) : (
                  <>
                    <FiSave className="size-6" /> সেভ করুন
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default MeasurementSettingsModal;
