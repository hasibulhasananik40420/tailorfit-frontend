/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import MeasurementSettingsModal from "../../components/MeasurementSettingsModal/MeasurementSettingsModal";
import { useAppSelector } from "../../redux/features/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import {
  useDeleteMeasurementMutation,
  useGetMeasurementsQuery,
} from "../../redux/api/measurementApi";
import MeasurementSettingsEditModal from "../../components/MeasurementSettingsModal/MeasurementSettingsEditModal";
import Swal from "sweetalert2";
import Loader from "../../components/Loader/Loader";
import { HiOutlineInformationCircle } from "react-icons/hi";

export interface LooseItem {
  length: number;
  [index: number]: string;
}

export interface MeasurementItem {
  length: number;
  [index: number]: string;
}

export interface Style {
  category: string;
  subCategories: string[];
  _id: string;
}

export interface Measurement {
  _id: string;
  admin: string;
  createdAt: string;
  image: string;
  looseItems: LooseItem[];
  measurements: MeasurementItem[];
  name: string;
  styles: Style[];
  subCategories: string[];
  updatedAt: string;
  __v: number;
}

export interface ApiResponse {
  data: Measurement[];
}

const MeasurementSettings = () => {
  //mesurement modal
  const [isMeasurementModalOpen, setIsMeasurementModalOpen] =
    useState<boolean>(false);

  const handleOpenMeasurementModal = () => {
    setIsMeasurementModalOpen(true);
  };
  const handleCloseMeasurementModal = () => {
    setIsMeasurementModalOpen(false);
  };

  //edit a mesurement modal
  const [isMeasurementEditModalOpen, setIsMeasurementEditModalOpen] =
    useState<boolean>(false);

  const handleOpenMeasurementEditModal = () => {
    setIsMeasurementEditModalOpen(true);
  };
  const handleCloseMeasurementEditModal = () => {
    setIsMeasurementEditModalOpen(false);
  };

 

  const [openModalId, setOpenModalId] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null); // Ref to track button

  const handleButtonClick = (id: string) => {
    // Toggle modal based on the current state
    setOpenModalId(openModalId === id ? null : id);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;

    // If the click is outside the modal and not on the button, close the modal
    if (
      modalRef.current &&
      !modalRef.current.contains(target) &&
      buttonRef.current &&
      !buttonRef.current.contains(target)
    ) {
      setOpenModalId(null);
    }
  };

  useEffect(() => {
    // Add event listener only when modal is open
    if (openModalId) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Clean up to prevent memory leaks
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openModalId]); // Dependency on modal state

  // handle get  getMeasurements logic
  const [deleteMeasurement] = useDeleteMeasurementMutation();
  const currentData = useAppSelector(selectCurrentUser);
  const { data, isLoading } = useGetMeasurementsQuery(currentData?.id);
  //  console.log(data)

  const handleDelete = async (mesurementId: string) => {
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
        const res = await deleteMeasurement(mesurementId).unwrap();

        if (res?.success) {
          Swal.fire({
            icon: "success",
            title: res?.message,
            showConfirmButton: false,
            timer: 3000,
          });
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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="bg-white rounded-[10px] 2xl:p-[30px] lg:p-[15px] md:p-5 p-4 w-full min-h-[600px]">
        <div className="bg-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="lg:text-[24px] text-[15px] text-[#222943] font-bold font-Noto-Sans-Bengali">
                টেইলর সার্ভিসেস আইটেম
              </h2>
            </div>

            <div>
              <button
                onClick={handleOpenMeasurementModal}
                className="bg-[#F00C89] text-white md:w-[217px] w-[110px] h-[50px] rounded-md flex gap-2 justify-center items-center"
              >
                <FaPlus className="md:text-[18px] text-[14px] font-Noto-Sans-Bengali font-medium" />{" "}
                <span className="md:block hidden">আইটেম</span> যোগ করুন
              </button>

              <MeasurementSettingsModal
                isOpenModal={isMeasurementModalOpen}
                isCloseModal={handleCloseMeasurementModal}
              />
            </div>
          </div>

          {data?.data?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-[30px] mt-[30px]">
              {data?.data?.map((mesurement: Measurement) => (
                <div
                  key={mesurement?._id}
                  className="2xl:w-[347px] lg:w-full w-full h-[300px] rounded-[10px] border border-[#D9D9D9] relative"
                >
                  <img
                    className="w-full h-[200px] object-contain rounded-t-[10px]"
                    src={mesurement?.image}
                    alt=""
                  />
                    <h1 className="text-[#F00C89] text-[24px] font-Noto-Sans-Bengali font-bold px-5">
                      {mesurement?.name}
                    </h1>

                   
                    <div className="mt-[3px] flex gap-[10px] px-5">
                      {mesurement?.measurements
                        ?.slice(0, 3)
                        .map((measurementType: any) => (
                          <div className="w-[76px] h-[37px] rounded bg-[#F8F9FD] flex justify-center items-center">
                            <p className="text-[#333] text-[14px] font-Noto-Sans-Bengali font-normal">
                              {measurementType}
                            </p>
                          </div>
                        ))}

                    
                      
                    </div>
                 

                  <div
                        
                        ref={buttonRef}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleButtonClick(mesurement._id);
                        }}
                        className={`hover:bg-fillColor hover:rounded-md absolute right-2 top-4 ${
                          openModalId && " pointer-events-none cursor-pointer " 
                        }`}
                      >
                        <svg
                          className="cursor-pointer"
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

                      {openModalId === mesurement._id && (
                        <div
                          ref={modalRef}
                          className="absolute mt-5 top-4 right-12 h-[104px] bg-white w-[126px] rounded-[5px] p-[10px]"
                          style={{
                            boxShadow:
                              "0px 0px 5px 0px rgba(200, 201, 209, 0.65)",
                          }}
                        >
                          <div className="">
                            <div>
                              <button
                                onClick={handleOpenMeasurementEditModal}
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
                                Edit
                              </button>
                              <MeasurementSettingsEditModal
                                isOpenEditModal={isMeasurementEditModalOpen}
                                isCloseEditModal={
                                  handleCloseMeasurementEditModal
                                }
                                measurement={mesurement}
                              />
                            </div>

                            <button
                              onClick={() => handleDelete(mesurement?._id)}
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

         <p>এখন পর্যন্ত কোন মেজারমেন্ট তৈরি করা হয়নি</p>
        </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeasurementSettings;
