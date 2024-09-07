/* eslint-disable react-refresh/only-export-components */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import icon from "../../assets/save 1.png";
import { CiSearch } from "react-icons/ci";
import { useAppSelector } from "../../redux/features/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { z } from "zod";
import Swal from "sweetalert2";
import { Dialog, DialogPanel } from "@headlessui/react";
import { HiOutlinePlus } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import {
  useCreateCreateIndustryMutation,
  useGetMyIndustryNameQuery,
} from "../../redux/api/industryNames";

// type ValidationError = {
//   path: string;
//   message: string;
// };

export const validationSchema = z.object({
  institutionName: z
    .string()
    .min(1, "অনুগ্রহ করে কাস্টমারের নাম লিখুন")
    .refine((value) => !/^\d+$/.test(value), {
      message: "কাস্টমারের নাম শুধুমাত্র সংখ্যা হতে পারবে না",
    }),
});

export const defaultValues = {
  institutionName: "",
};

const Selector = ({
  className,
  setIndustrySelected,
  industrySelected,
  sRef,
}: {
  className: any;
  setIndustrySelected: any;
  industrySelected: any;
  sRef?: any;
}) => {
  const [inputValue, setInputValue] = useState("");
  // const [selected, setSelected] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // console.log(sRef.current)

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (sRef.current && !sRef.current.contains(event.target)) {
        setOpenModal(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sRef]);

  const selected = "";

  const [isOpen, setIsOpen] = useState(false);
  const [openMOdal, setOpenModal] = useState(false);
  // const [error, setError] = useState<ValidationError[]>([]);

  const currentUser = useAppSelector(selectCurrentUser);

  const { isLoading, data } = useGetMyIndustryNameQuery(currentUser?.id);

  const categoric2 = data?.data;

  //  console.log(categoric2)

  let filteredResults = [];
  if (categoric2) {
    filteredResults = categoric2.filter((item: any) =>
      item.institutionName.toLowerCase().includes(inputValue)
    );
  }

  //  handle all logic
  const [createCreateIndustry] = useCreateCreateIndustryMutation();

  const onSubmit = async () => {
    // console.log(data)
    setIsOpen(false);
    setOpenModal(false);
    const userInfo = {
      institutionName: phoneNumber,
      admin: currentUser?.id,
    };

    try {
      const res = await createCreateIndustry(userInfo).unwrap();
      if (res?.success) {
        // setOpenModal(false)
        Swal.fire({
          icon: "success",
          title: res?.message,
          showConfirmButton: false,
          timer: 5000,
        });
      }
    } catch (err) {
      

      Swal.fire({
        icon: "error",
        title: "s",
        showConfirmButton: false,
        timer: 5000,
      });
    }
  };

  const handleModel = () => {
    setOpenModal(!openMOdal);
    setIsOpen(false);
  };

  const handleModelCreateCustomer = () => {
    setOpenModal(false);
    setIsOpen(true);
  };
  // const createError = error?.find((error) => error?.path === "duplicate");

  // console.log(sRef);
  return (
    <div>
      {!isLoading ? (
        <div className="2xl:w-[400px] lg:w-[370px] w-full relative">
          <div
            onClick={handleModel}
            className={`${className} cursor-pointer h-[51px] rounded-[8px] border-[1px] border-[#BCBEC6] flex items-center justify-between px-3 text-secondaryColor md:text-[18px] text-[14px] font-Noto-Sans-Bengali font-normal placeholder:font-Noto-Sans-Bengali ${
              !industrySelected && "text-gray-700"
            }`}
          >
            {industrySelected
              ? industrySelected.length > 25
                ? industrySelected.substring(0, 25) + "..."
                : industrySelected
              : "প্রতিষ্ঠান সিলেক্ট করুন"}
            <BiChevronDown className={`size-6 ${openMOdal && "rotate-180"}`} />
          </div>
          {/* model  */}

          <ul
            className={`absolute bg-white mt-2 overflow-hidden md:left-none 2xl:w-[400px] lg:w-[370px] md:right-none left-0 right-0 z-[999999] rounded-[4px] ${className} ${
              openMOdal ? "max-h-auto" : "hidden"
            }`}
            style={{ boxShadow: "5px 0px 30px 0px rgba(0, 0, 0, 0.15)" }}
          >
            <div className="p-[15px] 2xl:h-[374px] lg:h-[180px] w-full">
              <div className="flex items-center gap-1 sticky top-0 rounded-[4px] border-[1px] border-primaryColor pl-3">
                <CiSearch className="text-[#999999] size-6" />
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value.toLowerCase())}
                  placeholder="Search Company"
                  className="bg-white text-secondaryColor placeholder:text-[#999999] placeholder:font-Poppins placeholder:font-normal lg:placeholder:text-[16px] placeholder:text-[14px] h-[39px] outline-none w-full pr-2"
                />
              </div>
              <div className="py-2 overflow-y-auto lg:max-h-[130px] 2xl:max-h-[300px] max-h-[150px]">
                {filteredResults.length > 0 ? (
                  filteredResults.map((country: any, id: string) => (
                    <option
                      key={id}
                      className={`py-[6px] px-[15px] rounded hover:bg-activeDhcolor text-[#333] pl-5 md:text-[18px] text-[14px] font-Poppins font-normal cursor-pointer ${
                        country.institutionName.toLowerCase() ===
                          selected.toLowerCase() &&
                        "bg-activeDhcolor text-secondaryColor cursor-pointer"
                      }`}
                      onClick={() => {
                        if (
                          country.institutionName.toLowerCase() !==
                          selected.toLowerCase()
                        ) {
                          setIndustrySelected(country.institutionName);
                          setOpenModal(false);
                          setInputValue("");
                        }
                      }}
                    >
                      {country.institutionName}
                    </option>
                  ))
                ) : (
                  <div className="pt-[10px] text-center text-switchColor text-[14px] font-Poppins font-medium">
                    No results found
                  </div>
                )}
              </div>
            </div>
            <div className="border-b border-borderColor"></div>
            <div>
              <button
                type="button"
                onClick={handleModelCreateCustomer}
                className=" flex gap-2 items-center justify-center w-full text-[#F00C89] 2xl:py-[15px] py-[10px] text-[18px] font-Poppins font-normal"
              >
                <HiOutlinePlus className="size-6 text-[#F00C89]" />
                Create a new customer
              </button>
              <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className=" relative !z-[9999999999]"
              >
                <div className="fixed inset-0 flex w-screen items-center justify-center">
                  <DialogPanel
                    style={{
                      boxShadow: "0px 0px 25px 0px rgba(0, 0, 0, 0.10)",
                    }}
                    className="md:w-[450px] w-full md:px-[50px] md:py-[50px] px-6 py-16 border-[1px] border-[#F6F6F6] bg-white rounded-[10px] relative"
                  >
                    <form>
                      <h1 className="text-secondaryColor text-[24px] text-center font-Poppins font-semibold">
                        Create Company Name
                      </h1>
                      <div className="flex flex-col w-full mt-[30px]">
                        <h1 className="text-switchColor lg:text-[18px] text-[14px] font-Noto-Sans-Bengali font-semibold">
                          কাস্টমারের নাম
                          <span className="text-primaryColor font-bold font-Noto-Sans-Bengali">
                            *
                          </span>
                        </h1>

                        <input
                          className={` w-full h-[51px] rounded-[8px] border-[1px] 
                            border-secondaryColor  placeholder:text-primaryColor  bg-white text-secondaryColor outline-0 px-5 md:text-[18px] text-[14px] font-Poppins font-normal `}
                          type="text"
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                      </div>

                      <button
                        type="button"
                        onClick={onSubmit}
                        className="bg-primaryColor  rounded-[8px] h-[50px] w-full flex justify-center items-center gap-1 lg:mt-[30px] mt-4"
                      >
                        <img className="w-6 h-6" src={icon} alt="" />
                        <p className="text-[18px] font-Noto-Sans-Bengali text-white font-medium">
                          সেভ করুন
                        </p>
                      </button>
                    </form>

                    <div>
                      <IoMdClose
                        onClick={() => setIsOpen(false)}
                        className="size-6 text-black cursor-pointer absolute right-4 top-4"
                      />
                    </div>
                  </DialogPanel>
                </div>
              </Dialog>
            </div>
          </ul>
        </div>
      ) : (
        <p>loading ...</p>
      )}
    </div>
  );
};

export default Selector;
