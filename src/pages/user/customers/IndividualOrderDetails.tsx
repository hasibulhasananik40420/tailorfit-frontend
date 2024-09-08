/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { IoIosArrowDown } from "react-icons/io";
import { FiPlus } from "react-icons/fi";
import { LuMinus } from "react-icons/lu";
import DatePicker from "react-datepicker";
import { GrFormCheckmark } from "react-icons/gr";

import {
  TDropDownStyle,
  TIndividualOrder,
  TIndividualOrderItem,
  TStyle,
  useEditIndividualOrderMutation,
} from "../../../redux/api/individualOrderApi";
import Swal from "sweetalert2";
import { HiDotsVertical } from "react-icons/hi";
import ActionButtonModal from "../../../components/ui/ActionButtonModal/ActionButtonModal";
import { useNavigate } from "react-router-dom";

interface Status {
  id: number;
  text: string;
  color: string;
}

const status: Status[] = [
  { id: 1, text: "নতুন অর্ডার", color: "#4CBF41" },
  { id: 2, text: "চলমান অর্ডার", color: "#3C8DCF" },
  { id: 3, text: "ডেলিভারির জন্য প্রস্তুত", color: "#2BC8A2" },
  { id: 4, text: "ডেলিভারি সম্পন্ন", color: "#F17098" },
  { id: 5, text: "ডেট অভার", color: "#8C7FDD" },
  { id: 6, text: "ডেলিভারির ২ দিন বাকি", color: "#E8A54E" },
  { id: 7, text: "আরজেন্ট", color: "#EAD309" },
];

const IndividualOrderDetails = ({
  singleOrder,
}: {
  singleOrder: TIndividualOrder;
}) => {
  const navigate = useNavigate();

  

  if (singleOrder == null) {
    navigate(`/admin/dashboard`);
    return <>no found</>;
  }

  const [editIndividualOrder] = useEditIndividualOrderMutation();

  const [visibility, setVisibility] = useState<boolean[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<{
    [key: string]: string;
  }>({});
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const [actionModalOpen, setActionModalOpen] = useState<{
    [key: string]: boolean;
  }>({});

  const from = {
    item: singleOrder.item
      ? singleOrder?.item?.map((item: TIndividualOrderItem) => ({
          category: item?.category || "",
          image: item?.image,
          measurement:
            item?.measurement && item?.measurement?.length
              ? item?.measurement
              : [],
          lugeSize:
            item?.lugeSize && item?.lugeSize?.length ? item?.lugeSize : [],
          style: item.style && item.style.length ? item.style : [],
          dropDownStyle: item?.dropDownStyle?.length ? item?.dropDownStyle : [],
          quantity: item?.quantity || 1,
          note: item?.note || "",
        }))
      : [],
  };

  const [orderDate, setOrderDate] = useState<Date | null>(
    singleOrder?.tryerDate ? new Date(singleOrder.tryerDate) : null
  );

  const [tryerDate, setTryerDate] = useState<Date | null>(
    singleOrder?.tryerDate ? new Date(singleOrder.tryerDate) : null
  );
  const [deliveryDate, setDeliveryDate] = useState<Date | null>(
    singleOrder?.deliveryDate ? new Date(singleOrder.deliveryDate) : null
  );

  const toggleVisibility = (fromIndex: number) => {
    setVisibility((prevVisibility) => {
      const newVisibility = [...prevVisibility];
      newVisibility[fromIndex] = !newVisibility[fromIndex];
      return newVisibility;
    });
  };

  const handleStatusClick = (orderId: string) => {
    setDropdownOpen(dropdownOpen === orderId ? null : orderId);
  };

  const handleStatusSelect = async (orderId: string, status: Status) => {
    const info = {
      _id: orderId,
      orderStatus: status.text,
      orderBGColor: status.color,
    };

    try {
      const res = await editIndividualOrder(info).unwrap();

      if (res?.success) {
        Swal.fire({
          icon: "success",
          title: res?.message,
          showConfirmButton: false,
          timer: 3000,
        });
      }
    } catch (err) {
      // console.log(err)
      const error = err as { data: { message: string } };

      Swal.fire({
        icon: "error",
        title: error?.data?.message,
      });
    }

    setSelectedStatus(() => ({ [orderId]: status.text }));
    setDropdownOpen(null);
  };

  const toggleActionModal = (orderId: string) => {
    // setactionModalOpen(
    //   actionModalOpen?.id === orderId
    //     ? { id: null, index: null }
    //     : { id: orderId, index: orderId }
    // );

    setActionModalOpen((prevState) => ({
      ...prevState,
      [orderId]: actionModalOpen[orderId] ? false : true,
    }));
  };
  

  return (
    <div className="no-select bg-white rounded-[10px]">
      <div className="lg:flex justify-between items-center 2xl:pt-[30px] pt-5 lg:px-4 px-3">
        <h1 className="text-[#222943] md:text-[24px] text-[14px] font-Noto-Sans-Bengali font-bold">
          ব্যক্তির তথ্য
        </h1>

        <div className="flex gap-6 items-center">
          <h1 className="text-secondaryColor font-Poppins md:text-[20px] text-[14px] font-semibold">
            <span className="text-switchColor font-Noto-Sans-Bengali font-semibold">
              অর্ডার নাম্বার:
            </span>{" "}
            #{singleOrder?.orderId}
          </h1>

          <h1 className="text-switchColor lg:text-[18px] text-[14px] font-Noto-Sans-Bengali font-semibold mb-[10px] lg:mb-0 border rounded-md">
            <th
              onClick={() => handleStatusClick(singleOrder?.orderId as string)}
              scope="row"
              className="2xl:px-6 2xl:py-3 px-3 py-2 font-Poppins font-normal text-secondaryColor whitespace-nowrap 2xl:text-[18px] 2large:text-[16px] lg:text-[14px] 2mid75:text-[16px] 2makbook:text-[10px] text-[16px] w-[200px] cursor-pointer"
            >
              <div className="flex items-center justify-between relative">
                <div className="flex items-center gap-2 ">
                  <span
                    className="w-[10px] h-[10px] rounded-full"
                    style={{
                      backgroundColor: singleOrder?.orderBGColor,
                    }}
                  ></span>
                  <p>
                    {
                      selectedStatus[singleOrder?.orderId as string]
                        ? selectedStatus[singleOrder?.orderId as string]
                        : singleOrder?.orderStatus
                      //
                    }
                  </p>
                </div>
                <IoIosArrowDown
                  onClick={() =>
                    handleStatusClick(singleOrder?.orderId as string)
                  }
                  className="size-5 text-secondaryColor cursor-pointer"
                />
                {dropdownOpen === singleOrder?.orderId && (
                  <div
                    // ref={dropdownRef}
                    onClick={(e) => e.stopPropagation()}
                    className="absolute mt-2 w-[224px] bg-white rounded-[8px] top-10 !z-[9999] "
                    style={{
                      boxShadow: "0px 0px 25px 0px rgba(0, 0, 0, 0.10)",
                    }}
                  >
                    {status.map((status, id: number) => (
                      <div
                        key={id}
                        className="flex items-center gap-2 m-[10px] h-[31px] cursor-pointer hover:bg-activeDhcolor pl-[10px] rounded"
                        onClick={() => {
                          if (singleOrder?._id) {
                            handleStatusSelect(singleOrder?._id, status);
                          }
                        }}
                      >
                        <span
                          className="w-[10px] h-[10px] rounded-full"
                          style={{ backgroundColor: status.color }}
                        ></span>
                        <p>{status.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </th>
          </h1>

          <div className="w-[37px] relative h-[37px] rounded-[6px] bg-[#F6F6F6] flex justify-center items-center cursor-pointer">
            <HiDotsVertical
              onClick={() => toggleActionModal(singleOrder?.orderId as string)}
              className="size-5 text-[#333333]"
            />

            {actionModalOpen[singleOrder?.orderId as string] && (
              <div className="absolute top-10 right-4 z-20 ">
                <ActionButtonModal
                  isOpen={
                    actionModalOpen[singleOrder?.orderId as string] || false
                  }
                  setIsOpen={() =>
                    setActionModalOpen((prev) => ({
                      ...prev,
                      [singleOrder?.orderId as string]: false,
                    }))
                  }
                  id={singleOrder?._id ?? ""}
                  order={singleOrder}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full h-[1px] bg-secondaryColor 2xl:mt-[30px] mt-5"></div>
      <form className=" lg:p-[15px] md:p-5 p-4 w-full">
        <div>
          <div className="lg:flex lg:gap-5 justify-between mt-5">
            <div className="lg:flex lg:flex-col lg:gap-5  gap-[10px]">
              <div className="lg:flex lg:flex-col lg:gap-5 flex  gap-[10px] ">
                <div className="lg:flex items-center justify-between 2xl:gap-[30px] gap-5 2xl:w-[560px] lg:w-[520px] w-full ">
                  <h1 className="text-switchColor lg:text-[18px] text-[14px] font-Noto-Sans-Bengali font-semibold mb-[10px] lg:mb-0 ">
                    কাস্টমারের নাম
                  </h1>

                  <div className="">
                    <input
                      readOnly
                      className=" 2xl:w-[400px] lg:w-[370px] w-full h-[51px] rounded-[8px] border-[1px] border-secondaryColor bg-white dark:bg-white text-secondaryColor dark:text-secondaryColor outline-0 px-5 md:text-[18px] text-[14px] font-Poppins font-normal "
                      defaultValue={singleOrder?.customerName}
                      type="text"
                    />
                  </div>
                </div>

                <div className="lg:flex items-center justify-between 2xl:gap-[30px] gap-5 2xl:w-[560px] lg:w-[520px] w-full ">
                  <h1 className="text-switchColor lg:text-[18px] text-[14px] font-Noto-Sans-Bengali font-semibold mb-[10px] lg:mb-0 ">
                    ফোন নাম্বার
                  </h1>

                  <input
                    readOnly
                    className="2xl:w-[400px] lg:w-[370px] w-full h-[51px] rounded-[8px] border-[1px] border-secondaryColor bg-white dark:bg-white text-secondaryColor dark:text-secondaryColor outline-0 px-5 md:text-[18px] text-[14px] font-Poppins font-normal "
                    type="text"
                    defaultValue={singleOrder?.phoneNumber}
                  />
                </div>
              </div>

              <div className="lg:flex items-center justify-between 2xl:gap-[30px] gap-5 2xl:w-[560px] lg:w-[520px] w-full mt-4 lg:mt-0">
                <h1 className="text-switchColor lg:text-[18px] text-[14px] font-Noto-Sans-Bengali font-semibold mb-[10px] lg:mb-0 ">
                  ঠিকানা
                </h1>

                <input
                  className="2xl:w-[400px] lg:w-[370px] w-full h-[51px] rounded-[8px] border-[1px] border-secondaryColor bg-white dark:bg-white text-secondaryColor dark:text-secondaryColor outline-0 px-5 md:text-[18px] text-[14px] font-Poppins font-normal "
                  type="text"
                  readOnly
                  defaultValue={singleOrder?.address}
                />
              </div>
            </div>

            <div className="w-full h-[1px] bg-secondaryColor 2xl:mt-[30px] mt-5 lg:hidden block"></div>

            <div className="lg:flex lg:flex-col lg:gap-5  gap-[10px] mt-5 lg:mt-0 ">
              <div className="flex gap-[10px] lg:flex lg:flex-col lg:gap-5 w-full">
                {/* input 1 */}

                <div className="lg:flex items-center justify-between 2xl:gap-[30px] gap-5 2xl:w-[407px] lg:w-[370px] w-full">
                  <h1 className="text-switchColor lg:text-[18px] text-[14px] font-Noto-Sans-Bengali font-semibold mb-[10px] lg:mb-0">
                    অর্ডার ডেট
                  </h1>
                  <div className="relative">
                    <DatePicker
                      readOnly
                      selected={orderDate}
                      onChange={(date) => setOrderDate(date)}
                      placeholderText="Select a date"
                      className="2xl:w-[250px] cursor-pointer lg:w-[220px] w-full h-[50px] text-secondaryColor 2xl:text-[18px] lg:text-[16px] text-[14px] border-[1px] border-secondaryColor rounded-[8px] bg-white outline-0 pl-4 font-Poppins placeholder:text-secondaryColor"
                      dateFormat="dd-MM-yyyy"
                      calendarClassName="custom-calendar-class"
                    />
                  </div>
                </div>

                <div className="lg:flex items-center justify-between 2xl:gap-[30px] gap-5 2xl:w-[407px] lg:w-[370px] w-full">
                  <h1 className="text-switchColor lg:text-[18px] text-[14px] font-Noto-Sans-Bengali font-semibold mb-[10px] lg:mb-0">
                    ট্রায়াল ডেট
                  </h1>
                  <div className="relative">
                    <DatePicker
                      readOnly
                      selected={tryerDate}
                      onChange={(date) => setTryerDate(date)}
                      placeholderText="Select a date"
                      className="2xl:w-[250px] cursor-pointer lg:w-[220px] w-full h-[50px] text-secondaryColor 2xl:text-[18px] lg:text-[16px] text-[14px] border-[1px] border-secondaryColor rounded-[8px] bg-white outline-0 pl-4 font-Poppins placeholder:text-secondaryColor"
                      dateFormat="dd-MM-yyyy"
                      calendarClassName="custom-calendar-class"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:flex items-center justify-between 2xl:gap-[30px] gap-5 2xl:w-[407px] lg:w-[370px] w-full mt-4 lg:mt-0">
                <h1 className="text-switchColor lg:text-[18px] text-[14px] font-Noto-Sans-Bengali font-semibold mb-[10px] lg:mb-0">
                  ডেলিভারি ডেট
                </h1>
                <div className="relative">
                  <DatePicker
                    readOnly
                    selected={deliveryDate}
                    onChange={(date) => setDeliveryDate(date)}
                    placeholderText="Select a date"
                    className="2xl:w-[250px] cursor-pointer lg:w-[220px] w-full border-secondaryColor h-[50px] text-secondaryColor 2xl:text-[18px] lg:text-[16px] text-[14px] border-[1px]  rounded-[8px] bg-white outline-0 pl-4 font-Poppins placeholder:text-secondaryColor"
                    dateFormat="dd-MM-yyyy"
                    calendarClassName="custom-calendar-class"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-[1px] bg-secondaryColor 2xl:mt-[30px] mt-5 lg:block hidden"></div>
          <div className="w-full h-[1px] bg-secondaryColor 2xl:mt-[30px] mt-5 lg:hidden block"></div>
        </div>

        <div className="2xl:pt-[30px] lg:pt-[15px] pt-3 relative">
          <h1 className="text-[#222943] lg:text-[24px] text-[18px] font-Noto-Sans-Bengali font-bold">
            পরিমাপ
          </h1>

          {from?.item?.map((form: TIndividualOrderItem, fromIndex: number) => (
            <>
              <div
                key={fromIndex}
                className="2xl:mt-[30px]  lg:mt-[15px] mt-3 border border-secondaryColor !rounded-[10px] "
              >
                <div className="flex justify-between items-center lg:p-5 p-3">
                  <div className="lg:flex items-center lg:gap-[50px] gap-3">
                    <div className="lg:flex items-center gap-5 relative lg:w-[340px] w-full">
                      <h1 className="text-switchColor lg:text-[18px] text-[14px] font-Noto-Sans-Bengali font-semibold mb-[10px] lg:mb-0">
                        ক্যাটাগরি
                      </h1>

                      <div className="relative w-full">
                        <input
                          className="2xl:w-[250px] lg:w-[250px] w-full bg-white border-secondaryColor dark:bg-white  h-[51px] pl-5 lg:text-[18px] md:text-[16px] text-[16px] font-Poppins font-normal outline-none rounded-[8px] text-secondaryColor placeholder:text-switchColor border "
                          type="text"
                          readOnly
                          value={form.category}
                          placeholder="Select a category"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-5 mt-1 lg:mt-0">
                        <h1 className="text-switchColor lg:text-[18px] text-[14px] font-Noto-Sans-Bengali font-semibold mb-[10px] lg:mb-0 ">
                          সংখ্যা
                        </h1>

                        <div className="flex items-center gap-5">
                          <span className="size-6 rounded-full bg-[#BCBEC6] flex justify-center items-center cursor-pointer hover:bg-primaryColor duration-300">
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
                  </div>

                  <div className="">
                    <div className="flex md:gap-5 gap-2 items-center">
                      <div className="">
                        <IoIosArrowDown
                          onClick={() => toggleVisibility(fromIndex)}
                          className={`md:size-6 size-6 text-black cursor-pointer transition-transform duration-300 ease-in-out ${
                            visibility[fromIndex] ? "rotate-180" : "rotate-0"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {!visibility[fromIndex] && (
                  <>
                    <>
                      <div className=" lg:flex bg-[#F9FAFE] rounded-r-[10px] rounded-l-[10px] border-secondaryColor border-t rounded-t-none ">
                        {/* part 1 */}
                        <div className="bg-white 2xl:w-[740px] 2mid75:w-full lg:w-full w-full rounded-l-[10px]">
                          <h1 className="text-[#222943] lg:text-[20px] text-[16px] font-Noto-Sans-Bengali font-bold 2xl:pl-5 pl-3 2xl:pt-5 pt-3">
                            পরিমাপের নাম
                          </h1>

                          <div className="lg:mt-5 mt-3 flex flex-wrap 2xl:gap-5 lg:gap-3 gap-3 2xl:pl-5 pl-3">
                            <>
                              {form?.measurement?.map(
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
                                      <label className="text-black 2xl:text-[18px] lg:text-[16px] text-[14px] font-Noto-Sans-Bengali font-medium">
                                        {measurementItem.label}
                                      </label>
                                      <input
                                        className="bg-white text-secondaryColor 2xl:w-[100px] lg:w-[70px] w-[60px] h-[40px] rounded-[8px] border-[1px]  border-secondaryColor  outline-0 pl-3 font-bold"
                                        type="text"
                                        name=""
                                        defaultValue={measurementItem.text}
                                        ref={(el) =>
                                          (inputRefs.current[measurementIdex] =
                                            el)
                                        }
                                        id=""
                                      />
                                    </div>
                                  );
                                }
                              )}
                            </>
                          </div>

                          {form?.lugeSize.length >= 1 && (
                            <>
                              <div className="w-full h-[0.4px] bg-secondaryColor lg:my-5 my-3"></div>
                              <h1 className="text-[#222943] lg:text-[16px] text-[14px] font-Noto-Sans-Bengali font-bold 2xl:pl-5 pl-3 ">
                                লুজের মাপ (ঐচ্ছিক)
                              </h1>
                              <div className="lg:mt-5 mt-3 flex flex-wrap 2xl:gap-5 lg:gap-3 gap-3 2xl:pl-5 pl-3">
                                <>
                                  {form?.lugeSize?.map(
                                    (
                                      lugeItem: {
                                        label: any;
                                        text: any;
                                      },
                                      lugeIdex: number
                                    ) => {
                                      return (
                                        <div
                                          key={lugeIdex}
                                          className="flex flex-col"
                                        >
                                          <label className="text-black 2xl:text-[18px] lg:text-[16px] text-[14px] font-Noto-Sans-Bengali font-medium">
                                            {lugeItem.label}
                                          </label>
                                          <input
                                            className="bg-white text-secondaryColor 2xl:w-[100px] lg:w-[70px] w-[60px] h-[40px] rounded-[8px] border-[1px] border-secondaryColor outline-0 pl-3 font-bold"
                                            type="text"
                                            name=""
                                            defaultValue={lugeItem.text}
                                            id=""
                                          />
                                        </div>
                                      );
                                    }
                                  )}
                                </>
                              </div>
                            </>
                          )}

                          {form?.image && (
                            <div className="lg:mt-5 relative w-full mt-3 flex flex-wrap 2xl:gap-5 lg:gap-3 gap-3 2xl:pl-5 pl-3 h-[160px]">
                              <div className="absolute right-2 -bottom-3">
                                <img
                                  className="opacity-10 2xl:w-[252px] lg:w-[220px] w-[106px] 2xl:h-[282px] lg:h-[230px] h-[120px] mr-3 mt-[-190px] ml-[190px] md:mt-0 md:ml-0"
                                  src={form?.image as string}
                                  alt=""
                                />
                                <input type="hidden" value={form?.image} />
                              </div>
                            </div>
                          )}
                        </div>
                        {/* part 2 */}

                        <div className="bg-[#F9FAFE] 2xl:w-[745px] 2mid75:w-full lg:w-full w-full border-secondaryColor lg:border-l rounded-r-[10px] rounded-l-[10px] lg:rounded-l-none">
                          <div className="2xl:p-5 p-3">
                            <h1 className="text-[#222943] lg:text-[20px] text-[16px] font-Noto-Sans-Bengali font-bold">
                              ডিজাইন স্টাইল
                            </h1>

                             <div>
                             <div className="lg:mt-5 mt-3 lg:flex flex-row-reverse gap-5 ">
                              <div className="flex flex-col lg:gap-2 2large:gap-2 gap-[12px]">
                                <div>
                                  <>
                                    <div className="">
                                      <div className="relative 2xl:w-[340px] 2large:w-[270px] lg:w-[230px] 2makbook:w-[200px] w-full">
                                        <div className="flex flex-col gap-2 text-secondaryColor font-Noto-Sans-Bengali font-medium">
                                          {form?.style?.map(
                                            (
                                              styleItem: TStyle,
                                              styleIdex: number
                                            ) => {
                                              return (
                                                <label
                                                  key={styleIdex}
                                                  className={`flex items-center rounded-lg cursor-pointer ${
                                                    styleItem.isActive === true
                                                      ? " text-primaryColor "
                                                      : ""
                                                  }`}
                                                >
                                                  <input
                                                    type="checkbox"
                                                    className="hidden form-checkbox h-5 w-5 text-blue-100"
                                                  />

                                                  <div className="flex items-center gap-2">
                                                    <div
                                                      className={`lg:w-6 lg:h-6 md:w-6 md:h-6 w-[20px] h-[20px] rounded-[4px] flex items-center justify-center cursor-pointer relative
                                                       ${
                                                         styleItem.isActive ===
                                                         true
                                                           ? "bg-[#F00C89] border-0"
                                                           : "border-[1px] border-secondaryColor"
                                                       }
                                                       `}
                                                    >
                                                      {styleItem.isActive ===
                                                        true && (
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                          <GrFormCheckmark
                                                            className={`md:size-6 size-5 text-white`}
                                                          />
                                                        </div>
                                                      )}
                                                    </div>
                                                  </div>

                                                  <span
                                                    className={`ml-4 `}
                                                  >
                                                    {/* ${
                                             checkedItems.includes(styleIndex)
                                               ? "text-pink-500"
                                               : "text-gray-700"
                                           } */}
                                                    {styleItem.text}
                                                  </span>
                                                </label>
                                              );
                                            }
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                </div>
                              </div>

                              {/* dropdown style 2nd pard */}

                              <div className=" mt-[30px] lg:mt-0">
                                <div className="flex flex-col !lg:gap-5 !gap-[10px] 2xl:w-[340px] 2large:w-[270px] lg:w-[230px] 2makbook:w-[200px] w-full">
                                  <div className="flex flex-col gap-2">
                                    {form?.dropDownStyle?.map(
                                      (
                                        dropDownStyle: TDropDownStyle,
                                        dropDownIndex: number
                                      ) => {
                                        return (
                                          <div
                                            key={dropDownIndex}
                                            className="flex flex-col"
                                          >
                                            <div className="text-black relative 2xl:w-[340px] 2large:w-[270px] lg:w-[230px] 2makbook:w-[200px] w-full h-[46px] rounded-[8px] border-[1px] border-secondaryColor bg-white outline-0 px-5 md:text-[18px] text-[14px] font-Noto-Sans-Bengali flex items-center justify-between cursor-pointer">
                                              {dropDownStyle?.item.find(
                                                (item) => item.isActive
                                              ) ? (
                                                <span>
                                                  {
                                                    dropDownStyle?.item.find(
                                                      (item) => item.isActive
                                                    )?.label
                                                  }
                                                </span>
                                              ) : (
                                                <span>
                                                  {dropDownStyle.header}
                                                </span>
                                              )}

                                              <IoIosArrowDown className=" size-6 text-black absolute top-[30%] right-4" />
                                            </div>
                                          </div>
                                        );
                                      }
                                    )}
                                  </div>
                                </div>

                               
                              </div>
                            </div>

                                 {/* note add */}
                                 <div className="w-full mt-[30px]">
                                  <h3 className="text-[#222943] text-[20px] font-bold  mb-3">
                                  এখানে নোট লিখুন
                                  </h3>

                                  <input
                                    type="text"
                                    readOnly
                                    className="w-full h-[50px] border-[1px] border-secondaryColor rounded-[8px] bg-white text-secondaryColor pl-4 placeholder:text-[18px] font-Noto-Sans-Bengali font-normal placeholder:text-switchColor outline-0"
                                    placeholder="এখানে নোট লিখুন"
                                    defaultValue={form?.note}
                                  />
                                </div>

                             </div>





                          </div>
                        </div>
                      </div>

                     


                    </>
                  </>
                )}
              </div>
            </>
          ))}
        </div>

        <div className="flex justify-between items-center mt-[30px]">
          {/* <button
            className={`bg-gray-btnColor lg:w-[152px] w-[147px] h-[50px] rounded-[6px] flex justify-center items-center gap-2 text-white text-[18px] font-medium font-Noto-Sans-Bengali`}
          >
            <CgCloseR className="size-6" />
            <p>বাতিল করুন</p>
          </button> */}

          {/* <button
            type="submit"
            className={`bg-[#F00C89] lg:w-[207px] w-[207px] h-[50px] rounded-[6px] flex justify-center items-center gap-2 text-white text-[18px] font-medium font-Noto-Sans-Bengali`}
          >
            {isLoading ? (
              <span className="loading loading-infinity loading-lg"></span>
            ) : (
              <>
                <FiSave className="size-6" />
                <p>সেভ ও প্রিন্ট করুন </p>
              </>
            )}
          </button> */}
        </div>
      </form>
    </div>
  );
};

export default IndividualOrderDetails;
