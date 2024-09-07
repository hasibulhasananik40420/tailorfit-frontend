/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { Link } from "react-router-dom";
import ReuseMainForm from "../../components/ReuseForm/ReuseMainForm";
import { FieldValues } from "react-hook-form";
import ReuseInputFile from "../../components/ReuseForm/ReuseInputFile";
import ReuseInput from "../../components/ReuseForm/ReuseInput";
import { useUpdateProfileMutation } from "../../redux/features/auth/updateProfile";
import { useAppDispatch, useAppSelector } from "../../redux/features/hooks";
import {
  selectCurrentUser,
  updateUser,
} from "../../redux/features/auth/authSlice";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import { useState } from "react";
import AccountSettings from "./AccountSettings";
import { format } from "date-fns";
import { useGetMeQuery } from "../../redux/features/auth/authApi";

export const validationSchema = z.object({
  email: z.string().email("অনুগ্রহ করে সঠিক ইমেইল দিন"),
  name: z.string().min(1, "অনুগ্রহ করে আপনার নাম লিখুন"),
  companyName: z.string().min(1, "অনুগ্রহ করে আপনার কোম্পানির নাম লিখুন"),
  phonePrimary: z
    .string()
    .regex(/^\d{11}$/, "অনুগ্রহ করে সঠিক ফোন নাম্বার দিন"),
    
    phoneSecondary: z
    .string()
    .regex(/^\d{11}$/, "অনুগ্রহ করে সঠিক ফোন নাম্বার দিন")
    .optional()
    .or(z.literal('')),
  address: z
    .string()
    .min(1, "অনুগ্রহ করে সঠিক ঠিকানা দিন")
    .optional()
    .or(z.literal('')),
});

const MyProfile = () => {
  // for view other page function
  const [myProfile, setMyProfile] = useState(true);
  const [mysecurity, setMySecurity] = useState(false);
  const [active, setActive] = useState(false);

  const handleMyProfile = () => {
    setMyProfile(true);
    setMySecurity(false);
    setActive(!active);
  };

  const handleMySecurity = () => {
    setMyProfile(false);
    setMySecurity(true);
    setActive(!active);
  };

  

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const dispatch = useAppDispatch();

  //  for create add data show
  const { data } = useGetMeQuery("");
  // console.log(data);

  const allData = useAppSelector(selectCurrentUser);
  //  console.log(allData)

  const handleProfile = async (data: FieldValues) => {
    //  console.log(data);
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("file", selectedFile as any);

    try {
      const res = await updateProfile(formData).unwrap();
       
      //  console.log(res)
      if (res?.success) {
        Swal.fire({
          icon: "success",
          title: res?.message,
          showConfirmButton: false,
          timer: 3000,
        });
        dispatch(updateUser(res?.data));
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

  return (
    <div>
      <ReuseMainForm
        onSubmit={handleProfile}
        resolver={zodResolver(validationSchema)}
        defaultValues={allData || {}}
      >
        <div
          className="bg-white rounded-[10px]"
          style={{ boxShadow: "0px 0px 25px rgba(22, 22, 22, 0.03)" }}
        >
          <div className="lg:flex 2xl:gap-[30px] gap-4 p-4 2xl:p-[30px]">
            <div className=" 2xl:w-[320px] lg:w-[280px] w-full flex flex-col items-center 2xl:gap-[30px] gap-4">
              <div>
                <ReuseInputFile
                  name="file"
                  setSelectedFile={setSelectedFile}
                  defaultImage={allData?.profile}
                />
              </div>

              <h1 className="lg:text-[24px] text-[18px] lg:max-w-[250px] block overflow-hidden text-ellipsis text-[#1B1B1B] font-Poppins font-bold">
                {allData?.companyName}
              </h1>
              
               {data ? (
          <p className="2xl:text-[18px] text-[14px] text-black font-Poppins font-medium">
           <span className="2xl:text-[18px] text-[14px] text-[#808191] font-Poppins font-normal">
             Member Since:
              </span>{" "}
              {data?.data?.createdAt ? format(new Date(data?.data?.createdAt), 'dd-MM-yyyy') : 'N/A'}
             </p>
              ) : (
           <p>Loading...</p>
           )}

            

               <button className="lg:hidden block w-full bg-[#F00C89]  h-[50px]  mt-4 rounded-[6px]  text-white text-[18px] font-normal font-Poppins ">
                Upgrade Now
              </button>

              <div className=" w-full 2xl:h-[259px] h-[200px] bg-btn-hover p-5 2xl:mt-[210px] lg:mt-[190px] mt-[40px] rounded-[10px] lg:block hidden">
                <h1 className="w-[150px] text-white 2xl:text-[24px] text-[18px] font-Noto-Sans-Bengali font-extrabold 2xl:leading-[31.2px] leading-6">
                আপগ্রেড
                মেম্বারশিপ
                </h1>

                <p className="2xl:mt-[10px] mt-2 2xl:text-[18px] text-[14px] text-white font-Poppins font-normal leading-6">
                  Upgrade for exclusive perks and benefits today
                </p>

                <button type="button" className="2xl:w-[280px] w-full bg-white lg:h-[50px] h-[40px] 2xl:mt-[50px] mt-3 rounded-[6px]  text-primaryColor lg:text-[18px] text-[14px] font-medium font-Noto-Sans-Bengali flex justify-center items-center">
                আপগ্রেড করুন
                </button>
              </div>





            </div>

            <div className=" border-[1px] border-l border-[#E5E5E5] lg:block hidden"></div>

            <div className="w-full bg-[#E5E5E5] h-[1px] lg:hidden block my-5"></div>

            <div className="lg:w-[70%] 2xl:w-full">
              <div className="flex items-center gap-[50px] border-b-[1px] border-b-bgBorderColor">
                <div
                  onClick={handleMyProfile}
                  className={`${
                    myProfile
                      ? "border-b-primaryColor  text-primaryColor bg-transparent"
                      : " text-[#333]"
                  } pb-[15px]  bg-transparent border-b-2 border-white cursor-pointer group`}
                >
                  <h2 className=" md:text-[18px] text-[14px] font-Poppins font-medium">
                    My Profile
                  </h2>
                </div>

                <div
                  onClick={handleMySecurity}
                  className={`${
                    mysecurity
                      ? "border-b-primaryColor  text-primaryColor bg-transparen"
                      : "text-[#333]"
                  } pb-[15px] bg-transparent cursor-pointer group border-b-2 border-white`}
                >
                  <h2 className="md:text-[18px] text-[14px] font-Poppins font-medium">
                    Security
                  </h2>
                </div>
              </div>

              {myProfile && (
                <>
                  <h1 className="text-secondaryColor text-[24px] font-Poppins font-semibold 2xl:pt-[50px] lg:pt-[30px] pt-5">
                    Company Info
                  </h1>

                  <div className="2xl:mt-[25px] mt-[10px]">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-[15px] 2xl:gap-[30px] ">
                      <div className="flex flex-col gap-[5px] w-full">
                        <label
                          className="text-switchColor lg:text-[18px] md:text-[18px] text-[14px] font-Noto-Sans-Bengali md:font-semibold font-bold"
                          htmlFor="Phone or Email"
                        >
                          আপনার নাম
                        </label>

                        <ReuseInput
                          name="name"
                          type="text"
                          defaultValue={allData?.name || ""}
                          placeholder="Enter Your Name"
                          className={`2xl:w-[535px]  w-full md:h-[51px] h-[40px] rounded-[6px] border-[1px] border-[#E5E5E5] bg-white outline-0 pl-5 md:text-[18px] text-[14px] font-Poppins font-normal placeholder-[#999] text-secondaryColor placeholder:font-normal `}
                        />
                      </div>

                      <div className="flex flex-col gap-[5px]  w-full">
                        <label
                          className="text-switchColor lg:text-[18px] md:text-[18px] text-[14px] font-Noto-Sans-Bengali md:font-semibold font-bold"
                          htmlFor="Phone or Email"
                        >
                          কোম্পানীর নাম
                        </label>

                        <ReuseInput
                          name="companyName"
                          type="text"
                          defaultValue={allData?.companyName || ""}
                          placeholder="Tailors Name"
                          className={`2xl:w-[535px]  w-full md:h-[51px] h-[40px] rounded-[6px] border-[1px] border-[#E5E5E5] bg-white outline-0 pl-5 md:text-[18px] text-[14px] font-Poppins font-normal placeholder-[#999] text-secondaryColor placeholder:font-normal `}
                        />
                      </div>

                     
                    </div>





                    <div className="flex flex-col gap-[15px] 2xl:gap-[30px] mt-[15px] 2xl:mt-[30px]">
                    <div className="flex flex-col gap-[5px] w-full">
                        <label
                          className="text-switchColor lg:text-[18px] md:text-[18px] text-[14px] font-Noto-Sans-Bengali md:font-semibold font-bold"
                          htmlFor="Phone or Email"
                        >
                          ঠিকানা
                        </label>

                        <ReuseInput
                          name="address"
                          type="text"
                          defaultValue={allData?.address}
                          placeholder="Address"
                          className={`  w-full md:h-[51px] h-[40px] rounded-[6px] border-[1px] border-[#E5E5E5] bg-white outline-0 pl-5 md:text-[18px] text-[14px] font-Poppins font-normal placeholder-[#999] text-secondaryColor placeholder:font-normal `}
                        />
                      </div>

                      <div className="relative flex flex-col gap-[5px]  w-full">
                        <label
                          className="text-switchColor lg:text-[18px] md:text-[18px] text-[14px] font-Noto-Sans-Bengali md:font-semibold font-bold"
                          htmlFor="Phone or Email"
                        >
                          ইমেইল
                        </label>

                        <ReuseInput
                          name="email"
                          type="text"
                          defaultValue={allData?.email || ""}
                          disabled
                          placeholder="Enter Email Address"
                          className={`  w-full md:h-[51px] h-[40px] rounded-[6px] border-[1px] border-[#E5E5E5] bg-[#f7f4f4] outline-0 pl-5 md:text-[18px] text-[14px] font-Poppins font-normal placeholder-[#999] text-secondaryColor placeholder:font-normal `}
                        />
                        <Link
                          to={"/"}
                          className="text-[#F00C89] md:text-[18px] text-[14px] font-Poppins font-normal absolute lg:top-[45px] top-[37px] lg:right-4 right-1"
                        >
                          Change
                        </Link>
                      </div>

                      <div className=" flex flex-col gap-[5px] w-full">
                        <label
                          className="text-switchColor lg:text-[18px] md:text-[18px] text-[14px] font-Noto-Sans-Bengali md:font-semibold font-bold"
                          htmlFor="Phone or Email"
                        >
                          মোবাইল নাম্বার (প্রাইমারি)
                        </label>

                        <ReuseInput
                          name="phonePrimary"
                          type="text"
                          defaultValue={allData?.phonePrimary || ""}
                          // placeholder="+88 01711873451"
                          disabled
                          className={`  w-full md:h-[51px] h-[40px] rounded-[6px] border-[1px] border-[#E5E5E5] bg-[#f7f4f4] outline-0 pl-5 md:text-[18px] text-[14px] font-Poppins font-normal placeholder-[#999] text-secondaryColor placeholder:font-normal `}
                        />
                      </div>

                      <div className="flex flex-col gap-[5px]  w-full">
                        <label
                          className="text-switchColor lg:text-[18px] md:text-[18px] text-[14px] font-Noto-Sans-Bengali md:font-semibold font-bold"
                          htmlFor="Phone or Email"
                        >
                          মোবাইল নাম্বার (সেকেন্ডারি)
                        </label>

                        <ReuseInput
                          name="phoneSecondary"
                          type="text"
                          defaultValue={allData?.phoneSecondary || ""}
                        
                          className={`  w-full md:h-[51px] h-[40px] rounded-[6px] border-[1px] border-[#E5E5E5] bg-white outline-0 pl-5 md:text-[18px] text-[14px] font-Poppins font-normal placeholder-[#999] text-secondaryColor placeholder:font-normal `}
                        />
                      </div>


                    </div>









                  </div>

                 

                  {myProfile && (
                    <div className="flex justify-end 2xl:mt-[30px] lg:mt-6 mt-4">
                      <button
                        type="submit"
                        className="bg-[#F00C89] w-[150px] h-[50px] rounded-md text-[18px] font-Noto-Sans-Bengali font-medium text-white"
                      >
                        {isLoading ? (
                          <span className="loading loading-infinity loading-lg"></span>
                        ) : (
                          "আপডেট করুন"
                        )}
                      </button>
                    </div>
                  )}
                </>
              )}

              <div>{mysecurity && <AccountSettings />}</div>
            </div>
          </div>
        </div>
      </ReuseMainForm>
    </div>
  );
};

export default MyProfile;
