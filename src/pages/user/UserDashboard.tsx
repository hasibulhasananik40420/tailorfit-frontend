/* eslint-disable @typescript-eslint/no-explicit-any */
import icon1 from "../../assets/newOrderIcon.png";
import icon2 from "../../assets/icon2.png";
import icon3 from "../../assets/icon3.png";
import icon4 from "../../assets/icon4.png";
import icon5 from "../../assets/icon5.png";
import icon6 from "../../assets/icon6.png";
import icon7 from "../../assets/icon7.png";
import icon8 from "../../assets/icon8.png";

import OrderTabAndList from "../../components/ui/OrderTabAndList/OrderTabAndList";
import { useAppDispatch, useAppSelector } from "../../redux/features/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useGetIndividualOrdersQuery } from "../../redux/api/individualOrderApi";
import Loader from "../../components/Loader/Loader";
import { useGetCompanyOrdersQuery } from "../../redux/api/companyOrderApi";
import { useNavigate } from "react-router-dom";
import {
  resetAllFilters,
  setSingleFilter,
} from "../../redux/features/auth/allFilterSlice";

const UserDashboard = () => {
  interface CardData {
    _id: number;
    image: string; // Adjust the type if icon1, icon2, etc. are of different types
    color: string;
    orderName: string;
    totalOrder: string;
    action?: () => void;
  }

  const navigate = useNavigate();
  const currentData = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  const { data, isLoading } = useGetIndividualOrdersQuery({
    adminId: currentData?.id,
    searchTerm: "",
  });

  const { data: cData, isLoading: cLoading } = useGetCompanyOrdersQuery({
    adminId: currentData?.id,
    searchTerm: "",
  });

  // console.log("indivusial oders",data)
  // console.log("indistry oders",cData)



  // const newArray = [...data.data, ...cData.data];
  const newArray = [...(data?.data || []), ...(cData?.data || [])];

  // Function to count orders by status
  function countOrdersByStatus(orders: any) {
    return orders?.reduce(
      (acc: { [x: string]: any }, order: { orderStatus: string | number }) => {
        acc[order?.orderStatus] = (acc[order?.orderStatus] || 0) + 1;
        return acc;
      },
      {}
    );
  }

  //  console.log(newArray)

  const orderCounts = countOrdersByStatus(newArray);

  const cardData: CardData[] = [
    {
      _id: 1,
      image: icon1,
      color: "#CFFFCA",
      orderName: "আজকের অর্ডার",
      totalOrder: orderCounts["নতুন অর্ডার"]
        ? orderCounts["নতুন অর্ডার"].toString()
        : "0",
      action: () => {
        dispatch(setSingleFilter("newOrder"));
        // navigate(`/${currentData?.role}/all-orders`);
        navigate(`/${currentData?.role}/all-orders/নতুন-অর্ডার`);



      },
    },

    {
      _id: 7,
      image: icon7,
      color: "#FFFD92",
      orderName: "আরজেন্ট",
      totalOrder: orderCounts["আরজেন্ট"]
        ? orderCounts["আরজেন্ট"].toString()
        : "0",
      action: () => {
        dispatch(setSingleFilter("urgent"));
        navigate(`/${currentData?.role}/all-orders/আরজেন্ট`);
      },
    },


    {
      _id: 2,
      image: icon2,
      color: "#D7EDFF",
      orderName: "চলমান অর্ডার",
      totalOrder: orderCounts["চলমান অর্ডার"]
        ? orderCounts["চলমান অর্ডার"].toString()
        : "0",
      action: () => {
        dispatch(setSingleFilter("activeOrder"));
        navigate(`/${currentData?.role}/all-orders/চলমান অর্ডার`);

      },
    },

    {
      _id: 6,
      image: icon6,
      color: "#FFE4C1",
      orderName: "ডেলিভারির ২ দিন বাকি",
      totalOrder: orderCounts["ডেলিভারির ২ দিন বাকি"]
        ? orderCounts["ডেলিভারির ২ দিন বাকি"].toString()
        : "0",
      action: () => {
        dispatch(setSingleFilter("deliveryLeftTwoDays"));
        navigate(`/${currentData?.role}/all-orders/ডেলিভারির ২ দিন বাকি`);
      },
    },



    {
      _id: 3,
      image: icon3,
      color: "#DAFFF6",
      orderName: "ডেলিভারির জন্য প্রস্তুত",
      totalOrder: orderCounts["ডেলিভারির জন্য প্রস্তুত"]
        ? orderCounts["ডেলিভারির জন্য প্রস্তুত"].toString()
        : "0",
      action: () => {
        dispatch(setSingleFilter("forDelivery"));
        navigate(`/${currentData?.role}/all-orders/ডেলিভারির জন্য প্রস্তুত`);
      },
    },


    {
      _id: 4,
      image: icon4,
      color: "#FFE2EB",
      orderName: "ডেলিভারি সম্পন্ন",
      totalOrder: orderCounts["ডেলিভারি সম্পন্ন"]
        ? orderCounts["ডেলিভারি সম্পন্ন"].toString()
        : "0",
      action: () => {
        dispatch(setSingleFilter("delivered"));
        navigate(`/${currentData?.role}/all-orders/ডেলিভারি সম্পন্ন`);
      },
    },

    
    {
      _id: 5,
      image: icon5,
      color: "#DAD4FF",
      orderName: "ডেট অভার",
      totalOrder: orderCounts["ডেট অভার"]
        ? orderCounts["ডেট অভার"].toString()
        : "0",
      action: () => {
        dispatch(setSingleFilter("dateOver"));
        navigate(`/${currentData?.role}/all-orders/ডেট অভার`);
      },
    },
   
    
    {
      _id: 8,
      image: icon8,
      color: "#F4CAFF",
      orderName: "সকল অর্ডার",
      totalOrder: newArray?.length.toString(),
      action: () => {
        dispatch(resetAllFilters());
        navigate(`/${currentData?.role}/all-orders/সকল অর্ডার`);
      },
    },
  ];


  if (isLoading || cLoading) {
    return <Loader />;
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-4 2xl:gap-[30px] lg:gap-[15px] gap-4 justify-items-start px-4 md:px-0">
        {cardData?.map((card: CardData) => (
          <div
            onClick={card.action}
            key={card._id}
            className=" rounded-[6px] 2xl:p-5 lg:p-[12px] md:p-5 p-[10px] 2xl:w-[362px] 2mid75:max-w-[330px] 2mid75:min-w-[300px] 2mid80:w-[270px] 2makbook:w-[210px] 2large:w-[280px] lg:w-[250px] md:w-[230px] !w-full cursor-pointer"
            style={{ backgroundColor: card?.color }}
          >
            <div className="flex gap-[10px] items-center">
              <img
                className="2xl:w-[50px] 2xl:h-[50px] lg:w-[36px] lg:h-[36px] md:h-10 md:w-10 w-[30px] h-[30px] rounded-full"
                src={card?.image}
                alt={card?.orderName}
              />
              <h2 className="text-secondaryColor 2xl:text-[24px] lg:text-[18px] 2makbook:text-[14px] md:text-[18px] text-[14px] font-Noto-Sans-Bengali lg:font-medium font-normal">
                {card?.orderName}
              </h2>
            </div>
            <h4 className="text-secondaryColor 2xl:text-[48px] lg:text-[30px] 2makbook:text-[24px] md:text-[30px] text-[28px] font-Poppins font-semibold leading-normal 2xl:mt-[10px] lg:mt-[7px] md:mt-[10px] mt-[5px]">
              {card?.totalOrder}
            </h4> 
          </div>
        ))}
      </div>

      <div
        className="2xl:mt-[30px] lg:mt-[15px] md:mt-[20px] mt-4 bg-white rounded-[6px]"
        style={{ boxShadow: "(0px 0px 25px rgba(22, 22, 22, 0.03)" }}
      >
        <div className="2xl:p-[30px] lg:p-[15px] md:p-5 p-4 rounded-[6px]">
          <div className="">
            <OrderTabAndList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
