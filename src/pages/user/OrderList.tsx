import { useState } from "react";
import { FiUser } from "react-icons/fi";
import { LuUsers } from "react-icons/lu";

import AllPersonOderList from "../../components/AllPersonOderList/AllPersonOderList";
import AllCompanyOrderList from "../../components/AllCompanyOrderList/AllCompanyOrderList";
import FilterItem from "../../components/FilterItem/FilterItem";
import FilterItemForMobile from "../../components/FilterItem/FilterItemForMobile";
import OrderListSearchAndFilter from "./OrderListSearchAndFilter";

const OrderList = () => {
  const [activeTab, setActiveTab] = useState('person');
  

  return (
    <div className=" w-full bg-white 2xl:p-[30px] lg:p-[15px] md:p-5 p-4 rounded-[10px]">
      <div className="flex justify-between gap-5 lg:gap-0 items-center lg:w-full w-full">
        <div className="flex items-center 2xl:gap-[30px] lg:gap-[30px] gap-4 2xl:mb-[30px] mb-[14px]">
          {/* <div className="w-full">
            <h1 className="text-secondaryColor 2xl:text-[24px] text-[18px] font-Noto-Sans-Bengali font-semibold lg:block hidden">
              অর্ডার তালিকা
            </h1>
          </div> */}

          <div
            className=" w-full 2xl:h-[50px]  lg:h-[40px]  h-[39px] rounded-[40px] border-[1px] border-[#999] bg-white flex ml-[-15px] md:ml-0"
            style={{ boxShadow: "0px 0px 25px 0px rgba(25, 93, 142, 0.05)" }}
          >
            <button
              className={`flex gap-2 justify-center items-center px-5  h-full rounded-l-[40px] ${
                activeTab === "person" ? "bg-activeDhcolor" : "bg-transparent"
              }`}
              onClick={() => setActiveTab("person")}
            >
              <FiUser
                className={`md:size-5 size-4 ${
                  activeTab === "person"
                    ? "text-[#F00C89]"
                    : "text-secondaryColor"
                }`}
              />
              <p
                className={`md:text-[18px] text-[14px] font-Noto-Sans-Bengali font-normal ${
                  activeTab === "person"
                    ? "text-[#F00C89]"
                    : "text-secondaryColor"
                }`}
              >
                ব্যক্তি
              </p>
            </button>

            <div className="bg-[#999] w-[1px] 2xl:h-[48px] h-[38px]"></div>
            <button
              className={`flex gap-2  justify-center items-center h-full px-5 rounded-r-[40px] ${
                activeTab === "company"
                  ? "bg-activeDhcolor w-full"
                  : "bg-transparent"
              }`}
              onClick={() => setActiveTab("company")}
            >
              <LuUsers
                className={`md:size-5 size-4 ${
                  activeTab === "company"
                    ? "text-[#F00C89] "
                    : "text-secondaryColor"
                }`}
              />
              <p
                className={`md:text-[18px] text-[14px] font-Noto-Sans-Bengali font-normal ${
                  activeTab === "company"
                    ? "text-[#F00C89]"
                    : "text-secondaryColor"
                }`}
              >
                কোম্পানী
              </p>
            </button>
          </div>
        </div>

      

       <div className="flex items-center gap-5">
       {activeTab !== "company" && (
         <div className="md:mt-[-10px] 2xl:mt-[-20px]">
            <OrderListSearchAndFilter/>
         </div>
         )}

       {activeTab !== "company" && (
         <div className="lg:block hidden">
          <div className="flex 2xl:gap-[30px] gap-4 lg:mt-[-10px] 2xl:mt-[-20px]">
         <FilterItem />
        </div>
       </div>
          )}

        {/* folter for mobile */}
        {activeTab !== "company" && (
        <div className="lg:hidden block">
          <FilterItemForMobile />
        </div>
        )}


         
       </div>




      </div>

      <div className="w-full">
        {activeTab === "person" && <AllPersonOderList />}
        {activeTab === "company" && <AllCompanyOrderList />}
      </div>
    </div>
  );
};

export default OrderList;
