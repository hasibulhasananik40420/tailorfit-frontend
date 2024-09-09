/* eslint-disable react-refresh/only-export-components */

import { useEffect } from "react";

import "../../custom-css/CustomColorPicker.css";
import { FiSave } from "react-icons/fi";
import { FieldValues, useForm } from "react-hook-form";
import {
  useCreateSettingMutation,
  useGetSettingDataQuery,
} from "../../redux/api/settingApi";
import { useAppSelector } from "../../redux/features/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
// import { IoMdClose } from "react-icons/io";
import Loader from "../../components/Loader/Loader";

/**
 *
 * coment kora kono code soraben na
 *
 **/

// interface ColorItem {
//   _id: number;
//   colorCode: string;
// }

// const colorData: ColorItem[] = [
//   {
//     _id: 1,
//     colorCode: "#FF0FAD",
//   },

//   {
//     _id: 2,
//     colorCode: "#800020",
//   },

//   {
//     _id: 3,
//     colorCode: "#36454F",
//   },

//   {
//     _id: 4,
//     colorCode: "#FFD700",
//   },

//   {
//     _id: 5,
//     colorCode: "#B76E79",
//   },

//   {
//     _id: 6,
//     colorCode: "#708090",
//   },

//   {
//     _id: 7,
//     colorCode: "#008080",
//   },

//   {
//     _id: 8,
//     colorCode: "#808000",
//   },

//   {
//     _id: 9,
//     colorCode: "#654321",
//   },

//   {
//     _id: 10,
//     colorCode: "#4682B4",
//   },

//   {
//     _id: 11,
//     colorCode: "#D4A190",
//   },

//   {
//     _id: 12,
//     colorCode: "#8A9A5B",
//   },
//   {
//     _id: 13,
//     colorCode: "#7E587E",
//   },
//   {
//     _id: 14,
//     colorCode: "#B39C86",
//   },

//   {
//     _id: 15,
//     colorCode: "#6B8E23",
//   },
//   {
//     _id: 16,
//     colorCode: "#6A0DAD",
//   },
//   {
//     _id: 17,
//     colorCode: "#C50",
//   },

//   {
//     _id: 18,
//     colorCode: "#005F5F",
//   },
//   {
//     _id: 19,
//     colorCode: "#F00C89",
//   },

//   {
//     _id: 20,
//     colorCode: "#69C",
//   },

//   {
//     _id: 21,
//     colorCode: "#40E0D0",
//   },

//   {
//     _id: 22,
//     colorCode: "#E2725B",
//   },

//   {
//     _id: 23,
//     colorCode: "#87CEEB",
//   },

//   {
//     _id: 24,
//     colorCode: "#B7410E",
//   },
//   {
//     _id: 25,
//     colorCode: "#C8A2C8",
//   },

//   {
//     _id: 26,
//     colorCode: "#9DC183",
//   },
//   {
//     _id: 27,
//     colorCode: "#FF91A4",
//   },

//   {
//     _id: 28,
//     colorCode: "#367588",
//   },
// ];

export const validationSchema = z.object({
  trialPeriod: z
    .string()
    .min(1, "ট্রায়াল সময়কাল লিখুন")
    .refine((value) => /^\d+$/.test(value), {
      message: " সংখ্যায় প্রবেশ করান",
    }),
  deliveryPeriod: z
    .string()
    .min(1, "ডেলিভারি সময়কাল লিখুন")
    .refine((value) => /^\d+$/.test(value), {
      message: " সংখ্যায় প্রবেশ করান",
    }),
  dateOver: z
    .string()
    .min(1, "ডেট অভার সময়কাল লিখুন")
    .refine((value) => /^\d+$/.test(value), {
      message: "সংখ্যায় প্রবেশ করান",
    }),
  worksDeleveryPeriod: z
    .string()
    .min(1, "ডেট অভার সময়কাল লিখুন")
    .refine((value) => /^\d+$/.test(value), {
      message: "সংখ্যায় প্রবেশ করান",
    }),
    orderIdStart: z
    .string()
    .min(1, "ডেট অভার সময়কাল লিখুন")
    .refine((value) => /^\d+$/.test(value), {
      message: "সংখ্যায় প্রবেশ করান",
    }),
  deleveryPeriod: z
    .string()
    .min(1, "ডেট অভার সময়কাল লিখুন")
    .refine((value) => /^\d+$/.test(value), {
      message: "সংখ্যায় প্রবেশ করান",
    }),
});

export const defaultValues = {
  trialPeriod: "",
  deliveryPeriod: "",
  dateOver: "",
  worksDeleveryPeriod: "",
  deleveryPeriod: "",
  orderIdStart: "",
};

const GeneralSettings = () => {
  // const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // const handleBoxClick = (index: number) => {
  //   setActiveIndex(index === activeIndex ? null : index);
  // };

  // const initialColor = "#F00C89";
  // const [color, setColor] = useState(initialColor);
  // const [isPickerVisible, setIsPickerVisible] = useState(false);

  // const togglePicker = () => {
  //   setIsPickerVisible(!isPickerVisible);
  // };

  // const resetColor = () => {
  //   setColor(initialColor);
  //   setIsPickerVisible(false);
  // };

  //  handle all logic here
  const userData = useAppSelector(selectCurrentUser);

  const { data, isLoading } = useGetSettingDataQuery(userData?.id);
  // console.log(data?.data);

  const [createSetting] = useCreateSettingMutation();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(validationSchema),
    // defaultValues: defaultValues,
    defaultValues,
  });

  useEffect(() => {
    if (data?.data) {
      setValue("trialPeriod", data?.data?.trialPeriod || "");
      setValue("deliveryPeriod", data?.data?.deliveryPeriod || "");
      setValue("dateOver", data?.data?.dateOver || "");
      setValue("orderIdStart", data?.data?.orderIdStart || "");
      setValue("worksDeleveryPeriod", data?.data?.worksDeleveryPeriod || "");
      setValue("deleveryPeriod", data?.data?.deleveryPeriod || "");
    }
  }, [data, setValue]);

  const handleSetting = async (data: FieldValues) => {
    data.themeColor = "#3333";
    data.admin = userData?.id;


    try {
      const res = await createSetting(data).unwrap();
      //  console.log(res)
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
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <form onSubmit={handleSubmit(handleSetting)}>
      <div
        className="bg-white rounded-[10px] min-h-[480px]"
        style={{ boxShadow: "0px 0px 25px 0px rgba(22, 22, 22, 0.03)" }}
      >
        <div className="2xl:p-[30px] lg:p-[15px] md:p-5 p-4">
          <h2 className="text-[#222943] text-[24px] font-bold font-Noto-Sans-Bengali">
            ডেট সেটিংস
          </h2>

          <div className=" w-full lg:mt-5 mt-4">
            <div className="lg:flex items-center justify-between w-full">
             
             
              <div className="flex gap-[10px] lg:gap-20">
                <div className="relative">
                  <div className="lg:flex items-center justify-between gap-5 w-full">
                    <h1 className="text-switchColor lg:text-[18px] text-[14px] font-Noto-Sans-Bengali font-semibold mb-[0px] lg:mb-0 ">
                      ট্রায়াল সময়কাল
                    </h1>

                    <input
                      {...register("trialPeriod")}
                      className={` 2xl:max-w-[90px] lg:max-w-[90px] w-full h-[50px] border-b border-secondaryColor bg-white text-secondaryColor outline-0 px-3 md:text-[18px] text-[14px] font-Poppins font-normal placeholder-secondaryColor`}
                      type="text"
                    />
                    <p className="absolute lg:top-[14px] md:top-[45px] top-[50px]  right-3 md:text-[18px] text-[14px] font-Noto-Sans-Bengali font-normal placeholder-[#999] text-secondaryColor">
                      দিন
                    </p>
                  </div>

                  {errors.trialPeriod && (
                    <p className="text-[#F00C89] md:text-[18px] text-[14px] font-Noto-Sans-Bengali font-normal text-right">
                      {errors.trialPeriod.message}
                    </p>
                  )}
                </div>
              </div>





              <div className="w-[1px] h-[50px] bg-[#999] lg:block hidden"></div>

              <div className="flex gap-[10px] lg:gap-10 ">
                <div className="relative">
                  <div className="lg:flex items-center justify-between gap-5  w-full ">
                    <h1 className="text-switchColor lg:text-[18px] text-[14px] font-Noto-Sans-Bengali font-semibold mb-[10px] lg:mb-0 ">
                      ডেলিভারি সময়কাল
                    </h1>

                    <input
                      {...register("deleveryPeriod")}
                      className={`2xl:max-w-[90px] lg:max-w-[90px] w-full h-[50px] border-b border-secondaryColor bg-white outline-0 px-3 md:text-[18px] text-[14px] font-Poppins font-normal text-secondaryColor placeholder-secondaryColor`}
                      type="text"
                    />
                    <p className="absolute lg:top-[14px] md:top-[45px] top-[50px] right-3 md:text-[18px] text-[14px] font-Noto-Sans-Bengali font-normal placeholder-[#999] text-secondaryColor">
                      দিন
                    </p>
                  </div>
                  {errors.deleveryPeriod && (
                    <p className="text-[#F00C89] md:text-[18px] text-[14px] font-Noto-Sans-Bengali font-normal text-right">
                      {errors.deleveryPeriod.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="w-[1px] h-[50px] bg-[#999] lg:block hidden"></div>

              <div className="flex gap-[10px] lg:gap-10">
                <div className="relative">
                  <div className="lg:flex items-center justify-between gap-5  w-full ">
                    <h1 className="text-switchColor lg:text-[18px] text-[14px] font-Noto-Sans-Bengali font-semibold mb-[10px] lg:mb-0 ">
                      ওয়ার্কার ডেলিভারি সময়কাল
                    </h1>

                    <input
                      {...register("worksDeleveryPeriod")}
                      className={` 2xl:max-w-[90px] lg:max-w-[90px] w-full h-[50px] border-b border-secondaryColor bg-white text-secondaryColor outline-0 px-3 md:text-[18px] text-[14px] font-Poppins font-normal placeholder-secondaryColor`}
                      type="text"
                    />
                    <p className="absolute lg:top-[14px] md:top-[45px] top-[50px]  right-3 md:text-[18px] text-[14px] font-Noto-Sans-Bengali font-normal placeholder-[#999] text-secondaryColor">
                      দিন
                    </p>
                  </div>

                  {errors.worksDeleveryPeriod && (
                    <p className="text-[#F00C89] md:text-[18px] text-[14px] font-Noto-Sans-Bengali font-normal text-right">
                      {errors.worksDeleveryPeriod.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="w-full h-[1px] border-b border-secondaryColor my-10"></div>

            <div className="md:flex justify-between">
              <div className="flex gap-[10px] lg:gap-10">
                <div className="relative">
                  <div className="lg:flex items-center justify-between gap-5  w-full mt-4 lg:mt-0">
                    <h1 className="text-switchColor lg:text-[18px] text-[14px] font-Noto-Sans-Bengali font-semibold mb-[10px] lg:mb-0 ">
                      ডেট অভার সময়কাল
                    </h1>

                    <input
                      {...register("dateOver")}
                      className={`2xl:max-w-[90px] lg:max-w-[90px] w-full h-[50px] border-b border-secondaryColor bg-white text-secondaryColor outline-0 px-3 md:text-[18px] text-[14px] font-Poppins font-normal placeholder-secondaryColor`}
                      type="text"
                    />
                    <p className="absolute lg:top-[14px] md:top-[45px] top-[50px] right-3 md:text-[18px] text-[14px] font-Noto-Sans-Bengali font-normal placeholder-[#999] text-secondaryColor">
                      দিন
                    </p>
                  </div>

                  {errors.dateOver && (
                    <p className="text-[#F00C89] md:text-[18px] text-[14px] font-Noto-Sans-Bengali font-normal text-right">
                      {errors.dateOver.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-[10px] lg:gap-10">
                <div className="relative">
                  <div className="lg:flex items-center justify-between gap-5  w-full mt-4 lg:mt-0">
                    <h1 className="text-switchColor lg:text-[18px] text-[14px] font-Noto-Sans-Bengali font-semibold mb-[10px] lg:mb-0 ">
                      অর্ডার শুরুর নাম্বার
                    </h1>

                    {/* <input
                      {...register("orderIdStart")}
                      className={`2xl:max-w-[90px] lg:max-w-[90px] w-full h-[50px] border-b border-secondaryColor bg-white text-secondaryColor outline-0 px-3 md:text-[18px] text-[14px] font-Poppins font-normal placeholder-secondaryColor`}
                      type="text"
                    /> */}

                    <input
                      {...register("orderIdStart", {
                        required: true,
                        
                      })}
                      className={`2xl:max-w-[90px] lg:max-w-[90px] w-full h-[50px] border-b border-secondaryColor bg-white text-secondaryColor outline-0 px-3 md:text-[18px] text-[14px] font-Poppins font-normal placeholder-secondaryColor`}
                      type="text"
                      maxLength={4} // Limits to 4 digits
                      placeholder="0000" // Example placeholder for 4 digits
                    />

                    {/* <p className="absolute lg:top-[14px] md:top-[45px] top-[50px] right-3 md:text-[18px] text-[14px] font-Noto-Sans-Bengali font-normal placeholder-[#999] text-secondaryColor">
                      দিন
                    </p> */}
                  </div>

                  {/* {errors.orderIdStart && (
                    <p className="text-[#F00C89] md:text-[18px] text-[14px] font-Noto-Sans-Bengali font-normal text-right">
                      {errors.orderIdStart.message}
                    </p>
                  )} */}
                </div>
              </div>
            </div>

            <div className="lg:flex items-center gap-10 lg:mt-5 mt-4"></div>
          </div>

          {/* theme setting */}
          {/* <div className="md:mt-[60px] mt-5 relative">
            <h2 className="text-[#222943] text-[24px] font-bold font-Noto-Sans-Bengali">
              থিম সেটিংস
            </h2>

            <div className=" flex flex-wrap items-center  gap-4 md:mt-[30px] mt-5">
              

              <div className=" lg:w-[272px] w-full border border-[#BCBEC6] rounded-md your-component">
                <div className="bg-[#F9FAFE] rounded-t-[6px] border-b w-full h-[54px] flex justify-center items-center">
                  <p className="text-secondaryColor text-[18px] font-Noto-Sans-Bengali font-semibold">
                    কাস্টম কালার দিন
                  </p>
                </div>

                <div className="flex">
                  <div
                    className="w-[66px] h-[64px] overflow-hidden cursor-pointer  rounded-l-sm"
                    onClick={togglePicker}
                  >
                    <div
                      style={{
                        backgroundColor: color,
                        height: "100%",
                        width: "100%",
                      }}
                    ></div>
                  </div>
                  <div className="flex items-center ml-4">
                    <span className="text-secondaryColor text-[18px] font-Poppins font-medium">
                      {color} 
                    </span>
                  </div>
                </div>

                {isPickerVisible && (
                  <div
                    className="bg-white p-4 rounded-[8px] absolute top-3 lg:left-[300px] left-6"
                    style={{
                      boxShadow: "0px 0px 30px 0px rgba(0, 0, 0, 0.25)",
                    }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[18px] font-Noto-Sans-Bengali font-normal text-black">
                        কালার নির্বাচন করুন
                      </span>
                      <IoMdClose
                        onClick={togglePicker}
                        className="size-5 cursor-pointer"
                      />
                    </div>
                    <HexColorPicker color={color} onChange={setColor} />
                    <div className="">
                      <div className="flex justify-between items-center mt-4">
                        <div className="">
                          <span className="text-[14px] text-left text-switchColor font-Noto-Sans-Bengali font-normal">
                            হেক্স
                          </span>
                        </div>
                        <div
                          className="px-[6px] py-[4px] min-w-[90px] border-[1px] border-[#E5E7EB] rounded flex gap-1 items-center"
                          style={{
                            boxShadow: "0px 1px 2px 0px rgba(31, 41, 55, 0.08)",
                          }}
                        >
                          <span className="text-[14px] text-black font-Noto-Sans-Bengali font-normal">
                            {color}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <button
                          onClick={resetColor}
                          className="text-primaryColor text-[14px] font-Noto-Sans-Bengali font-medium"
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {colorData.map((colorItem, index) => (
                <div
                  key={colorItem._id}
                  className={`${
                    index === activeIndex
                      ? "outline outline-[2px] outline-[#F00C89] rounded-[13px] p-[4px]"
                      : "p-[4px]"
                  }`}
                >
                  <div
                    className={`lg:w-[121px] lg:h-[121px] md:w-[60px] md:h-[60px] w-10 h-10 md:rounded-[10px] rounded-md`}
                    style={{ backgroundColor: colorItem.colorCode }}
                    onClick={() => handleBoxClick(index)}
                  ></div>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>

      <div className="2xl:mt-[30px] mt-5 w-full flex justify-end">
        <button
          className={`bg-[#F00C89] border-[1px] border-[#F00C89] lg:w-[152px] w-[147px] h-[50px] rounded-[6px] flex justify-center items-center gap-2 text-white text-[18px] font-medium font-Noto-Sans-Bengali`}
        >
          <FiSave className="size-6" />
          <p>সেভ করুন</p>
        </button>
      </div>
    </form>
  );
};

export default GeneralSettings;
