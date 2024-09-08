/* eslint-disable @typescript-eslint/no-explicit-any */
import { HiDotsVertical, HiOutlineInformationCircle } from "react-icons/hi";
import { RiHistoryFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../redux/features/hooks";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import Loader from "../../../components/Loader/Loader";
import { format } from "date-fns";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import ActionModalCustomers from "../../../components/ui/ActionButtonModal/ActionModalCustomers";
import { useGetCostumersQuery } from "../../../redux/api/createCostumerApi";

// import { useTranslation } from "react-i18next";

const Customers = () => {
  const [actionModalOpen, setactionModalOpen] = useState<{
    id: string | null;
    index: number | null;
  }>({ id: null, index: null });

  // const { t } = useTranslation();
  const toggleActionModal = (orderId: string, orderIndex: number) => {
    setactionModalOpen(
      actionModalOpen.id === orderId
        ? { id: null, index: null }
        : { id: orderId, index: orderIndex }
    );
  };
  const currentData = useAppSelector(selectCurrentUser);

  const { isLoading: customerIsLoading, data: customerData } =
    useGetCostumersQuery(currentData?.id);

  const allCustomers = customerData?.data;

  if (customerIsLoading) {
    return <Loader />;
  }

  return (
    <div className={`relative`}>
      <div className="bg-white rounded-[10px] border-[1px] border-borderColor 2xl:p-[30px] lg:p-[15px] md:p-5 p-4">
        <h1 className="2xl:text-[24px] lg:text-[18px]  text-[14px]  text-secondaryColor  font-semibold 2xl:pb-[30px] lg:pb-[15px] md:pb-5 pb-4">
          কাস্টমার তালিকা
        </h1>

        {allCustomers?.length > 0 ? (
          <div className="bg-white relative w-full rounded-[10px] border-[1px] border-borderColor  lg:overflow-y-auto overflow-x-auto min-h-[590px]">
            <table className="w-[100%] text-left">
              <thead className=" bg-[#F6F6F6] 2xl:text-[18px] 2mid75:text-[16px] 2large:text-[16px] lg:text-[14px]  2makbook:text-[10px] text-[14px] text-[#555]  font-normal font-Noto-Sans-Bengali">
                <tr>
                  <th scope="col" className="2xl:px-6 2xl:py-3 px-3 py-2">
                    ব্যক্তির নাম
                  </th>
                  <th scope="col" className="2xl:px-6 2xl:py-3 px-3 py-2">
                    মোবাইল
                  </th>
                  <th scope="col" className="2xl:px-6 2xl:py-3 px-3 py-2">
                    ঠিকানা
                  </th>
                  <th scope="col" className="2xl:px-6 2xl:py-3 px-3 py-2">
                    জয়েন ডেট
                  </th>

                  <th scope="col" className="2xl:px-6 2xl:py-3 px-3 py-2">
                    একশন
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {allCustomers?.map((customer: any, orderIndex: number) => (
                  <>
                    <tr key={customer?._id} className="border-b border-dashed">
                      <th
                        scope="row"
                        className="capitalize 2xl:px-6 2xl:py-3 px-3 py-2  font-medium text-[#353535]  2xl:text-[18px] 2mid75:text-[16px] 2large:text-[16px] lg:text-[14px] 2makbook:text-[10px] text-[14px]"
                      >
                        <Link
                          to={`/${currentData?.role}/order-history/${customer?.phoneNumber}`}
                          className="block overflow-hidden text-ellipsis font-Noto-Sans-Bengali"
                        >
                          <div className="hover:text-primaryColor duration-100">
                            {customer?.customerName}
                          </div>
                        </Link>
                        {/* {customer?.industry ? (
                          <Link
                          to={`/${currentData?.role}/order-history/${customer?.phoneNumber}`}
                            className="block overflow-hidden text-ellipsis"
                          >
                            <div className="hover:text-primaryColor duration-100">
                              {customer?.customerName}
                            </div>
                          </Link>
                        ) : (
                          <Link
                            to={`/${currentData?.role}/order-details/${customer._id}`}
                            className="block overflow-hidden text-ellipsis"
                          >
                            <div className="hover:text-primaryColor duration-100">
                              {customer?.customerName}
                            </div>
                          </Link>
                        )} */}
                      </th>

                      <th
                        scope="row"
                        className="capitalize 2xl:px-6 2xl:py-3 px-3 py-2  font-medium text-[#353535]  2xl:text-[18px] 2mid75:text-[16px] 2large:text-[16px] lg:text-[14px] 2makbook:text-[10px] text-[14px] font-Poppins"
                      >
                        <Link
                          to={`/${currentData?.role}/order-history/${customer?.phoneNumber}`}
                        >
                          <div className="hover:text-primaryColor duration-100">
                            {customer?.phoneNumber}
                          </div>
                        </Link>
                      </th>
                      <th
                        scope="row"
                        className="2xl:px-6 2xl:py-3 px-3 py-2  font-medium text-secondaryColor 2xl:text-[18px] 2mid75:text-[16px] 2large:text-[16px] lg:text-[14px]  2makbook:text-[10px] text-[14px]  "
                      >
                        <div className="block overflow-hidden text-ellipsis capitalize font-Noto-Sans-Bengali">
                          {customer?.address
                            ? customer?.address
                            : customer?.industry}
                          <Link className="text-primaryColor" to="#">
                            {" "}
                          </Link>
                          {/* {customer?.industry ? (
                            <Link
                              className="text-primaryColor"
                              to={`/${currentData?.role}/order-history/${customer?.phoneNumber}`}
                            >
                              {" "}
                              {customer?.industry}
                            </Link>
                          ) : (
                            customer?.address
                          )} */}
                        </div>
                      </th>
                      <th
                        scope="row"
                        className="2xl:px-6 2xl:py-3 px-3 py-2  font-normal text-secondaryColor whitespace-nowrap 2xl:text-[18px] 2large:text-[16px] lg:text-[14px] 2mid75:text-[16px] 2makbook:text-[10px] text-[14px] font-Poppins"
                      >
                        {/* {customer?.createdAt} */}
                        {customer?.createdAt
                          ? format(new Date(customer.createdAt), "dd-MM-yyyy")
                          : "N/A"}
                      </th>

                      <th
                        scope="row"
                        className="2xl:px-6 2xl:py-3 px-3 py-2  font-normal text-primaryColor whitespace-nowrap 2xl:text-[18px] 2large:text-[16px] lg:text-[14px] 2mid75:text-[16px] 2makbook:text-[10px] text-[14px]"
                      >
                        <div className="flex justify-between items-center font-Poppins">
                          {customer?.industry ? (
                            <Link
                              to={`/admin/company-new-order/${customer._id}`}
                            >
                              <button className="bg-btn-hover px-4 h-[38px] rounded-[6px] 2xl:text-[18px] 2mid75:text-[16px] 2large:text-[16px] lg:text-[14px] 2makbook:text-[10px] text-[14px] text-white  font-medium flex justify-center items-center gap-[6px] cursor-pointer">
                                <FiPlus className="2xl:size-5 lg:size-5 size-4 text-white" />
                                Create Order
                              </button>
                            </Link>
                          ) : (
                            <Link
                              to={`/admin/individual-order/${customer._id}`}
                            >
                              <button className="bg-btn-hover px-4 h-[38px] rounded-[6px] 2xl:text-[18px] 2mid75:text-[16px] 2large:text-[16px] lg:text-[14px] 2makbook:text-[10px] text-[14px] text-white  font-medium flex justify-center items-center gap-[6px] cursor-pointer">
                                <FiPlus className="2xl:size-5 lg:size-5 size-4 text-white" />
                                Create Order
                              </button>
                            </Link>
                          )}

                          <Link
                            to={`/${currentData?.role}/order-history/${customer?.phoneNumber}`}
                            className="bg-[#F6F6F6] px-4 h-[38px] rounded-[6px] 2xl:text-[18px] 2mid75:text-[16px] 2large:text-[16px] lg:text-[14px] 2makbook:text-[10px] text-[14px] text-secondaryColor  font-medium flex justify-center items-center gap-[6px] cursor-pointer font-Poppins"
                          >
                            <RiHistoryFill className="2xl:size-6 lg:size-6" />
                            Order History
                          </Link>

                          <div
                            onClick={() =>
                              toggleActionModal(customer?._id, orderIndex)
                            }
                            className="w-[37px] h-[37px] rounded-[6px] bg-[#F6F6F6] flex justify-center items-center cursor-pointer"
                          >
                            <HiDotsVertical className="size-5 text-[#333333]" />

                            {actionModalOpen.id === customer?._id && (
                              <div
                                className="absolute mt-[-25px]  right-4 z-20"
                                style={{
                                  top: `calc(${orderIndex * 50}px + 80px)`,

                                  // Adjust based on the row
                                }}
                              >
                                <ActionModalCustomers
                                  isOpen={actionModalOpen.id === customer?._id}
                                  setIsOpen={() =>
                                    setactionModalOpen({
                                      id: null,
                                      index: null,
                                    })
                                  }
                                  id={customer?._id}
                                  phoneNumber={customer?.phoneNumber}
                                  industry={customer?.industry}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </th>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-4 text-[24px] text-center text-switchColor  font-medium  min-h-[600px] font-Noto-Sans-Bengali">
            <HiOutlineInformationCircle className="size-8" />

            <p>এখন পর্যন্ত কোন কাস্টমার তৈরি করা হয়নি</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Customers;
