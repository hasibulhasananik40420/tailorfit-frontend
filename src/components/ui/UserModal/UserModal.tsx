import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Link } from "react-router-dom";
import { RiLogoutCircleRLine, RiSecurePaymentLine } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "../../../redux/features/hooks";
import {
  logout,
  selectCurrentUser,
} from "../../../redux/features/auth/authSlice";
import { BiUserCircle } from "react-icons/bi";
import { useLogoutUserMutation } from "../../../redux/features/auth/authApi";

interface UserModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const UserModal = ({ isOpen, setIsOpen }: UserModalProps) => {
  function close() {
    setIsOpen(false);
  }

  function handleProfileClick() {
    close();
  }

  const [logoutUser] = useLogoutUserMutation();

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  //  console.log(user)

  const handleLogout = async () => {
    await logoutUser("");
    dispatch(logout());
  };

  return (
    <div className="">
      <Transition appear show={isOpen}>
        <Dialog
          as="div"
          className="relative z-10 focus:outline-none"
          onClose={close}
        >
          <div className="fixed inset-0 z-10 max-w-[1920px] mx-auto">
            <div className="flex justify-end items-start 2xl:mt-[90px] mt-[70px] mr-5 2xl:mr-[30px] ">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 transform-[scale(95%)]"
                enterTo="opacity-100 transform-[scale(100%)]"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 transform-[scale(100%)]"
                leaveTo="opacity-0 transform-[scale(95%)]"
              >
                <DialogPanel
                  className="min-w-[248px] rounded-[8px] bg-white   "
                  style={{ boxShadow: "0px 0px 25px 0px rgba(0, 0, 0, 0.12)" }}
                >
                  <div className="flex gap-[10px] items-center p-5">
                    {user?.profile ? (
                      <img
                        src={user?.profile}
                        alt="User Profile"
                        className="bg-[#F0F2F5] lg:w-[50px] lg:h-[50px] w-[35px] h-[35px] rounded-full flex justify-center items-center cursor-pointer"
                        style={{
                          boxShadow: "0px 0px 25px rgba(25, 93, 142, 0.05)",
                        }}
                      />
                    ) : (
                      <span
                        className="bg-btn-hover lg:w-[50px] lg:h-[50px] w-[35px] h-[35px] rounded-full flex justify-center items-center cursor-pointer"
                        style={{
                          boxShadow: "0px 0px 25px rgba(25, 93, 142, 0.05)",
                        }}
                      >
                        <h1 className="text-white md:text-[24px] text-[18px] font-semibold font-Poppins">
                          {" "}
                          {user?.companyName?.slice(0, 1).toUpperCase()}
                        </h1>
                      </span>
                    )}

                    <span className=" ">
                      <p className="text-secondaryColor text-[18px] font-Poppins font-medium">
                        {user?.companyName}
                      </p>
                      <p className="text-switchColor text-[12px] font-Poppins font-normal">
                        {user?.email}
                      </p>
                    </span>
                  </div>

                  <div className="w-full border-[1px] border-borderColor "></div>

                  <div className="flex flex-col gap-[10px] p-[10px]">
                    <Link
                      to="my-profile"
                      onClick={handleProfileClick}
                      className="hover:bg-activeDhcolor text-secondaryColor hover:text-primaryColor flex  items-center gap-2 h-[35px] w-full pl-[10px] rounded text-[14px] font-Poppins font-normal duration-300"
                    >
                      <BiUserCircle className="size-6 " />

                      <p>My Profile</p>
                    </Link>

                    <Link
                      to="subscription"
                      onClick={handleProfileClick}
                      className="bg-transparent flex  items-center gap-2 h-[35px] w-full pl-[10px] rounded text-secondaryColor text-[14px] font-Poppins font-normal hover:bg-activeDhcolor hover:text-[#F00C89] duration-300"
                    >
                      <RiSecurePaymentLine className="size-6" />
                      <p>My Subscription</p>
                    </Link>

                   

                    <button
                      onClick={handleLogout}
                      className="bg-transparent flex  items-center gap-2 h-[35px] w-full pl-[10px] rounded text-secondaryColor text-[14px] font-Poppins font-normal hover:bg-activeDhcolor hover:text-[#F00C89] duration-300"
                    >
                      <RiLogoutCircleRLine className="size-5" />

                      <p>Logout</p>
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default UserModal;
