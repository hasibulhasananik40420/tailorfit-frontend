/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  TDropDownStyle,
  TIndividualOrder,
  TIndividualOrderItem,
  TStyle,
} from "../redux/api/individualOrderApi";
import DatePicker from "react-datepicker";
import { useAppSelector } from "../redux/features/hooks";
import { selectCurrentUser, TUser } from "../redux/features/auth/authSlice";

const PDFGenerator = ({
  singleOrder,
  componentRef,
}: {
  singleOrder: TIndividualOrder;
  componentRef: any;
}) => {
  const user: TUser | null = useAppSelector(selectCurrentUser);

  const from = {
    item: singleOrder.item
      ? singleOrder?.item?.map((item: TIndividualOrderItem) => ({
          category: item?.category || "",
          image: item?.image,
          measurement:
            item?.measurement && item?.measurement?.length
              ? item?.measurement
              : [],
          lugeSize:
            item?.lugeSize && item?.lugeSize?.length ? item?.lugeSize : [],
          style: item?.style && item?.style?.length ? item?.style : [],
          dropDownStyle: item?.dropDownStyle?.length ? item?.dropDownStyle : [],
          quantity: item?.quantity || 1,
          note: item?.note || "",
        }))
      : [],
  };

  return (
    <>
      <div className="hidden">
        <div ref={componentRef} className="font-Noto-Sans-Bengali">
          {from.item.map((form: TIndividualOrderItem, fromIndex: number) => (
            <div
              key={fromIndex}
              className=" w-[537.6px] mx-auto bg-white p-6 h-[99vh] relative"
            >
              <div className="flex flex-col justify-between max-h-[92vh] ">
                <div>
                  <div className="text-center mb-6 relative">
                    <strong className="absolute top-0 text-[10px] left-1/2 transform -translate-x-1/2 bg-black text-white py-1 rounded-full px-8">
                      কারিগর কপি
                    </strong>
                  </div>
                  <div className="mt-10 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="2xl:w-[50px] 2xl:h-[50px] w-[40px]    h-[40px] rounded-[10px]  flex justify-center items-center ">
                        {user?.profile ? (
                          <img
                            src={user?.profile}
                            alt="User Profile"
                            className="2xl:w-[50px] 2xl:h-[50px] w-[40px]    h-[40px] rounded-[10px] flex justify-center items-center cursor-pointer bg-white"
                            style={{
                              boxShadow: "0px 0px 25px rgba(25, 93, 142, 0.05)",
                            }}
                          />
                        ) : (
                          <span className=" flex justify-center items-center">
                            <h1 className="uppercase bg-black text-white text-[24px] font-semibold  2xl:w-[50px] 2xl:h-[50px] w-[40px]    h-[40px] rounded-[10px] flex justify-center items-center cursor-pointer ">
                              {" "}
                              {user?.companyName?.slice(0, 1).toUpperCase()}
                            </h1>
                          </span>
                        )}
                      </div>
                      <h1 className="text-[14px] font-Noto-Sans-Bengali font-bold text-start text-black capitalize ">
                        {user?.companyName}
                      </h1>
                    </div>
                    <div>
                      <p className="text-sm text-end capitalize text-[10px] font-Noto-Sans-Bengali font-[500] text-black">
                        {user?.address}
                      </p>
                      <p className="text-sm text-end  text-[10px] font-Noto-Sans-Bengali font-[500] text-black">
                        {user?.phonePrimary}, {user?.phoneSecondary}
                      </p>
                    </div>
                  </div>
                  <div className="border-b my-2"></div>

                  {/* Order Information */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm">
                      <div className="flex gap-4 capitalize text-[14px] font-Noto-Sans-Bengali font-[500] text-black">
                        <p className="">
                          <strong>
                            অর্ডার নাম্বার: #{singleOrder?.orderId}
                          </strong>
                        </p>
                        {singleOrder?.urgentOrder && (
                          <strong className="text-[10px] font-Noto-Sans-Bengali font-[500]">
                            আরজেন্ট
                          </strong>
                        )}
                      </div>
                      <span className="text-[10px] font-Noto-Sans-Bengali font-[500] text-black">
                        ক্যাটাগরি :{" "}
                        <strong>
                          {form?.category ? form?.category : "___________"}
                        </strong>
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <div className="flex text-[10px] font-Noto-Sans-Bengali font-[500] text-black">
                        <span className="w-20 ">ট্রায়াল ডেট:</span>
                        <DatePicker
                          readOnly
                          selected={
                            singleOrder?.tryerDate
                              ? new Date(singleOrder.tryerDate)
                              : null
                          }
                          dateFormat="dd-MMM-yyyy" // Format: 24-May-2024
                          className="border-0 outline-none max-w-24 bg-white"
                          calendarClassName="custom-calendar-class"
                        />
                      </div>
                      <span className="text-[10px] font-Noto-Sans-Bengali font-[500] text-black">
                        সংখ্যা : <strong>{form?.quantity}</strong>
                      </span>
                    </div>

                    <div className="flex text-[10px] font-Noto-Sans-Bengali font-[500] text-black">
                      <span className="w-20 ">ডেলিভারি ডেট:</span>
                      <DatePicker
                        readOnly
                        selected={
                          singleOrder?.workerDeliveryDate
                            ? new Date(singleOrder.workerDeliveryDate)
                            : null
                        }
                        dateFormat="dd-MMM-yyyy" // Format: 24-May-2024
                        className="border-0 outline-none max-w-24 bg-white"
                        calendarClassName="custom-calendar-class"
                      />
                    </div>
                  </div>
                  <div className=" bg-[#F9FAFE]  ">
                    {/* part 1 */}
                    <div className="bg-white w-full rounded-l-[10px]">
                      {/* <h2 className="text-[10px] font-Noto-Sans-Bengali text-black font-bold mb-2 ">
                        পরিমাপ:
                      </h2> */}

                      <div className="flex flex-wrap  ">
                        <>
                          {form?.measurement.length >= 1 &&
                            form?.measurement?.map(
                              (
                                measurementItem: {
                                  label: any;
                                  text: any;
                                },
                                measurementIdex: number
                              ) => {
                                return (
                                  <div
                                    key={measurementIdex}
                                    className="flex flex-col"
                                  >
                                    {/* <span>
                                        {measurementItem.label} :{" "} */}
                                    <strong className="text-[14px] font-Noto-Sans-Bengali text-black font-bold mb-2">
                                      {measurementItem.text
                                        ? measurementItem.text
                                        : "___"}{" "}
                                      {measurementIdex <
                                        form?.measurement.length - 1 && (
                                        <span className="p-2">-</span>
                                      )}
                                    </strong>
                                    {/* </span> */}
                                  </div>
                                );
                              }
                            )}
                        </>
                      </div>

                      {form?.lugeSize.length >= 1 && (
                        <div className="mt-10 flex items-center gap-2">
                          <h2 className=" text-[10px] font-Noto-Sans-Bengali text-black font-bold mb-2">
                            লুজের মাপ:
                          </h2>

                          <div className="flex flex-wrap  ">
                            <>
                              {form?.lugeSize?.map(
                                (
                                  measurementItem: {
                                    label: any;
                                    text: any;
                                  },
                                  measurementIdex: number
                                ) => {
                                  return (
                                    <div
                                      key={measurementIdex}
                                      className="flex flex-col"
                                    >
                                      <span className="text-black 2xl:text-[18px] lg:text-[16px] text-[14px]  font-medium"></span>
                                      {/* <span>
                                          {measurementItem.label} :{" "} */}
                                      <span className="text-[14px] font-Noto-Sans-Bengali text-black font-bold mb-2">
                                        {measurementItem.text
                                          ? measurementItem.text
                                          : "___"}{" "}
                                        {measurementIdex <
                                          form?.lugeSize.length - 1 && (
                                          <span className="p-2">-</span>
                                        )}
                                      </span>
                                      {/* </span> */}
                                    </div>
                                  );
                                }
                              )}
                            </>
                          </div>
                        </div>
                      )}

                      <div className="flex justify-between mt-8">
                        <div className="w-1/2">
                          <h2 className="text-[10px] font-Noto-Sans-Bengali text-black font-bold mb-2">
                            স্টাইল:
                          </h2>
                          <ul className="text-sm grid grid-cols-2 list-disc list-inside">
                            {form?.style?.map((styleItem: TStyle) => {
                              return (
                                styleItem.isActive === true && (
                                  <li className="w-[260px] py-[1px] block">
                                    #{" "}
                                    <strong className="text-[9px] font-Noto-Sans-Bengali text-black font-bold mb-1">
                                      {" "}
                                      {styleItem.text}
                                    </strong>
                                  </li>
                                )
                              );
                            })}

                            {form?.dropDownStyle?.map(
                              (
                                dropDownStyle: TDropDownStyle,
                                dropDownIndex: number
                              ) => {
                                return (
                                  <div key={dropDownIndex}>
                                    <div className=" ">
                                      {dropDownStyle?.item.find(
                                        (item) => item.isActive
                                      )?.label && (
                                        <li className="w-[260px]  gap-4  block">
                                          #{" "}
                                          <strong className="text-[9px] font-Noto-Sans-Bengali text-black font-bold mb-1">
                                            {
                                              dropDownStyle?.item.find(
                                                (item) => item.isActive
                                              )?.label
                                            }
                                          </strong>
                                        </li>
                                      )}
                                    </div>
                                  </div>
                                );
                              }
                            )}
                          </ul>
                        </div>

                        {form?.image && (
                          <div className="relative w-1/2 bg-white">
                            <img
                              className="bg-white"
                              src={form?.image as string}
                              alt=""
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-8 mb-4 w-[500.38px]">
                  <p className="text-[9px] font-Noto-Sans-Bengali text-black font-bold mb-1 ">
                    নোট: <span>{form.note}</span>
                  </p>
                  <p className="mt-2 border-b border-dashed border-black relative my-4 pt-4">
                    <span className="absolute text-[#00000080] text-[13.174px] font-Noto-Sans-Bengali  translate-x-1/2 right-1/2 mt-[2px] -translate-y-1/2">
                      {user?.companyName?.split("").join(" ")}
                    </span>
                  </p>

                  <div className="flex justify-between items-center text-sm">
                    <div className="flex gap-4 items-center">
                      <p className="text-[9px] font-Noto-Sans-Bengali text-black">
                        অর্ডার নম্বর : <span>#{singleOrder?.orderId}</span>
                      </p>
                      <div className="border-r  h-3"></div>
                      <p className="text-[9px] font-Noto-Sans-Bengali text-black">
                        সংখ্যা : <strong>{form?.quantity}</strong>
                      </p>
                    </div>

                    <p className=" text-[9px] font-Noto-Sans-Bengali text-black mt-4 pr-10">
                      কর্তৃপক্ষের স্বাক্ষর
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px] font-Noto-Sans-Bengali text-black">
                      ক্যাটাগরি :
                      <span>
                        {form?.category ? form?.category : "___________"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default PDFGenerator;
