/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { zodResolver } from "@hookform/resolvers/zod"

// import { FieldValues } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Swal from "sweetalert2";
import { useChangePasswordMutation } from "../../redux/features/auth/changePasswordApi";
import {
  useGetMeQuery,
  useLogoutOtherUserMutation,
  // useLogoutUserMutation,
} from "../../redux/features/auth/authApi";
import Loader from "../../components/Loader/Loader";
import {
  // logout,
  selectCurrentUser,
  TUser,
} from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/features/hooks";
import LastActivity from "../../utils/LastActivity";
// import Swal from "sweetalert2";

type TDevice = {
  deviceId: string;
  deviceName: string;
  os: string;
  location: string;
  ipAddress: string;
  lastActivity: string;
  deviceType: "desktop" | "mobile";
};

export const validationSchema = z
  .object({
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
  password: "",
  confirmPassword: "",
};

const AccountSettings = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [passwordErrors, setPasswordErrors] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordVisibleTwo, setIsPasswordVisibleTwo] = useState(false);
  const [isPasswordVisibleThree, setIsPasswordVisibleThree] = useState(false);

  const user: TUser | null = useAppSelector(selectCurrentUser);
  // const dispatch = useAppDispatch();

  // checking online status

  const { data, isLoading } = useGetMeQuery("");

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);
  const togglePasswordVisibilityTwo = () =>
    setIsPasswordVisibleTwo(!isPasswordVisibleTwo);
  const togglePasswordVisibilityThree = () =>
    setIsPasswordVisibleThree(!isPasswordVisibleThree);

  const [changePassword] = useChangePasswordMutation();

  const handleSubmit = async () => {
    const result = validationSchema.safeParse({
      password: newPassword,
      confirmPassword,
    });
    if (!result.success) {
      const confirmPasswordError = result.error.errors.find(
        (err) => err.path[0] === "confirmPassword"
      );
      setConfirmError(confirmPasswordError?.message || "");
    } else {
      setConfirmError("");
      setPasswordErrors({});

      const newData = { newPassword, oldPassword };

      try {
        const res = await changePassword(newData).unwrap();
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
          showConfirmButton: false,
          timer: 3000,
        });
      }
      // Proceed with form submission
    }
  };

  //  handle logout user
  const [logoutOtherUser] = useLogoutOtherUserMutation();

  //  console.log(user)

  const handleLogout = async (deviceId: string) => {
    // await logoutUser("");
    // dispatch(logout());
    const user = await logoutOtherUser(deviceId);

    console.log(user);
  };

  if (isLoading) {
    <Loader></Loader>;
  }

  const devices = data?.data?.devices;

  return (
    <div className="2xl:pt-[30px] lg:pt-[30px] pt-5">
      <h1 className="text-secondaryColor text-[24px] font-Poppins font-semibold">
        Change Password
      </h1>

      <div
      // onSubmit={handlePasswordChange}
      //  resolver={zodResolver(validationSchema)}
      >
        <div className="2xl:mt-[25px] mt-[20px] w-[100%]">
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 2xl:grid-cols-3 gap-[15px] 2xl:gap-[30px] w-full">
            <div className="flex flex-col gap-[10px]  w-full relative">
              <label
                className="text-[#666] lg:text-[18px] md:text-[18px] text-[14px] font-Noto-Sans-Bengali font-normal leading-[23.4px]"
                htmlFor="oldPassword"
              >
                বর্তমান পাসওয়ার্ড
              </label>

              <input
                onChange={(e) => setOldPassword(e.target.value)}
                id="oldPassword"
                type={isPasswordVisible ? "text" : "password"}
                className={`w-full h-[51px] rounded-[6px] border-[1px] border-[#E5E5E5] bg-white text-secondaryColor outline-0 pl-5 md:text-[18px] text-[14px] font-Poppins font-normal placeholder-secondaryColor ${
                  passwordErrors ? "" : "border-primaryColor"
                }`}
              />

              {/* {passwordErrors && (
                <p className="text-[#F00C89] text-[18px] font-Noto-Sans-Bengali font-normal">
                  {passwordErrors}
                </p>
              )}  */}

              <div
                className="absolute top-[50px] right-4 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {isPasswordVisible ? (
                  <FiEye className="size-5 text-black" />
                ) : (
                  <FiEyeOff className="size-5 text-black" />
                )}
              </div>
            </div>

            <div className="flex flex-col gap-[10px]  w-full relative">
              <label
                className="text-[#666] lg:text-[18px] md:text-[18px] text-[14px] font-Noto-Sans-Bengali font-normal leading-[23.4px]"
                htmlFor="newPassword"
              >
                নতুন পাসওয়ার্ড
              </label>

              <input
                onChange={(e) => setNewPassword(e.target.value)}
                type={isPasswordVisibleTwo ? "text" : "password"}
                id="newPassword"
                className={`w-full h-[51px] rounded-[6px] border-[1px] border-[#E5E5E5] bg-white text-secondaryColor outline-0 pl-5 md:text-[18px] text-[14px] font-Poppins font-normal placeholder-secondaryColor ${
                  passwordErrors ? "" : "border-primaryColor"
                }`}
              />

              {confirmError && (
                <p className="text-[#F00C89] text-[18px] font-Noto-Sans-Bengali font-normal">
                  {confirmError}
                </p>
              )}

              <div
                className="absolute top-[50px] right-4 cursor-pointer"
                onClick={togglePasswordVisibilityTwo}
              >
                {isPasswordVisibleTwo ? (
                  <FiEye className="size-5 text-black" />
                ) : (
                  <FiEyeOff className="size-5 text-black" />
                )}
              </div>
            </div>

            <div className="flex flex-col gap-[10px]  w-full relative">
              <label
                className="text-[#666] lg:text-[18px] md:text-[18px] text-[14px] font-Noto-Sans-Bengali font-normal leading-[23.4px]"
                htmlFor="confirmPassword"
              >
                কনফার্ম পাসওয়ার্ড
              </label>

              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                id="confirmPassword"
                type={isPasswordVisibleThree ? "text" : "password"}
                className={`w-full h-[51px] rounded-[6px] border-[1px] border-[#E5E5E5] bg-white text-secondaryColor outline-0 pl-5 md:text-[18px] text-[14px] font-Poppins font-normal placeholder-secondaryColor ${
                  passwordErrors ? "" : "border-primaryColor"
                }`}
              />

              {confirmError && (
                <p className="text-[#F00C89] text-[18px] font-Noto-Sans-Bengali font-normal">
                  Password match koreni
                </p>
              )}

              {/* {passwordErrors && (
                <p className="text-[#F00C89] text-[18px] font-Noto-Sans-Bengali font-normal">
                  {passwordErrors?.message}
                </p>
              )} */}

              <div
                className="absolute top-[50px] right-4 cursor-pointer"
                onClick={togglePasswordVisibilityThree}
              >
                {isPasswordVisibleThree ? (
                  <FiEye className="size-5 text-black" />
                ) : (
                  <FiEyeOff className="size-5 text-black" />
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-[30px]">
            <button
              onClick={handleSubmit}
              type="button"
              className="bg-[#F00C89] px-6 h-[50px] rounded-md text-[18px] font-Noto-Sans-Bengali font-medium text-white"
            >
              আপডেট করুন
            </button>
          </div>
        </div>
      </div>

      <div className=" w-full border-b-[1px] border-[#E5E5E5] mt-[30px]"></div>

      <h1 className="text-secondaryColor text-[24px] font-Poppins font-semibold 2xl:pt-[30px] lg:pt-[30px] pt-5">
        Connected Devices
      </h1>

      <div className="flex flex-col gap-[15px] mt-[30px] w-[100%]">
        {devices?.map((device: TDevice, deviceIndex: number) => (
          <div
            key={deviceIndex}
            className="bg-white border-[1px] rounded-md p-5 md:flex justify-between items-center"
          >
            <div className="md:flex gap-5 items-center">
              <>
                {device?.deviceType === "desktop" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_1273_1491)">
                      <path
                        d="M37.3905 29.787H2.60938V8.20195C2.60938 6.94375 3.6293 5.92383 4.8875 5.92383H35.1123C36.3705 5.92383 37.3904 6.94375 37.3904 8.20195V29.787H37.3905Z"
                        fill="#756E78"
                      />
                      <path
                        d="M35.1123 5.92383H33.7655C35.0238 5.92383 36.0437 6.94375 36.0437 8.20195V26.7541C36.0437 27.748 35.238 28.5537 34.2441 28.5537H2.60938V29.787H36.0437H37.3905V28.5537V8.20195C37.3905 6.94375 36.3705 5.92383 35.1123 5.92383Z"
                        fill="#665E66"
                      />
                      <path
                        d="M5.14062 26.7307V8.98078C5.14062 8.75945 5.32 8.58008 5.54133 8.58008H34.4597C34.681 8.58008 34.8604 8.75945 34.8604 8.98078V26.7307C34.8604 26.952 34.681 27.1314 34.4597 27.1314H5.54133C5.32 27.1314 5.14062 26.952 5.14062 26.7307Z"
                        fill="#B1E4F9"
                      />
                      <path
                        d="M34.4597 8.58008H32.7598C32.981 8.58008 33.1605 8.75945 33.1605 8.98078V26.7307C33.1605 26.952 32.9811 27.1314 32.7598 27.1314H34.4597C34.681 27.1314 34.8604 26.952 34.8604 26.7307V8.98078C34.8604 8.75953 34.681 8.58008 34.4597 8.58008Z"
                        fill="#90D8F9"
                      />
                      <path
                        d="M39.0999 34.0763H0.900078C0.402969 34.0763 0 33.6733 0 33.1762V30.6872C0 30.1901 0.402969 29.7871 0.900078 29.7871H39.0481C39.5738 29.7871 40 30.2133 40 30.739V33.1763C40 33.6733 39.597 34.0763 39.0999 34.0763Z"
                        fill="#756E78"
                      />
                      <path
                        d="M39.048 29.7871H37.7461C38.2718 29.7871 38.698 30.2133 38.698 30.739V33.1762C38.698 33.6734 38.295 34.0763 37.7979 34.0763H39.0998C39.5969 34.0763 39.9999 33.6734 39.9999 33.1762V30.739C39.9998 30.2133 39.5737 29.7871 39.048 29.7871Z"
                        fill="#665E66"
                      />
                      <path
                        d="M22.9539 31.9317H17.0456C16.7253 31.9317 16.4381 31.7343 16.3234 31.4352L15.6914 29.7871H24.3082L23.6762 31.4352C23.5614 31.7343 23.2742 31.9317 22.9539 31.9317Z"
                        fill="#F9F6F6"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1273_1491">
                        <rect width="40" height="40" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M28.0254 40H11.9504C9.84146 40 8.13086 38.266 8.13086 36.157V3.81957C8.13086 1.7106 9.84146 0 11.9504 0H28.0254C30.1578 0 31.8684 1.7106 31.8684 3.81957V36.157C31.8684 38.266 30.1578 40 28.0254 40Z"
                      fill="#665E66"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M30.9313 5.99902H9.06836V34.0014H30.9313C30.9313 24.511 30.9313 15.6534 30.9313 5.99902Z"
                      fill="#91DBFA"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M14.0117 0H25.9859L24.6034 3.37434C24.5331 3.53837 24.3691 3.65554 24.1582 3.65554H15.8161C15.6286 3.65554 15.4646 3.53837 15.3943 3.37434L14.0117 0Z"
                      fill="#808080"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M23.7133 37.4695H16.2851C15.6758 37.4695 15.6758 36.5322 16.2851 36.5322H23.7133C24.3226 36.5322 24.3226 37.4695 23.7133 37.4695Z"
                      fill="#808080"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.06836 34.0014L30.9313 5.99902H9.06836V34.0014Z"
                      fill="#B1E4F9"
                    />
                  </svg>
                )}
              </>

              <div className="mt-2 md:mt-0">
                <div className="md:flex gap-5">
                  <h1 className="lg:text-[18px] text-[14px] text-secondaryColor font-Poppins font-semibold">
                    {device?.deviceName}, {device?.os}
                  </h1>
                  {(user?.deviceId as string) === device?.deviceId && (
                    <h1 className="lg:text-[18px] text-[14px] text-primaryColor font-Poppins font-medium">
                      {/* {device?.deviceName}, {device?.os} */}
                      This Device
                    </h1>
                  )}
                </div>
                <div className="md:flex gap-2 mt-2">
                  <h1 className="lg:text-[16px] text-[14px] text-switchColor font-Poppins font-normal">
                    <p>
                      <LastActivity lastActivityTime={device?.lastActivity} />
                    </p>
                  </h1>

                  <div className="flex gap-2 items-center">
                    {device?.deviceId === "mobile" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="5"
                        height="5"
                        viewBox="0 0 5 5"
                        fill="none"
                      >
                        <circle
                          cx="2.5"
                          cy="2.5"
                          r="2.5"
                          fill="black"
                          fill-opacity="0.6"
                        />
                      </svg>
                    )}

                    {device?.deviceId === "desktop" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M28.0254 40H11.9504C9.84146 40 8.13086 38.266 8.13086 36.157V3.81957C8.13086 1.7106 9.84146 0 11.9504 0H28.0254C30.1578 0 31.8684 1.7106 31.8684 3.81957V36.157C31.8684 38.266 30.1578 40 28.0254 40Z"
                          fill="#665E66"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M30.9313 5.99902H9.06836V34.0014H30.9313C30.9313 24.511 30.9313 15.6534 30.9313 5.99902Z"
                          fill="#91DBFA"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M14.0117 0H25.9859L24.6034 3.37434C24.5331 3.53837 24.3691 3.65554 24.1582 3.65554H15.8161C15.6286 3.65554 15.4646 3.53837 15.3943 3.37434L14.0117 0Z"
                          fill="#808080"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M23.7133 37.4695H16.2851C15.6758 37.4695 15.6758 36.5322 16.2851 36.5322H23.7133C24.3226 36.5322 24.3226 37.4695 23.7133 37.4695Z"
                          fill="#808080"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9.06836 34.0014L30.9313 5.99902H9.06836V34.0014Z"
                          fill="#B1E4F9"
                        />
                      </svg>
                    )}

                    <h1 className="lg:text-[16px] text-[14px] text-switchColor font-Poppins font-normal">
                      {device?.ipAddress}
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-2 md:mt-0">
              <button
                onClick={() => handleLogout(device?.deviceId)}
                type="button"
                className="text-switchColor text-[18px] hover:text-primaryColor  font-Poppins font-medium duration-200"
              >
                Log Out
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountSettings;
