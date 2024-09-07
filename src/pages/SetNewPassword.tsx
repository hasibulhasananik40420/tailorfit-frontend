/* eslint-disable react-refresh/only-export-components */

import { useState } from "react";
import AuthNavbar from "../components/Shared/AuthNavbar";
import { FiEye, FiEyeOff } from "react-icons/fi";
import ReuseInput from "../components/ReuseForm/ReuseInput";
import ReuseMainForm from "../components/ReuseForm/ReuseMainForm";
import { FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSetNewPasswordMutation } from "../redux/features/auth/setNewPassword";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";



export const validationSchema = z
  .object({
    password: z.string().min(8, "অনুগ্রহ করে আট অক্ষরের পাসওয়ার্ড দিন"),
    confirmPassword: z.string().min(8, "অনুগ্রহ করে আট অক্ষরের কনফার্ম পাসওয়ার্ড দিন"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "অনুগ্রহ করে সঠিক পাসওয়ার্ড দিন",
  });



export const defaultValues= ({
 
  password:"",
  confirmPassword: ""
  
})



const SetNewPassword = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordConfirmVisible, setIsPasswordConfirmVisible] = useState(false);
  const navigate = useNavigate()
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const togglePasswordConfirmVisibility = () => {
    setIsPasswordConfirmVisible(!isPasswordConfirmVisible);
  };

  const [setNewPassword, {isLoading}] = useSetNewPasswordMutation()

 const handlenewPassword =async (data:FieldValues)=>{
  // console.log(data)
   const {password} = data
  //  console.log(password)


   try {
     const res = await setNewPassword({password}).unwrap()
      //  console.log(res)
       if(res?.success){
        Swal.fire({
          
          icon: "success",
          title:res?.message,
          showConfirmButton: false,
          timer: 3000
        });
        navigate('/success')
       }
   } catch (err) {
    // console.log(err)
    const error = err as { data: { message: string } };

      Swal.fire({
        icon: "error",
        title: error?.data?.message,
      });
   }



 }


 
  return (
    <div className="auth-bg">
      <div >
        <AuthNavbar />
      </div>

      <div className="max-w-[1920px] mx-auto pt-[66px] lg:pt-0">
        <div className=" rounded-[12px] md:h-full h-[600px]">
          <div className=" 2xl:p-[50px] lg:p-[20px] md:p-[50px] p-0 flex justify-center items-center">
            <div className="bg-white  2xl:w-[710px] lg:w-[710px]  w-full h-full rounded-[10px] border-[1px] border-[#E5E5E5] 2xl:p-[70px] lg:p-[50px] md:p-[50px] p-4 xl:mt-[30px] lg:mt-[20px]">
              <h1 className="text-secondaryColor text-center md:text-[24px] text-[18px] font-Noto-Sans-Bengali font-semibold md:leading-[31.2px] leading-[18px]">
              নতুন পাসওয়ার্ড সেট করুন
              </h1>
              <p className="text-[#888] text-center md:text-[18px] text-[14px] mt-[5px] font-Noto-Sans-Bengali font-normal md:leading-[23.4px] leading-[18px] md:mb-[30px] mb-6">
              নতুন পাসওয়ার্ড তৈরি করুন। আগের পাসওয়ার্ড থেকে ভিন্ন <br />
              পাসওয়ার্ড দিন নিরাপত্তার জন্য
              </p>

              <ReuseMainForm onSubmit={handlenewPassword} resolver={zodResolver(validationSchema)} defaultValues={defaultValues}>
                <div className="flex flex-col gap-[10px] relative">
                  <label
                    className="text-[#666] md:text-[18px] text-[14px] font-Noto-Sans-Bengali font-normal md:leading-[23.4px] leading-[18px]"
                    htmlFor="password"
                  >
                    পাসওয়ার্ড
                  </label>

                  
                     <ReuseInput name="password" type={isPasswordVisible ? "text" : "password"}  className={`w-full h-[51px] rounded-[6px] border-[1px] border-[#E5E5E5] bg-white text-secondaryColor outline-0 pl-5 md:text-[18px] text-[14px] font-Poppins font-normal placeholder-secondaryColor `}
                    
                    />
                  <div
                    className="absolute md:top-[46px] top-[41px] right-4 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {isPasswordVisible ? <FiEye className="text-secondaryColor" size={24} /> : <FiEyeOff className="text-secondaryColor" size={24} />}
                  </div>
                  
                </div>

                <div className="flex flex-col gap-[10px] md:mt-[30px] mt-4 relative">
                  <label
                    className="text-[#666] md:text-[18px] text-[14px] font-Noto-Sans-Bengali font-normal md:leading-[23.4px] leading-[18px]"
                    htmlFor="confirmPassword"
                  >
                   কনফার্ম পাসওয়ার্ড
                  </label>

                  <ReuseInput name="confirmPassword" type={isPasswordConfirmVisible ? "text" : "password"}  className={`w-full h-[51px] rounded-[6px] border-[1px] border-[#E5E5E5] bg-white  outline-0 pl-5 md:text-[18px] text-[14px] font-Poppins font-normal placeholder-[#999] text-secondaryColor `}
                    
                    />
                  <div
                    className="absolute md:top-[46px] top-[41px] right-4 cursor-pointer"
                    onClick={togglePasswordConfirmVisibility}
                  >
                    {isPasswordConfirmVisible ? <FiEye className="text-secondaryColor" size={24} /> : <FiEyeOff className="text-secondaryColor" size={24} />}
                  </div>
                  
                </div>

              
                

                <button className={`rounded-[6px] lg:mt-[30px] mt-[24px] w-full h-[51px] text-white lg:text-[18px] md:text-[18px] text-[14px] text-center font-Noto-Sans-Bengali font-medium leading-[18px] ease-in bg-btn-hover`} disabled={isLoading}>
                
                {isLoading ? <span className="loading loading-infinity loading-lg"></span> : 'পাসওয়ার্ড আপডেট'}
                </button>
               

              </ReuseMainForm>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetNewPassword;
