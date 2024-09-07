import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import boxIcon from "../../assets/box.svg";
import flashIcon from "../../assets/flash.svg";
import '../../custom-css/SlickSlider.css'


const SubscriptionPlanForMobile = () => {

     const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 1
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
      };



  return (
    <div>
         <Slider className="pb-6" {...settings}>

             {/* card 1 */}
        <div
          className="2xl:w-[362px] lg:w-full w-full rounded-[10px] bg-white 2xl:py-[30px] lg:py-5 py-4"
          style={{ boxShadow: "0px 0px 25px 0px rgba(22, 22, 22, 0.03)" }}
        >
          <div className="2xl:px-[30px] lg:px-5 px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
            >
              <path
                d="M21.0359 19.5502C21.8734 19.0002 22.9734 19.6002 22.9734 20.6002V22.2127C22.9734 23.8002 21.7359 25.5002 20.2484 26.0002L16.2609 27.3252C15.5609 27.5627 14.4234 27.5627 13.7359 27.3252L9.74844 26.0002C8.24844 25.5002 7.02344 23.8002 7.02344 22.2127V20.5877C7.02344 19.6002 8.12344 19.0002 8.94844 19.5377L11.5234 21.2127C12.5109 21.8752 13.7609 22.2002 15.0109 22.2002C16.2609 22.2002 17.5109 21.8752 18.4984 21.2127L21.0359 19.5502Z"
                fill="#333333"
              />
              <path
                d="M24.9734 8.0752L17.4859 3.1627C16.1359 2.2752 13.9109 2.2752 12.5609 3.1627L5.03594 8.0752C2.62344 9.6377 2.62344 13.1752 5.03594 14.7502L7.03594 16.0502L12.5609 19.6502C13.9109 20.5377 16.1359 20.5377 17.4859 19.6502L22.9734 16.0502L24.6859 14.9252V18.7502C24.6859 19.2627 25.1109 19.6877 25.6234 19.6877C26.1359 19.6877 26.5609 19.2627 26.5609 18.7502V12.6002C27.0609 10.9877 26.5484 9.1127 24.9734 8.0752Z"
                fill="#333333"
              />
            </svg>
          </div>

          <div className="2xl:px-[30px] lg:px-5 px-4 mt-3">
            <h1 className="md:text-[24px] text-[18px] text-[#333] font-Poppins font-semibold">
              Free trial
            </h1>

            <h3 className=" lg:text-[16px] 2xl:text-[18px] md:text-[18px] text-[14px] text-switchColor font-Poppins font-normal">
              For users who want to do more
            </h3>

            <div className="md:mt-[30px] mt-5 flex flex-col items-center ">
              <p className=" text-[28px] text-[#333] font-Poppins font-normal">
                $00
              </p>
             
              <p className=" text-[28px] text-[#333] font-Poppins font-semibold">
              5-10 orders
              </p>
            </div>
          </div>

            
          <div className="2xl:px-[30px] lg:px-5 px-4 2xl:mt-[92px] lg:pt-[30px] pt-5">
            <button className="bg-[#F00C89] w-full h-[60px] rounded-md text-white text-[20px] font-Poppins font-medium">
              Choose Plan
            </button>
          </div>


          <div className="2xl:px-[30px] lg:px-5 px-4 flex flex-col gap-[18px] lg:pt-[30px] pt-5">
            <div className="flex items-center gap-[10px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M4.5 12.75L10.5 18.75L19.5 5.25"
                  stroke="#F00C89"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p className="md:text-[18px] text-[14px] text-[#333] font-Poppins font-normal">
                50 orders creation
              </p>
            </div>

            <div className="flex items-center gap-[10px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M4.5 12.75L10.5 18.75L19.5 5.25"
                  stroke="#F00C89"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p className="md:text-[18px] text-[14px] text-[#333] font-Poppins font-normal">
                Customer management
              </p>
            </div>

            <div className="flex items-center gap-[10px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M4.5 12.75L10.5 18.75L19.5 5.25"
                  stroke="#F00C89"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p className="md:text-[18px] text-[14px] text-[#333] font-Poppins font-normal">
                50 orders creation
              </p>
            </div>

            <div className="flex items-center gap-[10px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M4.5 12.75L10.5 18.75L19.5 5.25"
                  stroke="#F00C89"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p className="md:text-[18px] text-[14px] text-[#333] font-Poppins font-normal">
                Group orders
              </p>
            </div>

            <div className="flex items-center gap-[10px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M4.5 12.75L10.5 18.75L19.5 5.25"
                  stroke="#F00C89"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p className="md:text-[18px] text-[14px] text-[#333] font-Poppins font-normal">
                Advanced management
              </p>
            </div>

            <div className="flex items-center gap-[10px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M4.5 12.75L10.5 18.75L19.5 5.25"
                  stroke="#F00C89"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p className="md:text-[18px] text-[14px] text-[#333] font-Poppins font-normal">
                Priority support
              </p>
            </div>
          </div>

        
        </div>

        {/* card 2 */}
        <div
          className="2xl:w-[362px] lg:w-full w-full rounded-[10px] bg-white 2xl:py-[30px] lg:py-5 py-4"
          style={{ boxShadow: "0px 0px 25px 0px rgba(22, 22, 22, 0.03)" }}
        >
          <div className="2xl:px-[30px] lg:px-5 px-4 flex justify-between items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="24"
              viewBox="0 0 30 24"
              fill="none"
            >
              <path
                d="M2.81641 18.2715L3.44797 21.159C3.80826 22.8048 5.33435 23.9996 7.07728 23.9996H22.9208C24.6638 23.9996 26.1899 22.8048 26.5501 21.159L27.1816 18.2715H2.81641Z"
                fill="#333333"
              />
              <path
                d="M28.9189 3.28224C28.0926 2.77345 27.052 2.81239 26.2674 3.38024L21.5416 6.79937C21.3454 6.94167 21.1061 6.99403 20.8655 6.94704C20.6248 6.90006 20.4245 6.76179 20.3021 6.55774L17.0121 1.11555C16.5905 0.416137 15.8379 0 14.9991 0C14.1603 0 13.4076 0.417478 12.9862 1.11555L9.69614 6.55774C9.57232 6.76179 9.372 6.90006 9.13274 6.94704C8.89208 6.99537 8.65279 6.94167 8.45667 6.80072L3.73083 3.38024C2.94763 2.81375 1.90706 2.77616 1.07934 3.28359C0.253017 3.79238 -0.150407 4.71864 0.051305 5.64491L2.50247 16.842H27.497L29.9482 5.64491C30.1513 4.71864 29.7465 3.79238 28.9202 3.28359L28.9189 3.28224Z"
                fill="#333333"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
            >
              <path
                d="M11 16L14 19L19 12M27 15C27 16.5759 26.6896 18.1363 26.0866 19.5922C25.4835 21.0481 24.5996 22.371 23.4853 23.4853C22.371 24.5996 21.0481 25.4835 19.5922 26.0866C18.1363 26.6896 16.5759 27 15 27C13.4241 27 11.8637 26.6896 10.4078 26.0866C8.95189 25.4835 7.62902 24.5996 6.51472 23.4853C5.40042 22.371 4.5165 21.0481 3.91345 19.5922C3.31039 18.1363 3 16.5759 3 15C3 11.8174 4.26428 8.76516 6.51472 6.51472C8.76516 4.26428 11.8174 3 15 3C18.1826 3 21.2348 4.26428 23.4853 6.51472C25.7357 8.76516 27 11.8174 27 15Z"
                stroke="#F00C89"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>

          <div className="2xl:px-[30px] lg:px-5 px-4 mt-3">
            <h1 className="md:text-[24px] text-[18px] text-[#333] font-Poppins font-semibold">
              Professional
            </h1>

            <h3 className=" lg:text-[16px] 2xl:text-[18px] md:text-[18px] text-[14px] text-switchColor font-Poppins font-normal">
              For users who want to do more
            </h3>

            <div className="md:mt-[30px] mt-5 flex flex-col items-center ">
              <p className=" text-[28px] text-[#333] font-Poppins font-normal">
              $120
              </p>
             
              <p className=" text-[28px] text-[#333] font-Poppins font-semibold">
              50-100 orders
              </p>
            </div>

          </div>
            
          <div className="2xl:px-[30px] lg:px-5 px-4 2xl:mt-[92px] lg:pt-[30px] pt-5">
            <button className="bg-[#F00C89] w-full h-[60px] rounded-md text-white text-[20px] font-Poppins font-medium">
              Choose Plan
            </button>
          </div>


          <div className="2xl:px-[30px] lg:px-5 px-4 flex flex-col gap-[18px] lg:pt-[30px] pt-5">
            <div className="flex items-center gap-[10px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M4.5 12.75L10.5 18.75L19.5 5.25"
                  stroke="#F00C89"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p className="md:text-[18px] text-[14px] text-[#333] font-Poppins font-normal">
                50 orders creation
              </p>
            </div>

            <div className="flex items-center gap-[10px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M4.5 12.75L10.5 18.75L19.5 5.25"
                  stroke="#F00C89"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p className="md:text-[18px] text-[14px] text-[#333] font-Poppins font-normal">
                Customer management
              </p>
            </div>

            <div className="flex items-center gap-[10px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M4.5 12.75L10.5 18.75L19.5 5.25"
                  stroke="#F00C89"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p className="md:text-[18px] text-[14px] text-[#333] font-Poppins font-normal">
                50 orders creation
              </p>
            </div>

            <div className="flex items-center gap-[10px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M4.5 12.75L10.5 18.75L19.5 5.25"
                  stroke="#F00C89"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p className="md:text-[18px] text-[14px] text-[#333] font-Poppins font-normal">
                Group orders
              </p>
            </div>

            <div className="flex items-center gap-[10px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M4.5 12.75L10.5 18.75L19.5 5.25"
                  stroke="#F00C89"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p className="md:text-[18px] text-[14px] text-[#333] font-Poppins font-normal">
                Advanced management
              </p>
            </div>

            <div className="flex items-center gap-[10px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M4.5 12.75L10.5 18.75L19.5 5.25"
                  stroke="#F00C89"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p className="md:text-[18px] text-[14px] text-[#333] font-Poppins font-normal">
                Priority support
              </p>
            </div>
          </div>

        
        </div>

        {/* card 3 */}
        <div
          className="2xl:w-[362px] lg:w-full w-full rounded-[10px] bg-[#F00C89] 2xl:py-[30px] lg:py-5 py-4"
          style={{ boxShadow: "0px 0px 25px 0px rgba(22, 22, 22, 0.03)" }}
        >
          <div className="2xl:px-[30px] lg:px-5 px-4 ">
            <img src={boxIcon} alt="" />
          </div>

          <div className="2xl:px-[30px] lg:px-5 px-4 mt-3">
            <h1 className="md:text-[24px] text-[18px] text-white font-Poppins font-semibold">
            Silver
            </h1>

            <h3 className=" lg:text-[16px] 2xl:text-[18px] md:text-[18px] text-[14px] text-white font-Poppins font-normal">
              For users who want to do more
            </h3>

            <div className="md:mt-[30px] mt-5 flex flex-col items-center ">
              <p className=" text-[28px] text-white font-Poppins font-normal">
              $200
              </p>
             
              <p className=" text-[28px] text-white font-Poppins font-semibold">
              150-300 orders
              </p>
            </div>
          </div>

          <div className="2xl:px-[30px] lg:px-5 px-4 2xl:mt-[92px] lg:pt-[30px] pt-5">
            <button className="bg-white  w-full h-[60px] rounded-md text-[#F00C89] text-[20px] font-Poppins font-medium">
              Choose Plan
            </button>
          </div>


          <div className="2xl:px-[30px] lg:px-5 px-4 flex flex-col gap-[18px] lg:pt-[30px] pt-5">
            <div className="flex items-center gap-[10px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M4.5 12.75L10.5 18.75L19.5 5.25"
                  stroke="#F00C89"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p className="md:text-[18px] text-[14px] text-white font-Poppins font-normal">
                50 orders creation
              </p>
            </div>

            <div className="flex items-center gap-[10px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M4.5 12.75L10.5 18.75L19.5 5.25"
                  stroke="#F00C89"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p className="md:text-[18px] text-[14px] text-white font-Poppins font-normal">
                Customer management
              </p>
            </div>

            <div className="flex items-center gap-[10px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M4.5 12.75L10.5 18.75L19.5 5.25"
                  stroke="#F00C89"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p className="md:text-[18px] text-[14px] text-white font-Poppins font-normal">
                50 orders creation
              </p>
            </div>

            <div className="flex items-center gap-[10px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M4.5 12.75L10.5 18.75L19.5 5.25"
                  stroke="#F00C89"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p className="md:text-[18px] text-[14px] text-white font-Poppins font-normal">
                Group orders
              </p>
            </div>

            <div className="flex items-center gap-[10px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M4.5 12.75L10.5 18.75L19.5 5.25"
                  stroke="#F00C89"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p className="md:text-[18px] text-[14px] text-white font-Poppins font-normal">
                Advanced management
              </p>
            </div>

            <div className="flex items-center gap-[10px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M4.5 12.75L10.5 18.75L19.5 5.25"
                  stroke="#F00C89"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p className="md:text-[18px] text-[14px] text-white font-Poppins font-normal">
                Priority support
              </p>
            </div>
          </div>

         
        </div>

        {/* card 4 */}

        <div
          className="2xl:w-[362px] lg:w-full w-full rounded-[10px] bg-white 2xl:py-[30px] lg:py-5 py-4"
          style={{ boxShadow: "0px 0px 25px 0px rgba(22, 22, 22, 0.03)" }}
        >
          <div className="2xl:px-[30px] lg:px-5 px-4 ">
            <img src={flashIcon} alt="" />
          </div>

          <div className="2xl:px-[30px] lg:px-5 px-4 mt-3">
            <h1 className="md:text-[24px] text-[18px] text-[#333] font-Poppins font-semibold">
            Gold
            </h1>

            <h3 className=" lg:text-[16px] 2xl:text-[18px] md:text-[18px] text-[14px] text-switchColor font-Poppins font-normal">
              For users who want to do more
            </h3>

            <div className="md:mt-[30px] mt-5 flex flex-col items-center ">
              <p className=" text-[28px] text-[#333] font-Poppins font-normal">
              $350
              </p>
             
              <p className=" text-[28px] text-[#333] font-Poppins font-semibold">
              350-750 orders
              </p>
            </div>
          </div>

          <div className="2xl:px-[30px] lg:px-5 px-4 2xl:mt-[92px] lg:pt-[30px] pt-5">
            <button className="bg-[#F00C89] w-full h-[60px] rounded-md text-white text-[20px] font-Poppins font-medium">
              Choose Plan
            </button>
          </div>


          <div className="2xl:px-[30px] lg:px-5 px-4 flex flex-col gap-[18px] lg:pt-[30px] pt-5">
            <div className="flex items-center gap-[10px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M4.5 12.75L10.5 18.75L19.5 5.25"
                  stroke="#F00C89"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p className="md:text-[18px] text-[14px] text-[#333] font-Poppins font-normal">
                50 orders creation
              </p>
            </div>

            <div className="flex items-center gap-[10px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M4.5 12.75L10.5 18.75L19.5 5.25"
                  stroke="#F00C89"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p className="md:text-[18px] text-[14px] text-[#333] font-Poppins font-normal">
                Customer management
              </p>
            </div>

            <div className="flex items-center gap-[10px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M4.5 12.75L10.5 18.75L19.5 5.25"
                  stroke="#F00C89"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p className="md:text-[18px] text-[14px] text-[#333] font-Poppins font-normal">
                50 orders creation
              </p>
            </div>

            <div className="flex items-center gap-[10px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M4.5 12.75L10.5 18.75L19.5 5.25"
                  stroke="#F00C89"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p className="md:text-[18px] text-[14px] text-[#333] font-Poppins font-normal">
                Group orders
              </p>
            </div>

            <div className="flex items-center gap-[10px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M4.5 12.75L10.5 18.75L19.5 5.25"
                  stroke="#F00C89"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p className="md:text-[18px] text-[14px] text-[#333] font-Poppins font-normal">
                Advanced management
              </p>
            </div>

            <div className="flex items-center gap-[10px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M4.5 12.75L10.5 18.75L19.5 5.25"
                  stroke="#F00C89"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p className="md:text-[18px] text-[14px] text-[#333] font-Poppins font-normal">
                Priority support
              </p>
            </div>
          </div>

         
        </div>

         </Slider>
    </div>
  )
}

export default SubscriptionPlanForMobile