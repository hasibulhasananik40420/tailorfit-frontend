import { CgCloseR } from "react-icons/cg";
import card from "../../assets/card-pos.png";
const MessagePage = () => {
  return (
    <div className="bg-white rounded-[10px] 2xl:p-[30px] lg:p-[15px] md:p-5 p-4 w-full min-h-[500px]">
      <div className="w-full flex flex-col lg:gap-[30px] gap-4">
        <div className="flex gap-[10px] items-center">
          <div className="lg:flex gap-[30px] items-center w-full">
            <label
              className="text-switchColor lg:text-[18px] text-[14px] font-Noto-Sans-Bengali font-semibold w-[185px] text-right"
              htmlFor=""
            >
              কাস্টমার
            </label>
            <input
              type="text"
              className="bg-white border border-[#BCBEC6] rounded-[8px] outline-none h-[50px] w-[98%] lg:text-[18px] text-[14px] pl-5 placeholder:text-btnColor font-Poppins font-normal"
              placeholder="Customer type"
            />
          </div>

          <button className="md:px-[15px] px-2 h-[50px] bg-[#0C8CE9] rounded-[8px] flex justify-center items-center mt-5 lg:mt-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 4.5V19.5M19.5 12H4.5"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M15.749 6C15.749 6.99456 15.3539 7.94839 14.6507 8.65165C13.9474 9.35491 12.9936 9.75 11.999 9.75C11.0044 9.75 10.0506 9.35491 9.34735 8.65165C8.64409 7.94839 8.249 6.99456 8.249 6C8.249 5.00544 8.64409 4.05161 9.34735 3.34835C10.0506 2.64509 11.0044 2.25 11.999 2.25C12.9936 2.25 13.9474 2.64509 14.6507 3.34835C15.3539 4.05161 15.749 5.00544 15.749 6ZM4.5 20.118C4.53213 18.1504 5.33634 16.2742 6.73918 14.894C8.14202 13.5139 10.0311 12.7405 11.999 12.7405C13.9669 12.7405 15.856 13.5139 17.2588 14.894C18.6617 16.2742 19.4659 18.1504 19.498 20.118C17.1454 21.1968 14.5871 21.7535 11.999 21.75C9.323 21.75 6.783 21.166 4.5 20.118Z"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>

          <button className="md:px-[15px] px-2 h-[50px] bg-[#F00C89] rounded-[8px] flex justify-center items-center mt-5 lg:mt-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 4.5V19.5M19.5 12H4.5"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M15.001 19.128C15.854 19.3757 16.7378 19.5009 17.626 19.5C19.0544 19.5021 20.4642 19.1764 21.747 18.548C21.7849 17.6517 21.5296 16.7675 21.0198 16.0293C20.5099 15.2912 19.7734 14.7394 18.9217 14.4575C18.07 14.1757 17.1497 14.1791 16.3002 14.4674C15.4506 14.7557 14.7183 15.313 14.214 16.055M15.001 19.128V19.125C15.001 18.012 14.715 16.965 14.214 16.055M15.001 19.128V19.234C13.0765 20.3931 10.8716 21.0038 8.625 21C6.294 21 4.113 20.355 2.251 19.234L2.25 19.125C2.24923 17.7095 2.71961 16.3339 3.58698 15.2153C4.45435 14.0966 5.66937 13.2984 7.04049 12.9466C8.41161 12.5948 9.86082 12.7093 11.1597 13.2721C12.4585 13.8349 13.5331 14.814 14.214 16.055M12.001 6.375C12.001 7.27011 11.6454 8.12855 11.0125 8.76149C10.3796 9.39442 9.52111 9.75 8.626 9.75C7.7309 9.75 6.87245 9.39442 6.23952 8.76149C5.60658 8.12855 5.251 7.27011 5.251 6.375C5.251 5.47989 5.60658 4.62145 6.23952 3.98851C6.87245 3.35558 7.7309 3 8.626 3C9.52111 3 10.3796 3.35558 11.0125 3.98851C11.6454 4.62145 12.001 5.47989 12.001 6.375ZM20.251 8.625C20.251 9.32119 19.9744 9.98887 19.4822 10.4812C18.9899 10.9734 18.3222 11.25 17.626 11.25C16.9298 11.25 16.2621 10.9734 15.7698 10.4812C15.2776 9.98887 15.001 9.32119 15.001 8.625C15.001 7.92881 15.2776 7.26113 15.7698 6.76884C16.2621 6.27656 16.9298 6 17.626 6C18.3222 6 18.9899 6.27656 19.4822 6.76884C19.9744 7.26113 20.251 7.92881 20.251 8.625Z"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="lg:flex gap-[30px]">
          <label
            className="text-switchColor lg:text-[18px] text-[14px] font-Noto-Sans-Bengali font-semibold w-[185px] text-right"
            htmlFor=""
          >
            নাম্বার
          </label>

          <textarea className="bg-[#F9FAFE] border border-[#BCBEC6] rounded-[8px] outline-none 2xl:h-[269px] lg:h-[150px] h-[100px] w-[100%] lg:text-[18px] text-[14px] pl-5 placeholder:text-btnColor font-Poppins font-normal"></textarea>
        </div>

        <div className="lg:flex gap-[30px]">
          <label
            className="text-switchColor lg:text-[18px] text-[14px] font-Noto-Sans-Bengali font-semibold w-[185px] text-right"
            htmlFor=""
          >
            মেসেজ লিখুন
          </label>

          <textarea className="bg-[#F9FAFE] border border-[#BCBEC6] rounded-[8px] outline-none 2xl:h-[269px] lg:h-[150px] h-[100px] w-[100%] lg:text-[18px] text-[14px] pl-5 placeholder:text-btnColor font-Poppins font-normal"></textarea>
        </div>

        <div className="border border-borderColor rounded-[8px] bg-white p-5 flex flex-col justify-center items-center md:w-[273px] w-full lg:ml-[185px] ml-0">
          <img className="w-[84px] h-[84px]" src={card} alt="" />
          <h2 className="text-[16px] text-[#333] font-Noto-Sans-Bengali font-semibold mt-5">
            আপনার এস.এম.এস ব্যালেন্স কম
          </h2>
          <div>
            <span className="text-switchColor text-[16px] font-Noto-Sans-Bengali font-medium">
              এস.এম.এস আছে:
            </span>
            <span className="text-[24px] text-[#F00C89] font-Noto-Sans-Bengali font-semibold ml-2">
              120
            </span>
          </div>

          <button className="px-4 py-2 bg-[#0C8CE9] rounded text-white font-Noto-Sans-Bengali text-[16px] font-medium mt-5">
            এস.এম.এস কিনুন
          </button>
        </div>

        <div className="flex justify-between gap-2 items-center mt-[50px]">
          <button className="bg-gray-btnColor lg:w-[165px] w-full h-[50px] rounded-[6px] flex justify-center items-center gap-2 text-white text-[18px] font-medium font-Noto-Sans-Bengali">
            <CgCloseR className="size-5 " />
            <p>বাতিল করুন</p>
          </button>

          <button className="bg-[#F00C89] border-[1px] border-[#F00C89] lg:w-[152px] w-full h-[50px] rounded-[6px] flex justify-center items-center gap-2 text-white text-[18px] font-medium font-Noto-Sans-Bengali">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M6.00053 12L3.26953 3.125C9.8024 5.025 15.9629 8.02646 21.4855 12C15.9632 15.9735 9.80306 18.9749 3.27053 20.875L6.00053 12ZM6.00053 12H13.5005"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p>সেভ করুন</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessagePage;
