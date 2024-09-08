import { FiSave } from "react-icons/fi";
import { Dialog, DialogPanel } from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import {
  TCostumer,
  useEditCostumerMutation,
  // useGetCostumerQuery,
} from "../../../redux/api/createCostumerApi";
import { useState } from "react";
import Swal from "sweetalert2";


interface CustomerModalProps {
  isOpenCustomer: boolean;
  setIsOpenCustomer: React.Dispatch<React.SetStateAction<boolean>>;
  phoneNumber?: string;
  id?: string;
  industry?: string;
  data: TCostumer;
}

const CustomerEditModal = ({
  isOpenCustomer,
  setIsOpenCustomer,
  phoneNumber,
  industry,
  id,
  data,
}: CustomerModalProps) => {
  const [editCostumer] = useEditCostumerMutation();
  // const { data, isLoading } = useGetCostumerQuery(phoneNumber);
  const [customerName, setCustomerName] = useState(
    (data?.customerName as string) || ""
  );
  const [editPhoneNumber, setPhoneNumber] = useState(
    (phoneNumber as string) || ""
  );
  const [address, setAddress] = useState((data?.address as string) || "");
  const [industryName, setIndustryName] = useState(
    (data?.industry as string) || ""
  );

  const handleSubmit = async () => {
    const newData = {
      _id: id as string,
      customerName,
      editPhoneNumber,
      address,
      industry: industryName,
    };
    setIsOpenCustomer(false);
    try {
      const res = await editCostumer(newData).unwrap();

      if (res?.success) {
        Swal.fire({
          icon: "success",
          title: res?.message,
          showConfirmButton: false,
          timer: 3000,
        });
      }
    } catch (err) {
      // console.log(err)
      const error = err as { data: { message: string } };
      Swal.fire({
        icon: "error",
        title: error?.data?.message,
      });
    }
  };

  // if (isLoading) {
  //   <Loader />;
  // }
  const customer: TCostumer = data;


  return (
    <div className=''>
      <Dialog
        open={isOpenCustomer}
        onClose={() => setIsOpenCustomer(false)}
        className="relative !z-[999999]"
      >
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="fixed inset-0 flex w-screen items-center justify-center ">
          <DialogPanel
            onClick={(event) => event.stopPropagation()}
            className="lg:max-w-[500px] w-full border border-[#F6F6F6] bg-white lg:px-[50px] px-6 lg:py-[30px] py-6 rounded-lg relative"
            style={{ boxShadow: "0px 0px 25px 0px rgba(0, 0, 0, 0.10)" }}
          >
            {/* onSubmit={handleSubmit(onSubmit)} */}

            <form>
              <h1 className="text-secondaryColor text-[24px] font-Noto-Sans-Bengali font-semibold text-center">
                এডিট কাস্টমার{" "}
              </h1>
              <div className="flex flex-col gap-4 mt-4">
                <div className="flex flex-col w-full">
                  <h1 className="text-switchColor lg:text-[18px] text-[14px] font-Poppins font-semibold">
                    কাস্টমারের নাম
                    <span className="text-primaryColor font-bold ">*</span>
                  </h1>

                  <input
                    defaultValue={customer?.customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className={` w-full h-[51px] rounded-[8px] border-[1px] 
                       border-secondaryColor bg-white text-secondaryColor  outline-0 px-5 md:text-[18px] text-[14px] font-Poppins font-normal `}
                    type="text"
                  />
                </div>

                <div className="flex flex-col w-full">
                  <h1 className="text-switchColor lg:text-[18px] text-[14px] font-Noto-Sans-Bengali font-semibold">
                    ফোন নাম্বার
                    <span className="text-primaryColor font-bold ">*</span>
                  </h1>

                  <input
                    defaultValue={customer?.phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className={` w-full h-[51px] rounded-[8px] border-[1px] 
                       border-secondaryColor text-secondaryColor  bg-white outline-0 px-5 md:text-[18px] text-[14px] font-Poppins font-normal `}
                    type="text"
                  />
                </div>

                {industry && (
                  <div className="flex flex-col w-full">
                    <h1 className="text-switchColor lg:text-[18px] text-[14px] font-Noto-Sans-Bengali font-semibold">
                      প্রতিষ্ঠান
                    </h1>

                    <input
                      defaultValue={customer?.industry}
                      onChange={(e) => setIndustryName(e.target.value)}
                      className={` w-full h-[51px] rounded-[8px] border-[1px] 
                       border-secondaryColor text-secondaryColor bg-white outline-0 px-5 md:text-[18px] text-[14px] font-Poppins font-normal `}
                      type="text"
                    />
                  </div>
                )}
                {!industry && (
                  <div className="flex flex-col w-full">
                    <h1 className="text-switchColor lg:text-[18px] text-[14px] font-Noto-Sans-Bengali font-semibold">
                      ঠিকানা
                    </h1>

                    <input
                      defaultValue={customer?.address}
                      onChange={(e) => setAddress(e.target.value)}
                      className={` w-full h-[51px] rounded-[8px] border-[1px] 
                       border-secondaryColor text-secondaryColor bg-white outline-0 px-5 md:text-[18px] text-[14px] font-Noto-Sans-Bengali font-normal `}
                      type="text"
                    />
                  </div>
                )}
              </div>
              <div
                onClick={handleSubmit}
                className="flex justify-center gap-4 mt-[30px]"
              >
                <button
                  type="button"
                  className="bg-primaryColor rounded-lg w-full h-[50px] text-white  font-medium flex justify-center items-center gap-2 font-Noto-Sans-Bengali"
                >
                  <FiSave className="size-6" />
                  <p>সেভ করুন</p>
                </button>
              </div>
            </form>

            <IoClose
              onClick={() => setIsOpenCustomer(false)}
              className="size-6 text-secondaryColor absolute top-4 right-4 cursor-pointer"
            />
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default CustomerEditModal;
