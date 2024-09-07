/* eslint-disable @typescript-eslint/no-explicit-any */

import { ChangeEvent, useEffect, useRef, useState } from "react";
import AuthNavbar from "../components/Shared/AuthNavbar";
import { FieldValues, useForm } from "react-hook-form";
import { useVerifyCodeMutation } from "../redux/features/auth/verifyCodeApi";
import { useNavigate } from "react-router-dom";
import { useForgetMutation } from "../redux/features/auth/forgetApi";
import Swal from "sweetalert2";

type ValidationError = {
  path: string;
  message: string;
};

const VerifyCode = () => {
  const [code, setCode] = useState<string[]>(["", "", "", "", ""]);
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [error, setError] = useState<ValidationError[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(180);
  const [showResend, setShowResend] = useState<boolean>(false);
  const navigate = useNavigate();

  const { register, handleSubmit, setValue } = useForm();

  const handleInputChange =
    (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const newCode = [...code];

      if (/^[0-9]$/.test(value) || value === "") {
        newCode[index] = value;
        setCode(newCode);
        setValue(`code${index}`, value);

        if (value !== "" && index < code.length - 1) {
          inputRefs.current[index + 1]?.focus();
        }
      } else {
        newCode[index] = "";
        setCode(newCode);
        setValue(`code${index}`, "");
      }
    };

  const handleInputFocus = (index: number) => () => {
    inputRefs.current[index]?.select();
  };

  const isButtonEnabled = code.every((digit) => digit !== "");

  const [verifyCode, { isLoading }] = useVerifyCodeMutation();

  const email = localStorage.getItem("data");
  //  console.log(email)

  const onSubmit = async (data: FieldValues) => {
    // console.log(data);

    const codeString = Object.keys(data)
      .sort() // Ensure keys are in the correct order
      .map((key) => data[key])
      .join("");

    //  console.log(`code=${codeString}`);

    try {
      const res = await verifyCode({ code: codeString, email: email }).unwrap();
      //  console.log(res)
      if (res?.success) {
        // toast.success(res?.message, { duration: 5000 });
        Swal.fire({
          
          icon: "success",
          title: res?.message,
          showConfirmButton: false,
          timer: 3000,
        });
        navigate("/new-password");
      }
    } catch (err) {
      // console.log(err)
      setError((err as any)?.data?.errorSources);
    }
  };

  //  set new code again

  const [forget] = useForgetMutation();

  const handleForget = async () => {
    // console.log(data)

    try {
      const res = await forget({ data: email }).unwrap();
      // console.log(res)
      if (res?.success) {
        Swal.fire({
          
          icon: "success",
          title: res?.message,
          showConfirmButton: false,
          timer: 5000,
        });
      }
    } catch (err) {
      // console.log(err)
      setError((err as any)?.data?.errorSources);
    }
  };

  const codeError = error?.find((error) => error?.path === "not_valeted");

  useEffect(() => {
    const endTime = localStorage.getItem("endTime");

    if (endTime) {
      const remainingTime = Math.max(0, parseInt(endTime) - Date.now());
      setTimeLeft(Math.floor(remainingTime / 1000));
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setShowResend(true);
          localStorage.removeItem("timeLeft");
          localStorage.removeItem("endTime");
          return 0;
        }
        localStorage.setItem("timeLeft", String(prevTime - 1));
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="auth-bg">
      <div>
        <AuthNavbar />
      </div>
      <div className="max-w-[1920px] mx-auto pt-[66px] lg:pt-0">
        <div className="rounded-[12px]  md:h-full h-[600px]">
          <div className=" 2xl:p-[50px] lg:p-[20px] md:p-[50px] p-0 flex justify-center items-center">
            <div className="bg-white 2xl:w-[710px] lg:w-[710px] w-full h-full rounded-[10px] border-[1px] border-[#E5E5E5] 2xl:p-[70px] lg:p-[50px] md:p-[50px] p-4 xl:mt-[30px] lg:mt-[20px]">
              <h1 className="text-secondaryColor text-center md:text-[24px] text-[18px] font-Noto-Sans-Bengali font-semibold md:leading-[31.2px] leading-[18px]">
                আপনার ইমেইল চেক করুন
              </h1>
              <p className="text-[#888] text-center md:text-[18px] text-[14px] mt-[5px] font-Poppins font-normal md:leading-[23.4px] leading-[18px]">
                We sent a reset link to{" "}
                <span className="text-secondaryColor">{email}</span>
              </p>
              <p className="text-[#888] text-center md:text-[18px] text-[14px] font-Poppins font-normal md:leading-[23.4px] leading-[18px]">
                enter 5 digit code that mentioned in the email
              </p>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="md:mt-[30px] mt-6 flex justify-center items-center md:gap-[30px] gap-[12px]">
                  {code.map((digit, index) => (
                    <input
                      {...register(`code${index}`)}
                      key={index}
                      type="text"
                      maxLength={1}
                      value={digit}
                      ref={(el) =>
                        (inputRefs.current[index] = el as HTMLInputElement)
                      }
                      onChange={handleInputChange(index)}
                      onFocus={handleInputFocus(index)}
                      className={`md:w-[60px] md:h-[60px] w-[45px] h-[45px] rounded-[6px] border-[1px] ${
                        digit !== "" && !/^[0-9]$/.test(digit)
                          ? "border-[1.5px] border-[#F00C89]"
                          : digit !== ""
                          ? "border-[1.5px] border-[#F00C89]"
                          : "border-[1.5px] border-[#E5E5E5]"
                      } bg-white text-center text-[24px] text-secondaryColor font-medium font-Poppins outline-0`}
                    />
                  ))}
                </div>
                {codeError && (
                  <p className="text-[#F00C89] text-[18px] font-Noto-Sans-Bengali font-normal">
                    {codeError?.message}
                  </p>
                )}

                <button
                  type="submit"
                  className={`rounded-[6px] mt-[30px] w-full h-[51px] md:text-[18px] text-[14px] text-center font-Noto-Sans-Bengali font-medium leading-[18px] ease-in ${
                    isButtonEnabled
                      ? "bg-btn-hover text-white"
                      : "bg-[#F6F6F6] text-[#333] cursor-not-allowed"
                  }`}
                  disabled={!isButtonEnabled}
                >
                  {isLoading ? (
                    <span className="loading loading-infinity loading-lg"></span>
                  ) : (
                    "কোড যাচাই করুন"
                  )}
                </button>

                <div className="mt-[20px]">
                  <p className="text-secondaryColor text-center md:text-[18px] text-[14px] font-normal md:leading-[23.4px] leading-[18px] font-Noto-Sans-Bengali cursor-pointer">
                    এখন পর্যন্ত ইমেইল পান নাই?{" "}
                    <span
                      onClick={handleForget}
                      className="text-primaryColor underline font-medium font-Noto-Sans-Bengali md:leading-[23.4px] leading-[18px] cursor-pointer"
                    >
                      {/* আবার কোড পাঠান */}
                      {showResend ? (
                        "আবার কোড পাঠান"
                      ) : (
                        <> {formatTime(timeLeft)}</>
                      )}
                    </span>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;
