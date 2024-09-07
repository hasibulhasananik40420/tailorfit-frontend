import { SetStateAction, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CiCalendar } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import shirt from "../../assets/demo-shirt.png";
import Selector from "../../components/Selector/Selector";
import { FiPlus, FiSave } from "react-icons/fi";
import { CgCloseR } from "react-icons/cg";

const NewOrder = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDateTwo, setSelectedDateTwo] = useState<Date | null>(null);
  const [selectedDateThree, setSelectedDateThree] = useState<Date | null>(null);

  //category
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const categories = ["শার্ট", "প্যান্ট", "পাঞ্জাবি", "ফতুয়া"];

  const handleSelect = (category: SetStateAction<string>) => {
    setSelectedCategory(category);
    setIsOpen(false);
    setIsVisible(true);
  };

  //design category pocket style

  const [pocketstyle, setPocketStyle] = useState("");
  const [isOpenPocket, setIsOpenPocket] = useState(false);
  const pocketsStyles = [
    "পকেট স্টাইল ১",
    "পকেট স্টাইল ২",
    "পকেট স্টাইল ৩",
    "পকেট স্টাইল ৪",
  ];

  const handlePockectSelect = (pocketsStyles: SetStateAction<string>) => {
    setPocketStyle(pocketsStyles);
    setIsOpenPocket(false);
  };

  //new style
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  //show hidden with icon
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(false);
  };

  return (
    <div className="bg-white rounded-[10px] lg:p-[15px] md:p-5 p-4 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-[#222943] md:text-[24px] text-[18px] font-Noto-Sans-Bengali font-bold">
          ব্যক্তির তথ্য
        </h1>

        <h1 className="text-secondaryColor font-Poppins md:text-[20px] text-[18px] font-semibold">
          <span className="text-switchColor font-Noto-Sans-Bengali font-semibold">
            অর্ডার নাম্বার:
          </span>{" "}
          #0001{" "}
        </h1>
      </div>
      <div className="w-full h-[1px] bg-[#BCBEC6] 2xl:mt-[30px] mt-5"></div>

      <div className="lg:flex justify-between mt-5">
        <div className="lg:flex lg:flex-col lg:gap-5  gap-[10px]">
          <div className="lg:flex lg:flex-col lg:gap-5 flex  gap-[10px] ">
            <div className="lg:flex items-center justify-between 2xl:gap-[30px] gap-5 2xl:w-[560px] lg:w-[520px] w-full ">
              <h1 className="text-switchColor lg:text-[18px] text-[14px] font-Noto-Sans-Bengali font-semibold mb-[10px] lg:mb-0 ">
                কাস্টমারের নাম
                <span className="text-[#F00C89] font-bold font-Noto-Sans-Bengali">
                  *
                </span>
              </h1>

              <input
                className="2xl:w-[400px] lg:w-[370px] w-full h-[51px] rounded-[8px] border-[1px] border-[#333] bg-white outline-0 px-5 md:text-[18px] text-[14px] font-Poppins font-normal "
                type="text"
              />
            </div>

            <div className="lg:flex items-center justify-between 2xl:gap-[30px] gap-5 2xl:w-[560px] lg:w-[520px] w-full ">
              <h1 className="text-switchColor lg:text-[18px] text-[14px] font-Noto-Sans-Bengali font-semibold mb-[10px] lg:mb-0 ">
                ফোন নাম্বার
                <span className="text-[#F00C89] font-bold font-Noto-Sans-Bengali">
                  *
                </span>
              </h1>

              <input
                className="2xl:w-[400px] lg:w-[370px] w-full h-[51px] rounded-[8px] border-[1px] border-[#BCBEC6] bg-white outline-0 px-5 md:text-[18px] text-[14px] font-Poppins font-normal "
                type="text"
              />
            </div>
          </div>

          <div className="lg:flex items-center justify-between 2xl:gap-[30px] gap-5 2xl:w-[560px] lg:w-[520px] w-full mt-4 lg:mt-0">
            <h1 className="text-switchColor lg:text-[18px] text-[14px] font-Noto-Sans-Bengali font-semibold mb-[10px] lg:mb-0 ">
              প্রতিষ্ঠান
              <span className="text-[#F00C89] font-bold font-Noto-Sans-Bengali">
                *
              </span>
            </h1>

            <Selector className={undefined} setIndustrySelected={undefined} industrySelected={undefined} ></Selector>
          </div>
        </div>

        <div className="w-full h-[1px] bg-[#BCBEC6] 2xl:mt-[30px] mt-5 lg:hidden block"></div>

        <div className="lg:flex lg:flex-col lg:gap-5  gap-[10px] mt-5 lg:mt-0">
          <div className="flex gap-[10px] lg:flex lg:flex-col lg:gap-5 w-full">
            {/* input 1 */}

            <div className="lg:flex items-center justify-between 2xl:gap-[30px] gap-5 2xl:w-[407px] lg:w-[370px] w-full">
              <h1 className="text-switchColor lg:text-[18px] text-[14px] font-Noto-Sans-Bengali font-semibold mb-[10px] lg:mb-0">
                অর্ডার ডেট
                <span className="text-[#F00C89] font-bold font-Noto-Sans-Bengali">
                  *
                </span>
              </h1>
              <div className="relative">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  placeholderText="Select a date"
                  className="2xl:w-[250px] lg:w-[220px] w-full h-[50px] text-secondaryColor 2xl:text-[18px] lg:text-[16px] text-[14px] border-[1px] border-[#BCBEC6] rounded-[8px] bg-white outline-0 pl-4 font-Poppins placeholder:text-secondaryColor focus:border-[1px] focus:border-[#333] duration-500"
                  dateFormat="yyyy-MM-dd"
                  calendarClassName="custom-calendar-class"
                />
                <span className="absolute inset-y-0 right-0 flex items-center lg:pr-3 pr-2 pointer-events-none">
                  <CiCalendar className="text-black font-bold lg:size-6 size-5" />
                </span>
              </div>
            </div>

            <div className="lg:flex items-center justify-between 2xl:gap-[30px] gap-5 2xl:w-[407px] lg:w-[370px] w-full">
              <h1 className="text-switchColor lg:text-[18px] text-[14px] font-Noto-Sans-Bengali font-semibold mb-[10px] lg:mb-0">
                ট্রায়াল ডেট
                <span className="text-[#F00C89] font-bold font-Noto-Sans-Bengali">
                  *
                </span>
              </h1>
              <div className="relative">
                <DatePicker
                  selected={selectedDateTwo}
                  onChange={(date) => setSelectedDateTwo(date)}
                  placeholderText="Select a date"
                  className="2xl:w-[250px] lg:w-[220px] w-full h-[50px] text-secondaryColor 2xl:text-[18px] lg:text-[16px] text-[14px] border-[1px] border-[#BCBEC6] rounded-[8px] bg-white outline-0 pl-4 font-Poppins placeholder:text-secondaryColor"
                  dateFormat="yyyy-MM-dd"
                  calendarClassName="custom-calendar-class"
                />
                <span className="absolute inset-y-0 right-0 flex items-center lg:pr-3 pr-2 pointer-events-none">
                  <CiCalendar className="text-black font-bold lg:size-6 size-5" />
                </span>
              </div>
            </div>
          </div>

          <div className="lg:flex items-center justify-between 2xl:gap-[30px] gap-5 2xl:w-[407px] lg:w-[370px] w-full mt-4 lg:mt-0">
            <h1 className="text-switchColor lg:text-[18px] text-[14px] font-Noto-Sans-Bengali font-semibold mb-[10px] lg:mb-0">
              ডেলিভারি ডেট
              <span className="text-[#F00C89] font-bold font-Noto-Sans-Bengali">
                *
              </span>
            </h1>
            <div className="relative">
              <DatePicker
                selected={selectedDateThree}
                onChange={(date) => setSelectedDateThree(date)}
                placeholderText="Select a date"
                className="2xl:w-[250px] lg:w-[220px] w-full border-[#BCBEC6] h-[50px] text-secondaryColor 2xl:text-[18px] lg:text-[16px] text-[14px] border-[1px]  rounded-[8px] bg-white outline-0 pl-4 font-Poppins placeholder:text-secondaryColor"
                dateFormat="yyyy-MM-dd"
                calendarClassName="custom-calendar-class"
              />
              <span className="absolute inset-y-0 right-0 flex items-center lg:pr-3 pr-2 pointer-events-none">
                <CiCalendar className="text-black font-bold lg:size-6 size-5" />
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-[1px] bg-[#BCBEC6] 2xl:mt-[30px] mt-5 lg:block hidden"></div>
      <div className="w-full h-[1px] bg-[#BCBEC6] 2xl:mt-[30px] mt-5 lg:hidden block"></div>

      <div className="2xl:pt-[30px] lg:pt-[15px] pt-3 relative">
        <h1 className="text-[#222943] lg:text-[24px] text-[18px] font-Noto-Sans-Bengali font-bold">
          পরিমাপ
        </h1>

        <div className="2xl:mt-[30px]  lg:mt-[15px] mt-3 border border-[#BCBEC6] !rounded-[10px] ">
          <div className="flex justify-between items-center lg:p-5 p-3">
            <div className="flex lg:gap-[50px] gap-3">
              <div className="lg:flex items-center gap-5 relative lg:w-[340px] w-full">
                <h1 className="text-switchColor lg:text-[18px] text-[14px] font-Noto-Sans-Bengali font-semibold mb-[10px] lg:mb-0">
                  ক্যাটাগরি 
                </h1>

                <div className="relative w-full">
                  <div
                    className="2xl:w-[250px] lg:w-[250px] w-full h-[51px] rounded-[8px] border-[1px] border-[#BCBEC6] bg-white outline-0 px-5 md:text-[18px] text-[14px] font-Poppins font-normal flex items-center justify-between cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <span className="lg:text-[18px] md:text-[16px] text-[12px] text-switchColor font-Poppins font-normal">
                      {selectedCategory || "Select a Category"}
                    </span>
                    <IoIosArrowDown className="text-black " />
                  </div>
                  {isOpen && (
                    <div
                      className="absolute z-10 mt-1 w-full p-[10px] rounded-[8px] bg-white"
                      style={{
                        boxShadow: "0px 0px 25px 0px rgba(0, 0, 0, 0.10)",
                      }}
                    >
                      {categories.map((category) => (
                        <div
                          key={category}
                          className="px-[10px] py-[6px] rounded cursor-pointer hover:bg-activeDhcolor"
                          onClick={() => handleSelect(category)}
                        >
                          {category}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* item2 */}

              <div className="lg:flex items-center gap-5 ">
                <h1 className="text-switchColor lg:text-[18px] text-[14px] font-Noto-Sans-Bengali font-semibold mb-[10px] lg:mb-0 ">
                  সংখ্যা
                </h1>

                <input
                  className=" md:w-[70px] w-[60px] h-[51px] rounded-[8px] border-[1px] border-[#BCBEC6] bg-white outline-0 px-5 md:text-[18px] text-[14px] font-Poppins font-normal placeholder:text-secondaryColor"
                  type="text"
                  placeholder="01"
                />
              </div>
            </div>

            <div className="mt-6 md:mt-0 lg:mt-0">
              <IoIosArrowDown
                onClick={toggleVisibility}
                className={`size-6 text-black cursor-pointer ${
                  isVisible && "rotate-180"
                }`}
              />
            </div>
          </div>

          <div>
            {isVisible ? (
              <>
                <div className=" lg:flex bg-[#F9FAFE] rounded-r-[10px] rounded-l-[10px] border-[#BCBEC6] border-t rounded-t-none">
                  {/* part 1 */}
                  <div className="bg-white 2xl:w-[740px] 2mid75:w-full lg:w-full w-full rounded-l-[10px] lg:pb-36 pb-24">
                    <h1 className="text-[#222943] lg:text-[24px] text-[18px] font-Noto-Sans-Bengali font-bold 2xl:pl-5 pl-3 2xl:pt-5 pt-3">
                      পরিমাপের নাম
                    </h1>

                    <div className="lg:mt-5 mt-3 flex flex-wrap 2xl:gap-5 lg:gap-3 gap-3 2xl:pl-5 pl-3">
                      <div className="flex flex-col">
                        <span className="text-black 2xl:text-[18px] lg:text-[16px] text-[14px] font-Noto-Sans-Bengali font-medium">
                          লম্বা
                        </span>
                        <input
                          className="2xl:w-[100px] lg:w-[70px] w-[60px] h-[50px] rounded-[8px] border-[1px] border-[#BCBEC6] outline-0 pl-3"
                          placeholder="40"
                          type="text"
                        />
                      </div>

                      <div className="flex flex-col">
                        <span className="text-black 2xl:text-[18px] lg:text-[16px] text-[14px] font-Noto-Sans-Bengali font-medium">
                          বুক
                        </span>
                        <input
                          className="2xl:w-[100px] lg:w-[70px] w-[60px] h-[50px] rounded-[8px] border-[1px] border-[#BCBEC6] outline-0 pl-3"
                          type="text"
                        />
                      </div>

                      <div className="flex flex-col">
                        <span className="text-black 2xl:text-[18px] lg:text-[16px] text-[14px] font-Noto-Sans-Bengali font-medium">
                          বুকের লুজ
                        </span>
                        <input
                          className="2xl:w-[100px] lg:w-[70px] w-[60px] h-[50px] rounded-[8px] border-[1px] border-[#BCBEC6] outline-0 pl-3"
                          type="text"
                        />
                      </div>

                      <div className="flex flex-col">
                        <span className="text-black 2xl:text-[18px] lg:text-[16px] text-[14px] font-Noto-Sans-Bengali font-medium">
                          পেট
                        </span>
                        <input
                          className="2xl:w-[100px] lg:w-[70px] w-[60px] h-[50px] rounded-[8px] border-[1px] border-[#BCBEC6] outline-0 pl-3"
                          type="text"
                        />
                      </div>

                      <div className="flex flex-col">
                        <span className="text-black 2xl:text-[18px] lg:text-[16px] text-[14px] font-Noto-Sans-Bengali font-medium">
                          হিপ
                        </span>
                        <input
                          className="2xl:w-[100px] lg:w-[70px] w-[60px] h-[50px] rounded-[8px] border-[1px] border-[#BCBEC6] outline-0 pl-3"
                          type="text"
                        />
                      </div>

                      <div className="flex flex-col">
                        <span className="text-black 2xl:text-[18px] lg:text-[16px] text-[14px] font-Noto-Sans-Bengali font-medium">
                          শোল্ডার
                        </span>
                        <input
                          className="2xl:w-[100px] lg:w-[70px] w-[60px] h-[50px] rounded-[8px] border-[1px] border-[#BCBEC6] outline-0 pl-3"
                          type="text"
                        />
                      </div>

                      <div className="flex flex-col">
                        <span className="text-black 2xl:text-[18px] lg:text-[16px] text-[14px] font-Noto-Sans-Bengali font-medium">
                          হাতের লম্বা
                        </span>
                        <input
                          className="2xl:w-[100px] lg:w-[70px] w-[60px] h-[50px] rounded-[8px] border-[1px] border-[#BCBEC6] outline-0 pl-3"
                          type="text"
                        />
                      </div>

                      <div className="flex flex-col">
                        <span className="text-black 2xl:text-[18px] lg:text-[16px] text-[14px] font-Noto-Sans-Bengali font-medium">
                          কপ
                        </span>
                        <input
                          className="2xl:w-[100px] lg:w-[70px] w-[60px] h-[50px] rounded-[8px] border-[1px] border-[#BCBEC6] outline-0 pl-3"
                          type="text"
                        />
                      </div>

                      <div className="flex flex-col">
                        <span className="text-black 2xl:text-[18px] lg:text-[16px] text-[14px] font-Noto-Sans-Bengali font-medium">
                          গলা
                        </span>
                        <input
                          className="2xl:w-[100px] lg:w-[70px] w-[60px] h-[50px] rounded-[8px] border-[1px] border-[#BCBEC6] outline-0 pl-3"
                          type="text"
                        />
                      </div>

                      <div className="flex flex-col">
                        <span className="text-black 2xl:text-[18px] lg:text-[16px] text-[14px] font-Noto-Sans-Bengali font-medium">
                          গুলফি
                        </span>
                        <input
                          className="2xl:w-[100px] lg:w-[70px] w-[60px] h-[50px] rounded-[8px] border-[1px] border-[#BCBEC6] outline-0 pl-3"
                          type="text"
                        />
                      </div>

                      <div className="flex flex-col">
                        <span className="text-black 2xl:text-[18px] lg:text-[16px] text-[14px] font-Noto-Sans-Bengali font-medium">
                          মোহরা
                        </span>
                        <input
                          className="2xl:w-[100px] lg:w-[70px] w-[60px] h-[50px] rounded-[8px] border-[1px] border-[#BCBEC6] outline-0 pl-3"
                          type="text"
                        />
                      </div>
                    </div>

                    <div className="w-full h-[0.4px] bg-[#BCBEC6] lg:my-5 my-3"></div>

                    <h1 className="text-[#222943] lg:text-[24px] text-[18px] font-Noto-Sans-Bengali font-bold 2xl:pl-5 pl-3 ">
                      লুজের মাপ (ঐচ্ছিক)
                    </h1>

                    <div className="md:flex justify-between">
                      <div className="lg:mt-5 mt-3 flex flex-wrap 2xl:gap-5 lg:gap-3 gap-3 2xl:pl-5 pl-3">
                        <div className="flex flex-col">
                          <span className="text-black 2xl:text-[18px] lg:text-[16px] text-[14px] font-Noto-Sans-Bengali font-medium">
                            লুজ ১
                          </span>
                          <input
                            className="2xl:w-[100px] lg:w-[70px] w-[60px] h-[50px] rounded-[8px] border-[1px] border-[#BCBEC6] outline-0 pl-3"
                            placeholder="5.7"
                            type="text"
                          />
                        </div>

                        <div className="flex flex-col">
                          <span className="text-black 2xl:text-[18px] lg:text-[16px] text-[14px] font-Noto-Sans-Bengali font-medium">
                            লুজ ২
                          </span>
                          <input
                            className="2xl:w-[100px] lg:w-[70px] w-[60px] h-[50px] rounded-[8px] border-[1px] border-[#BCBEC6] outline-0 pl-3"
                            type="text"
                          />
                        </div>

                        <div className="flex flex-col">
                          <span className="text-black 2xl:text-[18px] lg:text-[16px] text-[14px] font-Noto-Sans-Bengali font-medium">
                            লুজ ৩
                          </span>
                          <input
                            className="2xl:w-[100px] lg:w-[70px] w-[60px] h-[50px] rounded-[8px] border-[1px] border-[#BCBEC6] outline-0 pl-3"
                            type="text"
                          />
                        </div>
                      </div>

                      <div>
                        <img
                          className="2xl:w-[252px] lg:w-[220px] w-[106px] 2xl:h-[282px] lg:h-[230px] h-[120px] mr-3 mt-[-190px] ml-[190px] md:mt-0 md:ml-0"
                          src={shirt}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>

                  {/* part 2 */}
                  <div className="bg-[#F9FAFE] 2xl:w-[745px] 2mid75:w-full lg:w-full w-full border-[#BCBEC6] lg:border-l rounded-r-[10px] rounded-l-[10px] lg:rounded-l-none">
                    <div className="2xl:p-5 p-3">
                      <h1 className="text-[#222943] lg:text-[24px] text-[18px] font-Noto-Sans-Bengali font-bold">
                        ডিজাইন স্টাইল
                      </h1>

                      <div className="lg:mt-5 mt-3 lg:flex flex-row-reverse gap-5">
                        <div className="flex flex-col lg:gap-5 2large:gap-5 gap-[12px]">
                          <div className="relative 2xl:w-[340px] 2large:w-[270px] lg:w-[230px] 2makbook:w-[200px] w-full">
                            <div
                              className={`2xl:w-[340px] 2large:w-[270px] lg:w-[230px] 2makbook:w-[200px] w-full h-[56px] rounded-[8px] border-[1px] 
                        ${
                          isChecked
                            ? "border-[#F00C89] bg-activeDhcolor text-[#F00C89]"
                            : "border-[#BCBEC6] bg-white text-black "
                        } outline-0 px-5 flex gap-[15px] items-center`}
                            >
                              <input
                                className="w-5 h-5 rounded-[8px] border-[1px] border-[#BCBEC6]"
                                type="checkbox"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                              />
                              <p className="md:text-[18px] text-[14px] font-Noto-Sans-Bengali font-medium">
                                স্টাইল ১
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col lg:gap-5 gap-[10px] mt-[30px] lg:mt-0">
                          <div className="relative 2xl:w-[340px] 2large:w-[270px] lg:w-[230px] 2makbook:w-[200px] w-full">
                            <div
                              className="2xl:w-[340px] 2large:w-[270px] lg:w-[230px] 2makbook:w-[200px] w-full h-[56px] rounded-[8px] border-[1px] border-[#BCBEC6] bg-white outline-0 px-5 md:text-[18px] text-[14px] font-Noto-Sans-Bengali  flex items-center justify-between cursor-pointer"
                              onClick={() => setIsOpenPocket(!isOpenPocket)}
                            >
                              <input
                                className="w-full outline-none bg-transparent placeholder:text-black"
                                type="text"
                                placeholder="পকেট"
                                value={pocketstyle}
                                readOnly
                              />
                              <IoIosArrowDown className="size-6 text-black absolute top-[30%] right-4" />
                            </div>
                            {isOpenPocket && (
                              <div
                                className="absolute z-10 mt-1 w-full p-[10px] rounded-[8px] bg-white"
                                style={{
                                  boxShadow:
                                    "0px 5px 30px 0px rgba(0, 0, 0, 0.30)",
                                }}
                              >
                                {pocketsStyles.map((style) => (
                                  <div
                                    key={style}
                                    className="px-[10px] py-[6px] rounded cursor-pointer hover:bg-activeDhcolor"
                                    onClick={() => handlePockectSelect(style)}
                                  >
                                    {style}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* note add */}
                          <div className="w-full lg:hidden block mt-[30px]">
                            <h3 className="text-[#222943] text-[24px] font-bold  mb-3">
                              নোট লিখুন
                            </h3>
                            <input
                              type="text"
                              className="w-full h-[60px] border-[1px] border-[#BCBEC6] rounded-[8px] bg-white pl-4 placeholder:text-[18px] font-Noto-Sans-Bengali font-normal placeholder:text-switchColor outline-0"
                              placeholder="এখানে লিখুন"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* note add */}
                <div className="w-full  p-5 absolute bottom-[0px] lg:block hidden">
                  <h3 className="text-[#222943] text-[24px] font-bold 2xl:mb-5 mb-2">
                    নোট লিখুন
                  </h3>
                  <input
                    type="text"
                    className="w-full h-[60px] border-[1px] border-[#BCBEC6] rounded-[8px] bg-white pl-4 placeholder:text-[18px] font-Noto-Sans-Bengali font-normal placeholder:text-switchColor outline-0"
                    placeholder="এখানে লিখুন"
                  />
                </div>
              </>
            ) : (
              <div className="w-full bg-[#F9FAFE] lg:h-[150px] h-[96px] border-t border-[#BCBEC6]  rounded-b-[10px] text-btnColor font-Noto-Sans-Bengali text-16px] font-normal flex justify-center items-center">
                এখন পর্যন্ত কোন ক্যাটাগরি সিলেক্ট করা হয়নি
              </div>
            )}
          </div>
        </div>
      </div>

      {/* add button */}
      <div className="2xl:mt-[30px] mt-5">
        <button className="bg-activeDhcolor w-full h-[50px] rounded-[8px] flex justify-center items-center gap-2 text-[#F00C89] text-[18px] font-medium font-Noto-Sans-Bengali">
          <FiPlus className="size-6 " />
          <p>যোগ করুন</p>
        </button>
      </div>

      {/* close button */}

      <div className="lg:flex justify-between items-center">
        <div className="2xl:mt-[30px] mt-5 lg:block hidden">
          <button className="bg-gray-btnColor w-[165px] h-[50px] rounded-[6px] flex justify-center items-center gap-2 text-white text-[18px] font-medium font-Noto-Sans-Bengali">
            <CgCloseR className="size-5 " />
            <p>বাতিল করুন</p>
          </button>
        </div>

        <div className="flex items-center lg:gap-5 gap-4">
          <div className="2xl:mt-[30px] mt-5 w-full">
            <button className="bg-white border-[1px] border-[#F00C89] lg:w-[152px] w-full h-[50px] rounded-[6px] flex justify-center items-center gap-2 text-[#F00C89] text-[18px] font-medium font-Noto-Sans-Bengali">
              <FiSave className="size-6 " />
              <p>প্রিন্ট করুন</p>
            </button>
          </div>

          <div className="2xl:mt-[30px] mt-5 w-full">
            <button className="bg-[#F00C89] border-[1px] border-[#F00C89] lg:w-[152px] w-full h-[50px] rounded-[6px] flex justify-center items-center gap-2 text-white text-[18px] font-medium font-Noto-Sans-Bengali">
              <FiSave className="size-6 " />
              <p>সেভ করুন</p>
            </button>
          </div>
        </div>

        <div className="2xl:mt-[30px] mt-5 lg:hidden block">
          <button className="bg-gray-btnColor w-full h-[50px] rounded-[6px] flex justify-center items-center gap-2 text-white text-[18px] font-medium font-Noto-Sans-Bengali">
            <CgCloseR className="size-5 " />
            <p>বাতিল করুন</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewOrder;
