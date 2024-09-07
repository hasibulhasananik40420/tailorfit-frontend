import { CiCalendar, CiSearch } from "react-icons/ci"
import { useAppDispatch, useAppSelector } from "../../redux/features/hooks";
import { RootState } from "../../redux/features/store";
import { clearSearchQuery, setSearchQuery } from "../../redux/features/auth/searchSlice";
import { ChangeEvent, useEffect, useRef } from "react";
import { IoCloseOutline } from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setFilterDate } from "../../redux/features/auth/filterDateSlice";


const OrderListSearchAndFilter = () => {
  
    const searchContainerRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const searchQuery = useAppSelector((state: RootState) => state.search.query);
    const { filterDate } = useAppSelector((state: RootState) => state.filterDate);

     
    const dispatch = useAppDispatch();

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(setSearchQuery(e.target.value));
    };



    const handleClear = () => {
        dispatch(clearSearchQuery());
      
        // Reset the input value
        if (searchInputRef.current) {
          searchInputRef.current.value = '';
        }
      };


      const handleDateChange = (date: Date | null) => {
        dispatch(setFilterDate(date));
      };


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (
            searchContainerRef.current &&
            !searchContainerRef.current.contains(event.target as Node) &&
            searchInputRef.current &&
            !searchInputRef.current.contains(event.target as Node)
          ) {
            // setShowSearchBar(false);
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
    <div className="flex items-center gap-3">
       



           <div>
              <div className="relative">
                  <DatePicker
                    selected={filterDate} 
                    onChange={handleDateChange}
                    placeholderText="Select a date"
                    className="2xl:w-[250px] cursor-pointer lg:w-[220px] w-full border-[#BCBEC6] h-[40px] text-secondaryColor 2xl:text-[18px] lg:text-[16px] text-[14px] border-[1px]  rounded-[8px] bg-white outline-0 pl-4 font-Poppins placeholder:text-secondaryColor"
                    dateFormat="dd-MM-yyyy"
                    calendarClassName="custom-calendar-class"
                  />
                  <span className="absolute inset-y-0 right-0 flex items-center lg:pr-3 pr-2 pointer-events-none">
                    <CiCalendar className="text-black font-bold lg:size-6 size-5" />
                  </span>
                </div>
     </div>


     <div ref={searchInputRef} className="relative">
        <input
              className="lg:w-[300px] w-full 2xl:h-[50px] lg:h-[40px] h-[40px] bg-white rounded-[40px]  pl-12 text-black 2xl:text-[18px] text-[16px] font-normal font-Poppins placeholder-[#999] 2xl:placeholder:text-[18px] placeholder:text-[16px] placeholder:font-Poppins placeholder:font-normal outline-0 focus:outline focus:outline-[1px] focus:outline-[#F00C89]"
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search Customer"
              style={{
                border: "1px solid rgba(0, 0, 0, 0.10)",
                boxShadow: "0px 0px 25px 0px rgba(25, 93, 142, 0.05)",
              }}
              
            />
            <span className=" absolute top-2 lg:top-[10px] 2xl:top-[14px] left-5">
              <CiSearch className="text-[#999999] size-6" />
            </span> 

            {
              searchQuery && 
              (
                <span  className=" absolute top-2 lg:top-[10px] 2xl:top-[14px] right-3 cursor-pointer">
                <IoCloseOutline onClick={handleClear} className="text-black size-6" />
              </span>
              )
             }
        </div>


    </div>
  )
}

export default OrderListSearchAndFilter

