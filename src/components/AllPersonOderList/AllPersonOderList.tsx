/* eslint-disable @typescript-eslint/no-explicit-any */
import { FiCopy } from "react-icons/fi";
import { HiDotsVertical, HiOutlineInformationCircle } from "react-icons/hi";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { useAppSelector } from "../../redux/features/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import {
  TIndividualOrder,
  useEditIndividualOrderMutation,
  useGetIndividualOrdersQuery,
} from "../../redux/api/individualOrderApi";
import Swal from "sweetalert2";

import Loader from "../Loader/Loader";
import ActionButtonModal from "../ui/ActionButtonModal/ActionButtonModal";
import { RootState } from "../../redux/features/store";
import DatePicker from "react-datepicker";

interface Status {
  id: number;
  text: string;
  color: string;
}

const status: Status[] = [
  { id: 1, text: "নতুন অর্ডার", color: "#4CBF41" },
  { id: 2, text: "চলমান অর্ডার", color: "#3C8DCF" },
  { id: 3, text: "ডেলিভারির জন্য প্রস্তুত", color: "#2BC8A2" },
  { id: 4, text: "ডেলিভারি সম্পন্ন", color: "#F17098" },
  { id: 5, text: "ডেট অভার", color: "#8C7FDD" },
  { id: 6, text: "ডেলিভারির ২ দিন বাকি", color: "#E8A54E" },
  { id: 7, text: "আরজেন্ট", color: "#EAD309" },
];

const AllPersonOderList = () => {
  const [actionModalOpen, setactionModalOpen] = useState<{
    id: string | null;
    index: number | null;
  }>({ id: null, index: null });

  const [editIndividualOrder] = useEditIndividualOrderMutation();
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  // const [error, setError] = useState<ValidationError[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<{
    [key: string]: string;
  }>({});
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleActionModal = (orderId: string, orderIndex: number) => {
    setactionModalOpen(
      actionModalOpen.id === orderId
        ? { id: null, index: null }
        : { id: orderId, index: orderIndex }
    );
  };

  const handleStatusClick = (orderId: string) => {
    setDropdownOpen(dropdownOpen === orderId ? null : orderId);
  };

  const handleStatusSelect = async (orderId: string, status: Status) => {
    const info = {
      _id: orderId,
      orderStatus: status.text,
      orderBGColor: status.color,
    };

    try {
      const res = await editIndividualOrder(info).unwrap();

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
      // setError((err as any)?.data?.errorSources);
    }
    setSelectedStatus(() => ({ [orderId]: status.text }));
    setDropdownOpen(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // const searchQuery = useAppSelector((state: RootState) => state?.search?.query);
  // console.log(searchQuery)
  const filters = useAppSelector((state: RootState) => state?.filter);
  // console.log(filters)
  
  const currentData = useAppSelector(selectCurrentUser);

  const { data, isLoading } = useGetIndividualOrdersQuery({
    adminId: currentData?.id,
    searchTerm: "",
  });

  // console.log(data)

  const individualOrder = data?.data || [];


  const filteredOrdersByStatus = individualOrder?.filter(
    (order: TIndividualOrder) => {
      // Check if no filters are applied
      const noFiltersApplied =
        !filters.activeOrder &&
        !filters.forDelivery &&
        !filters.delivered &&
        !filters.newOrder &&
        !filters.dateOver &&
        !filters.deliveryLeftTwoDays &&
        !filters.urgent;

      // If no filters are applied, return true to show all orders
      if (noFiltersApplied) return true;

      // Apply filters if any filter is applied
      if (filters.activeOrder && order.orderStatus === "চলমান অর্ডার")
        return true;
      if (
        filters.forDelivery &&
        order.orderStatus === "ডেলিভারির জন্য প্রস্তুত"
      )
        return true;
      if (filters.delivered && order.orderStatus === "ডেলিভারি সম্পন্ন")
        return true;
      if (filters.newOrder && order.orderStatus === "নতুন অর্ডার") return true;
      if (filters.dateOver && order.orderStatus === "ডেট অভার") return true;
      if (
        filters.deliveryLeftTwoDays &&
        order.orderStatus === "ডেলিভারির ২ দিন বাকি"
      )
        return true;
      if (filters.urgent && order.orderStatus === "আরজেন্ট") return true;

      return false;
    }
  );

  // console.log(filteredOrdersByStatus);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="">
     
      {filteredOrdersByStatus?.length > 0 ? (
        <div className="relative w-full rounded-[10px] border-[1px] border-borderColor   lg:overflow-y-auto overflow-x-auto min-h-[590px]">
          <table className="w-full text-left">
            <thead className=" bg-[#F6F6F6] 2xl:text-[18px] 2mid75:text-[16px] 2large:text-[16px] lg:text-[14px]  2makbook:text-[10px] text-[14px] text-[#555] font-Noto-Sans-Bengali font-normal">
              <tr>
                <th scope="col" className="2xl:px-6 2xl:py-3 px-3 py-2">
                  আইডি 
                </th>
                <th scope="col" className="2xl:px-6 2xl:py-3 px-3 py-2">
                  ব্যক্তির নাম
                </th>
                <th scope="col" className="2xl:px-6 2xl:py-3 px-3 py-2">
                  মোবাইল
                </th>
                <th scope="col" className="2xl:px-6 2xl:py-3 px-3 py-2">
                  অর্ডার ডেট
                </th>

                <th scope="col" className="2xl:px-6 2xl:py-3 px-3 py-2">
                  ডেলিভারি ডেট
                </th>

                <th scope="col" className="2xl:px-6 2xl:py-3 px-3 py-2">
                  ক্যাটাগরি
                </th>

                <th scope="col" className="2xl:px-6 2xl:py-3 px-3 py-2">
                  স্ট্যাটাস
                </th>

                <th scope="col" className="2xl:px-6 2xl:py-3 px-3 py-2">
                  একশন
                </th>
              </tr>
            </thead>
            <tbody className="">
              {filteredOrdersByStatus?.map(
                (order: TIndividualOrder, orderIndex: number) => (
                  <>
                    <tr
                      key={order?.orderId}
                      className="bg-white border-b border-dashed"
                    >
                      <th
                        scope="row"
                        className="2xl:px-6 2xl:py-3 px-3 py-2 font-Poppins font-medium text-[#353535] 2xl:text-[18px] 2mid75:text-[16px] 2large:text-[16px] lg:text-[14px] 2makbook:text-[10px] text-[14px] whitespace-nowrap"
                      >
                        {}
                        <Link  className="block overflow-hidden text-ellipsis hover:text-primaryColor duration-100" to={`/${currentData?.role}/order-details/${order._id}`}>
                          {" "}
                          #{order?.orderId}
                        </Link>
                      </th>
                      <th
                        scope="row"
                        className="2xl:px-6 2xl:py-3 px-3 py-2 font-Poppins font-medium text-[#353535] whitespace-nowrap 2xl:text-[18px] 2mid75:text-[16px] 2large:text-[16px] lg:text-[14px]  2makbook:text-[10px] text-[14px] 2xl:max-w-[200px] 2mid75:max-w-[170px] 2large:max-w-[150px] max-w-[130px] overflow-hidden text-ellipsis "
                      >
                       <Link to={`/${currentData?.role}/order-details/${order._id}`}
                          className="block overflow-hidden text-ellipsis hover:text-primaryColor duration-100"
                        >
                          {order?.customerName}
                        </Link>
                      </th>
                      <th
                        scope="row"
                        className="2xl:px-6 2xl:py-3 px-3 py-2 font-Poppins font-normal text-secondaryColor whitespace-nowrap 2xl:text-[18px] 2large:text-[16px] lg:text-[14px] 2mid75:text-[16px] 2makbook:text-[10px] text-[14px]"
                      >
                        {order?.phoneNumber}
                      </th>
                      <th
                        scope="row"
                        className="2xl:px-6 2xl:py-3 px-3 py-2 font-Poppins font-normal text-secondaryColor whitespace-nowrap 2xl:text-[18px] 2large:text-[16px] lg:text-[14px] 2mid75:text-[16px]  2makbook:text-[10px] text-[16px]"
                      >
                        <DatePicker
                          readOnly
                          selected={
                            order?.orderDate ? new Date(order.orderDate) : null
                          }
                          dateFormat="dd-MM-yyyy"
                          className="border-0 outline-none max-w-24 bg-white"
                          calendarClassName="custom-calendar-class"
                        />
                      </th>
                      <th
                        scope="row"
                        className="2xl:px-6 2xl:py-3 px-3 py-2 font-Poppins font-normal text-secondaryColor whitespace-nowrap 2xl:text-[18px] 2large:text-[16px] lg:text-[14px] 2mid75:text-[16px] 2makbook:text-[10px] text-[14px]"
                      >
                        <DatePicker
                          readOnly
                          selected={
                            order?.deliveryDate
                              ? new Date(order?.deliveryDate)
                              : null
                          }
                          dateFormat="dd-MM-yyyy"
                          className="border-0 outline-none max-w-24 bg-white"
                          calendarClassName="custom-calendar-class"
                        />
                      </th>
                      <th
                        scope="row"
                        className="2xl:px-6 2xl:py-3 px-3 py-2 font-Poppins font-normal text-secondaryColor whitespace-nowrap 2xl:text-[18px] 2large:text-[16px] lg:text-[14px] 2mid75:text-[16px] 2makbook:text-[10px] text-[14px]"
                      >
                        {order?.item
                          ?.slice(0, 1)
                          .map((item: any) => item?.category)}
                      </th>

                      <th
                        onClick={() => handleStatusClick(order?.orderId as string)}
                        scope="row"
                        className={`2xl:px-6 2xl:py-3 py-2 font-Poppins font-normal text-secondaryColor whitespace-nowrap 2xl:text-[18px] 2large:text-[16px] lg:text-[14px] 2mid75:text-[16px] 2makbook:text-[10px] text-[16px] w-[200px] cursor-pointer  `}
                      >
                         {/* ${ 
                          dropdownOpen === order?.orderId && " pointer-events-none cursor-pointer"  
                        } */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span
                              className="w-[10px] h-[10px] rounded-full"
                              style={{
                                backgroundColor: order?.orderBGColor,
                              }}
                            ></span>
                            <p>
                              {selectedStatus[order?.orderId as string]
                                ? selectedStatus[order?.orderId as string]
                                : order?.orderStatus}
                            </p>
                          </div>
                          <IoIosArrowDown
                            onClick={() => handleStatusClick(order?.orderId as string)}
                            className="size-5 text-secondaryColor cursor-pointer"
                          />
                          {dropdownOpen === order?.orderId && (
                            <div
                              ref={dropdownRef}
                              onClick={(e) => e.stopPropagation()}
                              className="absolute mt-2 w-[224px] bg-white rounded-[8px]"
                              style={{
                                top: `calc(${orderIndex * 50}px + 80px)`,
                                boxShadow:
                                  "0px 0px 25px 0px rgba(0, 0, 0, 0.10)",
                              }}
                            >
                              {status.map((status, id: number) => (
                                <div
                                  key={id}
                                  className="flex items-center gap-2 m-[10px] h-[31px] cursor-pointer hover:bg-activeDhcolor pl-[10px] rounded"
                                  onClick={() => {
                                    if (order?._id) {
                                      handleStatusSelect(order._id, status);
                                    }
                                  }}
                                >
                                  <span
                                    className="w-[10px] h-[10px] rounded-full"
                                    style={{ backgroundColor: status.color }}
                                  ></span>
                                  <p>{status.text}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </th>

                      <th
                        scope="row"
                        className="2xl:px-6 2xl:py-3 px-3 py-2 font-Poppins font-normal text-secondaryColor whitespace-nowrap md:text-[18px] text-[14px]"
                      >
                        <div className="flex justify-between items-center 2xl:gap-[15px] gap-[10px]">
                          <Link to={`/admin/duplicate-order/${order?._id}`}>
                            <button className="bg-btn-hover 2xl:w-[115px] w-[100px] h-[38px] rounded-[6px] 2xl:text-[18px] 2mid75:text-[16px] 2large:text-[16px] lg:text-[14px] 2makbook:text-[10px] text-[14px] text-white font-Noto-Sans-Bengali font-medium flex justify-center items-center gap-[6px] cursor-pointer">
                              <FiCopy className="2xl:size-5 size-4 text-white" />
                              ডুপ্লিকেট
                            </button>
                          </Link>
                          <div onClick={() =>
                                toggleActionModal(order?.orderId as string,  orderIndex)
                              } className={`w-[37px] h-[37px] rounded-[6px] bg-[#F6F6F6] flex justify-center items-center cursor-pointer `}>
                            <HiDotsVertical
                              // onClick={toggleActionModal}
                             
                              className="size-5 text-[#333333]"
                            />

                            {actionModalOpen.id === order?.orderId && (
                              <div
                                className="absolute mt-[-25px]  lg:right-4 z-20"
                                style={{
                                  top: `calc(${orderIndex * 50}px + 80px)`,

                                  // Adjust based on the row
                                }}
                              >
                                <ActionButtonModal
                                  isOpen={actionModalOpen.id === order?.orderId}
                                  setIsOpen={() =>
                                    setactionModalOpen({
                                      id: null,
                                      index: null,
                                    })
                                  }
                                  id={order?._id ?? ""}
                                  order={order}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </th>
                    </tr>
                  </>
                )
              )}
            </tbody>
          </table>
        </div>
      ) : (
       

           <div className="flex items-center justify-center gap-4 text-[24px] text-center text-switchColor font-Noto-Sans-Bengali font-medium  min-h-[500px]">
         <HiOutlineInformationCircle className="size-8" />

           <p>এখন পর্যন্ত কোন অর্ডার তৈরি করা হয়নি</p>
               </div>
      )}
    </div>
  );
};

export default AllPersonOderList;
