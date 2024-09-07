/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import icon from "../../assets/save 1.png";
import { IoMdClose } from "react-icons/io";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  useDeleteFolderOrderMutation,
  useEditFolderNameMutation,
  useGetCompanyFolderQuery,
} from "../../redux/api/companyOrderApi";
import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "../../redux/features/hooks";
import {
  selectCurrentUser,
  setFolderData,
} from "../../redux/features/auth/authSlice";
import Loader from "../../components/Loader/Loader";
import { IoClose } from "react-icons/io5";
import { Dialog, DialogPanel } from "@headlessui/react";
import { HiOutlineInformationCircle } from "react-icons/hi";

export const validationSchema = z.object({
  folder: z
    .string()
    .min(1, "অনুগ্রহ করে ফোল্ডার নাম লিখুন")
    .refine((value) => !/^\d+$/.test(value), {
      message: "ফোল্ডার নাম শুধুমাত্র সংখ্যা হতে পারবে না",
    }),
});

export const defaultValues = {
  folder: "",
};

const AllCompanyOrderList = () => {
  const [openModalId, setOpenModalId] = useState<string | null>(null);
  const [openRenameModalId, setOpenRenameModalId] = useState<string | null>(
    null
  );

  // const navigate = useNavigate();

  const handleButtonClick = (id: string) => {
    setOpenModalId(openModalId === id ? null : id);
  };

  //rename modal
  const handleRenameButtonClick = (id: string) => {
    setIsOpen(true);
    setOpenRenameModalId(id);
  };

  const dispatch = useAppDispatch();
  const currentData = useAppSelector(selectCurrentUser);
  //handle edit folder
  const {
    data: folderData,
    isLoading,
    refetch,
  } = useGetCompanyFolderQuery(currentData?.id);
  // console.log(folderData)

  const [editFolderName] = useEditFolderNameMutation();
  const [deleteFolderOrder] = useDeleteFolderOrderMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      folder: "",
    },
  });

  useEffect(() => {
    if (openRenameModalId && folderData) {
      const folder = folderData.data.find(
        (f: any) => f._id === openRenameModalId
      );
      if (folder) {
        setValue("folder", folder.folder);
      }
    }
  }, [openRenameModalId, folderData, setValue]);

  const onSubmit: SubmitHandler<typeof defaultValues> = async (data) => {
    const editFolder = {
      id: openRenameModalId,
      data: {
        folder: data?.folder,
      },
    };

    try {
      const res = await editFolderName(editFolder).unwrap();
      //  console.log(res)
      if (res?.success) {
        Swal.fire({
          icon: "success",
          title: res?.message,
          showConfirmButton: false,
          timer: 3000,
        });
        setOpenRenameModalId(null);
      }
    } catch (err) {
      // console.log(err)
      const error = err as { data: { message: string } };

      Swal.fire({
        icon: "error",
        title: error?.data?.message,
      });
    }
  };

  //delete folter
  const handleDeleteFolder = async (industry: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to delete this item?",
        imageUrl:
          "https://res.cloudinary.com/diam8ogqq/image/upload/v1724340374/warning_ckqqz8.png",
        imageWidth: 48,
        imageHeight: 48,
        imageAlt: "Custom icon",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
        customClass: {
          confirmButton: "swal2-confirm-btn",
          cancelButton: "swal2-cancel-btn",
        },
      });

      if (result.isConfirmed) {
        const res = await deleteFolderOrder(industry).unwrap();
        if (res?.success) {
          Swal.fire({
            icon: "success",
            title: res?.message,
            showConfirmButton: false,
            timer: 3000,
          });
          refetch();
        }
      }
    } catch (err) {
      // console.log(err);
      const error = err as { data: { message: string } };

      Swal.fire({
        icon: "error",
        title: error?.data?.message,
      });
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleViewFolder = (data: string) => {
    dispatch(setFolderData(data));
    // navigate(`/${currentData?.role}/order-list-view`);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-white rounded-[10px] min-h-[590px] w-full">
      {folderData?.data?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2mid75:grid-cols-3 2xl:grid-cols-4 2large:grid-cols-3 lg:gap-[30px] gap-x-4 gap-y-4 w-full">
          {folderData?.data?.map((folder: any) => (
            <div
              key={folder._id}
              className="relative flex justify-between px-5 items-center 2xl:w-[347px] lg:!w-full 2mid80:w-[330px] 2mid75:w-[360px] 2makbook:w-[280px] w-full 2xl:h-[75px] h-[60px]  bg-[#F6F6F6] rounded-[10px] hover:bg-[#E5E5E5] duration-300"
            >
              <Link
                to={`/${currentData?.role}/order-list-view/${folder?.folder
                  .toLowerCase()
                  .replace(/ /g, "-")}`}
                className="cursor-pointer w-[85%]"
                onClick={() => handleViewFolder(folder?.industry)}
              >
                <span className="flex gap-[10px] items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35"
                    viewBox="0 0 35 35"
                    fill="none"
                  >
                    <path
                      d="M28.4375 30.625C29.5978 30.625 30.7106 30.1641 31.5311 29.3436C32.3516 28.5231 32.8125 27.4103 32.8125 26.25V19.6875C32.8125 18.5272 32.3516 17.4144 31.5311 16.5939C30.7106 15.7734 29.5978 15.3125 28.4375 15.3125H6.5625C5.40218 15.3125 4.28938 15.7734 3.46891 16.5939C2.64844 17.4144 2.1875 18.5272 2.1875 19.6875V26.25C2.1875 27.4103 2.64844 28.5231 3.46891 29.3436C4.28938 30.1641 5.40218 30.625 6.5625 30.625H28.4375ZM2.1875 14.7963V8.75C2.1875 7.58968 2.64844 6.47688 3.46891 5.65641C4.28938 4.83594 5.40218 4.375 6.5625 4.375H14.4069C15.2766 4.37538 16.1106 4.72105 16.7256 5.33604L19.8202 8.42917C20.0244 8.63479 20.3029 8.75 20.5931 8.75H28.4375C29.5978 8.75 30.7106 9.21094 31.5311 10.0314C32.3516 10.8519 32.8125 11.9647 32.8125 13.125V14.7963C31.6106 13.718 30.0522 13.1227 28.4375 13.125H6.5625C4.94782 13.1227 3.38941 13.718 2.1875 14.7963Z"
                      fill="#333333"
                    />
                  </svg>
                  <p className="2xl:text-[18px] text-[14px] 2makbook:text-[10px] text-secondaryColor font-Poppins font-medium">
                    {folder?.folder}
                  </p>
                </span>
              </Link>

              <div className="hover:bg-fillColor hover:rounded-md cursor-pointer">
                <svg
                  onClick={() => handleButtonClick(folder._id)}
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="35"
                  viewBox="0 0 35 35"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16 11.6C16 11.1757 16.1686 10.7687 16.4686 10.4686C16.7687 10.1686 17.1757 10 17.6 10C18.0243 10 18.4313 10.1686 18.7314 10.4686C19.0314 10.7687 19.2 11.1757 19.2 11.6C19.2 12.0243 19.0314 12.4313 18.7314 12.7314C18.4313 13.0314 18.0243 13.2 17.6 13.2C17.1757 13.2 16.7687 13.0314 16.4686 12.7314C16.1686 12.4313 16 12.0243 16 11.6ZM16 18C16 17.5757 16.1686 17.1687 16.4686 16.8686C16.7687 16.5686 17.1757 16.4 17.6 16.4C18.0243 16.4 18.4313 16.5686 18.7314 16.8686C19.0314 17.1687 19.2 17.5757 19.2 18C19.2 18.4243 19.0314 18.8313 18.7314 19.1314C18.4313 19.4314 18.0243 19.6 17.6 19.6C17.1757 19.6 16.7687 19.4314 16.4686 19.1314C16.1686 18.8313 16 18.4243 16 18ZM16 24.4C16 23.9757 16.1686 23.5687 16.4686 23.2686C16.7687 22.9686 17.1757 22.8 17.6 22.8C18.0243 22.8 18.4313 22.9686 18.7314 23.2686C19.0314 23.5687 19.2 23.9757 19.2 24.4C19.2 24.8243 19.0314 25.2313 18.7314 25.5314C18.4313 25.8314 18.0243 26 17.6 26C17.1757 26 16.7687 25.8314 16.4686 25.5314C16.1686 25.2313 16 24.8243 16 24.4Z"
                    fill="#333333"
                  />
                </svg>
              </div>

              {openModalId === folder._id && (
                <div
                  // ref={modalRef}
                  className="absolute top-full right-[60px] z-30 h-[104px] bg-white w-[126px] rounded-[5px] p-[10px]"
                  style={{
                    boxShadow: "0px 0px 5px 0px rgba(200, 201, 209, 0.65)",
                  }}
                >
                  <div className="">
                    <button
                      onClick={() => handleRenameButtonClick(folder._id)}
                      className="bg-white w-[106px] text-switchColor text-[16px] font-Poppins font-medium leading-5 flex items-center gap-1 h-10 pl-2 rounded hover:bg-activeDhcolor duration-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="17"
                        viewBox="0 0 17 17"
                        fill="none"
                      >
                        <path
                          d="M11.6465 3.36544L12.9117 2.09944C13.1755 1.83568 13.5332 1.6875 13.9062 1.6875C14.2793 1.6875 14.637 1.83568 14.9008 2.09944C15.1645 2.36319 15.3127 2.72093 15.3127 3.09394C15.3127 3.46695 15.1645 3.82468 14.9008 4.08844L6.9365 12.0527C6.53999 12.449 6.05102 12.7402 5.51375 12.9002L3.5 13.5002L4.1 11.4864C4.25996 10.9492 4.55123 10.4602 4.9475 10.0637L11.6465 3.36544ZM11.6465 3.36544L13.625 5.34394M12.5 10.5002V14.0627C12.5 14.5102 12.3222 14.9395 12.0057 15.2559C11.6893 15.5724 11.2601 15.7502 10.8125 15.7502H2.9375C2.48995 15.7502 2.06072 15.5724 1.74426 15.2559C1.42779 14.9395 1.25 14.5102 1.25 14.0627V6.18769C1.25 5.74013 1.42779 5.31091 1.74426 4.99444C2.06072 4.67798 2.48995 4.50019 2.9375 4.50019H6.5"
                          stroke="black"
                          stroke-opacity="0.6"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      Rename
                    </button>

                    {/* rename modal */}

                    {openRenameModalId === folder._id && (
                      <Dialog
                        open={isOpen}
                        onClose={() => setIsOpen(false)}
                        className=" relative !z-[9999999999]"
                      >
                        <div className="fixed inset-0 flex w-screen items-center justify-center">
                          <DialogPanel
                            style={{
                              boxShadow: "0px 0px 25px 0px rgba(0, 0, 0, 0.10)",
                            }}
                            className="md:w-[450px] w-full md:px-[50px] md:py-[50px] px-6 py-16 border-[1px] border-[#F6F6F6] bg-white rounded-[10px] relative"
                          >
                            <div className="">
                              <h1 className="text-secondaryColor text-[24px] text-center font-Poppins font-semibold">
                                কোম্পানী নাম পরিবর্তন
                              </h1>

                              <form
                                onSubmit={handleSubmit(onSubmit)}
                                defaultValue={folder?.folder}
                              >
                                <div className="flex flex-col w-full mt-[30px] relative">
                                  <h1 className="text-switchColor lg:text-[18px] text-[14px] font-Noto-Sans-Bengali font-semibold">
                                    কোম্পানী নাম
                                    <span className="text-[#F00C89] font-bold font-Noto-Sans-Bengali">
                                      *
                                    </span>
                                  </h1>

                                  <input
                                    {...register("folder")}
                                    type="text"
                                    className={`w-full h-[50px] rounded-[8px] border-[1px] ${
                                      errors.folder
                                        ? "border-[#F00C89]"
                                        : "border-[#333]"
                                    } bg-white text-secondaryColor outline-0 pl-5 md:text-[18px] text-[14px] font-Noto-Sans-Bengali font-normal`}
                                  />

                                  {errors?.folder && (
                                    <span className="text-[#F00C89] text-[18px] font-Noto-Sans-Bengali font-normal">
                                      {errors?.folder?.message}
                                    </span>
                                  )}

                                  <IoClose
                                    onClick={() => reset()}
                                    className="size-6 text-black cursor-pointer absolute lg:top-[40px] top-[35px] right-3"
                                  />
                                </div>

                                <button
                                  type="submit"
                                  className="bg-[#F00C89] rounded-[8px] h-[50px] w-full flex justify-center items-center gap-1 lg:mt-[30px] mt-4"
                                >
                                  <img className="w-6 h-6" src={icon} alt="" />
                                  <p className="text-[18px] font-Noto-Sans-Bengali text-white font-medium">
                                    সেভ করুন
                                  </p>
                                </button>
                              </form>

                              <div>
                                <IoMdClose
                                  onClick={() => setIsOpen(false)}
                                  className="size-6 text-black cursor-pointer absolute right-4 top-4"
                                />
                              </div>
                            </div>
                          </DialogPanel>
                        </div>
                      </Dialog>
                    )}
                    <button
                      onClick={() => handleDeleteFolder(folder?.industry)}
                      className="bg-white w-[106px] text-[#F00C89] text-[16px] font-Poppins font-medium leading-5 flex items-center pl-2 rounded gap-1 h-10 hover:bg-activeDhcolor duration-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                      >
                        <path
                          d="M11.055 6.75039L10.7955 13.5004M7.2045 13.5004L6.945 6.75039M14.421 4.34289C14.6775 4.38189 14.9325 4.42314 15.1875 4.46739M14.421 4.34289L13.62 14.7551C13.5873 15.1791 13.3958 15.575 13.0838 15.8638C12.7717 16.1526 12.3622 16.313 11.937 16.3129H6.063C5.63782 16.313 5.22827 16.1526 4.91623 15.8638C4.6042 15.575 4.41269 15.1791 4.38 14.7551L3.579 4.34289M14.421 4.34289C13.5554 4.21203 12.6853 4.11271 11.8125 4.04514M3.579 4.34289C3.3225 4.38114 3.0675 4.42239 2.8125 4.46664M3.579 4.34289C4.4446 4.21203 5.31468 4.11271 6.1875 4.04514M11.8125 4.04514V3.35814C11.8125 2.47314 11.13 1.73514 10.245 1.70739C9.41521 1.68087 8.58479 1.68087 7.755 1.70739C6.87 1.73514 6.1875 2.47389 6.1875 3.35814V4.04514M11.8125 4.04514C9.94029 3.90045 8.05971 3.90045 6.1875 4.04514"
                          stroke="#F00C89"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      Delete 
                    </button>
                   
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center gap-4 text-[24px] text-center text-switchColor font-Noto-Sans-Bengali font-medium  min-h-[600px]">
     <HiOutlineInformationCircle className="size-8" />

       <p>এখন পর্যন্ত কোন ফোল্ডার তৈরি করা হয়নি</p>
     </div>
      )}
    </div>
  );
};

export default AllCompanyOrderList;
