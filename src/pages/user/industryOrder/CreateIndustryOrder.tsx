/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { IoIosArrowDown } from "react-icons/io";
import { FiPlus, FiSave } from "react-icons/fi";
import { LuMinus } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import { CiCalendar } from "react-icons/ci";
import { useForm } from "react-hook-form";
import { CgCloseR } from "react-icons/cg";
import { GrFormCheckmark } from "react-icons/gr";
// import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

import {
  TDropDownItem,
  TDropDownStyle,
  TIndividualOrder,
  TIndividualOrderItem,
  TStyle,
} from "../../../redux/api/individualOrderApi";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
// import useOutsideClick from "../../../utils/useOutsideClick";
import Selector from "../../../components/Selector/Selector";
import { useCreateCompanyOrderMutation } from "../../../redux/api/companyOrderApi";
import ReactToPrint from "react-to-print";
import PDFGenerator from "../../../utils/PDF";

const CreateIndustryOrder = ({
  settingData,
  measurementsData,
  admin,
  orderID,
}: {
  settingData: any;
  measurementsData: any;
  admin: any;
  orderID: string;
}) => {
  const [visibleDropdown, setVisibleDropdown] = useState<{
    [key: string]: boolean;
  }>({});
  const sRef = useRef<HTMLDivElement>(null);
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // const [ setOpenModalId] = useState<string | null>(null);
  const [industrySelected, setIndustrySelected] = useState("");

  const [visibility, setVisibility] = useState<boolean[]>([]);

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [urgentOrder, setUrgentOrder] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);

  const [forms, setForms] = useState({
    item: [
      {
        isOpen: false,
        category: "",
        image: "",
        measurement: [{ label: "", text: "" }],
        lugeSize: [{ label: "", text: "" }],
        style: [
          {
            isActive: false,
            text: "",
          },
        ],
        dropDownStyle: [
          {
            header: "",
            item: [
              {
                isActive: false,
                label: "",
              },
            ],
          },
        ],
        quantity: 1,
        note: "",
      },
    ],
  });

  const toggleVisibility = (fromIndex: number) => {
    setVisibility((prevVisibility) => {
      const newVisibility = [...prevVisibility];
      newVisibility[fromIndex] = !newVisibility[fromIndex];
      return newVisibility;
    });
  };

  const toggleCheckbox = (fromIndex: number, selectedStyleItem: TStyle) => {
    setForms((prevFrom) => {
      const updatedItems = prevFrom.item.map((item: any, index: number) => {
        if (index === fromIndex) {
          const updatedStyles = item.style.map((style: any) =>
            style === selectedStyleItem
              ? { ...style, isActive: !style.isActive }
              : style
          );

          return {
            ...item,
            style: updatedStyles,
          };
        }

        return item;
      });

      return {
        ...prevFrom,
        item: updatedItems,
      };
    });
  };

  const removeLastForm = (fromIndex: number) => {
    setForms((prevFrom) => {
      const updatedItems = prevFrom.item.filter(
        (_: any, index: any) => index !== fromIndex
      );

      return {
        ...prevFrom,
        item: updatedItems,
      };
    });
  };

  const handleIncrement = (fromIndex: number) => {
    setForms((prevState) => {
      const updatedItems = prevState.item.map((item, index) => {
        if (index === fromIndex) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });

      return {
        ...prevState,
        item: updatedItems,
      };
    });
  };

  const handleDecrement = (fromIndex: number) => {
    setForms((prevState) => {
      const updatedItems = prevState.item.map((item, index) => {
        if (index === fromIndex && item.quantity > 1) {
          console.log(forms);
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      });

      return {
        ...prevState,
        item: updatedItems,
      };
    });
  };

  const handleMeasurementChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    measurementIndex: number,
    fromIndex: number
  ) => {
    const updatedMeasurements = forms.item.map(
      (item: any, itemIndex: number) => {
        if (itemIndex === fromIndex) {
          // Update the specific measurement based on measurementIndex
          const updatedMeasurement = item.measurement.map(
            (measurementItem: any, index: number) => {
              if (index === measurementIndex) {
                return { ...measurementItem, text: e.target.value };
              }
              return measurementItem;
            }
          );
          return { ...item, measurement: updatedMeasurement };
        }
        return item;
      }
    );

    // Set the updated form state
    setForms((prevForm) => ({
      ...prevForm,
      item: updatedMeasurements,
    }));
  };

  const handleLugeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    lugeIndex: number,
    fromIndex: number
  ) => {
    const updatedLugeSizes = forms.item.map((item: any, itemIndex: number) => {
      if (itemIndex === fromIndex) {
        const updatedLugeSize = item.lugeSize.map(
          (lugeItem: any, index: number) => {
            if (index === lugeIndex) {
              return { ...lugeItem, text: e.target.value };
            }
            return lugeItem;
          }
        );
        return { ...item, lugeSize: updatedLugeSize };
      }
      return item;
    });

    setForms((prevForm) => ({
      ...prevForm,
      item: updatedLugeSizes,
    }));
  };

  const handleToggleDropDown = (fromIndex: number, dropDownIndex: number) => {
    const key = `${fromIndex}-${dropDownIndex}`;
    setVisibleDropdown((prevState) => ({
      [key]: !prevState[key],
    }));
  };

  const handleDropDownSubActive = (
    fromIndex: number,
    dropDownIndex: number,
    subIndex: number
  ) => {
    setVisibleDropdown({ 0: false });
    setForms((prevState) => {
      const updatedItems = prevState.item.map((item, fIndex) => {
        if (fIndex === fromIndex) {
          const updatedDropDownStyle = item.dropDownStyle.map(
            (style: any, dIndex: number) => {
              if (dIndex === dropDownIndex) {
                const updatedItemArray = style.item.map(
                  (subItem: any, sIndex: number) => ({
                    ...subItem,
                    isActive: sIndex === subIndex, // Set isActive to true only for the clicked item
                  })
                );
                return {
                  ...style,
                  item: updatedItemArray,
                };
              }
              return style;
            }
          );
          return {
            ...item,
            dropDownStyle: updatedDropDownStyle,
          };
        }
        return item;
      });

      return {
        ...prevState,
        item: updatedItems,
      };
    });
  };

  const handleNoteChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fromIndex: number
  ) => {
    setForms((prevState) => {
      const updatedItems = prevState.item.map((item, index) => {
        if (index === fromIndex) {
          return {
            ...item,
            note: e.target.value,
          };
        }
        return item;
      });

      return {
        ...prevState,
        item: updatedItems,
      };
    });
  };

  const [orderDate, setOrderDate] = useState<Date | null>(new Date());
  const [tryerDate, setTryerDate] = useState<Date | null>(new Date());
  const [workerDeliveryDate, setWorkerDeliveryDate] = useState<Date | null>(
    new Date()
  );
  const [deliveryDate, setDeliveryDate] = useState<Date | null>(new Date());


  const addDays = (date: Date | null, days: number): Date | null => {
    if (date) {
      const result = settingData?.orderDate || new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    }
    return null;
  };

  useEffect(() => {
    if (workerDeliveryDate) {
      
      // Add 5 days to tryerDate for deliveryDate
      const newDeliveryDate = addDays(
        workerDeliveryDate,
        Number(settingData?.deleveryPeriod) as number
      );
      setDeliveryDate(newDeliveryDate);
    }
  }, [workerDeliveryDate]);

  
  useEffect(() => {
    if (tryerDate) {
      // Add 3 days to tryerDate for workerDeliveryDate
      const newWorkerDeliveryDate = addDays(
        tryerDate,
        Number(settingData?.worksDeleveryPeriod) as number
      );
      setWorkerDeliveryDate(newWorkerDeliveryDate);

      // Add 5 days to tryerDate for deliveryDate
      const newDeliveryDate = addDays(
        workerDeliveryDate,
        Number(settingData?.deleveryPeriod) as number
      );
      setDeliveryDate(newDeliveryDate);
    }
  }, [tryerDate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const [newData, setNewData] = useState<TIndividualOrder>({
    admin,
    urgentOrder,
    orderId: orderID,
    deliveryDate,
    tryerDate,
    orderDate,
    workerDeliveryDate,
    customerName,
    phoneNumber,
    industry: industrySelected,
    item: [...forms.item],
  });

  useEffect(() => {
    if (!settingData) return;

    const trialPeriodDays = parseInt(settingData.trialPeriod, 10);
    const deliveryPeriodDays = parseInt(settingData.deliveryPeriod, 10);

    if (isNaN(trialPeriodDays) || isNaN(deliveryPeriodDays)) return;

    const currentDate = new Date();

    const trialEndDate = new Date(currentDate);
    trialEndDate.setDate(currentDate.getDate() + trialPeriodDays);

    const deliveryEndDate = new Date(currentDate);
    deliveryEndDate.setDate(currentDate.getDate() + deliveryPeriodDays);

    setDeliveryDate(deliveryEndDate);
    setTryerDate(trialEndDate);
    setOrderDate(currentDate);
  }, [settingData]);

  useEffect(() => {
    setNewData((prevData) => ({
      ...prevData,
      deliveryDate,
      tryerDate,
      workerDeliveryDate,
      orderId: orderID,
      urgentOrder,
      industry: industrySelected,
      phoneNumber,
      customerName,
      item: [...forms.item],
    }));
  }, [
    deliveryDate,
    workerDeliveryDate,
    tryerDate,
    urgentOrder,
    forms,
    orderID,
    industrySelected,
    phoneNumber,
    customerName,
  ]);

  const handleSelect = (category: string, i: number) => {
    setVisibility((prevVisibility) => {
      const newVisibility = [...prevVisibility];
      newVisibility[i] = false;
      return newVisibility;
    });
    setForms((prevForms) => {
      const updatedForms = { ...prevForms };

      const selectedCategoryData = categories.find((cat) => {
        return cat === category;
      });

      const matchingData: TIndividualOrderItem[] = measurementsData.data.filter(
        (category: any) => category.name === selectedCategoryData
      );

      updatedForms.item = updatedForms.item.map((form, index) => {
        if (index === i) {
          const data = matchingData[0] || {};

          const transformedStyles =
            data?.subCategories?.map((style: any) => ({
              isActive: false,
              text: style,
            })) || [];

          const transformedDropDownStyle =
            data.styles?.map((style: any) => ({
              header: style.category,
              item: style.subCategories.map((subCategory: any) => ({
                isActive: false,
                label: subCategory,
              })),
            })) || [];

          return {
            ...form,
            category,
            image: data.image || "",
            measurement:
              data.measurements?.map((measurement: any) => ({
                label: measurement,
                text: "",
              })) || [],
            lugeSize:
              data.looseItems?.map((looseItem: any) => ({
                label: looseItem,
                text: "",
              })) || [],
            style: transformedStyles,
            dropDownStyle: transformedDropDownStyle,
            quantity: data.quantity || 1,
            note: data.note || "",
            isOpen: false,
            isVisible: true,
          };
        }
        return form;
      });

      return updatedForms;
    });
  };

  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    if (!measurementsData) return;

    const newCategories: string[] = measurementsData.data.map((item: any) => {
      return item.name as string;
    });

    setCategories(newCategories);
  }, [measurementsData?.data]);

  const [createCompanyOrder, { isLoading }] = useCreateCompanyOrderMutation();
  const onSubmit = async () => {
    try {
      const res = await createCompanyOrder(newData).unwrap();

      if (res?.success) {
        Swal.fire({
          icon: "success",
          title: res?.message,
          showConfirmButton: false,
          timer: 1000,
        });
      }
    } catch (err) {
      const error = err as { data: { message: string } };

      Swal.fire({
        icon: "error",
        title: error?.data?.message,
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  const addForm = () => {
    const newForm = {
      isOpen: false,
      category: "",
      image: "",
      measurement: [{ label: "", text: "" }],
      lugeSize: [{ label: "", text: "" }],
      style: [
        {
          isActive: false,
          text: "",
        },
      ],
      dropDownStyle: [
        {
          header: "",
          item: [
            {
              isActive: false,
              label: "",
            },
          ],
        },
      ],
      quantity: 1,
      note: "",
    };

    // Update the state to include the new form
    setForms((prevForms) => ({
      ...prevForms,
      item: [...prevForms.item, newForm],
    }));
  };

  return (
    <div className="">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-[10px] lg:p-[15px] md:p-5 p-4 w-full"
      >
        <div>
          <div className="md:flex md:justify-between md:items-center">
            <h1 className="text-[#222943] md:text-[24px] text-[18px] font-Noto-Sans-Bengali font-bold">
              ব্যক্তির তথ্য
            </h1>

            <div className="flex items-center gap-4">
              <h1 className="text-secondaryColor font-Poppins md:text-[20px] text-[16px] font-semibold">
                <span className="text-switchColor font-Noto-Sans-Bengali font-semibold">
                  অর্ডার নাম্বার:
                </span>{" "}
                #{orderID}
              </h1>

              <div>
                <label
                  className={`flex items-center  rounded-lg p-[10px] cursor-pointer ${
                    urgentOrder && " text-primaryColor bg-primaryRgbaColor"
                  }`}
                >
                  <input
                    type="checkbox"
                    onChange={() => setUrgentOrder(!urgentOrder)}
                    className="hidden form-checkbox h-5 w-5 text-blue-100"
                  />

                  <div className="flex items-center gap-0">
                    <div
                      className={`lg:w-6 lg:h-6 md:w-6 md:h-6 w-[20px] h-[20px] rounded-[4px] flex items-center justify-center cursor-pointer relative
                                                   ${
                                                     urgentOrder === true
                                                       ? "bg-[#F00C89] border-0"
                                                       : "border-[1px] border-secondaryColor"
                                                   }
                                                   `}
                    >
                      {urgentOrder === true && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <GrFormCheckmark
                            className={`md:size-6 size-5 text-white`}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <span
                    className={`ml-2 font-Poppins md:text-[18px] text-[14px] font-normal text-switchColor`}
                  >
                    Urgent Order
                  </span>
                </label>
              </div>
            </div>
           
          </div>
          <div className="w-full h-[1px] bg-secondaryColor 2xl:mt-[30px] mt-5"></div>

          <div className="lg:flex lg:gap-5 justify-between mt-5">
            <div className="lg:flex lg:flex-col lg:gap-5  gap-[10px]">
              <div className="lg:flex lg:flex-col lg:gap-5 flex  gap-[10px] ">
                <div className="lg:flex items-center justify-between 2xl:gap-[30px] gap-5 2xl:w-[560px] lg:w-[520px] w-full ">
                  <h1 className="text-switchColor lg:text-[18px] text-[14px] font-Noto-Sans-Bengali font-semibold mb-[10px] lg:mb-0 ">
                    কাস্টমারের নাম
                    <span className="text-primaryColor font-bold font-Noto-Sans-Bengali">
                      *
                    </span>
                  </h1>

                  <div className="">
                    <input
                      className={`2xl:w-[400px] lg:w-[370px] w-full h-[51px] rounded-[8px] border-[1px] ${
                        errors?.customerName
                          ? "border-primaryColor"
                          : "border-secondaryColor"
                      }  bg-white dark:bg-white text-secondaryColor dark:text-secondaryColor outline-0 px-5 md:text-[18px] text-[14px] font-Poppins font-normal `}
                      type="text"
                      {...register("customerName", {
                        required: "কাস্টমারের নাম প্রদান করুন",
                        onChange: (e) => {
                          setCustomerName(e.target.value);
                        },
                      })}
                    />

                    {errors?.customerName?.message &&
                      typeof errors.customerName.message === "string" && (
                        <p className="text-primaryColor md:text-[18px] text-[14px] font-Noto-Sans-Bengali font-normal">
                          {errors.customerName.message}
                        </p>
                      )}
                  </div>
                </div>

                <div className="lg:flex items-center justify-between 2xl:gap-[30px] gap-5 2xl:w-[560px] lg:w-[520px] w-full ">
                  <h1 className="text-switchColor lg:text-[18px] text-[14px] font-Noto-Sans-Bengali font-semibold mb-[10px] lg:mb-0 ">
                    ফোন নাম্বার
                    <span className="text-primaryColor font-bold font-Noto-Sans-Bengali">
                      *
                    </span>
                  </h1>

                  <div className="">
                    <input
                      className={`2xl:w-[400px] lg:w-[370px] w-full h-[51px] rounded-[8px] border-[1px] ${
                        errors?.phoneNumber
                          ? "border-primaryColor"
                          : "border-secondaryColor"
                      }  bg-white dark:bg-white text-secondaryColor dark:text-secondaryColor outline-0 px-5 md:text-[18px] text-[14px] font-Poppins font-normal `}
                      type="text"
                      {...register("phoneNumber", {
                        required: "ফোন নম্বর প্রদান করুন",
                        onChange: (e) => {
                          setPhoneNumber(e.target.value);
                        },
                        validate: {
                          isNumeric: (value) =>
                            /^[0-9]+$/.test(value) ||
                            "ফোন নম্বরে শুধুমাত্র সংখ্যা হবে",
                          isElevenDigits: (value) =>
                            value.length === 11 ||
                            "ফোন নম্বরটি অবশ্যই 11 সংখ্যার হতে হবে",
                        },
                      })}
                    />

                    {errors?.phoneNumber?.message &&
                      typeof errors.phoneNumber.message === "string" && (
                        <p className="text-primaryColor md:text-[18px] text-[14px] font-Noto-Sans-Bengali font-normal">
                          {errors.phoneNumber.message}
                        </p>
                      )}
                  </div>
                </div>
              </div>

              <div className="lg:flex items-center justify-between 2xl:gap-[30px] gap-5 2xl:w-[560px] lg:w-[520px] w-full mt-4 lg:mt-0">
                <h1 className="text-switchColor lg:text-[18px] text-[14px] font-Noto-Sans-Bengali font-semibold mb-[10px] lg:mb-0 ">
                  প্রতিষ্ঠান
                  <span className="text-[#FF5151] font-bold font-Noto-Sans-Bengali">
                    *
                  </span>
                </h1>

                <Selector
                  setIndustrySelected={setIndustrySelected}
                  industrySelected={industrySelected}
                  className=""
                  sRef={sRef}
                ></Selector>
              </div>
            </div>

            <div className="w-full h-[1px] bg-secondaryColor 2xl:mt-[30px] mt-5 lg:hidden block"></div>

            <div className="lg:flex lg:flex-col lg:gap-4  gap-[10px] lg:mt-0 ">
              <div className="flex flex-col 2xl:flex-row gap-4  justify-end">
                <div className="lg:flex items-center justify-end gap-2  mt-4 lg:mt-0">
                  <h1 className="text-[#00000099] lg:text-[18px] text-[14px] font-Noto-Sans-Bengali font-[600] mb-[10px] lg:mb-0">
                    অর্ডার ডেট:
                  </h1>
                  <div className="relative">
                    <DatePicker
                      selected={orderDate}
                      readOnly
                      onChange={(date) => setOrderDate(date)}
                      placeholderText="Select a date"
                      className=" text-[#651A71] 2xl:text-[18px] lg:text-[16px] text-[14px] rounded-[8px] bg-white outline-0 font-Poppins placeholder:text-secondaryColor cursor-pointer lg:w-[150px] w-full"
                      dateFormat="dd-MM-yyyy"
                      popperPlacement="bottom-end"
                      calendarClassName="custom-calendar-class"
                    />
                    <span className="absolute inset-y-0 right-1 flex items-center  pointer-events-none">
                      <CiCalendar className=" text-[#651A71] font-bold lg:size-6 size-5" />
                    </span>
                  </div>
                </div>
                <div className="lg:flex items-center justify-end gap-2  mt-4 lg:mt-0">
                  <h1 className="text-[#00000099] lg:text-[18px] text-[14px] font-Noto-Sans-Bengali font-[600] mb-[10px] lg:mb-0">
                    ট্রায়াল ডেট:
                  </h1>
                  <div className="relative">
                    <DatePicker
                      selected={tryerDate}
                      onChange={(date) => setTryerDate(date)}
                      placeholderText="Select a date"
                      className=" text-[#651A71] 2xl:text-[18px] lg:text-[16px] text-[14px] rounded-[8px] bg-white outline-0 font-Poppins placeholder:text-secondaryColor cursor-pointer lg:w-[150px] w-full"
                      dateFormat="dd-MM-yyyy"
                      popperPlacement="bottom-end"
                      calendarClassName="custom-calendar-class"
                    />
                    <span className="absolute inset-y-0 right-1 flex items-center  pointer-events-none">
                      <CiCalendar className=" text-[#651A71] font-bold lg:size-6 size-5" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col 2xl:flex-row gap-4 justify-end">
                <div className="lg:flex items-center justify-end gap-2  mt-4 lg:mt-0">
                  <h1 className="text-[#00000099] lg:text-[18px] text-[14px] font-Noto-Sans-Bengali font-[600] mb-[10px] lg:mb-0">
                    ওয়ার্কার ডেলিভারি ডেট:
                  </h1>
                  <div className="relative">
                    <DatePicker
                      selected={workerDeliveryDate}
                      onChange={(date) => setWorkerDeliveryDate(date)}
                      placeholderText="Select a date"
                      className=" text-[#651A71] 2xl:text-[18px] lg:text-[16px] text-[14px] rounded-[8px] bg-white outline-0 font-Poppins placeholder:text-secondaryColor cursor-pointer lg:w-[150px] w-full"
                      dateFormat="dd-MM-yyyy"
                      popperPlacement="bottom-end"
                      calendarClassName="custom-calendar-class"
                    />
                    <span className="absolute inset-y-0 right-1 flex items-center  pointer-events-none">
                      <CiCalendar className=" text-[#651A71] font-bold lg:size-6 size-5" />
                    </span>
                  </div>
                </div>
                <div className="lg:flex items-center justify-end gap-2  mt-4 lg:mt-0">
                  <h1 className="text-[#00000099] lg:text-[18px] text-[14px] font-Noto-Sans-Bengali font-[600] mb-[10px] lg:mb-0">
                    ডেলিভারি ডেট:
                  </h1>
                  <div className="relative">
                    <DatePicker
                      selected={deliveryDate}
                      onChange={(date) => setDeliveryDate(date)}
                      placeholderText="Select a date"
                      className=" text-[#651A71] 2xl:text-[18px] lg:text-[16px] text-[14px] rounded-[8px] bg-white outline-0 font-Poppins placeholder:text-secondaryColor cursor-pointer lg:w-[150px] w-full"
                      dateFormat="dd-MM-yyyy"
                      popperPlacement="bottom-end"
                      calendarClassName="custom-calendar-class"
                    />
                    <span className="absolute inset-y-0 right-1 flex items-center  pointer-events-none">
                      <CiCalendar className=" text-[#651A71] font-bold lg:size-6 size-5" />
                    </span>
                  </div>
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

          {forms.item.map((form: TIndividualOrderItem, fromIndex: number) => (
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
                        <div
                          className={`2xl:w-[250px] lg:w-[250px] w-full  rounded-[8px] border-[1px]  outline-0 md:text-[18px] text-[14px] font-Poppins font-normal flex items-center justify-between cursor-pointer border-secondaryColor`}
                          onClick={() =>
                            setForms((prevForms) => ({
                              ...prevForms,
                              item: prevForms.item.map((form, index) =>
                                index === fromIndex
                                  ? { ...form, isOpen: !form.isOpen }
                                  : form
                              ),
                            }))
                          }
                        >
                          <input
                            className={`2xl:w-[250px] lg:w-[250px] w-full bg-white dark:bg-white  h-[51px] pl-5 lg:text-[18px] md:text-[16px] text-[16px] font-Poppins font-normal outline-none rounded-[8px]  text-secondaryColor placeholder:text-switchColor cursor-pointer`}
                            type="text"
                            id="category"
                            readOnly
                            value={form.category}
                            placeholder="Select a category"
                          />

                          <IoIosArrowDown className="text-black absolute right-4 " />
                        </div>
                        {form.isOpen && (
                          <div
                            className="absolute z-10 mt-1 w-full p-[10px] rounded-[8px] bg-white text-secondaryColor max-h-[265px] overflow-y-auto"
                            style={{
                              boxShadow: "0px 0px 25px 0px rgba(0, 0, 0, 0.10)",
                            }}
                          >
                            {categories.length > 0 ? (
                              categories.map((category, ic: number) => (
                                <div
                                  key={ic}
                                  className="px-[10px] py-[6px] rounded cursor-pointer hover:bg-activeDhcolor"
                                  onClick={() =>
                                    handleSelect(category, fromIndex)
                                  }
                                >
                                  {category}
                                  <input
                                    className="hidden h-[51px] pl-5 lg:text-[18px] md:text-[16px] text-[12px] text-switchColor font-Poppins font-normal outline-none rounded-[8px] "
                                    type="text"
                                    readOnly
                                    value={category}
                                  />
                                </div>
                              ))
                            ) : (
                              <>
                                <div className="p-[15px] 2xl:h-[374px] lg:h-[180px] w-full">
                                  <div className="pt-[10px] text-center text-switchColor text-[14px] font-Poppins font-medium">
                                    No category found
                                  </div>
                                </div>
                                <div className="border-b border-borderColor"></div>
                                <div>
                                  <Link
                                    to="../measurement-settings"
                                    className="block max-auto w-full text-secondaryColor text-[18px] text-center font-Poppins font-semibold"
                                  >
                                    Create New category
                                  </Link>
                                </div>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-6 mt-1 lg:mt-0">
                      <div className="flex items-center gap-5">
                        <h1 className="text-switchColor lg:text-[18px] text-[14px] font-Noto-Sans-Bengali font-semibold ">
                          সংখ্যা
                        </h1>

                        <div className="flex items-center gap-5">
                          <span
                            onClick={() => handleDecrement(fromIndex)}
                            className="size-6 rounded-full bg-[#BCBEC6] flex justify-center items-center cursor-pointer hover:bg-primaryColor duration-300"
                          >
                            <LuMinus className="text-white " />
                          </span>
                          <span className=" text-[24px] w-4 outline-none text-switchColor font-Poppins font-semibold">
                            {form.quantity}
                          </span>
                          <span
                            onClick={() => handleIncrement(fromIndex)}
                            className="size-6 rounded-full bg-[#BCBEC6] flex justify-center items-center cursor-pointer hover:bg-primaryColor duration-300"
                          >
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

                      {/* for mobile */}
                      <div className="md:hidden block mt-1">
                        <div className="flex md:gap-5 gap-5 items-center">
                          <button
                            type="button"
                            onClick={() => removeLastForm(fromIndex)}
                            className="bg-activeDhcolor md:px-5 px-2 md:h-[50px] h-10 rounded-md flex justify-center items-center gap-3 text-pink-500 bg-pink-100 text-[18px] font-Poppins font-normal"
                          >
                            <FaRegTrashAlt className=" size-[20px]" />
                            <p className="md:block hidden">Delete</p>
                          </button>

                          <div className="">
                            <IoIosArrowDown
                              onClick={() => toggleVisibility(fromIndex)}
                              className={`md:size-6 size-6 text-black cursor-pointer transition-transform duration-300 ease-in-out ${
                                visibility[fromIndex]
                                  ? "rotate-0"
                                  : "rotate-180"
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* for large device */}
                  <div className="md:block hidden">
                    <div className="flex md:gap-5 gap-2 items-center">
                      <button
                        type="button"
                        onClick={() => removeLastForm(fromIndex)}
                        className="bg-activeDhcolor md:px-5 px-2 md:h-[50px] h-10 rounded-md flex justify-center items-center gap-3 text-pink-500 bg-pink-100 text-[18px] font-Poppins font-normal"
                      >
                        <FaRegTrashAlt className=" size-[20px]" />
                        <p className="md:block hidden">Delete</p>
                      </button>

                      <div className="">
                        <IoIosArrowDown
                          onClick={() => toggleVisibility(fromIndex)}
                          className={`md:size-6 size-3 text-black cursor-pointer transition-transform duration-300 ease-in-out ${
                            visibility[fromIndex] ? "rotate-0" : "rotate-180"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {!visibility[fromIndex] && (
                  <>
                    {forms.item.some(
                      (item, index) =>
                        index === fromIndex && item.category !== ""
                    ) ? (
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
                                          className="bg-white text-secondaryColor 2xl:w-[100px] lg:w-[70px] w-[60px] h-[40px] rounded-[8px] border-[1px] border-secondaryColor outline-0 pl-3 font-bold"
                                          type="text"
                                          name=""
                                          defaultValue={measurementItem.text}
                                          ref={(el) =>
                                            (inputRefs.current[
                                              measurementIdex
                                            ] = el)
                                          }
                                          onChange={(e) =>
                                            handleMeasurementChange(
                                              e,
                                              measurementIdex,
                                              fromIndex
                                            )
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
                                              onChange={(e) =>
                                                handleLugeChange(
                                                  e,
                                                  lugeIdex,
                                                  fromIndex
                                                )
                                              }
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
                                                        styleItem.isActive ===
                                                        true
                                                          ? "text-primaryColor"
                                                          : "border-0"
                                                      }`}
                                                    >
                                                      <input
                                                        type="checkbox"
                                                        onChange={() =>
                                                          toggleCheckbox(
                                                            fromIndex,
                                                            styleItem
                                                          )
                                                        }
                                                        className="hidden form-checkbox h-5 w-5 text-blue-100"
                                                      />

                                                      <div className="flex items-center gap-2">
                                                        <div
                                                          className={`lg:w-6 lg:h-6 md:w-6 md:h-6 w-[20px] h-[20px] rounded-[4px] flex items-center justify-center cursor-pointer relative
                                                   ${
                                                     styleItem.isActive === true
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

                                                      <span className={`ml-4 `}>
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
                                                <div
                                                  className="text-black relative 2xl:w-[340px] 2large:w-[270px] lg:w-[230px] 2makbook:w-[200px] w-full h-[46px] rounded-[8px] border-[1px] border-secondaryColor bg-white outline-0 px-5 md:text-[18px] text-[14px] font-Noto-Sans-Bengali flex items-center justify-between cursor-pointer"
                                                  onClick={() =>
                                                    handleToggleDropDown(
                                                      fromIndex,
                                                      dropDownIndex
                                                    )
                                                  }
                                                >
                                                  {dropDownStyle?.item.find(
                                                    (item) => item.isActive
                                                  ) ? (
                                                    <span>
                                                      {
                                                        dropDownStyle?.item.find(
                                                          (item) =>
                                                            item.isActive
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
                                                {visibleDropdown[
                                                  `${fromIndex}-${dropDownIndex}`
                                                ] && (
                                                  <div
                                                    className="absolute z-10 mt-12 2xl:w-[340px] 2large:w-[270px] lg:w-[230px] 2makbook:w-[200px] w-[250px] p-[10px] rounded-[8px] bg-white text-black"
                                                    style={{
                                                      boxShadow:
                                                        "0px 5px 30px 0px rgba(0, 0, 0, 0.30)",
                                                    }}
                                                  >
                                                    {dropDownStyle?.item?.map(
                                                      (
                                                        dropDownSubStyle: TDropDownItem,
                                                        dropDownSubIndex: number
                                                      ) => (
                                                        <div
                                                          key={dropDownSubIndex}
                                                          onClick={() =>
                                                            handleDropDownSubActive(
                                                              fromIndex,
                                                              dropDownIndex,
                                                              dropDownSubIndex
                                                            )
                                                          }
                                                          className="px-[10px] py-[6px] rounded cursor-pointer hover:bg-activeDhcolor"
                                                        >
                                                          {
                                                            dropDownSubStyle.label
                                                          }
                                                        </div>
                                                      )
                                                    )}
                                                  </div>
                                                )}
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
                                  <input
                                    type="text"
                                    className="w-full h-[50px] border-[1px] border-secondaryColor rounded-[8px] bg-white text-secondaryColor pl-4 placeholder:text-[18px] font-Noto-Sans-Bengali font-normal placeholder:text-switchColor outline-0"
                                    placeholder="এখানে নোট লিখুন"
                                    onChange={(e) =>
                                      handleNoteChange(e, fromIndex)
                                    }
                                    defaultValue={form?.note}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="w-full bg-[#F9FAFE] lg:h-[150px] h-[96px] border-t border-secondaryColor  rounded-b-[10px] text-btnColor font-Noto-Sans-Bengali text-16px] font-normal flex justify-center items-center">
                        এখন পর্যন্ত কোন ক্যাটাগরি সিলেক্ট করা হয়নি
                      </div>
                    )}
                  </>
                )}
              </div>
            </>
          ))}

          <div>
            <div className="2xl:mt-[30px] mt-5">
              <button
                type="button"
                onClick={addForm}
                className="bg-activeDhcolor w-full h-[50px] rounded-[8px] flex justify-center items-center gap-2 text-[#F00C89] text-[18px] font-medium font-Noto-Sans-Bengali"
              >
                <FiPlus className="size-6 " />
                <p>ক্যাটাগরি যোগ করুন</p>
              </button>
            </div>
          </div>
        </div>

        <div className="md:flex md:flex-row-reverse md:justify-between items-center mt-[30px] ">
          <div className="relative bg-white md:flex gap-[10px] items-center">
            <button
              type="submit"
              className={`bg-primaryColor md:w-[157px] justify-center mx-auto w-full h-[50px] rounded-[6px] flex items-center gap-[10px] text-white text-[18px] font-medium font-Noto-Sans-Bengali px-4`}
            >
              {isLoading ? (
                <span className="loading loading-infinity loading-lg"></span>
              ) : (
                <>
                  <span className="flex gap-2">
                    <FiSave className="size-6" />
                    <p>সেভ করুন </p>
                  </span>
                </>
              )}
            </button>

            <button
              type="submit"
              className={`bg-activeDhcolor md:w-[257px] justify-center mx-auto w-full h-[50px] rounded-[6px] flex items-center gap-2 text-primaryColor text-[18px] font-medium font-Noto-Sans-Bengali px-4 mt-5 md:mt-0`}
            >
              {isLoading ? (
                <span className="loading loading-infinity loading-lg"></span>
              ) : (
                <>
                  <ReactToPrint
                    trigger={() => (
                      <span className="flex gap-2">
                        <FiSave className="size-6" />
                        <p>সেভ ও প্রিন্ট করুন </p>
                      </span>
                    )}
                    content={() => componentRef.current}
                  />
                </>
              )}
            </button>

            {/* <Menu>
              <MenuButton className="inline-flex items-center gap-2 rounded-r-lg bg-primaryColor py-[13px] px-3 text-white cursor-pointer">
                <IoIosArrowDown className="size-6 " />
              </MenuButton>

              <MenuItems
                className="absolute bottom-14 right-0 mt-2 w-full p-4 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                style={{
                  boxShadow: "0px 0px 5px 0px rgba(200, 201, 209, 0.65)",
                }}
              >
                <MenuItem>
                  {({ active }) => (
                    <button
                      className={`${
                        active
                          ? "bg-primaryColor text-white"
                          : "text-secondaryColor"
                      } block px-4 py-2 text-sm text-[18px] font-Poppins font-normal w-full text-left rounded`}
                      onClick={() => {
                        handleSubmit(onSubmit)();
                      }}
                    >
                      সেভ করুন
                    </button>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <div
                      className={`${
                        active
                          ? "bg-primaryColor text-white"
                          : "text-secondaryColor"
                      } block px-4 py-2 text-sm text-[18px] font-Poppins font-normal w-full text-left rounded cursor-pointer`}
                    >
                      <>
                        <ReactToPrint
                          trigger={() => <p>প্রিন্ট করুন</p>}
                          content={() => componentRef.current}
                        />
                      </>
                    </div>
                  )}
                </MenuItem>
              </MenuItems>
            </Menu> */}
          </div>

          <div>
            <Link
              to={"/admin/dashboard"}
              className={`bg-gray-btnColor md:w-[162px] w-full h-[50px] rounded-[6px] flex justify-center items-center gap-2 text-white text-[18px] font-medium font-Noto-Sans-Bengali mt-5 md:mt-0`}
            >
              <CgCloseR className="size-6" />
              <p>বাতিল করুন</p>
            </Link>
          </div>
        </div>
      </form>
      <PDFGenerator
        singleOrder={newData}
        componentRef={componentRef}
      ></PDFGenerator>
    </div>
  );
};

export default CreateIndustryOrder;
