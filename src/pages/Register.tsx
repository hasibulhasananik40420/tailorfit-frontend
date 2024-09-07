/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */

import { useState } from "react";
import AuthNavbar from "../components/Shared/AuthNavbar";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import ReuseMainForm from "../components/ReuseForm/ReuseMainForm";
import { FieldValues } from "react-hook-form";
import ReuseInput from "../components/ReuseForm/ReuseInput";
import { useRegisterMutation } from "../redux/features/auth/registerApi";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";

type ValidationError = {
  path: string;
  message: string;
};

export const RegisterValidationSchema = z
  .object({
    name: z.string().min(1, "অনুগ্রহ করে আপনার নাম লিখুন"),
    companyName: z.string().min(1, "অনুগ্রহ করে আপনার কোম্পানির নাম লিখুন"),
    email: z.string().email("অনুগ্রহ করে আপনার সঠিক ইমেইল দিন"),
    phonePrimary: z
      .string()
      .regex(/^\d{11}$/, "অনুগ্রহ করে সঠিক ফোন নাম্বার দিন"),
    password: z.string().min(8, "অনুগ্রহ করে আট অক্ষরের পাসওয়ার্ড দিন"),
    confirmPassword: z
      .string()
      .min(8, "অনুগ্রহ করে আট অক্ষরের কনফার্ম পাসওয়ার্ড দিন"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "অনুগ্রহ করে সঠিক পাসওয়ার্ড দিন",
  });

export const defaultValues = {
  name: "",
  companyName: "",
  email: "",
  phonePrimary: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [error, setError] = useState<ValidationError[]>([]);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  // start work to signup
  const [register, { isLoading }] = useRegisterMutation();

  const handleSignin = async (data: FieldValues) => {
    try {
      const res = await register(data).unwrap();
      if (res?.success) {
        // Store the email in localStorage
        localStorage.setItem('usesjhdtevdfsdswrEmailskjstshxcsewsd', data?.email);
        Swal.fire({
          
          icon: "success",
          title: res?.message,
          showConfirmButton: false,
          timer: 1000,
        });
        navigate("/verify-account");
      }
      // console.log(res)
    } catch (err) {
      // console.log(err)
      setError((err as any)?.data?.errorSources);
    }
    // console.log(data)
  };

  const emailError = error?.find((error) => error?.path === "email");

  return (
    <div className="auth-bg">
      <div className="">
        <AuthNavbar />
      </div>

    
      <div className="max-w-[1920px] mx-auto pt-[24px] lg:pt-0">
        <div className=" rounded-[12px] md:h-full h-[600px]">
          <div className="2xl:p-[50px] lg:p-[20px] md:p-[50px] p-0 flex justify-center items-center">
            <div className="bg-white 2xl:w-[960px] lg:w-[960px] w-full h-full rounded-[10px] border-[1px] border-[#E5E5E5] 2xl:p-[70px] lg:p-[50px] md:p-[50px] p-4">
              <h1 className="text-secondaryColor md:text-[24px] text-[18px] font-Noto-Sans-Bengali text-center font-semibold md:leading-[31.2px] leading-[18px]">
                আপনার একাউন্ট সাইন আপ করুন
              </h1>
             

              <ReuseMainForm
                onSubmit={handleSignin}
                resolver={zodResolver(RegisterValidationSchema)}
                defaultValues={defaultValues}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 2xl:gap-[30px] lg:gap-5 gap-[30px] 2xl:mt-[30px] lg:mt-5 mt-4">
                  <div className="flex flex-col gap-[10px] w-full">
                    <label
                      className="text-switchColor lg:text-[18px] md:text-[18px] text-[14px] font-Noto-Sans-Bengali md:font-semibold font-bold"
                      htmlFor="Phone or Email"
                    > 
                      আপনার নাম
                      <span className="text-[#F00C89] font-bold font-Noto-Sans-Bengali">
                        *
                      </span>
                    </label>

                    <ReuseInput
                      name="name"
                      type="text"
                      placeholder="Enter Your name"
                      className={`w-full h-[51px]  rounded-[6px] border-[1px] border-[#E5E5E5] bg-white outline-0 pl-5 md:text-[18px] text-[14px] font-Poppins font-normal placeholder-[#999] text-secondaryColor placeholder:font-normal `}
                    />
                  </div>

                  <div className="flex flex-col gap-[10px] w-full">
                    <label
                      className="text-switchColor lg:text-[18px] md:text-[18px] text-[14px] font-Noto-Sans-Bengali md:font-semibold font-bold"
                      htmlFor="Phone or Email"
                    >
                      কোম্পানীর নাম
                      <span className="text-[#F00C89] font-bold font-Noto-Sans-Bengali">
                        *
                      </span>
                    </label>

                    <ReuseInput
                      name="companyName"
                      type="text"
                      placeholder="Tailors Name"
                      className={`w-full h-[51px]  rounded-[6px] border-[1px] border-[#E5E5E5] bg-white outline-0 pl-5 md:text-[18px] text-[14px] font-Poppins font-normal placeholder-[#999] text-secondaryColor placeholder:font-normal `}
                    />
                  </div>

                  <div className="flex flex-col gap-[10px] w-full">
                    <label
                      className="text-switchColor lg:text-[18px] md:text-[18px] text-[14px] font-Noto-Sans-Bengali md:font-semibold font-bold"
                      htmlFor="Phone or Email"
                    >
                      ইমেইল
                      <span className="text-[#F00C89] font-bold font-Noto-Sans-Bengali">
                        *
                      </span>
                    </label>

                    <ReuseInput
                      name="email"
                      type="text"
                      placeholder="Enter Your Email"
                      className={`w-full h-[51px]  rounded-[6px] border-[1px] border-[#E5E5E5] bg-white outline-0 pl-5 md:text-[18px] text-[14px] font-Poppins font-normal placeholder-[#999] text-secondaryColor placeholder:font-normal ${
                        emailError ? "border-[#F00C89]" : ""
                      }`}
                    />

                    {emailError && (
                      <p className="text-[#F00C89] text-[18px] font-Noto-Sans-Bengali font-normal">
                        {emailError?.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-[10px] w-full">
                    <label
                      className="text-switchColor lg:text-[18px] md:text-[18px] text-[14px] font-Noto-Sans-Bengali md:font-semibold font-bold"
                      htmlFor="Phone or Email"
                    >
                      মোবাইল নাম্বার (প্রাইমারি)
                      <span className="text-[#F00C89] font-bold font-Noto-Sans-Bengali">
                        *
                      </span>
                    </label>

                    <ReuseInput
                      name="phonePrimary"
                      type="text"
                      className={`w-full h-[51px]  rounded-[6px] border-[1px] border-[#E5E5E5] bg-white outline-0 pl-5 md:text-[18px] text-[14px] font-Poppins font-normal placeholder-[#999] text-secondaryColor placeholder:font-normal `}
                    />
                  </div>

                  <div className="flex flex-col gap-[10px] relative">
                    <label
                      className="text-[#666] md:text-[18px] text-[14px] font-Noto-Sans-Bengali font-normal md:leading-[23.4px] leading-[18px]"
                      htmlFor="password"
                    >
                      পাসওয়ার্ড
                      <span className="text-[#F00C89] font-bold font-Noto-Sans-Bengali">
                        *
                      </span>
                    </label>

                    <ReuseInput
                      name="password"
                      type={isPasswordVisible ? "text" : "password"}
                      className={`w-full h-[51px] rounded-[6px] border-[1px] border-[#E5E5E5] bg-white outline-0 pl-5 md:text-[18px] text-[14px] font-Poppins font-normal placeholder-[#999] text-secondaryColor `}
                    />
                    <div
                      className="absolute md:top-[46px] top-[41px] right-4 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {isPasswordVisible ? (
                        <FiEye size={24} />
                      ) : (
                        <FiEyeOff size={24} />
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-[10px] relative">
                    <label
                      className="text-[#666] md:text-[18px] text-[14px] font-Noto-Sans-Bengali font-normal md:leading-[23.4px] leading-[18px]"
                      htmlFor="password"
                    >
                      কনফার্ম পাসওয়ার্ড
                      <span className="text-[#F00C89] font-bold font-Noto-Sans-Bengali">
                        *
                      </span>
                    </label>

                    <ReuseInput
                      name="confirmPassword"
                      type={isConfirmPasswordVisible ? "text" : "password"}
                      className={`w-full h-[51px] rounded-[6px] border-[1px] border-[#E5E5E5] bg-white outline-0 pl-5 md:text-[18px] text-[14px] font-Poppins font-normal placeholder-[#999] text-secondaryColor `}
                    />
                    <div
                      className="absolute md:top-[46px] top-[41px] right-4 cursor-pointer"
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      {isConfirmPasswordVisible ? (
                        <FiEye size={24} />
                      ) : (
                        <FiEyeOff size={24} />
                      )}
                    </div>
                  </div>
                </div>

                <button
                  className={`rounded-[6px] lg:mt-[30px] mt-[24px] w-full h-[51px] text-white lg:text-[18px] md:text-[18px] text-[14px] text-center font-Noto-Sans-Bengali font-medium leading-[18px] ease-in bg-btn-hover`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="loading loading-infinity loading-lg"></span>
                  ) : (
                    "সাইন আপ করুন"
                  )}
                </button>

                <p className="text-[#888] lg:text-[18px] md:text-[18px] text-[14px] font-Poppins font-normal leading-[23.4px] text-center mt-5">
                  Already have an account{" "}
                  <Link
                    className="text-primaryColor lg:text-[18px] md:text-[18px] text-[14px] font-Noto-Sans-Bengali font-normal leading-[23.4px] cursor-pointer"
                    to="/login"
                  >
                    Login
                  </Link>
                </p>
              </ReuseMainForm>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
