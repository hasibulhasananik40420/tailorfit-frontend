import { IoIosArrowForward } from "react-icons/io";
import FilterOrderHistory from "../../components/FilterItem/FilterOrderHistory";
import { useParams } from "react-router-dom";
import {
  TCostumer,
  useGetCostumerQuery,
} from "../../redux/api/createCostumerApi";
import Loader from "../../components/Loader/Loader";
import DatePicker from "react-datepicker";
import {
  TIndividualOrder,
  useGetIndividualOrderQuery,
  useMyIndividualOrdersByPhoneQuery,
} from "../../redux/api/individualOrderApi";
import {
  useGetCompanyOrderQuery,
  useMyIndustryOrdersByPhoneQuery,
} from "../../redux/api/companyOrderApi";
import OrderHistoryItem from "./OrderHistoryItem";
import { useEffect, useState } from "react";


const OrderHistory = () => {
  const { id } = useParams();
  const [orderId, setOderId] = useState({ id: "", industry: false });
  const { isLoading, data } = useGetCostumerQuery(id);
  const { isLoading: IisLoading, data: IData } =
    useMyIndividualOrdersByPhoneQuery(id);
  const { isLoading: CisLoading, data: CData } =
    useMyIndustryOrdersByPhoneQuery(id);

  const [activeIndex, setActiveIndex] = useState<number>(0);

  const { data: singleOrderData, isLoading: singleOrderLoading } =
    useGetIndividualOrderQuery(orderId?.id);

  const { data: cSingleOrderData, isLoading: cSingleOrderLoading } =
    useGetCompanyOrderQuery(orderId?.id);

  useEffect(() => {
    setOderId({ id: IData?.data[0]._id, industry: false });
  }, [IData?.data]);

  if (
    isLoading ||
    IisLoading ||
    CisLoading ||
    singleOrderLoading ||
    cSingleOrderLoading
  ) {
    return <Loader />;
  }
  const orders = [...(IData?.data || []), ...(CData?.data || [])];

  const customerData = data?.data as TCostumer;


  return (
    <div className={`lg:flex gap-[30px]`}>
      <div className="lg:w-[30%] w-full bg-white rounded-[10px] pb-[30px]">
        <div className="flex flex-col 2xl:p-[30px] lg:p-5 p-4">
          <h1 className="text-secondaryColor text-[18px]  font-semibold">
            Customer Information
          </h1>
          <div className="flex justify-between items-center mt-[15px]">
            <h3 className="md:text-[18px] text-[14px] text-[#555]  font-normal">
              Name
            </h3>

            <h3 className="md:text-[18px] text-[14px] text-secondaryColor  font-normal">
              {customerData?.customerName}
            </h3>
          </div>

          <div className="flex justify-between items-start mt-[15px]">
            <h3 className="md:text-[18px] text-[14px] text-[#555]  font-normal">
              Mobile
            </h3>

            <h3 className="md:text-[18px] text-[14px] text-secondaryColor  font-normal">
              {customerData?.phoneNumber}
            </h3>
          </div>
          {customerData?.industry && (
            <div className="flex justify-between items-start mt-[15px]">
              <h3 className="md:text-[18px] text-[14px] text-[#555]  font-normal">
                কোম্পানী
              </h3>

              <h3 className="md:text-[18px] text-[14px] text-secondaryColor  font-normal">
                {customerData?.industry}
              </h3>
            </div>
          )}
          {customerData?.address && (
            <div className="flex justify-between items-start mt-[15px]">
              <h3 className="md:text-[18px] text-[14px] text-[#555]  font-normal">
                ঠিকানা
              </h3>

              <h3 className="md:text-[18px] max-w-48 text-end text-[14px] text-secondaryColor  font-normal">
                {customerData?.address}
              </h3>
            </div>
          )}
          <div className="flex justify-between items-center mt-[15px]">
            <h3 className="md:text-[18px] text-[14px] text-[#555]  font-normal">
              Joining Date
            </h3>

            <h3 className="md:text-[18px] text-[14px] text-secondaryColor  font-normal">
              <DatePicker
                readOnly
                selected={
                  customerData.createdAt
                    ? new Date(customerData.createdAt)
                    : null
                }
                dateFormat="dd-MM-yyyy"
                className="border-0 outline-none max-w-28 text-end bg-white"
                calendarClassName="custom-calendar-class"
              />
            </h3>
          </div>
        </div>

        <div className="border-b-[1px] border-borderColor w-full"></div>

        <div className="flex flex-col 2xl:p-[30px] lg:p-5 p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-secondaryColor h-10 md:text-[18px] text-[14px]  font-semibold">
              অর্ডার তালিকা
            </h1>

            <FilterOrderHistory />
          </div>

          <div className="bg-white rounded-[10px] border-[0.8px] border-borderColor 2xl:mt-[30px] lg:mt-5 mt-4">
            <div className="bg-white relative w-full rounded-[10px] border-[1px] border-borderColor  lg:overflow-y-auto overflow-x-auto min-h-[400px]">
              <table className="w-[100%] text-left">
                <thead className=" bg-[#F6F6F6] 2xl:text-[18px] 2mid75:text-[16px] 2large:text-[16px] lg:text-[14px]  2makbook:text-[10px] text-[14px] text-[#555]  font-normal">
                  <tr>
                    <th scope="col" className="2xl:px-6 2xl:py-3 px-3 py-2">
                      #
                    </th>
                    <th
                      scope="col"
                      className="2xl:px-6 2xl:py-3 px-3 py-2 tx-[18px] "
                    >
                      আইডি
                    </th>
                    <th scope="col" className="2xl:px-6 2xl:py-3 px-3 py-2">
                      ক্যাটাগরি
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {orders.map((order: TIndividualOrder, i: number) => (
                    <tr
                      key={i}
                      onClick={() => {
                        setActiveIndex(i); // Set the active index to the clicked row
                        setOderId({
                          id: order._id as string,
                          industry: order.industry as boolean,
                        });
                      }}
                      className={`border-b border-dashed  duration-300 hover:cursor-pointer ${
                        activeIndex === i ? "bg-activeDhcolor" : ""
                      }`}
                    >
                      <th
                        scope="row"
                        className="2xl:px-6 2xl:py-3 px-3 py-2  font-medium text-[#353535] 2xl:text-[18px] 2mid75:text-[16px] 2large:text-[16px] lg:text-[14px] 2makbook:text-[10px] text-[14px]"
                      >
                        {i + 1}
                      </th>

                      <th
                        scope="row"
                        className="2xl:px-6 2xl:py-3 px-3 py-2  font-normal text-secondaryColor whitespace-nowrap 2xl:text-[18px] 2large:text-[16px] lg:text-[14px] 2mid75:text-[16px] 2makbook:text-[10px] text-[14px]"
                      >
                        #{order?.orderId}
                      </th>
                      <th
                        scope="row"
                        className="2xl:px-6 2xl:py-3 px-3 py-2  font-normal text-secondaryColor whitespace-nowrap 2xl:text-[18px] 2large:text-[16px] lg:text-[14px] 2mid75:text-[16px] 2makbook:text-[10px] text-[14px] "
                      >
                        <div className="flex justify-between gap-10 items-center">
                          <p>{order?.item?.[0]?.category}</p>
                          <IoIosArrowForward className="size-5" />
                        </div>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:w-[70%] w-full mt-10 lg:mt-0 flex flex-col gap-[21px] bg-white rounded-[10px]">
        <OrderHistoryItem
          singleOrderData={
            orderId?.industry
              ? (cSingleOrderData?.data as TIndividualOrder)
              : (singleOrderData?.data as TIndividualOrder)
          }
        />
      </div>
    </div>
  );
};

export default OrderHistory;