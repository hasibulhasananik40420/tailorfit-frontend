/* eslint-disable @typescript-eslint/no-explicit-any */
import { FiSearch } from "react-icons/fi";
import { HiDotsVertical, HiOutlineInformationCircle } from "react-icons/hi";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown, IoMdClose } from "react-icons/io";
import {  useAppSelector } from "../../redux/features/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import {
  TIndividualOrder,
  TIndividualOrderItem,
  useEditIndividualOrderMutation,
  useGetIndividualOrderQuery,
  useGetIndividualOrdersQuery,
} from "../../redux/api/individualOrderApi";
import Swal from "sweetalert2";

import Loader from "../Loader/Loader";
import ActionButtonModal from "../ui/ActionButtonModal/ActionButtonModal";
import { RootState } from "../../redux/features/store";
import DatePicker from "react-datepicker";
import ReactToPrint from "react-to-print";
import { Dialog, DialogPanel } from "@headlessui/react";

import PDFGenerator from "../../utils/PDF";


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

  const componentRef = useRef<HTMLDivElement>(null);

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

  const [isOpen, setIsOpen] = useState(false as boolean);

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

  const searchQuery = useAppSelector(
    (state: RootState) => state?.search?.query
  );
  // console.log(searchQuery)
  const filters = useAppSelector((state: RootState) => state?.filter);
  // console.log(filters)
  const { filterDate } = useAppSelector((state: RootState) => state.filterDate);

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
  

  const filteredOrders = filteredOrdersByStatus?.filter((order: any) => {
    const matchesSearchQuery =
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.orderId.includes(searchQuery) ||
      order.phoneNumber.includes(searchQuery);

    let matchesDate = true;
    if (filterDate) {
      const selectedDateStart = new Date(
        filterDate.setHours(0, 0, 0, 0)
      ).toISOString();
      const selectedDateEnd = new Date(
        filterDate.setHours(23, 59, 59, 999)
      ).toISOString();

      const orderDateStart = new Date(order.orderDate).toISOString();
      const deliveryDateStart = new Date(order.deliveryDate).toISOString();

      matchesDate =
        (orderDateStart >= selectedDateStart &&
          orderDateStart <= selectedDateEnd) ||
        (deliveryDateStart >= selectedDateStart &&
          deliveryDateStart <= selectedDateEnd);
    }

    return matchesSearchQuery && matchesDate;
  });

  const [selectedId, setSelectedId] = useState(null);
  const [modalData, setModalData] = useState<Partial<TIndividualOrder>>({});
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);

  const { data: iOrderData, isLoading: iIsLoading } =
    useGetIndividualOrderQuery(selectedId);

  const handleOpenModal = (id: any) => {
    setSelectedId(id);
    setIsOpen(true);
    setSelectedIndexes([]);
  };

  useEffect(() => {
    if (iOrderData && !iIsLoading && selectedId) {
      setModalData(iOrderData?.data);
    }
  }, [iOrderData, iIsLoading, selectedId]);

  const handleItemClick = (index: number) => {
    setSelectedIndexes((prevIndexes) => {
      if (prevIndexes.includes(index)) {
        return prevIndexes.filter((i) => i !== index);
      } else {
        return [...prevIndexes, index];
      }
    });
  };
  const newPrintedData =
    modalData?.item?.filter((_, index) => selectedIndexes.includes(index)) ||
    [];

  const printData = {
    ...modalData, // Keep all properties of modalData
    item: newPrintedData, // Replace only the item property with the filtered newPrintedData
  };



  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="relative">
      {searchQuery && (
        <div
          // ref={searchContainerRef}
          className="bg-white rounded-[8px] lg:max-w-[530px] w-full z-50 absolute lg:mt-5 mt-5 right-[0px]"
          style={{ boxShadow: "5px 0px 30px 0px rgba(0, 0, 0, 0.15)" }}
        >
          <div className="p-4">
            <>
              {filteredOrders?.length > 0 ? (
                <div className="flex flex-col gap-2 max-h-[265px] overflow-y-auto">
                  {filteredOrders?.map((order: any) => (
                    <Link
                      to={`/${currentData?.role}/order-details/${order._id}`}
                      key={order._id}
                      // onClick={handleClear}
                      className={`cursor-pointer px-3 py-[10px] hover:bg-activeDhcolor duration-200 rounded flex flex-wrap items-center gap-2`}
                    >
                      {/* <IoSearch className="size-6 " /> */}

                      <div className="flex gap-2 items-center">
                        <p className="lg:text-[18px] text-[14px] text-black font-Poppins font-normal">
                          #{order?.orderId}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
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
                            fillOpacity="0.6"
                          />
                        </svg>

                        <h1 className="lg:text-[18px] text-[14px] text-black font-Poppins font-normal">
                          {order?.customerName}
                        </h1>
                      </div>

                      <div className="flex gap-2 items-center">
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
                            fillOpacity="0.6"
                          />
                        </svg>
                        <p className="lg:text-[18px] text-[14px] text-switchColor font-Poppins font-normal">
                          {order?.phoneNumber}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="h-[192px] flex flex-col justify-center items-center">
                  <FiSearch className="text-[#F00C89] size-10" />
                  <h1 className="lg:text-[18px] text-[14px] text-[#333] font-Noto-Sans-Bengali font-semibold mt-5 ">
                    কোনো রেজাল্ট পাওয়া যায় নাই
                  </h1>

                  <h1 className="lg:text-[18px] text-[14px] text-[#333] font-Noto-Sans-Bengali font-semibold mt- ">
                    “{searchQuery}” সম্পর্কে
                  </h1>
                </div>
              )}
            </>
          </div>
          {searchQuery && filteredOrders?.length > 0 && (
            <div className="bg-white border-t border-t-[#E5E5E5] rounded-b-[8px]">
              <Link to={`/${currentData?.role}/all-orders/সকল%20অর্ডার`}>
                <button className="w-full py-[15px] text-[18px] text-[#F00C89] font-Noto-Sans-Bengali font-medium">
                  সকল রেজাল্ট দেখুন
                </button>
              </Link>
            </div>
          )}
        </div>
      )}

      <div className="">
        {filteredOrders?.length > 0 ? (
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
                {filteredOrders?.map(
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
                          <Link
                            className="block overflow-hidden text-ellipsis hover:text-primaryColor duration-100"
                            to={`/${currentData?.role}/order-details/${order._id}`}
                          >
                            {" "}
                            #{order?.orderId}
                          </Link>
                        </th>
                        <th
                          scope="row"
                          className="2xl:px-6 2xl:py-3 px-3 py-2 font-Poppins font-medium text-[#353535] whitespace-nowrap 2xl:text-[18px] 2mid75:text-[16px] 2large:text-[16px] lg:text-[14px]  2makbook:text-[10px] text-[14px] 2xl:max-w-[200px] 2mid75:max-w-[170px] 2large:max-w-[150px] max-w-[130px] overflow-hidden text-ellipsis "
                        >
                          <Link
                            to={`/${currentData?.role}/order-details/${order._id}`}
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
                              order?.orderDate
                                ? new Date(order.orderDate)
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
                          onClick={() =>
                            handleStatusClick(order?.orderId as string)
                          }
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
                              onClick={() =>
                                handleStatusClick(order?.orderId as string)
                              }
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
                            <div>
                              <button
                                onClick={() => handleOpenModal(order?._id)} // Example id
                                className="bg-[#651A71] text-[18px] font-medium font-Noto-Sans-Bengali text-white flex justify-center gap-2  px-4 h-[37px] items-center rounded-md"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="18"
                                  height="19"
                                  viewBox="0 0 18 19"
                                  fill="none"
                                >
                                  <g clip-path="url(#clip0_1886_2633)">
                                    <path
                                      d="M15.3633 5.15311H14.8711V3.30464C14.8711 1.88901 13.6883 0.737305 12.2344 0.737305H5.76562C4.31174 0.737305 3.12891 1.88901 3.12891 3.30464V5.15311H2.63672C1.18283 5.15311 0 6.30482 0 7.72045V11.8282C0 13.2438 1.18283 14.3955 2.63672 14.3955H3.12891V16.7232C3.12891 17.5726 3.83861 18.2636 4.71094 18.2636H13.2891C14.1614 18.2636 14.8711 17.5726 14.8711 16.7232V14.3955H15.3633C16.8172 14.3955 18 13.2438 18 11.8282V7.72045C18 6.30482 16.8172 5.15311 15.3633 5.15311ZM4.18359 3.30464C4.18359 2.45526 4.89329 1.76424 5.76562 1.76424H12.2344C13.1067 1.76424 13.8164 2.45526 13.8164 3.30464V5.15311H4.18359V3.30464ZM13.8164 16.7232C13.8164 17.0063 13.5798 17.2367 13.2891 17.2367H4.71094C4.42016 17.2367 4.18359 17.0063 4.18359 16.7232V11.657H13.8164V16.7232ZM16.9453 11.8282C16.9453 12.6776 16.2356 13.3686 15.3633 13.3686H14.8711V11.657H15.1875C15.4787 11.657 15.7148 11.4271 15.7148 11.1436C15.7148 10.86 15.4787 10.6301 15.1875 10.6301H2.8125C2.52127 10.6301 2.28516 10.86 2.28516 11.1436C2.28516 11.4271 2.52127 11.657 2.8125 11.657H3.12891V13.3686H2.63672C1.76439 13.3686 1.05469 12.6776 1.05469 11.8282V7.72045C1.05469 6.87107 1.76439 6.18005 2.63672 6.18005H15.3633C16.2356 6.18005 16.9453 6.87107 16.9453 7.72045V11.8282Z"
                                      fill="white"
                                    />
                                    <path
                                      d="M10.4062 12.8213H7.59375C7.30252 12.8213 7.06641 13.0512 7.06641 13.3348C7.06641 13.6183 7.30252 13.8482 7.59375 13.8482H10.4062C10.6975 13.8482 10.9336 13.6183 10.9336 13.3348C10.9336 13.0512 10.6975 12.8213 10.4062 12.8213Z"
                                      fill="white"
                                    />
                                    <path
                                      d="M10.4062 15.0117H7.59375C7.30252 15.0117 7.06641 15.2416 7.06641 15.5252C7.06641 15.8088 7.30252 16.0387 7.59375 16.0387H10.4062C10.6975 16.0387 10.9336 15.8088 10.9336 15.5252C10.9336 15.2416 10.6975 15.0117 10.4062 15.0117Z"
                                      fill="white"
                                    />
                                    <path
                                      d="M4.5 7.34375H2.8125C2.52127 7.34375 2.28516 7.57365 2.28516 7.85722C2.28516 8.14079 2.52127 8.37068 2.8125 8.37068H4.5C4.79123 8.37068 5.02734 8.14079 5.02734 7.85722C5.02734 7.57365 4.79123 7.34375 4.5 7.34375Z"
                                      fill="white"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_1886_2633">
                                      <rect
                                        width="18"
                                        height="17.5263"
                                        fill="white"
                                        transform="translate(0 0.737305)"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>

                                <span>Print</span>
                              </button>
                            </div>
                            <div
                              onClick={() =>
                                toggleActionModal(
                                  order?.orderId as string,
                                  orderIndex
                                )
                              }
                              className={`w-[37px] h-[37px] rounded-[6px] bg-[#F6F6F6] flex justify-center items-center cursor-pointer `}
                            >
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
                                    isOpen={
                                      actionModalOpen.id === order?.orderId
                                    }
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

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative !z-[9999999999] "
      >
        <div className="fixed inset-0 flex w-screen  items-center justify-center">
          <DialogPanel
            style={{
              boxShadow: "0px 0px 25px 0px rgba(0, 0, 0, 0.10)",
            }}
            className="h-[414px] overflow-y-auto  lg:w-[500px] md:w-[450px] w-full md:px-[50px] md:py-[50px] px-6 py-16 border-[1px] border-[#F6F6F6] bg-white rounded-[10px] relative"
          >
            <div className="">
              <div className="text-secondaryColor text-[24px] text-center font-Poppins font-semibold">
                {modalData ? (
                  <div className="">
                    <div className="flex justify-center items-center h-full w-full">
                      <div className="">
                        <p>Print Your Order</p>

                        <div
                          className={`grid ${
                            modalData?.item?.length === 1
                              ? "lg:grid-cols-1 md:grid-cols-1 grid-cols-1"
                              : modalData?.item?.length == 2
                              ? "lg:grid-cols-2 md:grid-cols-2 grid-cols-1"
                              : "lg:grid-cols-3 md:grid-cols-2 grid-cols-1"
                          } "grid gap-[22px] mt-[25px]  `}
                        >
                          {modalData?.item?.map(
                            (item: TIndividualOrderItem, index) => (
                              <div
                                onClick={() => handleItemClick(index)}
                                key={index}
                                className={`w-[120px] border  ${
                                  selectedIndexes.includes(index)
                                    ? " border-primaryColor"
                                    : "border-[#651A71]"
                                }  rounded-md mx-auto flex flex-col `}
                              >
                                <img
                                  className="h-[120px] w-full object-contain "
                                  src={item?.image}
                                  alt={item?.category}
                                />
                                <p
                                  className={`p-2 rounded-b-md text-[14px] text-start capitalize font-bold font-Noto-Sans-Bengali ${
                                    selectedIndexes.includes(index)
                                      ? "bg-[#F00C891A]"
                                      : "bg-white"
                                  }`}
                                >
                                  {item?.category}
                                </p>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  "Loading..."
                )}
              </div>
              <>
                {selectedIndexes.length === 0 ||
                selectedIndexes.length == modalData?.item?.length ? (
                  <ReactToPrint
                    trigger={() => (
                      <p>
                        <button
                          onClick={() => setIsOpen(false)}
                          type="button"
                          className="bg-[#F00C89] rounded-[8px] h-[50px] w-full flex justify-center items-center gap-1 lg:mt-[30px] mt-[30px]"
                        >
                          <p className="text-[18px] font-Noto-Sans-Bengali text-white font-medium">
                            সব গুলা প্রিন্ট করুন
                          </p>
                        </button>
                      </p>
                    )}
                    content={() => componentRef.current}
                  />
                ) : (
                  <ReactToPrint
                    trigger={() => (
                      <p>
                        <button
                          onClick={() => setIsOpen(false)}
                          type="button"
                          className="bg-[#F00C89] rounded-[8px] h-[50px] w-full flex justify-center items-center gap-1 lg:mt-[30px] mt-[30px]"
                        >
                          <p className="text-[18px] font-Noto-Sans-Bengali text-white font-medium">
                            প্রিন্ট করুন
                          </p>
                        </button>
                      </p>
                    )}
                    content={() => componentRef.current}
                  />
                )}
              </>

              <div>
                <IoMdClose
                  onClick={() => setIsOpen(false)}
                  className="z-50 border hover-red-500 size-6 text-black cursor-pointer absolute right-4 top-4"
                />
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {selectedIndexes.length == 0 ||
      selectedIndexes.length == modalData?.item?.length ? (
        <PDFGenerator
          singleOrder={modalData as TIndividualOrder}
          componentRef={componentRef}
        ></PDFGenerator>
      ) : (
        <PDFGenerator
          singleOrder={printData as TIndividualOrder}
          componentRef={componentRef}
        ></PDFGenerator>
      )}
    </div>
  );
};

export default AllPersonOderList;
