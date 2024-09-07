import { useEffect, useRef, useState } from "react";
// import { GrFormCheckmark } from "react-icons/gr";
import { LuListFilter } from "react-icons/lu";
// import { useAppDispatch, useAppSelector } from "../../redux/features/hooks";
// import { RootState } from "../../redux/features/store";
// import {
//   setAll,
//   toggleActiveOrder,
//   toggleForDelivery,
//   toggleDelivered,
//   toggleNewOrder,
//   toggleDateOver,
//   toggleDeliveryLeftTwoDays,
//   toggleUrgent,
// } from "../../redux/features/auth/filterSlice";

const FilterOrderHistory = () => {
 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(!isModalOpen);
  };

//   const handleCheckAll = () => {
//     dispatch(setAll(!filters.all));
//   };

  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <div className="relative">
      <div className="mt-[-12px]">
        <button
          ref={buttonRef}
          onClick={handleButtonClick}
          className="px-3 h-[39px] border-[1px] border-[#999] bg-white rounded-[40px] flex justify-center items-center gap-[6px] text-[14px] text-secondaryColor font-Noto-Sans-Bengali font-normal"
          style={{ boxShadow: "0px 0px 25px 0px rgba(25, 93, 142, 0.05)" }}
        >
          <LuListFilter className="size-4 text-secondaryColor" />
          ফিল্টার
        </button>
      </div>

      {isModalOpen && (
        <div
          ref={modalRef}
          className="absolute top-[50px] right-0 z-30 w-[224px] bg-white min-h-[200px] rounded-[6px] p-4"
          style={{ boxShadow: "0px 0px 5px 0px rgba(200, 201, 209, 0.65)" }}
        >
          <div className="flex flex-col gap-5">
            {/* <div className="flex items-center gap-2">
              <label
                onClick={handleCheckAll}
                htmlFor="all"
                className={`lg:w-6 lg:h-6 md:w-6 md:h-6 w-[20px] h-[20px] rounded-[4px] flex items-center justify-center cursor-pointer relative ${
                  filters.all
                    ? "bg-[#F00C89] border-0"
                    : "border-[1px] border-[#E5E5E5]"
                }`}
              >
                {filters.all && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <GrFormCheckmark className="md:size-6 size-5 text-white" />
                  </div>
                )}
              </label>
              <p className="text-[#878787] 2xl:text-[18px] text-[15px] 2makbook:text-[10px] font-Noto-Sans-Bengali font-normal">
                সকল
              </p>
            </div>

            <div className="flex items-center gap-2">
              <label
                onClick={() => dispatch(toggleDelivered())}
                htmlFor="delivered"
                className={`lg:w-6 lg:h-6 md:w-6 md:h-6 w-[20px] h-[20px] rounded-[4px] flex items-center justify-center cursor-pointer relative ${
                  filters.delivered
                    ? "bg-[#F00C89] border-0"
                    : "border-[1px] border-[#E5E5E5]"
                }`}
              >
                {filters.delivered && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <GrFormCheckmark className="md:size-6 size-5 text-white" />
                  </div>
                )}
              </label>
              <p className="text-[#878787] 2xl:text-[18px] text-[15px] 2makbook:text-[10px] font-Noto-Sans-Bengali font-normal">
                ডেলিভারি সম্পন্ন
              </p>
            </div>

            <div className="flex items-center gap-2">
              <label
                onClick={() => dispatch(toggleNewOrder())}
                htmlFor="newOrder"
                className={`lg:w-6 lg:h-6 md:w-6 md:h-6 w-[20px] h-[20px] rounded-[4px] flex items-center justify-center cursor-pointer relative ${
                  filters.newOrder
                    ? "bg-[#F00C89] border-0"
                    : "border-[1px] border-[#E5E5E5]"
                }`}
              >
                {filters.newOrder && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <GrFormCheckmark className="md:size-6 size-5 text-white" />
                  </div>
                )}
              </label>
              <p className="text-[#878787] 2xl:text-[18px] text-[15px] 2makbook:text-[10px] font-Noto-Sans-Bengali font-normal">
                নতুন অর্ডার
              </p>
            </div>

            <div className="flex items-center gap-2">
              <label
                onClick={() => dispatch(toggleDateOver())}
                htmlFor="dateOver"
                className={`lg:w-6 lg:h-6 md:w-6 md:h-6 w-[20px] h-[20px] rounded-[4px] flex items-center justify-center cursor-pointer relative ${
                  filters.dateOver
                    ? "bg-[#F00C89] border-0"
                    : "border-[1px] border-[#E5E5E5]"
                }`}
              >
                {filters.dateOver && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <GrFormCheckmark className="md:size-6 size-5 text-white" />
                  </div>
                )}
              </label>
              <p className="text-[#878787] 2xl:text-[18px] text-[15px] 2makbook:text-[10px] font-Noto-Sans-Bengali font-normal">
                ডেট ওভার
              </p>
            </div>

            <div className="flex items-center gap-2">
              <label
                onClick={() => dispatch(toggleDeliveryLeftTwoDays())}
                htmlFor="deliveryLeftTwoDays"
                className={`lg:w-6 lg:h-6 md:w-6 md:h-6 w-[20px] h-[20px] rounded-[4px] flex items-center justify-center cursor-pointer relative ${
                  filters.deliveryLeftTwoDays
                    ? "bg-[#F00C89] border-0"
                    : "border-[1px] border-[#E5E5E5]"
                }`}
              >
                {filters.deliveryLeftTwoDays && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <GrFormCheckmark className="md:size-6 size-5 text-white" />
                  </div>
                )}
              </label>
              <p className="text-[#878787] 2xl:text-[18px] text-[15px] 2makbook:text-[10px] font-Noto-Sans-Bengali font-normal">
                ডেলিভারি বাকি দুই দিন
              </p>
            </div>

            <div className="flex items-center gap-2">
              <label
                onClick={() => dispatch(toggleUrgent())}
                htmlFor="urgent"
                className={`lg:w-6 lg:h-6 md:w-6 md:h-6 w-[20px] h-[20px] rounded-[4px] flex items-center justify-center cursor-pointer relative ${
                  filters.urgent
                    ? "bg-[#F00C89] border-0"
                    : "border-[1px] border-[#E5E5E5]"
                }`}
              >
                {filters.urgent && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <GrFormCheckmark className="md:size-6 size-5 text-white" />
                  </div>
                )}
              </label>
              <p className="text-[#878787] 2xl:text-[18px] text-[15px] 2makbook:text-[10px] font-Noto-Sans-Bengali font-normal">
                আরজেন্ট
              </p>
            </div>

            <div className="flex items-center gap-2">
              <label
                onClick={() => dispatch(toggleActiveOrder())}
                htmlFor="active"
                className={`lg:w-6 lg:h-6 md:w-6 md:h-6 w-[20px] h-[20px] rounded-[4px] flex items-center justify-center cursor-pointer relative ${
                  filters.activeOrder
                    ? "bg-[#F00C89] border-0"
                    : "border-[1px] border-[#E5E5E5]"
                }`}
              >
                {filters.activeOrder && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <GrFormCheckmark className="md:size-6 size-5 text-white" />
                  </div>
                )}
              </label>
              <p className="text-[#878787] 2xl:text-[18px] text-[15px] 2makbook:text-[10px] font-Noto-Sans-Bengali font-normal">
                চলমান অর্ডার
              </p>
            </div>

            <div className="flex items-center gap-2">
              <label
                onClick={() => dispatch(toggleForDelivery())}
                htmlFor="forDelivery"
                className={`lg:w-6 lg:h-6 md:w-6 md:h-6 w-[20px] h-[20px] rounded-[4px] flex items-center justify-center cursor-pointer relative ${
                  filters.forDelivery
                    ? "bg-[#F00C89] border-0"
                    : "border-[1px] border-[#E5E5E5]"
                }`}
              >
                {filters.forDelivery && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <GrFormCheckmark className="md:size-6 size-5 text-white" />
                  </div>
                )}
              </label>
              <p className="text-[#878787] 2xl:text-[18px] text-[15px] 2makbook:text-[10px] font-Noto-Sans-Bengali font-normal">
                ডেলিভারির জন্য প্রস্তুত
              </p>
            </div> */}



         <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2">
             
              <p className="text-[#878787] 2xl:text-[18px] text-[15px] 2makbook:text-[10px] font-Noto-Sans-Bengali font-normal">
                সকল
              </p>
            </div>





          </div>




        </div>
        </div>
      )}
    </div>
  );
};

export default FilterOrderHistory;
