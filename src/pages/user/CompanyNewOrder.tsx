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
import Selector from "../../components/Selector/Selector";
import { useAppSelector } from "../../redux/features/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useGetSettingDataQuery } from "../../redux/api/settingApi";
import { useGetMeasurementsQuery } from "../../redux/api/measurementApi";
import Loader from "../../components/Loader/Loader";
import { useForm, Controller, FieldValues } from "react-hook-form";
import { useCreateCompanyOrderMutation } from "../../redux/api/companyOrderApi";
import { CgCloseR } from "react-icons/cg";
import { number } from "zod";
import { GrFormCheckmark } from "react-icons/gr";

export type TIndustryOrder = {
  _id?: string;
  admin: string;
  customerName: string;
  folder: string;
  industry: string;
  orderId: string;
  phoneNumber: string;
  orderStatus: string;
  tryerDate: string;
  orderDate: string;
  deliveryDate: string;
  item: [
    {
      category: string;
      measurement: object[];
      lugeSize: string[];
      quantity: number;
      styles: [{ id: number; style: "" }];
      dropDrownStyles: [{ mainDropDrownStyle: ""; subDropDrownStyle: "" }];
      note: string;
    }
  ];
};

const CompanyNewOrder = () => {
  const [industrySelected, stIndustrySelected] = useState("");
  const [openPocketText, setOpenPocketText] = useState("");

  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const toggleCheckbox = (styleIndex: number) => {
    // console.log(styleIndex);
    setCheckedItems((prev) =>
      prev.includes(styleIndex)
        ? prev.filter((item) => item !== styleIndex)
        : [...prev, styleIndex]
    );
  };

  const [createCompanyOrder] = useCreateCompanyOrderMutation();

  const [forms, setForms] = useState([
    {
      selectedCategory: "",
      isOpen: false,
      pocketStyle: [],
      isOpenPocket: false,
      isChecked: false,
      styles: [{ id: number, style: "" }],
      isVisible: false,
      count: 1,
    },
  ]);

  const currentData = useAppSelector(selectCurrentUser);

  // const categoryByForm = useMemo(
  //   () => forms.map((form) => form.selectedCategory),
  //   [forms]
  // );

  // const measurement = useGetMeasurementQuery({
  //   admin: currentData?.id,
  //   name: categoryByForm,
  // });

  const handleSelect = (category: string, i: number) => {
    const updatedForms = [...forms];
    updatedForms[i].selectedCategory = category;
    updatedForms[i].isOpen = false;
    updatedForms[i].isVisible = true;
    setForms(updatedForms);
  };

  // useEffect(() => {
  //   if (!measurement?.data) return;
  // }, [measurement.data]);

  // const handlePocketSelect = (
  //   index: number,
  //   style: string,
  //   styleCategory: string
  // ) => {
  //   const styleObj = {
  //     styleCategory,
  //     style,
  //   };
  //   const updatedForms = [...forms];
  //   updatedForms[index].pocketStyle.push(styleObj as any);
  //   updatedForms[index].isOpenPocket = false;
  //   setForms(updatedForms);
  // };

  // const handleCheckboxChange = (index: number) => {
  //   const updatedForms = [...forms];
  //   updatedForms[index].isChecked = !updatedForms[index].isChecked;
  //   setForms(updatedForms);
  // };

  // const toggleVisibility = (index: number) => {
  //   const updatedForms = [...forms];
  //   updatedForms[index].isVisible = !updatedForms[index].isVisible;
  //   setForms(updatedForms);
  // };

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
        selectedCategory: "",
        isOpen: false,
        pocketStyle: [],
        isOpenPocket: false,
        isChecked: false,
        styles: [{ id: number, style: "" }],
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
    data.industry = industrySelected;
    // data.admin: currentData?.id;
    const res = await createCompanyOrder({ ...data, admin: currentData?.id });
    console.log(res);
    console.log(data);
  };
  if (isLoading || measurementsDataLoading) {
    return <Loader />;
  }

  function toggleVisibility(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="no-select">
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
                  প্রতিষ্ঠান
                  <span className="text-[#FF5151] font-bold font-Noto-Sans-Bengali">
                    *
                  </span>
                </h1>

                <Selector
                  setIndustrySelected={stIndustrySelected}
                  industrySelected={industrySelected}
                  className=""
                ></Selector>
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
                            className="h-[51px] pl-5 lg:text-[18px] md:text-[16px] text-[12px] text-switchColor font-Poppins font-normal outline-none rounded-[8px] cursor-pointer"
                            type="text"
                            readOnly
                            value={form.selectedCategory}
                            placeholder="Select a category"
                            {...register(`item.${[i]}.category`)}
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
                                  // {...register(`item.${[i]}.category`)}
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
                        onClick={() => toggleVisibility()}
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
                                                  item: any,
                                                  styleIndex: number
                                                ) => {
                                                  return (
                                                    <div className="relative 2xl:w-[340px] 2large:w-[270px] lg:w-[230px] 2makbook:w-[200px] w-full">
                                                      <label
                                                        key={styleIndex}
                                                        onClick={() =>
                                                          toggleCheckbox(
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
                                                          {...register(
                                                            `item.${[i]}.style`
                                                          )}
                                                          onChange={() =>
                                                            toggleCheckbox(
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
                                                          {item}
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
                                          (style: any, stylesi: number) => (
                                            <div
                                              key={stylesi}
                                              className="flex flex-col "
                                            >
                                              <div
                                                className="relative 2xl:w-[340px] 2large:w-[270px] lg:w-[230px] 2makbook:w-[200px] w-full h-[56px] rounded-[8px] border-[1px] border-[#BCBEC6] bg-white outline-0 px-5 md:text-[18px] text-[14px] font-Noto-Sans-Bengali flex items-center justify-between cursor-pointer"
                                                onClick={() =>
                                                  setOpenPocketText(
                                                    openPocketText
                                                      ? style?.category
                                                      : style?.category
                                                  )
                                                }
                                              >
                                                {style?.category}
                                                {/* <input
                                                  className="w-full outline-none bg-transparent placeholder:text-black"
                                                  type="text"
                                                  value={
                                                    forms[i].pocketStyle.find(
                                                      (pocketStyleData) =>
                                                        pocketStyleData?.subStyle ===
                                                        style?.category
                                                    )?.style?.category
                                                  }
                                                  readOnly-
                                                /> */}
                                                <IoIosArrowDown className=" size-6 text-black absolute top-[30%] right-4" />
                                              </div>
                                              {style?.category ===
                                                openPocketText && (
                                                <div
                                                  className="absolute z-10 mt-16 w-[250px] p-[10px] rounded-[8px] bg-white"
                                                  style={{
                                                    boxShadow:
                                                      "0px 5px 30px 0px rgba(0, 0, 0, 0.30)",
                                                  }}
                                                >
                                                  {style?.subCategories?.map(
                                                    (
                                                      subStyle: string,
                                                      subI: number
                                                    ) => (
                                                      <div
                                                        key={subI}
                                                        className="px-[10px] py-[6px] rounded cursor-pointer hover:bg-activeDhcolor"
                                                        // onClick={() => {
                                                        //   handlePocketSelect(
                                                        //     i,
                                                        //     subStyle,
                                                        //     style?.category
                                                        //   );
                                                        //   setOpenPocketText("");
                                                        // }}
                                                      >
                                                        {subStyle}
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

export default CompanyNewOrder;
