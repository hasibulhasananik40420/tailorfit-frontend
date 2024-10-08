/* eslint-disable @typescript-eslint/no-explicit-any */
import { FiCopy } from "react-icons/fi";
import { HiDotsVertical, HiOutlineInformationCircle } from "react-icons/hi";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import FilterItem from "../../components/FilterItem/FilterItem";
import { GoArrowLeft } from "react-icons/go";
import ActionButtonModalTwo from "../../components/ui/ActionButtonModal/ActionButtonModalTwo";
import {
  useEditCompanyOrderMutation,
  useGetCompanyOdersQuery,
} from "../../redux/api/companyOrderApi";
import { useAppSelector } from "../../redux/features/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import Loader from "../../components/Loader/Loader";
import Swal from "sweetalert2";
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

const CompanyFolderOderView = () => {
  const { folderName } = useParams();

  // console.log(folderName);
  const [actionModalOpen, setactionModalOpen] = useState<{
    id: string | null;
    index: number | null;
  }>({ id: null, index: null });

  const [editCompanyOrder] = useEditCompanyOrderMutation();
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
      const res = await editCompanyOrder(info).unwrap();

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
      });
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

  // const industry = localStorage.getItem('indsdfrwdduzstzwry')
  const industry = useAppSelector((state: RootState) => state.auth.folderData);
  // console.log(industry)

  // const searchQuery = useAppSelector((state: RootState) => state.search.query);
  const filters = useAppSelector((state: RootState) => state.filter);

  const currentData = useAppSelector(selectCurrentUser);
  const { data, isLoading } = useGetCompanyOdersQuery({
    id: currentData?.id,
    industry,
  });
  //  console.log(data)

  if (isLoading) {
    return <Loader />;
  }

  const companyOrder = data?.data;
  // const filteredOrders = companyOrder?.filter(
  //   (order: any) =>
  //     order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     order.orderId.includes(searchQuery) ||
  //     order.phoneNumber.includes(searchQuery)
  // );

  const filteredOrdersByStatus = companyOrder?.filter((order: any) => {
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
    if (filters.forDelivery && order.orderStatus === "ডেলিভারির জন্য প্রস্তুত")
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
  });

  // console.log(filteredOrdersByStatus)

  return (
    <div className="">
      {/* {searchQuery && (
        <div
          className="bg-white rounded-[8px] min-w-[380px] z-50 absolute top-[0px] left-[0px]"
          style={{ boxShadow: "5px 0px 30px 0px rgba(0, 0, 0, 0.15)" }}
        >
          <div className="p-4">
            <>
              {filteredOrders.length > 0 ? (
                <div className="flex flex-col gap-2 max-h-[265px] overflow-y-auto">
                  {filteredOrders.map((order: any) => (
                    <Link to='/admin/order-details'
                      key={order._id}
                      className={ `cursor-pointer px-3 py-[10px] bg-activeDhcolor rounded flex items-center gap-2`}
                    >
                      <IoSearch className="size-6" />
                      <h1 className="text-[18px] text-black font-Poppins font-semibold">
                        {order.customerName}
                      </h1>
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
                        <p className="text-[18px] text-switchColor font-Poppins font-normal">
                          {order.phoneNumber}
                        </p>
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
                        <p className="text-[18px] text-switchColor font-Poppins font-normal">
                          #{order.orderId}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="h-[192px] flex flex-col justify-center items-center">
                  <FiSearch className="text-[#F00C89] size-10" />
                  <h1 className="text-[18px] text-[#333] font-Noto-Sans-Bengali font-semibold mt-5 ">
                    কোনো রেজাল্ট পাওয়া যায় নাই
                  </h1>

                  <h1 className="text-[18px] text-[#333] font-Noto-Sans-Bengali font-semibold mt- ">
                    “{searchQuery}” সম্পর্কে
                  </h1>
                </div>
              )}
            </>
          </div>
          {searchQuery && filteredOrders.length > 0 && (
            <div className="bg-white border-t border-t-[#E5E5E5] rounded-b-[8px]">
              <button className="w-full py-[15px] text-[18px] text-[#F00C89] font-Noto-Sans-Bengali font-medium">
                সকল রেজাল্ট দেখুন
              </button>
            </div>
          )}
        </div>
      )} */}

      <div className="bg-white rounded-[10px] border-[1px] border-borderColor 2xl:p-[30px] lg:p-[15px] md:p-5 p-4">
        <div className="flex justify-between 2xl:pb-[30px] lg:pb-[15px] md:pb-5 pb-4">
          <div className="flex gap-3 items-center">
            <Link to={`/${currentData?.role}/orders-list`}>
              <GoArrowLeft className="size-6 text-black" />
            </Link>
            <h1 className="capitalize 2xl:text-[24px] lg:text-[18px]  text-[14px]  text-secondaryColor font-Poppins font-semibold">
              {folderName?.replace("-", " ")} ({data?.data?.length})
            </h1>
          </div>
          <div className="lg:block hidden">
            <div className="flex 2xl:gap-[30px] gap-4">
              <FilterItem />
            </div>
          </div>
        </div>

        {filteredOrdersByStatus?.length > 0 ? (
          <div className="relative w-full rounded-[10px] border-[1px] border-borderColor  lg:overflow-y-auto overflow-x-auto min-h-[590px]">
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
                  (order: any, orderIndex: number) => (
                    <>
                      <tr
                        key={order?.orderId}
                        className="bg-white border-b border-dashed"
                      >
                        <th
                          scope="row"
                          className="2xl:px-6 2xl:py-3 px-3 py-2 font-Poppins font-medium text-[#353535] 2xl:text-[18px] 2mid75:text-[16px] 2large:text-[16px] lg:text-[14px] 2makbook:text-[10px] text-[14px] whitespace-nowrap"
                        >
                          {order?.industry ? (
                            <Link
                              className="block overflow-hidden text-ellipsis hover:text-primaryColor duration-100"
                              to={`/${currentData?.role}/order-detail/${order?._id}`}
                            >
                              {" "}
                              #{order?.orderId}
                            </Link>
                          ) : (
                            <Link
                              className="block overflow-hidden text-ellipsis hover:text-primaryColor duration-100"
                              to={`/${currentData?.role}/order-details/${order?._id}`}
                            >
                              {" "}
                              #{order?.orderId}
                            </Link>
                          )}
                        </th>
                        <th
                          scope="row"
                          className="2xl:px-6 2xl:py-3 px-3 py-2 font-Poppins font-medium text-[#353535] whitespace-nowrap 2xl:text-[18px] 2mid75:text-[16px] 2large:text-[16px] lg:text-[14px]  2makbook:text-[10px] text-[14px] 2xl:max-w-[200px] 2mid75:max-w-[170px] 2large:max-w-[150px] max-w-[130px] overflow-hidden text-ellipsis "
                        >
                          {order?.industry ? (
                            <Link
                              className="block overflow-hidden text-ellipsis hover:text-primaryColor duration-100"
                              to={`/${currentData?.role}/order-detail/${order?._id}`}
                            >
                              {" "}
                              {order?.customerName}
                            </Link>
                          ) : (
                            <Link
                              className="block overflow-hidden text-ellipsis hover:text-primaryColor duration-100"
                              to={`/${currentData?.role}/order-details/${order?._id}`}
                            >
                              {" "}
                              {order?.customerName}
                            </Link>
                          )}
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
                                ? new Date(order.deliveryDate)
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
                          onClick={() => handleStatusClick(order?.orderId)}
                          scope="row"
                          className={`2xl:px-6 2xl:py-3 px-0 py-2 font-Poppins font-normal text-secondaryColor whitespace-nowrap 2xl:text-[18px] 2large:text-[16px] lg:text-[14px] 2mid75:text-[16px] 2makbook:text-[10px] text-[16px] w-[200px] cursor-pointer `}
                          // ${
                          //   dropdownOpen === order?.orderId && " pointer-events-none cursor-pointer"
                          // }
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span
                                className="w-[10px] h-[10px] rounded-full"
                                style={{
                                  backgroundColor: order?.orderBGColor,
                                }}
                              ></span>
                              <p>
                                {
                                  selectedStatus[order?.orderId]
                                    ? selectedStatus[order?.orderId]
                                    : order?.orderStatus
                                  //
                                }
                              </p>
                            </div>
                            <IoIosArrowDown
                              onClick={() => handleStatusClick(order?.orderId)}
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
                                    // onClick={() =>
                                    //   handleStatusSelect(order?._id, status)
                                    // }
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
                            {order?.industry ? (
                              <Link
                                to={`/admin/duplicate-industry-order/${order?._id}`}
                              >
                                <button
                                  onClick={() => {}}
                                  className="bg-btn-hover 2xl:w-[115px] w-[100px] h-[38px] rounded-[6px] 2xl:text-[18px] 2mid75:text-[16px] 2large:text-[16px] lg:text-[14px] 2makbook:text-[10px] text-[14px] text-white font-Noto-Sans-Bengali font-medium flex justify-center items-center gap-[6px] cursor-pointer"
                                >
                                  <FiCopy className="2xl:size-5 size-4 text-white" />
                                  ডুপ্লিকেট
                                </button>
                              </Link>
                            ) : (
                              <Link to={`/admin/duplicate-order/${order?._id}`}>
                                <button
                                  onClick={() => {
                                    //  console.log(id)
                                  }}
                                  className="bg-[#F00C89] 2xl:w-[115px] w-[100px] h-[38px] rounded-[6px] 2xl:text-[18px] 2mid75:text-[16px] 2large:text-[16px] lg:text-[14px] 2makbook:text-[10px] text-[14px] text-white font-Noto-Sans-Bengali font-medium flex justify-center items-center gap-[6px] cursor-pointer"
                                >
                                  <FiCopy className="2xl:size-5 size-4 text-white" />
                                  ডুপ্লিকেট
                                </button>
                              </Link>
                            )}

                            <div className="w-[37px] h-[37px] rounded-[6px] bg-[#F6F6F6] flex justify-center items-center cursor-pointer">
                              <HiDotsVertical
                                // onClick={toggleActionModal}
                                onClick={() =>
                                  toggleActionModal(order?.orderId, orderIndex)
                                }
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
                                  <ActionButtonModalTwo
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
    </div>
  );
};

export default CompanyFolderOderView;
