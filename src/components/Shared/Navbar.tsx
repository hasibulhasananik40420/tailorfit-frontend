/* eslint-disable @typescript-eslint/no-explicit-any */
import { CiSearch } from "react-icons/ci";
import { HiMenuAlt2 } from "react-icons/hi";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import MobileSidebar from "../layout/MobileSidebar";
import UserModal from "../ui/UserModal/UserModal";
import SwitchLanguage from "../ReuseForm/SwitchLanguage";
import NotificationModal from "../ui/NotificationModal/NotificationModal";
import { useAppDispatch, useAppSelector } from "../../redux/features/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { clearSearchQuery, setSearchQuery } from "../../redux/features/auth/searchSlice";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { RootState } from "../../redux/features/store";
import { useGetIndividualOrdersQuery } from "../../redux/api/individualOrderApi";
import { useGetCompanyOrdersQuery } from "../../redux/api/companyOrderApi";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";

const Navbar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);



  const handleIconClick = () => {
    setShowSearchBar(!showSearchBar);
    
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleUserModal = () => {
    setUserModalOpen(!userModalOpen);
  };

  const toggleNotificationModal = () => {
    setNotificationModalOpen(!notificationModalOpen);
  };



  const user = useAppSelector(selectCurrentUser);

  const dispatch = useAppDispatch();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value.trim()));
  };




const handleClear = () => {
  dispatch(clearSearchQuery());

  // Reset the input value
  if (searchInputRef.current) {
    searchInputRef.current.value = '';
  }
};


  // all data here
  const searchQuery = useAppSelector((state: RootState) => state.search.query);
  // console.log(searchQuery)

  const { data} = useGetIndividualOrdersQuery({
    adminId: user?.id,
    searchTerm: "",
  });

  const { data: cData } = useGetCompanyOrdersQuery({
    adminId: user?.id,
    searchTerm: "",
  });

  // if (isLoading || cLoading) {
  //   return <Loader />;
  // }


  const newArray = [...(data?.data || []), ...(cData?.data || [])];

  const filteredOrders = newArray?.filter(
    (order: any) =>
      order?.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order?.orderId.includes(searchQuery) ||
      order?.phoneNumber.includes(searchQuery)
  );

  
  
 

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setShowSearchBar(false);
        dispatch(setSearchQuery("")); // Clear the search query
        if (searchInputRef.current) {
          searchInputRef.current.value = ""; // Clear the search input value
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchContainerRef, searchInputRef, dispatch]);


  
  return (
    <div className="sticky top-0 z-20 bg-[#F9FAFE] w-full 2xl:py-[30px] lg:py-[15px] md:py-5 py-4 px-4 md:px-0">
      <div className="flex justify-between items-center w-full">
        <div className="w-auto flex items-center gap-[10px]">
          <HiMenuAlt2
            onClick={toggleSidebar}
            className="size-6 text-secondaryColor lg:hidden block"
          />
          <h1 className="lg:text-[32px] lg:hidden block text-[18px] text-secondaryColor font-Poppins font-semibold">
            Dashboard
          </h1>

          <div className="flex flex-col ">
          <div ref={searchInputRef} className="relative lg:block hidden">
            <input
              className="lg:w-[380px] w-full 2xl:h-[50px] lg:h-[50px] h-[50px] bg-white rounded-[40px]  pl-12 text-black 2xl:text-[18px] text-[16px] font-normal font-Poppins placeholder-[#999] 2xl:placeholder:text-[18px] placeholder:text-[16px] placeholder:font-Poppins placeholder:font-normal outline-0 focus:outline focus:outline-[1px] focus:outline-[#F00C89]"
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search Customer"
              style={{
                border: "1px solid rgba(0, 0, 0, 0.10)",
                boxShadow: "0px 0px 25px 0px rgba(25, 93, 142, 0.05)",
              }}
              
            />
            <span className=" absolute top-4 lg:top-[14px] 2xl:top-[14px] left-5">
              <CiSearch className="text-[#999999] size-6" />
            </span> 
            
             {
              searchQuery && 
              (
                <span  className=" absolute top-4 lg:top-[14px] 2xl:top-[14px] right-5 cursor-pointer">
                <IoCloseOutline onClick={handleClear} className="text-black size-6" />
              </span>
              )
             }
          

           


             
          </div>
          {/* serch result */}
          { searchQuery && (
        <div
        ref={searchContainerRef}
          className="bg-white rounded-[8px] lg:max-w-[530px] w-full z-50 absolute lg:mt-16 mt-20 left-[0px]"
          style={{ boxShadow: "5px 0px 30px 0px rgba(0, 0, 0, 0.15)" }}
        >
          <div className="p-4">
            <>
              {filteredOrders?.length > 0 ? (
                <div className="flex flex-col gap-2 max-h-[265px] overflow-y-auto">
                  {filteredOrders?.map((order: any) => (
                    <Link to={`/${user?.role}/order-details/${order._id}`}
                      key={order._id}
                      onClick={handleClear}
                      
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
              <Link to={`/${user?.role}/all-orders`}>
              <button className="w-full py-[15px] text-[18px] text-[#F00C89] font-Noto-Sans-Bengali font-medium">
                সকল রেজাল্ট দেখুন
              </button>
              </Link>
            </div>
          )}
        </div>
      )}

          </div>



          
         
        </div>

        <div className="w-auto  flex items-center gap-[30px]">
          <div className="flex items-center gap-5">
            <div onClick={handleIconClick} className="lg:hidden block">
              <span
                className=" bg-white lg:w-[50px] lg:h-[50px] w-[35px] h-[35px] rounded-full flex justify-center items-center cursor-pointer  group duration-300"
                style={{ boxShadow: "0px 0px 25px rgba(25, 93, 142, 0.05)" }}
              >
                <CiSearch className="text-[#333] size-6 group-hover:text-[#F00C89]" />
              </span>
            </div>

            <span
              onClick={toggleNotificationModal}
              className="bg-white lg:w-[50px] lg:h-[50px] w-[35px] h-[35px] rounded-full flex justify-center items-center cursor-pointer  duration-300 group ease-in text-secondaryColor"
              style={{ boxShadow: "(0px 0px 25px rgba(25, 93, 142, 0.05)" }}
            >
              <HiOutlineBellAlert className="lg:size-6 size-5 group-hover:text-[#F00C89]" />
            </span>

           

            <div className="lg:block hidden">
              <SwitchLanguage />
            </div>

         

            <div onClick={toggleUserModal}>
              {user?.profile ? (
                <img
                  src={user?.profile}
                  alt="User Profile"
                  className="bg-[#F0F2F5] lg:w-[50px] lg:h-[50px] w-[35px] h-[35px] rounded-full flex justify-center items-center cursor-pointer"
                  style={{
                    boxShadow: "0px 0px 25px rgba(25, 93, 142, 0.05)",
                  }}
                />
              ) : (
                <span
                  className="bg-btn-hover lg:w-[50px] lg:h-[50px] w-[35px] h-[35px] rounded-full flex justify-center items-center cursor-pointer"
                  style={{
                    boxShadow: "0px 0px 25px rgba(25, 93, 142, 0.05)",
                  }}
                >
                 
                  <h1 className="text-white md:text-[24px] text-[18px] font-semibold font-Poppins"> {user?.companyName?.slice(0, 1).toUpperCase()}</h1>
         
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {showSearchBar && (
        <div className="relative lg:hidden block mt-3 pb-3 bg-[#F9FAFE]">
          <input
            className="w-full h-[45px] bg-white rounded-[40px] outline-0 pl-12 text-[#999] text-[14px] font-normal font-Poppins placeholder-[#999] placeholder:text-[14px] placeholder:font-Poppins placeholder:font-normal"
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search Customer"
            style={{
              border: "1px solid rgba(0, 0, 0, 0.10)",
              boxShadow: "0px 0px 25px 0px rgba(25, 93, 142, 0.05)",
            }}
          />
          <span className=" absolute top-3 left-5">
            <CiSearch className="text-[#999999] size-5" />
          </span>

          {
              searchQuery && 
              (
                <span  className=" absolute top-3 right-5 cursor-pointer">
                <IoCloseOutline onClick={handleClear} className="text-black size-6" />
              </span>
              )
             }
        </div>
      )}

      <div className="lg:hidden block">
        <MobileSidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      </div>

      <UserModal isOpen={userModalOpen} setIsOpen={setUserModalOpen} />
      <NotificationModal
        isOpen={notificationModalOpen}
        setIsOpen={setNotificationModalOpen}
      />
    </div>
  );
};

export default Navbar;
