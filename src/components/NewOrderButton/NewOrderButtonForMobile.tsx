import { useEffect, useRef, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { FiUser } from "react-icons/fi";
import { LuUsers } from "react-icons/lu";

interface NewOrderButtonForMobileProps {
    onClose: () => void;
  }

const NewOrderButtonForMobile = ({ onClose }:NewOrderButtonForMobileProps) => {
  const [showDiv, setShowDiv] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const toggleDiv = () => {
    setShowDiv(!showDiv);
  };
  const handleClose = () => {
    setShowDiv(false);
    onClose()
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    if (showDiv) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDiv]);

  return (
    <div className="">
      <button
        onClick={toggleDiv}
        className="relative w-full lg:h-[60px] h-[40px] bg-[#F00C89] text-white 2xl:text-[20px] lg:text-[18px] text-[14px] font-Poppins font-normal flex justify-center items-center gap-[6px] rounded-md"
      >
        <FiPlus className="lg:size-6 size-5" />
        <p>New Order</p>
      </button>
      {showDiv && (
        <div
          ref={modalRef}
          className="absolute 2xl:top-[120px] lg:top-[110px] top-[80px] 2xl:w-[280px] 2large:w-[240px] lg:w-[240px] w-[222px]  bg-white rounded-md lg:p-5 p-4"
          style={{ boxShadow: "0px 0px 25px 0px rgba(0, 0, 0, 0.12)" }}
        >
          <div className="flex flex-col lg:gap-5 gap-4">
            <Link
              onClick={handleClose}
              to={"indivisual-new-order"}
              className="w-full h-[40px] border-[1px] border-[#F00C89] rounded flex justify-between items-center lg:px-5 px-3 text-[#F00C89] hover:text-white hover:bg-[#F00C89] duration-300"
            >
              <span className="flex gap-2 items-center">
                <FiUser className="size-5" />
                <p className=" lg:text-[18px] text-[14px] font-Noto-Sans-Bengali font-normal">
                  ব্যক্তি
                </p>
              </span>
              <IoIosArrowForward className="size-5" />
            </Link>

            <Link
              onClick={handleClose}
              to={"company-new-order"}
              className="w-full h-[40px] border-[1px] border-[#F00C89] rounded flex justify-between items-center lg:px-5 px-3 text-[#F00C89] hover:text-white hover:bg-[#F00C89] duration-300 "
            >
              <span className="flex gap-2 items-center">
                <LuUsers className="size-5" />
                <p className=" lg:text-[18px] text-[14px] font-Noto-Sans-Bengali font-normal">
                  প্রতিষ্ঠান
                </p>
              </span>
              <IoIosArrowForward className="size-5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewOrderButtonForMobile;
