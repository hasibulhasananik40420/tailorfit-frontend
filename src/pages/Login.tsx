/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import AuthNavbar from "../components/Shared/AuthNavbar";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { GrFormCheckmark } from "react-icons/gr";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/features/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import ReuseMainForm from "../components/ReuseForm/ReuseMainForm";
import ReuseInput from "../components/ReuseForm/ReuseInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const validationSchema = z.object({
  email: z.string().email("অনুগ্রহ করে সঠিক ইমেইল দিন"),
  password: z.string().min(8, "অনুগ্রহ করে আট অক্ষরের পাসওয়ার্ড দিন"),
});

type ValidationError = {
  path: string;
  message: string;
};

const Login = () => {
  const [error, setError] = useState<ValidationError[]>([]);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  //  handle login logic

  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const handleLogin = async (data: FieldValues) => {
    try {
      const userInfo = {
        email: data?.email,
        password: data?.password,
      };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res?.data?.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res?.data?.accessToken }));
      navigate(`/${user?.role}/dashboard`);
    } catch (err: any) {
      console.log(err);
      setError(err?.data?.errorSources);
      // setError(data?.err?.message)
    }
  };

  const passwordErrors = error?.find((error) => error?.path === "password");
  const emailError = error?.find((error) => error?.path === "not_found");

  return (
    <div className="auth-bg">
      <div className="">
        <AuthNavbar />
      </div>

     

      <div className="max-w-[1920px] mx-auto ">
        <div className="pt-[60px] lg:pt-8 rounded-[12px] md:h-full h-[600px]">
          <div className=" flex justify-center">
            <div className="bg-white 2xl:w-[670px] lg:w-[550px] w-full h-full rounded-[10px] border-[1px] border-[#E5E5E5] 2xl:p-[50px] lg:p-[30px] md:p-[50px] p-4">
              <h1 className="text-secondaryColor text-center lg:text-[24px] md:text-[24px] text-[18px] font-Noto-Sans-Bengali font-semibold leading-[31.2px ]">
                আপনার একাউন্ট সাইন ইন করুন
              </h1>
              <p className="text-[#888] text-center lg:text-[18px] md:text-[18px] text-[14px] mt-[5px] font-Noto-Sans-Bengali font-normal leading-[23.4px] lg:mb-[30px] mb-[24px]">
                আপনার বেসিক তথ্য দিয়ে সাইন ইন করুন
              </p>

              <ReuseMainForm
                onSubmit={handleLogin}
                resolver={zodResolver(validationSchema)}
                defaultValues={{
                  email: "",
                  password: "",
                }}
              >
                <div className="flex flex-col gap-[10px]">
                  <label
                    className="text-[#666] lg:text-[18px] md:text-[18px] text-[14px] font-Noto-Sans-Bengali font-normal leading-[23.4px]"
                    htmlFor="Phone or Email"
                  >
                     ইমেইল
                  </label>

                  <ReuseInput
                    name="email"
                    type="text"
                    className={`w-full h-[51px] rounded-[6px] border-[1px] border-[#E5E5E5] bg-white text-secondaryColor outline-0 pl-5 md:text-[18px] text-[14px] font-Poppins font-normal placeholder-secondaryColor ${
                      emailError ? "border-[#F00C89]" : ""
                    }`}
                  />

                  {emailError && (
                    <p className="text-[#F00C89] text-[18px] font-Noto-Sans-Bengali font-normal">
                      {emailError?.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-[10px] lg:mt-[30px] mt-[24px] relative">
                  <label
                    className="text-[#666] lg:text-[18px] md:text-[18px] text-[14px] font-Noto-Sans-Bengali font-normal leading-[23.4px]"
                    htmlFor="Password"
                  >
                    পাসওয়ার্ড
                  </label>

                  <ReuseInput
                    name="password"
                    type={isPasswordVisible ? "text" : "password"}
                    className={`w-full h-[51px] rounded-[6px] border-[1px] border-[#E5E5E5] bg-white text-secondaryColor outline-0 pl-5 md:text-[18px] text-[14px] font-Poppins font-normal placeholder-secondaryColor ${
                      passwordErrors ? "border-[#F00C89]" : ""
                    }`}
                  />

                  {passwordErrors && (
                    <p className="text-[#F00C89] text-[18px] font-Noto-Sans-Bengali font-normal">
                      {passwordErrors?.message}
                    </p>
                  )}

                  <div
                    className="absolute top-[46px] right-4 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {isPasswordVisible ? (
                      <FiEye className="text-secondaryColor" size={24} />
                    ) : (
                      <FiEyeOff className="text-secondaryColor" size={24} />
                    )}
                  </div>
                </div>

                <div className="mt-[10px] flex justify-between items-center">
                  <span className="flex gap-[10px] items-center">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      className="hidden peer"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    />
                    <label
                      htmlFor="rememberMe"
                      className={`lg:w-6 lg:h-6 md:w-6 md:h-6 w-[20px] h-[20px] border-[1px] border-[#E5E5E5] rounded-[4px] flex items-center justify-center cursor-pointer relative ${
                        isChecked ? "bg-btn-hover" : ""
                      }`}
                    >
                      {isChecked && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <GrFormCheckmark className="lg:size-6 md:size-6 size-4 text-white" />
                        </div>
                      )}
                    </label>

                    <p className="text-[#666] lg:text-[18px] md:text-[18px] text-[12px] font-Noto-Sans-Bengali font-normal leading-[23.4px]">
                      পাসওয়ার্ড সেভ করুন
                    </p>
                  </span>

                  <Link
                    to={"/forgot-password"}
                    className="text-primaryColor lg:text-[18px] md:text-[18px] text-[12px] font-Noto-Sans-Bengali font-normal leading-[23.4px] cursor-pointer"
                  >
                    পাসওয়ার্ড ভুলে গিয়েছেন?
                  </Link>
                </div>

                <button
                  className={`rounded-[6px] lg:mt-[30px] mt-[24px] w-full h-[51px] text-white lg:text-[18px] md:text-[18px] text-[14px] text-center font-Noto-Sans-Bengali font-medium leading-[18px] ease-in bg-btn-hover`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="loading loading-infinity loading-lg"></span>
                  ) : (
                    "সাইন ইন করুন"
                  )}
                </button>
              </ReuseMainForm>
              <div className="text-[#888] lg:text-[18px] md:text-[18px] text-[14px] font-Poppins font-normal leading-[23.4px] text-center pt-5">
                Do not have an account{" "}
                <Link
                  className="text-primaryColor lg:text-[18px] md:text-[18px] text-[14px] font-Noto-Sans-Bengali font-normal leading-[23.4px] cursor-pointer"
                  to="/sign-up"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default Login;
