/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, ChangeEvent } from "react";
import AuthNavbar from "../components/Shared/AuthNavbar";
import { FieldValues } from "react-hook-form";
import { useForgetMutation } from "../redux/features/auth/forgetApi";
import { useNavigate } from "react-router-dom";
import ReuseInput from "../components/ReuseForm/ReuseInput";
import ReuseMainForm from "../components/ReuseForm/ReuseMainForm";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";

type ValidationError = {
  path: string;
  message: string;
};

export const validationSchema = z.object({
  data: z.string().email("অনুগ্রহ করে সঠিক ইমেইল দিন"),
});

const ForgotPassword = () => {
  const [isEmail, setIsEmail] = useState(true);
  const [isPhone, setIsPhone] = useState(false);
  const [error, setError] = useState<ValidationError[]>([]);

  const navigate = useNavigate();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsEmail(e.target.checked);
    setIsPhone(false);
  };

  // const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setIsPhone(e.target.checked);
  //   setIsEmail(false);
  // };

  const isButtonEnabled = isEmail || isPhone;

  // forget password

  const [forget, { isLoading }] = useForgetMutation();

  const handleForget = async (data: FieldValues) => {
    // console.log(data);

    try {
      const res = await forget(data).unwrap();
      // console.log(res)
      if (res?.success) {
        Swal.fire({
          
          icon: "success",
          title: res?.message,
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/verify-code");
      }
      localStorage.setItem("data", data.data);
    } catch (err) {
      // console.log(err)
      setError((err as any)?.data?.errorSources);
    }
  };

  // console.log(email)

  const emailError = error?.find((error) => error?.path === "not_found");

  return (
    <div className="auth-bg">
      <div>
        <AuthNavbar />
      </div>
      <div className="max-w-[1920px] mx-auto pt-[66px] lg:pt-0">
        <div className=" rounded-[12px] md:h-full h-[600px]">
          <div className=" 2xl:p-[50px] lg:p-[20px] md:p-[50px] p-0 flex justify-center items-center">
            <div className="bg-white 2xl:w-[710px] lg:w-[710px] w-full h-full rounded-[10px] border-[1px] border-[#E5E5E5] 2xl:p-[70px] lg:p-[50px] md:p-[50px] p-4 2xl:mt-[30px] lg:mt-[20px]">
              <h1 className="text-secondaryColor text-center md:text-[24px] text-[18px] font-Noto-Sans-Bengali font-semibold md:leading-[31.2px] leading-[18px]">
                পাসওয়ার্ড ভুলে গিয়েছেন
              </h1>
              <p className="text-[#888] md:text-[18px] text-[14px] text-center mt-[5px] font-Noto-Sans-Bengali font-normal md:leading-[23.4px] leading-[18px] w-[222px] md:w-full">
                আমরা আপনার ইমেইলে ৫ ডিজিট এর কোড পাঠাবো
              </p>

              <ReuseMainForm
                onSubmit={handleForget}
                resolver={zodResolver(validationSchema)}
                defaultValues={{
                  data: "",
                }}
              >
                <div className="flex justify-start ml-[-33px] gap-[30px] items-center md:mt-[30px] mt-6">
                  <label
                    htmlFor="radioButton"
                    className="flex items-center gap-[10px] cursor-pointer"
                  >
                    <input
                      className="size-[20px] appearance-none"
                      type="radio"
                      name="radioGroup"
                      id="radioButton"
                      checked={isEmail}
                      onChange={handleEmailChange}
                    />
                    <span
                      className={`w-[20px] h-[20px] rounded-full border-[2px] bg-white flex items-center justify-center ${
                        isEmail ? "border-[#333]" : "border-[#666]"
                      }`}
                    >
                      {isEmail && (
                        <div className="w-3 h-3 rounded-full bg-[#333]"></div>
                      )}
                    </span>
                    <p className="text-[#666] md:text-[18px] text-[14px] font-Noto-Sans-Bengali font-normal leading-[23.4px]">
                      আপনার ইমেইল প্রবেশ করান
                    </p>
                  </label>

                  {/* for phone */}
                  {/* <label
                    htmlFor="PhoneButton"
                    className="flex items-center gap-[10px] cursor-pointer"
                  >
                    <input
                      className="size-[20px] appearance-none"
                      type="radio"
                      name="radioGroup"
                      id="PhoneButton"
                      checked={isPhone}
                      onChange={handlePhoneChange}
                    />
                    <span
                      className={`w-[20px] h-[20px] rounded-full border-[2px] bg-white flex items-center justify-center ${
                        isPhone ? "border-[#333]" : "border-[#666]"
                      }`}
                    >
                      {isPhone && (
                        <div className="w-3 h-3 rounded-full bg-[#333]"></div>
                      )}
                    </span>
                    <p className="text-[#666] md:text-[18px] text-[14px] font-Noto-Sans-Bengali font-normal leading-[23.4px]">
                      ফোন
                    </p>
                  </label> */}
                </div>

                {isEmail && (
                  <ReuseInput
                    name="data"
                    type="text"
                     
                    className={`mt-3 w-full h-[51px] rounded-[6px] text-secondaryColor border-[1px] border-[#E5E5E5] bg-white outline-0 pl-5 md:text-[18px] text-[14px] font-Poppins font-normal placeholder-[#999] ${
                      emailError ? "border-[#F00C89]" : ""
                    }`}
                  />
                )}

                {emailError && (
                  <p className="text-[#F00C89] text-[18px] font-Noto-Sans-Bengali font-normal">
                    {emailError?.message}
                  </p>
                )}

                {/* {isPhone && (
                  <ReuseInput
                    name="data"
                    type="text"
                    placeholder="Enter Phone Number"
                    className={`mt-3 w-full h-[51px] rounded-[6px] border-[1px] text-secondaryColor border-[#E5E5E5] bg-white outline-0 pl-5 md:text-[18px] text-[14px] font-Poppins font-normal placeholder-[#999] `}
                  />
                )} */}

              

                <button
                  className={`rounded-[6px] md:mt-[30px] mt-6 w-full h-[51px] md:text-[18px] text-[14px] text-center font-Poppins font-medium leading-[18px] ease-in ${
                    isButtonEnabled
                      ? "bg-btn-hover text-white"
                      : "bg-[#F6F6F6] text-[#333] cursor-not-allowed"
                  }`}
                  type="submit"
                  disabled={!isButtonEnabled}
                >
                  {isLoading ? (
                    <span className="loading loading-infinity loading-lg"></span>
                  ) : (
                    " কোড পাঠান"
                  )}
                </button>
              </ReuseMainForm>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
