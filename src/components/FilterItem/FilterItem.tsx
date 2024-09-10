import { useEffect, useRef, useState } from "react";
import { GrFormCheckmark } from "react-icons/gr";
import { LuListFilter } from "react-icons/lu";
import { RootState } from "../../redux/features/store";
import {
  setAll,
  toggleActiveOrder,
  toggleForDelivery,
  toggleDelivered,
  toggleNewOrder,
  toggleDateOver,
  toggleDeliveryLeftTwoDays,
  toggleUrgent,
} from "../../redux/features/auth/filterSlice";
import { useAppDispatch, useAppSelector } from "../../redux/features/hooks";

const FilterItem = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state: RootState) => state.filter);
  // console.log(filters)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCheckAll = () => {
    dispatch(setAll(!filters.all));
  };

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


   // Reset filters on component unmount
   useEffect(() => {
    return () => {
      // Dispatch action to reset all filters
      dispatch(setAll(false));
    };
  }, [dispatch]);

  return (
    <>
      <div
        onClick={handleCheckAll}
        className="flex items-center gap-2 cursor-pointer"
      >
        <label
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
        <p className=" text-[#878787] 2xl:text-[18px] text-[15px] 2makbook:text-[10px] font-Noto-Sans-Bengali font-normal">
          সকল
        </p>
      </div>

      <div
        onClick={() => dispatch(toggleActiveOrder())}
        className="flex items-center gap-2 cursor-pointer"
      >
        <label
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

      <div
        onClick={() => dispatch(toggleForDelivery())}
        className="flex items-center gap-2 cursor-pointer"
      >
        <label
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
      </div>

      <div className="relative">
        <button
          ref={buttonRef}
          onClick={handleButtonClick}
          className="relative w-[125px] 2xl:h-[50px] h-[40px] border-[1px] border-[#999] bg-white rounded-[40px] flex justify-center items-center gap-[6px] 2xl:text-[18px] text-[15px] text-secondaryColor font-Noto-Sans-Bengali font-normal"
          style={{ boxShadow: "0px 0px 25px 0px rgba(25, 93, 142, 0.05)" }}
        >
          <LuListFilter className="size-6 text-secondaryColor" />
          ফিল্টার
        </button>

        {isModalOpen && (
          <div
            ref={modalRef}
            className="absolute top-[50px] right-0 z-50 w-[224px] bg-white rounded-[6px] p-4"
            style={{ boxShadow: "0px 0px 5px 0px rgba(200, 201, 209, 0.65)" }}
          >
            <div className="flex flex-col gap-5">
              <div
                onClick={() => dispatch(toggleDelivered())}
                className="flex items-center gap-2 cursor-pointer"
              >
                <label
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

              <div onClick={() => dispatch(toggleNewOrder())} className="flex items-center gap-2 cursor-pointer">
                <label
                  
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

              <div  onClick={() => dispatch(toggleDateOver())} className="flex items-center gap-2 cursor-pointer">
                <label
                  
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

              <div onClick={() => dispatch(toggleDeliveryLeftTwoDays())} className="flex items-center gap-2 cursor-pointer">
                <label
                  
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

              <div onClick={() => dispatch(toggleUrgent())} className="flex items-center gap-2 cursor-pointer">
                <label
                  
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
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FilterItem;
