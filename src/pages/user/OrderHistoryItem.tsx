/* eslint-disable @typescript-eslint/no-explicit-any */
import { HiDotsVertical, HiOutlinePlus } from "react-icons/hi";
import {
  TDropDownStyle,
  TIndividualOrder,
  TIndividualOrderItem,
  TStyle,
} from "../../redux/api/individualOrderApi";
// import DatePicker from "react-datepicker";
import { LuMinus } from "react-icons/lu";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import ActionButtonModal from "../../components/ui/ActionButtonModal/ActionButtonModal";
import { useState } from "react";

import DatePicker from "react-datepicker";

type OrderHistoryItemProps = {
  singleOrderData: TIndividualOrder;
};

const OrderHistoryItem: React.FC<OrderHistoryItemProps> = ({
  singleOrderData,
}) => {
  const [actionModalOpen, setactionModalOpen] = useState<{
    id: string | null;
    index: number | null;
  }>({ id: null, index: null });

  const toggleActionModal = (orderId: string) => {
    const orderIndex = 1;
    setactionModalOpen(
      actionModalOpen.id === orderId
        ? { id: null, index: null }
        : { id: orderId, index: orderIndex }
    );
  };

  return (
    <div className="">
      <div className="2xl:p-[20px]  lg:p-4 p-3">
        <div>
          <div className={`md:flex justify-between items-center `}>
            <div className="md:flex items-center gap-4">
              <h1 className="2xl:text-[20px] md:text-[16px] text-[14px] text-secondaryColor font-Noto-Sans-Bengali font-semibold">
                #{singleOrderData?.orderId} - অর্ডার ডিটেলস
              </h1>

              <div className="h-[21px] w-[1px] bg-secondaryColor md:block hidden"></div>

              <h1
                className="flex gap-[8px] items-center 2xl:text-[20px] md:text-[16px] text-[14px]  font-Noto-Sans-Bengali font-semibold mt-2 md:mt-0"
                style={{ color: "rgba(0, 0, 0, 0.60)" }}
              >
                অর্ডার স্ট্যাটাস:
                <div
                  className="w-[10px] h-[10px] rounded-full"
                  style={{
                    backgroundColor: singleOrderData?.orderBGColor,
                  }}
                ></div>
                <p className="text-black">{singleOrderData?.orderStatus}</p>
              </h1>

            </div>
            <div className="flex justify-between items-center 2xl:gap-[15px] gap-[10px] mt-2 md:mt-0">
              

              {singleOrderData?.industry ? (
                <Link
                  to={`/admin/duplicate-industry-order/${singleOrderData?._id}`}
                >
                  <button
                    onClick={() => {}}
                    className="md:px-3 px-[6px] md:py-3 py-2 bg-primaryColor rounded-md flex justify-center items-center gap-2 text-white 2xl:text-[18px] md:text-[16px] text-[14px] font-Poppins font-medium leading-6"
                  >
                    <HiOutlinePlus className="size-6" />
                    রি-অর্ডার
                  </button>
                </Link>
              ) : (
                <Link to={`/admin/duplicate-order/${singleOrderData?._id}`}>
                  <button
                    onClick={() => {
                      //  console.log(id)
                    }}
                    className="md:px-3 px-[6px] md:py-3 py-2 bg-primaryColor rounded-md flex justify-center items-center gap-2 text-white 2xl:text-[20px] md:text-[16px] text-[14px] font-Poppins font-medium leading-6"
                  >
                    <HiOutlinePlus className="size-6" />
                    রি-অর্ডার
                  </button>
                </Link>
              )}

              <div className="px-[9.50px] lg:px-[13px] lg:py-[13px] py-[9.50px] relative rounded-[6px] border border-[#BCBEC6] bg-[#F6F6F6] flex justify-center items-center cursor-pointer">
                <HiDotsVertical
                  onClick={() =>
                    toggleActionModal(singleOrderData?._id as string)
                  }
                  className="size-5 text-[#333333]"
                />
                {actionModalOpen.id === singleOrderData?._id && (
                  <div className="absolute top-0  right-0 z-20">
                    <ActionButtonModal
                      isOpen={actionModalOpen.id === singleOrderData?._id}
                      setIsOpen={() =>
                        setactionModalOpen({
                          id: null,
                          index: null,
                        })
                      }
                      id={singleOrderData?._id ?? ""}
                      order={singleOrderData}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>


        <div className="md:flex items-center gap-4 mt-2">
          <div
            className="flex gap-[2px] items-center 2xl:text-[18px] md:text-[16px] text-[14px]  font-Noto-Sans-Bengali font-semibold mt-4 md:mt-0"
            style={{ color: "rgba(0, 0, 0, 0.60)" }}
          >
            <p>অর্ডার ডেট:</p>

            <p className="text-black">
              <DatePicker
                readOnly
                selected={
                  singleOrderData?.orderDate
                    ? new Date(singleOrderData?.orderDate)
                    : null
                }
                dateFormat="dd-MM-yyyy"
                className="border-0 outline-none max-w-24 text-end font-normal bg-white"
                calendarClassName="custom-calendar-class"
              />
            </p>
          </div>
          <div className="h-[21px] w-[1px] bg-secondaryColor md:block hidden"></div>
          <div
            className="flex gap-[2px] items-center 2xl:text-[18px] md:text-[16px] text-[14px]  font-Noto-Sans-Bengali font-semibold mt-2 md:mt-0"
            style={{ color: "rgba(0, 0, 0, 0.60)" }}
          >
            <p>ট্রায়াল ডেট:</p>

            <p className="text-black">
              <DatePicker
                readOnly
                selected={
                  singleOrderData?.tryerDate
                    ? new Date(singleOrderData?.tryerDate)
                    : null
                }
                dateFormat="dd-MM-yyyy"
                className="border-0 outline-none max-w-24 text-end font-normal bg-white"
                calendarClassName="custom-calendar-class"
              />
            </p>
          </div>
          <div className="h-[21px] w-[1px] bg-secondaryColor md:block hidden"></div>
          <div
            className="flex gap-[2px] items-center 2xl:text-[18px] md:text-[16px] text-[14px]  font-Noto-Sans-Bengali font-semibold mt-2 md:mt-0"
            style={{ color: "rgba(0, 0, 0, 0.60)" }}
          >
            <p>ডেলিভারি ডেট:</p>

            <p className="text-black">
              <DatePicker
                readOnly
                selected={
                  singleOrderData?.deliveryDate
                    ? new Date(singleOrderData?.deliveryDate)
                    : null
                }
                dateFormat="dd-MM-yyyy"
                className="border-0 outline-none max-w-24 text-end font-normal bg-white"
                calendarClassName="custom-calendar-class"
              />
            </p>
          </div>
        </div>
      </div>
      <div className="border-b border-[#BCBEC6]"></div>
      <div className=" 2xl:p-[20px] 2xl:pt-0 lg:pt-0 pt-0 lg:p-5 p-4">
        {singleOrderData?.item?.map(
          (form: TIndividualOrderItem, fromIndex: number) => (
            <div
              key={fromIndex}
              className="border border-[#BCBEC6] rounded-lg  bg-white my-4 "
            >
              <div className="flex flex-col justify-between">
                <div className=" ">
                  <div className="md:flex gap-[40px] p-5 ">
                    <div className="flex items-center gap-[20px]">
                      <h1 className="text-switchColor 2xl:text-[18px] md:text-[16px] text-[14px] font-Noto-Sans-Bengali font-semibold mb-[10px] lg:mb-0">
                        ক্যাটাগরি
                      </h1>
                      <div
                        className={`2xl:w-[200px] lg:w-[200px] w-full  rounded-[8px] border-[1px]  outline-0 md:text-[18px] text-[14px] font-Poppins font-normal flex items-center justify-between cursor-pointer border-secondaryColor`}
                      >
                        <span className="py-3 px-4 bg-[#F6F6F6] rounded-lg w-full">
                          {form.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-5 mt-2 md:mt-0">
                      <h1 className="text-switchColor lg:text-[18px] text-[14px] font-Noto-Sans-Bengali font-semibold mb-[0px] lg:mb-0 ">
                        সংখ্যা
                      </h1>

                      <div className="flex items-center gap-5">
                        <span
                          //   onClick={() => handleDecrement(fromIndex)}
                          className="size-6 rounded-full bg-[#BCBEC6] flex justify-center items-center cursor-pointer hover:bg-primaryColor duration-300"
                        >
                          <LuMinus className="text-white" />
                        </span>
                        <span className=" text-[24px] w-4 outline-none text-switchColor font-Poppins font-semibold">
                          {form.quantity}
                        </span>
                        <span className="size-6 rounded-full bg-[#BCBEC6] flex justify-center items-center cursor-pointer hover:bg-primaryColor duration-300">
                          <FiPlus className="text-white size-4" />
                          <input
                            className="hidden text-[24px] w-4 outline-none text-switchColor font-Poppins font-semibold"
                            type="text"
                            readOnly
                            value={form.quantity}
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="border "></div>

                  <div className=" bg-[#F9FAFE] m-5 ">
                    <div className="bg-white w-full rounded-l-[10px]">
                      <h2 className="2xl:text-[18px] md:text-[18px] text-[14px] text-[#333] font-semibold font-Noto-Sans-Bengali mb-2">
                        পরিমাপের নাম
                      </h2>

                      <div className="flex flex-wrap  ">
                        <>
                          {form?.measurement.length >= 1 &&
                            form?.measurement?.map(
                              (
                                measurementItem: {
                                  label: any;
                                  text: any;
                                },
                                measurementIdex: number
                              ) => {
                                return (
                                  <div
                                    key={measurementIdex}
                                    className="flex flex-col"
                                  >
                                    <span
                                      className="2xl:text-[16px] md:text-[16px] text-[14px] text-[#000]"
                                      style={{
                                        fontFamily: "Noto Sans Bengali",
                                      }}
                                    >
                                      {measurementItem.label}{" "}
                                      <span className="text-20px font-bold">
                                        :
                                      </span>{" "}
                                      <span>
                                        {measurementItem.text
                                          ? measurementItem.text
                                          : "___"}
                                        {measurementIdex <
                                          form?.measurement.length - 1 && (
                                          <span className="pr-2">, </span>
                                        )}
                                      </span>
                                    </span>
                                  </div>
                                );
                              }
                            )}
                        </>
                      </div>

                      {form?.lugeSize.length >= 1 && (
                        <div className="mt-5">
                          <h2 className="2xl:text-[18px] md:text-[18px] text-[14px] text-secondaryColor font-semibold font-Noto-Sans-Bengali  mb-2">
                            লুজের মাপ (ঐচ্ছিক)
                          </h2>

                          <div className="flex flex-wrap  ">
                            <>
                              {form?.lugeSize?.map(
                                (
                                  measurementItem: {
                                    label: any;
                                    text: any;
                                  },
                                  measurementIdex: number
                                ) => {
                                  return (
                                    <div
                                      key={measurementIdex}
                                      className="flex flex-col"
                                    >
                                      <span className="text-black font-[500] 2xl:text-[16px] md:text-[16px] text-[14px] font-Noto-Sans-Bengali "></span>
                                      <span className="2xl:text-[16px] md:text-[16px] text-[14px] text-[#000] font-Noto-Sans-Bengali">
                                        {measurementItem.label}{" "}
                                        <span className="text-20px font-bold">
                                          :
                                        </span>{" "}
                                        <span>
                                          {measurementItem.text
                                            ? measurementItem.text
                                            : "___"}
                                          {measurementIdex <
                                            form?.measurement.length - 1 && (
                                            <span className="pr-2">, </span>
                                          )}
                                        </span>
                                      </span>
                                    </div>
                                  );
                                }
                              )}
                            </>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="border"></div>

                  <div className="flex justify-between p-5">
                    <div className="">
                      <h2
                        className="2xl:text-[18px] md:text-[18px] text-[14px] text-secondaryColor font-semibold font-Noto-Sans-Bengali  mb-2"
                        
                      >
                        ডিজাইন স্টাইল
                      </h2>
                      <p className=" ">
                        {form?.dropDownStyle?.map(
                          (
                            dropDownStyle: TDropDownStyle,
                            dropDownIndex: number
                          ) => {
                            return (
                              dropDownStyle?.item.find((item) => item.isActive)
                                ?.label && (
                                <span
                                  key={dropDownIndex}
                                  className="2xl:text-[16px] md:text-[16px] text-[14px] text-[#000] font-Noto-Sans-Bengali px-2"
                                 
                                >
                                  #{" "}
                                  <span className="">
                                    {
                                      dropDownStyle?.item.find(
                                        (item) => item.isActive
                                      )?.label
                                    }
                                  </span>
                                </span>
                              )
                            );
                          }
                        )}
                        {form?.style?.map((styleItem: TStyle) => {
                          return (
                            styleItem.isActive === true && (
                              <span
                                className="text-[18px] text-[#000] px-2"
                                style={{ fontFamily: "Noto Sans Bengali" }}
                              >
                                # <span className="2xl:text-[16px] md:text-[16px] text-[14px] text-[#000] font-Noto-Sans-Bengali"> {styleItem.text}</span>
                              </span>
                            )
                          );
                        })}
                      </p>
                      <p className=" mt-2 2xl:text-[16px] md:text-[16px] text-[14px] text-[#000] font-Noto-Sans-Bengali">
                        নোট: <span className="font-Poppins">{form.note}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};
export default OrderHistoryItem;
