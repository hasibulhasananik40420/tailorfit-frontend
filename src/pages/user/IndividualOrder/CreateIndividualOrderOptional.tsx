/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { IoIosArrowDown } from "react-icons/io";
import { FiPlus, FiSave } from "react-icons/fi";
import { LuMinus } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import { CiCalendar } from "react-icons/ci";
import { CgCloseR } from "react-icons/cg";
import { GrFormCheckmark } from "react-icons/gr";
import { useForm, Controller, FieldValues } from "react-hook-form";
import { useAppSelector } from "../../../redux/features/hooks";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import { useGetSettingDataQuery } from "../../../redux/api/settingApi";
import { useGetMeasurementsQuery } from "../../../redux/api/measurementApi";
import Loader from "../../../components/Loader/Loader";
import { useCreateIndividualOrderMutation } from "../../../redux/api/individualOrderApi";
import Swal from "sweetalert2";

const CreateIndividualOrderOptional = () => {
  const [visibleDropdown, setVisibleDropdown] = useState<{
    [key: string]: boolean;
  }>({});

  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const [createIndividualOrder] = useCreateIndividualOrderMutation();

  const [forms, setForms] = useState([
    {
      category: "aaaa",
      image: "",
      measurement: [{ label: "", text: "" }],
      lugeSize: [{ label: "", text: "" }],
      style: [
        {
          isActive: false,
          text: "",
        },
      ],
      dropDownStyle: {
        header: "",
        item: [
          {
            isActive: false,
            label: "",
          },
        ],
      },

      quantity: 1,
      note: "",

      selectedCategory: "",
      isOpen: false,
      pocketStyle: [],
      isOpenPocket: false,
      isChecked: false,
      isVisible: false,
      count: 1,
    },
  ]);

  const handleToggleDropDown = (i: number, dropDownIndex: number) => {
    const key = `${i}-${dropDownIndex}`;
    setVisibleDropdown((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  // const handleActiveDropDown = (
  //   formIndex: number,
  //   style: { category: string; subCategories: string[] }
  // ) => {
  //   setVisibleDropdown({ 0: false });
  //   setForms((prevForms) =>
  //     prevForms.map((form, i) => {
  //       if (i === formIndex) {
  //         return {
  //           ...form,
  //           dropDownStyle: {
  //             header: style.category, // Use the category from the style object
  //             item: style.subCategories.map((subCategory, subI) => ({
  //               isActive: subI === 0, // Set the first item active, rest false
  //               label: subCategory,
  //             })),
  //           },
  //         };
  //       }

  //       return form;
  //     })
  //   );
  //   console.log(forms);
  // };
  const handleActiveDropDown = (
    formIndex: number,
    style: { category: string; subCategories: string[] }
  ) => {
    setVisibleDropdown({ 0: false });
    setForms((prevForms) =>
      prevForms.map((form, i) => {
        if (i === formIndex) {
          return {
            ...form,
            dropDownStyle: {
              header: style.category,
              item: style.subCategories.map((subCategory, subI) => ({
                isActive: subI === 0,
                label: subCategory,
              })),
            },
          };
        }
        return form;
      })
    );
  };

  const toggleCheckbox = (
    formIndex: number,
    singleStyle: string[],
    styleIndex: number
  ) => {
    setCheckedItems((prev) =>
      prev.includes(styleIndex)
        ? prev.filter((item) => item !== styleIndex)
        : [...prev, styleIndex]
    );
    setForms((prevForms) =>
      prevForms.map((form, i) => {
        if (i === formIndex) {
          return {
            ...form,
            style: form.style.map((styleItem, sIndex) => {
              if (sIndex === styleIndex) {
                console.log(form);
                return {
                  ...styleItem,
                  isActive: !styleItem.isActive,
                  text: singleStyle[sIndex],
                };
              }
              return {
                ...styleItem,
                isActive: false,
              };
            }),
          };
        }
        return form;
      })
    );
  };

  const currentData = useAppSelector(selectCurrentUser);

  const handleSelect = (category: string, i: number) => {
    const updatedForms = [...forms];
    updatedForms[i].selectedCategory = category;
    updatedForms[i].isOpen = false;
    updatedForms[i].isVisible = true;
    setForms(updatedForms);
  };

  const handleIncrement = (index: number) => {
    const updatedForms = [...forms];
    updatedForms[index].count += 1;
    setForms(updatedForms);
  };

  const handleDecrement = (index: number) => {
    const updatedForms = [...forms];
    if (updatedForms[index].count > 1) {
      updatedForms[index].count -= 1;
      setForms(updatedForms);
    }
  };

  const addForm = () => {
    setForms([
      ...forms,
      {
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
        dropDownStyle: {
          header: "",
          item: [
            {
              isActive: false,
              label: "",
            },
          ],
        },

        quantity: 1,
        note: "",

        selectedCategory: "",
        isOpen: false,
        pocketStyle: [],
        isOpenPocket: false,
        isChecked: false,
        isVisible: false,
        count: 1,
      },
    ]);
  };

  const removeLastForm = () => {
    if (forms.length > 1) {
      setForms(forms.slice(0, -1));
    }
  };

  //new style
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedDateTwo, setSelectedDateTwo] = useState<Date | null>(null);
  const [selectedDateThree, setSelectedDateThree] = useState<Date | null>(null);

  const { data, isLoading } = useGetSettingDataQuery(currentData?.id, {
    skip: !currentData?.id,
  });

  // get measurements
  const { data: measurementsData, isLoading: measurementsDataLoading } =
    useGetMeasurementsQuery(currentData?.id);

  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    if (!measurementsData) return;

    const newCategories: string[] = measurementsData.data.map((item: any) => {
      return item.name as string;
    });

    setCategories(newCategories);
  }, [measurementsData?.data]);

  useEffect(() => {
    if (!data?.data) return;

    const trialPeriodDays = parseInt(data.data.trialPeriod, 10);
    const deliveryPeriodDays = parseInt(data.data.deliveryPeriod, 10);

    if (isNaN(trialPeriodDays) || isNaN(deliveryPeriodDays)) return;

    const currentDate = new Date();

    const trialEndDate = new Date(currentDate);
    trialEndDate.setDate(currentDate.getDate() + trialPeriodDays);

    const deliveryEndDate = new Date(currentDate);
    deliveryEndDate.setDate(currentDate.getDate() + deliveryPeriodDays);

    setSelectedDateTwo(trialEndDate);
    setSelectedDateThree(deliveryEndDate);
  }, [data?.data]);

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    data.orderDate = selectedDate;
    data.tryerDate = selectedDateTwo;
    data.deliveryDate = selectedDateThree;
    // data?.admin: currentData?.id;
    // data.item = forms.map((form, formIndex) => {
    //   const measurement = measurementsData.data
    //     .find((item: any) => item.name === form.selectedCategory)
    //     ?.measurements.map((item: string) => {

    //       return {
    //         label: item,
    //         text: data[`item.${formIndex}.measurement.${item}`],
    //       };
    //     });

    //   return {
    //     ...form,
    //     measurement,
    //   };
    // });

    // data.item = forms.map((form, formIndex) => {
    //   const selectedMeasurements = measurementsData.data.find(
    //     (item: any) => item.name === form.selectedCategory
    //   )?.measurements;

    //   const fieldName = data.item[formIndex].measurement;
    //   const values = Object.values(fieldName);

    //   const measurement = selectedMeasurements?.map(
    //     (itemText: string, index: number) => {
    //       return {
    //         label: itemText,
    //         text: values[index],
    //       };
    //     }
    //   );

    //   return {
    //     ...form,
    //     measurement, // The updated measurement array
    //   };
    // });

    data.item = forms.map((form, formIndex) => {
      const selectedMeasurements = measurementsData.data.find(
        (item: any) => item.name === form.selectedCategory
      )?.measurements;

      const selectedLooseItems = measurementsData.data.find(
        (item: any) => item.name === form.selectedCategory
      )?.looseItems;

      const image = measurementsData.data.find(
        (item: any) => item.name === form.selectedCategory
      )?.image;

      // const note = measurementsData.data.find(
      //   (item: any) => item.name === form.selectedCategory
      // );

      const category = measurementsData.data.find(
        (item: any) => item.name === form.selectedCategory
      )?.name;

      const dropDown = forms.find(
        () => category === form.selectedCategory
      )?.dropDownStyle;

      const singleStyle = forms.find(
        () => category === form.selectedCategory
      )?.style;

      // console.log(forms);
      // console.log(singleStyle);

      // const note = measurementsData.data.find(
      //   (item: any) => item.name === form.selectedCategory
      // );

      // Get the existing values from data.item
      const measurementValues = Object.values(data.item[formIndex].measurement);
      const lugeSizeValues = Object.values(data.item[formIndex].lugeSize);
      // const dropDownStyle = Object.values(data.item[formIndex].dropDown);

      // Create the updated measurement array
      const measurement = selectedMeasurements?.map(
        (itemText: string, index: number) => {
          return {
            label: itemText,
            text: measurementValues[index],
          };
        }
      );

      // Create the updated lugeSize array
      const lugeSize = selectedLooseItems?.map(
        (itemText: string, index: number) => {
          return {
            label: itemText,
            text: lugeSizeValues[index],
          };
        }
      );

      return {
        ...form,
        category,
        measurement,
        lugeSize,
        image,
        dropDownStyle: dropDown,
        style: singleStyle,
        note: "asdf",
      };
    });

    try {
      const res = await createIndividualOrder({
        ...data,
        admin: currentData?.id,
      }).unwrap();

      if (res?.success as any) {
        Swal.fire({
          icon: "success",
          title: res?.message as string,
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
  if (isLoading || measurementsDataLoading) {
    return <Loader />;
  }

  return (
    <div className="no-selecta">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-[10px] lg:p-[15px] md:p-5 p-4 w-full"
      >
        <div>
          <div className="flex justify-between items-center">
            <h1 className="text-[#222943] md:text-[24px] text-[18px] font-Noto-Sans-Bengali font-bold">
              ব্যক্তির তথ্য
            </h1>

            <h1 className="text-secondaryColor font-Poppins md:text-[20px] text-[18px] font-semibold">
              <span className="text-switchColor font-Noto-Sans-Bengali font-semibold">
                অর্ডার নাম্বার:
              </span>{" "}
              #0001{" "}
            </h1>
          </div>
          <div className="w-full h-[1px] bg-[#BCBEC6] 2xl:mt-[30px] mt-5"></div>

          <div className="lg:flex lg:gap-5 justify-between mt-5">
            <div className="lg:flex lg:flex-col lg:gap-5  gap-[10px]">
              <div className="lg:flex lg:flex-col lg:gap-5 flex  gap-[10px] ">
                <div className="lg:flex items-center justify-between 2xl:gap-[30px] gap-5 2xl:w-[560px] lg:w-[520px] w-full ">
                  <h1 className="text-switchColor lg:text-[18px] text-[14px] font-Noto-Sans-Bengali font-semibold mb-[10px] lg:mb-0 ">
                    কাস্টমারের নাম
                    <span className="text-[#FF5151] font-bold font-Noto-Sans-Bengali">
                      *
                    </span>
                  </h1>

                  <div className="">
                    <input
                      className="2xl:w-[400px] lg:w-[370px] w-full h-[51px] rounded-[8px] border-[1px] border-[#333] bg-white outline-0 px-5 md:text-[18px] text-[14px] font-Poppins font-normal "
                      type="text"
                      {...register("customerName", {
                        required: "Customer name is required",
                      })}
                    />

                    {errors.customerName && (
                      <p className="text-[#FF5151] md:text-[18px] text-[14px] font-Noto-Sans-Bengali font-normal">
                        Customer name is required
                      </p>
                    )}
                  </div>
                </div>

                <div className="lg:flex items-center justify-between 2xl:gap-[30px] gap-5 2xl:w-[560px] lg:w-[520px] w-full ">
                  <h1 className="text-switchColor lg:text-[18px] text-[14px] font-Noto-Sans-Bengali font-semibold mb-[10px] lg:mb-0 ">
                    ফোন নাম্বার
                    <span className="text-[#FF5151] font-bold font-Noto-Sans-Bengali">
                      *
                    </span>
                  </h1>

                  <input
                    className="2xl:w-[400px] lg:w-[370px] w-full h-[51px] rounded-[8px] border-[1px] border-[#BCBEC6] bg-white outline-0 px-5 md:text-[18px] text-[14px] font-Poppins font-normal "
                    type="text"
                    {...register("phoneNumber")}
                  />
                </div>
              </div>

              <div className="lg:flex items-center justify-between 2xl:gap-[30px] gap-5 2xl:w-[560px] lg:w-[520px] w-full mt-4 lg:mt-0">
                <h1 className="text-switchColor lg:text-[18px] text-[14px] font-Noto-Sans-Bengali font-semibold mb-[10px] lg:mb-0 ">
                  Address
                  <span className="text-[#FF5151] font-bold font-Noto-Sans-Bengali">
                    *
                  </span>
                </h1>

                <input
                  className="2xl:w-[400px] lg:w-[370px] w-full h-[51px] rounded-[8px] border-[1px] border-[#BCBEC6] bg-white outline-0 px-5 md:text-[18px] text-[14px] font-Poppins font-normal "
                  type="text"
                  {...register("address")}
                />
              </div>
            </div>

            <div className="w-full h-[1px] bg-[#BCBEC6] 2xl:mt-[30px] mt-5 lg:hidden block"></div>

            <div className="lg:flex lg:flex-col lg:gap-5  gap-[10px] mt-5 lg:mt-0 ">
              <div className="flex gap-[10px] lg:flex lg:flex-col lg:gap-5 w-full">
                {/* input 1 */}

                <div className="lg:flex items-center justify-between 2xl:gap-[30px] gap-5 2xl:w-[407px] lg:w-[370px] w-full">
                  <h1 className="text-switchColor lg:text-[18px] text-[14px] font-Noto-Sans-Bengali font-semibold mb-[10px] lg:mb-0">
                    অর্ডার ডেট
                    <span className="text-[#FF5151] font-bold font-Noto-Sans-Bengali">
                      *
                    </span>
                  </h1>
                  <div className="relative">
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      placeholderText="Select a date"
                      className="2xl:w-[250px] lg:w-[220px] w-full h-[50px] text-secondaryColor 2xl:text-[18px] lg:text-[16px] text-[14px] border-[1px] border-[#BCBEC6] rounded-[8px] bg-white outline-0 pl-4 font-Poppins placeholder:text-secondaryColor focus:border-[1px] focus:border-[#333] duration-500"
                      dateFormat="dd-mm-yyyy"
                      calendarClassName="custom-calendar-class"
                    />
                    <span className="absolute inset-y-0 right-0 flex items-center lg:pr-3 pr-2 pointer-events-none">
                      <CiCalendar className="text-black font-bold lg:size-6 size-5" />
                    </span>
                  </div>
                </div>

                <div className="lg:flex items-center justify-between 2xl:gap-[30px] gap-5 2xl:w-[407px] lg:w-[370px] w-full">
                  <h1 className="text-switchColor lg:text-[18px] text-[14px] font-Noto-Sans-Bengali font-semibold mb-[10px] lg:mb-0">
                    ট্রায়াল ডেট
                    <span className="text-[#FF5151] font-bold font-Noto-Sans-Bengali">
                      *
                    </span>
                  </h1>
                  <div className="relative">
                    <DatePicker
                      selected={selectedDateTwo}
                      onChange={(date) => setSelectedDateTwo(date)}
                      placeholderText="Select a date"
                      className="2xl:w-[250px] lg:w-[220px] w-full h-[50px] text-secondaryColor 2xl:text-[18px] lg:text-[16px] text-[14px] border-[1px] border-[#BCBEC6] rounded-[8px] bg-white outline-0 pl-4 font-Poppins placeholder:text-secondaryColor"
                      dateFormat="dd-mm-yyyy"
                      calendarClassName="custom-calendar-class"
                    />
                    <span className="absolute inset-y-0 right-0 flex items-center lg:pr-3 pr-2 pointer-events-none">
                      <CiCalendar className="text-black font-bold lg:size-6 size-5" />
                    </span>
                  </div>
                </div>
              </div>

              <div className="lg:flex items-center justify-between 2xl:gap-[30px] gap-5 2xl:w-[407px] lg:w-[370px] w-full mt-4 lg:mt-0">
                <h1 className="text-switchColor lg:text-[18px] text-[14px] font-Noto-Sans-Bengali font-semibold mb-[10px] lg:mb-0">
                  ডেলিভারি ডেট
                  <span className="text-[#FF5151] font-bold font-Noto-Sans-Bengali">
                    *
                  </span>
                </h1>
                <div className="relative">
                  <DatePicker
                    selected={selectedDateThree}
                    onChange={(date) => setSelectedDateThree(date)}
                    placeholderText="Select a date"
                    className="2xl:w-[250px] lg:w-[220px] w-full border-[#BCBEC6] h-[50px] text-secondaryColor 2xl:text-[18px] lg:text-[16px] text-[14px] border-[1px]  rounded-[8px] bg-white outline-0 pl-4 font-Poppins placeholder:text-secondaryColor"
                    dateFormat="dd-mm-yyyy"
                    calendarClassName="custom-calendar-class"
                  />
                  <span className="absolute inset-y-0 right-0 flex items-center lg:pr-3 pr-2 pointer-events-none">
                    <CiCalendar className="text-black font-bold lg:size-6 size-5" />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-[1px] bg-[#BCBEC6] 2xl:mt-[30px] mt-5 lg:block hidden"></div>
          <div className="w-full h-[1px] bg-[#BCBEC6] 2xl:mt-[30px] mt-5 lg:hidden block"></div>
        </div>

        <div className="2xl:pt-[30px] lg:pt-[15px] pt-3 relative">
          <h1 className="text-[#222943] lg:text-[24px] text-[18px] font-Noto-Sans-Bengali font-bold">
            পরিমাপ
          </h1>

          {forms.map((form, i) => (
            <>
              <div
                key={i}
                className="2xl:mt-[30px]  lg:mt-[15px] mt-3 border border-[#BCBEC6] !rounded-[10px] "
              >
                <div className="flex justify-between items-center lg:p-5 p-3">
                  <div className="flex lg:gap-[50px] gap-3">
                    <div className="lg:flex items-center gap-5 relative lg:w-[340px] w-full">
                      <h1 className="text-switchColor lg:text-[18px] text-[14px] font-Noto-Sans-Bengali font-semibold mb-[10px] lg:mb-0">
                        ক্যাটাগরি
                      </h1>

                      <div className="relative w-full">
                        <div
                          className="2xl:w-[250px] lg:w-[250px] w-full  rounded-[8px] border-[1px] border-[#BCBEC6] outline-0 md:text-[18px] text-[14px] font-Poppins font-normal flex items-center justify-between cursor-pointer"
                          onClick={() =>
                            setForms(
                              forms.map((form, idx) => {
                                // console.log(form);
                                return idx === i
                                  ? { ...form, isOpen: !form.isOpen }
                                  : form;
                              })
                            )
                          }
                        >
                          <input
                            className="h-[51px] pl-5 lg:text-[18px] md:text-[16px] text-[12px] text-switchColor font-Poppins font-normal outline-none rounded-[8px] "
                            type="text"
                            readOnly
                            value={form.selectedCategory}
                            placeholder="Select a category"
                          />

                          <IoIosArrowDown className="text-black absolute right-4 " />
                        </div>
                        {form.isOpen && (
                          <div
                            className="absolute z-10 mt-1 w-full p-[10px] rounded-[8px] bg-white"
                            style={{
                              boxShadow: "0px 0px 25px 0px rgba(0, 0, 0, 0.10)",
                            }}
                          >
                            {categories.map((category, ic: number) => (
                              <div
                                key={ic}
                                className="px-[10px] py-[6px] rounded cursor-pointer hover:bg-activeDhcolor"
                                onClick={() => handleSelect(category, i)}
                              >
                                {category}
                                <input
                                  className="hidden h-[51px] pl-5 lg:text-[18px] md:text-[16px] text-[12px] text-switchColor font-Poppins font-normal outline-none rounded-[8px] "
                                  type="text"
                                  readOnly
                                  value={category}
                                  {...register(`item.${[i]}.category`)}
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="lg:flex items-center gap-5 ">
                      <h1 className="text-switchColor lg:text-[18px] text-[14px] font-Noto-Sans-Bengali font-semibold mb-[10px] lg:mb-0 ">
                        সংখ্যা
                      </h1>

                      <div className="flex items-center gap-3">
                        <span
                          onClick={() => handleDecrement(i)}
                          className="size-6 rounded-full bg-[#BCBEC6] flex justify-center items-center cursor-pointer hover:bg-[#FF5151] duration-300"
                        >
                          <LuMinus className="text-white" />
                        </span>
                        <span className=" text-[24px] w-4 outline-none text-switchColor font-Poppins font-semibold">
                          {form.count}
                        </span>
                        <span
                          onClick={() => handleIncrement(i)}
                          className="size-6 rounded-full bg-[#BCBEC6] flex justify-center items-center cursor-pointer hover:bg-[#FF5151] duration-300"
                        >
                          <FiPlus className="text-white size-4" />
                          <input
                            className="hidden text-[24px] w-4 outline-none text-switchColor font-Poppins font-semibold"
                            type="text"
                            readOnly
                            value={form.count}
                            {...register(`item.${[i]}.quantity`)}
                          />
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex md:gap-5 gap-2 items-center">
                    <button
                      onClick={removeLastForm}
                      className="bg-activeDhcolor md:px-5 px-2 md:h-[50px] h-10 rounded-md flex justify-center items-center gap-3 text-[#FF5151] text-[18px] font-Poppins font-normal"
                    >
                      <FaRegTrashAlt className=" size-[20px]" />
                      <p className="md:block hidden">Delete</p>
                    </button>

                    <div className="">
                      <IoIosArrowDown
                        className={`md:size-6 size-3 text-black cursor-pointer ${
                          form.isVisible && "rotate-180"
                        }`}
                      />
                    </div>
                  </div>
                </div>
                {form.isVisible ? (
                  <>
                    {measurementsData?.data?.find(
                      (item: any) => item.name === forms[i].selectedCategory
                    ) && (
                      <>
                        <div className=" lg:flex bg-[#F9FAFE] rounded-r-[10px] rounded-l-[10px] border-[#BCBEC6] border-t rounded-t-none ">
                          {/* part 1 */}
                          <div className="bg-white 2xl:w-[740px] 2mid75:w-full lg:w-full w-full rounded-l-[10px] lg:pb-[36px] pb-24">
                            <h1 className="text-[#222943] lg:text-[24px] text-[18px] font-Noto-Sans-Bengali font-bold 2xl:pl-5 pl-3 2xl:pt-5 pt-3">
                              পরিমাপের নাম
                            </h1>

                            <div className="lg:mt-5 mt-3 flex flex-wrap 2xl:gap-5 lg:gap-3 gap-3 2xl:pl-5 pl-3">
                              {measurementsData.data.find(
                                (item: any) =>
                                  item.name === forms[i].selectedCategory
                              )?.measurements &&
                                (() => {
                                  const newMeasurement =
                                    measurementsData.data.find(
                                      (item: any) =>
                                        item.name === forms[i].selectedCategory
                                    );

                                  return newMeasurement?.measurements?.map(
                                    (item: any, index: number) => {
                                      return (
                                        <div
                                          key={index}
                                          className="flex flex-col"
                                        >
                                          <label
                                            htmlFor={item}
                                            className="text-black 2xl:text-[18px] lg:text-[16px] text-[14px] font-Noto-Sans-Bengali font-medium"
                                          >
                                            {item}
                                          </label>
                                          <Controller
                                            name={`item.${[
                                              i,
                                            ]}.measurement.${item}`}
                                            control={control}
                                            render={({ field }) => (
                                              <input
                                                {...field}
                                                id={item}
                                                className="2xl:w-[100px] lg:w-[70px] w-[60px] h-[50px] rounded-[8px] border-[1px] border-[#BCBEC6] outline-0 pl-3"
                                                type="text"
                                              />
                                            )}
                                          />
                                        </div>
                                      );
                                    }
                                  );
                                })()}
                            </div>

                            <div className="w-full h-[0.4px] bg-[#BCBEC6] lg:my-5 my-3"></div>

                            <h1 className="text-[#222943] lg:text-[24px] text-[18px] font-Noto-Sans-Bengali font-bold 2xl:pl-5 pl-3 ">
                              লুজের মাপ (ঐচ্ছিক)
                            </h1>

                            <div className="md:flex justify-between">
                              <div className="lg:mt-5 mt-3 flex flex-wrap 2xl:gap-5 lg:gap-3 gap-3 2xl:pl-5 pl-3">
                                {measurementsData.data.find(
                                  (item: any) =>
                                    item.name === forms[i].selectedCategory
                                )?.looseItems &&
                                  (() => {
                                    const newMeasurement =
                                      measurementsData.data.find(
                                        (item: any) =>
                                          item.name ===
                                          forms[i].selectedCategory
                                      );

                                    return newMeasurement?.looseItems?.map(
                                      (item: any, looseItemsindex: number) => {
                                        return (
                                          <div
                                            key={looseItemsindex}
                                            className="flex flex-col"
                                          >
                                            <label
                                              htmlFor={item}
                                              className="text-black 2xl:text-[18px] lg:text-[16px] text-[14px] font-Noto-Sans-Bengali font-medium"
                                            >
                                              {item}
                                            </label>
                                            <Controller
                                              name={`item.${[
                                                i,
                                              ]}.lugeSize.[${item}]`}
                                              control={control}
                                              defaultValue=""
                                              render={({ field }) => (
                                                <input
                                                  {...field}
                                                  id={item}
                                                  className="2xl:w-[100px] lg:w-[70px] w-[60px] h-[50px] rounded-[8px] border-[1px] border-[#BCBEC6] outline-0 pl-3"
                                                  type="text"
                                                />
                                              )}
                                            />
                                          </div>
                                        );
                                      }
                                    );
                                  })()}
                              </div>

                              <>
                                {measurementsData.data.find(
                                  (item: any) =>
                                    item.name === forms[i].selectedCategory
                                ) &&
                                  (() => {
                                    const newMeasurement =
                                      measurementsData.data.find(
                                        (item: any) =>
                                          item.name ===
                                          forms[i].selectedCategory
                                      );
                                    return (
                                      <div>
                                        <img
                                          className="2xl:w-[252px] lg:w-[220px] w-[106px] 2xl:h-[282px] lg:h-[230px] h-[120px] mr-3 mt-[-190px] ml-[190px] md:mt-0 md:ml-0"
                                          src={newMeasurement?.image}
                                          alt=""
                                          {...register(`item.${[i]}.image`)}
                                        />
                                        <input
                                          type="hidden"
                                          value={newMeasurement?.image}
                                          {...register(`item.${[i]}.image`)}
                                        />
                                      </div>
                                    );
                                  })()}
                              </>
                            </div>
                          </div>
                          {/* part 2 */}

                          <div className="bg-[#F9FAFE] 2xl:w-[745px] 2mid75:w-full lg:w-full w-full border-[#BCBEC6] lg:border-l rounded-r-[10px] rounded-l-[10px] lg:rounded-l-none">
                            <div className="2xl:p-5 p-3">
                              <h1 className="text-[#222943] lg:text-[24px] text-[18px] font-Noto-Sans-Bengali font-bold">
                                ডিজাইন স্টাইল
                              </h1>

                              <div className="lg:mt-5 mt-3 lg:flex flex-row-reverse gap-5 ">
                                <div className="flex flex-col lg:gap-2 2large:gap-2 gap-[12px]">
                                  <div>
                                    <>
                                      {measurementsData.data.find(
                                        (item: any) =>
                                          item.name ===
                                          forms[i].selectedCategory
                                      ) &&
                                        (() => {
                                          const newMeasurement =
                                            measurementsData.data.find(
                                              (item: any) =>
                                                item.name ===
                                                forms[i].selectedCategory
                                            );
                                          return (
                                            <div className="space-y-2">
                                              {newMeasurement?.subCategories.map(
                                                (
                                                  singleStyle: any,
                                                  styleIndex: number
                                                ) => {
                                                  return (
                                                    <div className="relative 2xl:w-[340px] 2large:w-[270px] lg:w-[230px] 2makbook:w-[200px] w-full">
                                                      <label
                                                        key={styleIndex}
                                                        onClick={() =>
                                                          toggleCheckbox(
                                                            i,
                                                            singleStyle,
                                                            styleIndex
                                                          )
                                                        } // Corrected: Using onClick to toggle
                                                        className={`flex items-center border rounded-lg p-[15px] cursor-pointer ${
                                                          checkedItems.includes(
                                                            styleIndex
                                                          )
                                                            ? "border-pink-500 bg-pink-100"
                                                            : "border-gray-300"
                                                        }`}
                                                      >
                                                        <input
                                                          type="checkbox"
                                                          checked={checkedItems.includes(
                                                            styleIndex
                                                          )}
                                                          onChange={() =>
                                                            toggleCheckbox(
                                                              i,
                                                              singleStyle,
                                                              styleIndex
                                                            )
                                                          }
                                                          className="hidden form-checkbox h-5 w-5 text-blue-100"
                                                        />

                                                        <div className="flex items-center gap-2">
                                                          <div
                                                            className={`lg:w-6 lg:h-6 md:w-6 md:h-6 w-[20px] h-[20px] rounded-[4px] flex items-center justify-center cursor-pointer relative ${
                                                              checkedItems.includes(
                                                                styleIndex
                                                              )
                                                                ? "bg-[#F00C89] border-0"
                                                                : "border-[1px] border-[#E5E5E5]"
                                                            }`}
                                                          >
                                                            {checkedItems.includes(
                                                              styleIndex
                                                            ) && (
                                                              <div className="absolute inset-0 flex items-center justify-center">
                                                                <GrFormCheckmark
                                                                  className={`md:size-6 size-5 text-white`}
                                                                />
                                                              </div>
                                                            )}
                                                          </div>
                                                        </div>

                                                        <span
                                                          className={`ml-4 font-bold  ${
                                                            checkedItems.includes(
                                                              styleIndex
                                                            )
                                                              ? "text-pink-500"
                                                              : "text-gray-700"
                                                          }`}
                                                        >
                                                          {singleStyle}
                                                        </span>
                                                      </label>
                                                    </div>
                                                  );
                                                }
                                              )}
                                            </div>
                                          );
                                        })()}
                                    </>
                                  </div>
                                </div>

                                {/* dropdown style 2nd pard */}

                                <div className=" mt-[30px] lg:mt-0">
                                  <div className="flex flex-col !lg:gap-5 !gap-[10px] 2xl:w-[340px] 2large:w-[270px] lg:w-[230px] 2makbook:w-[200px] w-full">
                                    {measurementsData.data.find(
                                      (item: any) =>
                                        item.name === forms[i].selectedCategory
                                    )?.styles &&
                                      (() => {
                                        const newDropStyles =
                                          measurementsData.data.find(
                                            (item: any) =>
                                              item.name ===
                                              forms[i].selectedCategory
                                          );

                                          
                                        return newDropStyles?.styles?.map(
                                          (
                                            style: any,
                                            dropDownIndex: number
                                          ) => (
                                            <div
                                              key={dropDownIndex}
                                              className="flex flex-col "
                                            >
                                              <div
                                                onClick={() =>
                                                  handleToggleDropDown(
                                                    i,
                                                    dropDownIndex
                                                  )
                                                }
                                                className="relative 2xl:w-[340px] 2large:w-[270px] lg:w-[230px] 2makbook:w-[200px] w-full h-[56px] rounded-[8px] border-[1px] border-[#BCBEC6] bg-white outline-0 px-5 md:text-[18px] text-[14px] font-Noto-Sans-Bengali flex items-center justify-between cursor-pointer"
                                              >
                                                {console.log(style)}
                                                {style?.category}

                                                <IoIosArrowDown className=" size-6 text-black absolute top-[30%] right-4" />
                                              </div>
                                              {visibleDropdown[
                                                `${i}-${dropDownIndex}`
                                              ] && (
                                                <div
                                                  className="absolute z-10 mt-16 w-[250px] p-[10px] rounded-[8px] bg-white"
                                                  style={{
                                                    boxShadow:
                                                      "0px 5px 30px 0px rgba(0, 0, 0, 0.30)",
                                                  }}
                                                >
                                                  {style?.subCategories?.map(
                                                    (
                                                      dropDownSubStyle: any,
                                                      dropDownSubIndex: number
                                                    ) => (
                                                      <div
                                                        key={dropDownSubIndex}
                                                        onClick={() =>
                                                          handleActiveDropDown(
                                                            i,
                                                            style
                                                          )
                                                        }
                                                        className="px-[10px] py-[6px] rounded cursor-pointer hover:bg-activeDhcolor"
                                                      >
                                                        {dropDownSubStyle}
                                                      </div>
                                                    )
                                                  )}
                                                </div>
                                              )}
                                            </div>
                                          )
                                        );
                                      })()}
                                  </div>
                                  

                                  {/* note add */}
                                  <div className="w-full lg:hidden block mt-[30px]">
                                    <h3 className="text-[#222943] text-[24px] font-bold  mb-3">
                                      নোট লিখুন
                                    </h3>

                                    <input
                                      type="text"
                                      className="w-full h-[60px] border-[1px] border-[#BCBEC6] rounded-[8px] bg-white pl-4 placeholder:text-[18px] font-Noto-Sans-Bengali font-normal placeholder:text-switchColor outline-0"
                                      placeholder="এখানে লিখুন"
                                      {...register(`item.${[i]}.note`)}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="border border-t"></div>

                        <div className="w-full  p-5  lg:block hidden">
                          <h3 className="text-[#222943] text-[24px] font-bold 2xl:mb-5 mb-2">
                            নোট লিখুন
                          </h3>
                          <input
                            type="text"
                            className="w-full h-[60px] border-[1px] border-[#BCBEC6] rounded-[8px] bg-white pl-4 placeholder:text-[18px] font-Noto-Sans-Bengali font-normal placeholder:text-switchColor outline-0"
                            placeholder="এখানে লিখুন"
                            {...register(`item.${[i]}.note`)}
                          />
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="w-full bg-[#F9FAFE] lg:h-[150px] h-[96px] border-t border-[#BCBEC6]  rounded-b-[10px] text-btnColor font-Noto-Sans-Bengali text-16px] font-normal flex justify-center items-center">
                    এখন পর্যন্ত কোন ক্যাটাগরি সিলেক্ট করা হয়নি
                  </div>
                )}
              </div>
            </>
          ))}

          <div>
            {/* add button */}
            <div className="2xl:mt-[30px] mt-5">
              <button
                type="button"
                onClick={addForm}
                className="bg-activeDhcolor w-full h-[50px] rounded-[8px] flex justify-center items-center gap-2 text-[#F00C89] text-[18px] font-medium font-Noto-Sans-Bengali"
              >
                <FiPlus className="size-6 " />
                <p>যোগ করুন</p>
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-[30px]">
          <button
            className={`bg-gray-btnColor lg:w-[152px] w-[147px] h-[50px] rounded-[6px] flex justify-center items-center gap-2 text-white text-[18px] font-medium font-Noto-Sans-Bengali`}
          >
            <CgCloseR className="size-6" />
            <p>বাতিল করুন</p>
          </button>

          <button
            type="submit"
            className={`bg-[#F00C89] lg:w-[207px] w-[207px] h-[50px] rounded-[6px] flex justify-center items-center gap-2 text-white text-[18px] font-medium font-Noto-Sans-Bengali`}
          >
            <FiSave className="size-6" />
            <p>সেভ ও প্রিন্ট করুন </p>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateIndividualOrderOptional;
