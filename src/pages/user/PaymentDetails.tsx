import { HiOutlinePlus } from "react-icons/hi"
import bikas from '../../assets/bkash 1.svg'
import visa from '../../assets/visa-10 1.svg'
import { FiDownload } from "react-icons/fi"
import { Link } from "react-router-dom"
const PaymentDetails = () => {
  return (
    <div className="2xl:pt-[50px] lg:pt-[30px] pt-5">
        
         <div className="flex justify-between items-center w-full">
             <h1 className="text-secondaryColor md:text-[24px] text-[16px] font-Poppins font-semibold">Payment Method (02)</h1>

              <button className="md:px-6 px-2 md:py-3 py-2 bg-primaryColor rounded-md flex justify-center items-center gap-2 text-white md:text-[18px] text-[14px] font-Poppins font-medium leading-6">
              <HiOutlinePlus className="size-6" />
               Payment Method
              </button>
         </div>

           <div className="lg:flex items-center gap-4 w-[100%] 2xl:mt-[30px] lg:mt-6 mt-5">
            
             <div className="w-full 2xl:p-[30px] md:p-5 p-4 bg-white rounded-[10px]" style={{boxShadow:'0px 0px 25px 0px rgba(22, 22, 22, 0.03)'}}>

                <div className="md:flex items-center justify-between">
                <div className="flex items-center 2xl:gap-[30px] gap-5">
                <div className="px-4 2xl:h-[68px] lg:h-[50px] md:h-[50px] h-10 rounded-[8px] border-[1px] flex justify-center items-center cursor-pointer">
                  <img className=" 2xl:w-[90px] lg:w-[70px] w-[70px]" src={visa} alt="" />
                
                 </div>

                  <div className="mt-3 lg:mt-0">
                     <p className="text-secondaryColor 2xl:text-[20px] lg:text-[16px] text-[14px] font-Poppins font-medium">Visa ending in 7830</p>
                     <p className="text-switchColor 2xl:text-[18px] lg:text-[14] text-[14px] font-Poppins font-medium">Ex. date 06/25</p>
                  </div>
                </div>

                   <div className="flex items-center justify-between gap-5 mt-3 lg:mt-0">
                   <button className="px-4 py-2 bg-primaryColor rounded-md text-white text-[18px] font-Poppins font-medium leading-6">
                   Default
                   </button>
                   <svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
  <path d="M17.1967 10.4996L16.793 20.9996M11.207 20.9996L10.8033 10.4996M22.4327 6.75463C22.8317 6.8153 23.2283 6.87946 23.625 6.9483M22.4327 6.75463L21.1867 22.9515C21.1358 23.6109 20.8379 24.2268 20.3525 24.6761C19.8671 25.1253 19.2301 25.3748 18.5687 25.3746H9.43133C8.76995 25.3748 8.13286 25.1253 7.64748 24.6761C7.16209 24.2268 6.86419 23.6109 6.81333 22.9515L5.56733 6.75463M22.4327 6.75463C21.0862 6.55107 19.7327 6.39658 18.375 6.29146M5.56733 6.75463C5.16833 6.81413 4.77167 6.8783 4.375 6.94713M5.56733 6.75463C6.91382 6.55107 8.26727 6.39658 9.625 6.29146M18.375 6.29146V5.2228C18.375 3.84613 17.3133 2.69813 15.9367 2.65496C14.6459 2.61371 13.3541 2.61371 12.0633 2.65496C10.6867 2.69813 9.625 3.8473 9.625 5.2228V6.29146M18.375 6.29146C15.4627 6.06639 12.5373 6.06639 9.625 6.29146" stroke="black" stroke-opacity="0.6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                   </svg>
                   </div>
                </div>

             </div>


             <div className="w-full 2xl:p-[30px] md:p-5 p-4 bg-white rounded-[10px] mt-5 lg:mt-0" style={{boxShadow:'0px 0px 25px 0px rgba(22, 22, 22, 0.03)'}}>

                <div className="md:flex items-center justify-between">
                <div className="flex items-center 2xl:gap-[30px] gap-5">
                <div className="px-4 2xl:h-[68px] lg:h-[50px] md:h-[50px] h-10 rounded-[8px] border-[1px] flex justify-center items-center cursor-pointer">
                  <img className=" 2xl:w-[90px] lg:w-[70px] w-[70px]" src={bikas} alt="" />
                
                 </div>

                  <div className="mt-3 lg:mt-0">
                     <p className="text-secondaryColor 2xl:text-[20px] lg:text-[16px] text-[14px] font-Poppins font-medium">bKash ending in 7830</p>
                     <p className="text-switchColor 2xl:text-[18px] lg:text-[14] text-[14px] font-Poppins font-medium">Ex. date 06/25</p>
                  </div>
                </div>

                   <div className="flex items-center justify-between gap-5 mt-3 lg:mt-0">
                   <button className=" text-primaryColor 2xl:text-[18px] text-[16px] font-Poppins font-medium leading-6">
                   Set as Default
                   </button>
                   <svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
  <path d="M17.1967 10.4996L16.793 20.9996M11.207 20.9996L10.8033 10.4996M22.4327 6.75463C22.8317 6.8153 23.2283 6.87946 23.625 6.9483M22.4327 6.75463L21.1867 22.9515C21.1358 23.6109 20.8379 24.2268 20.3525 24.6761C19.8671 25.1253 19.2301 25.3748 18.5687 25.3746H9.43133C8.76995 25.3748 8.13286 25.1253 7.64748 24.6761C7.16209 24.2268 6.86419 23.6109 6.81333 22.9515L5.56733 6.75463M22.4327 6.75463C21.0862 6.55107 19.7327 6.39658 18.375 6.29146M5.56733 6.75463C5.16833 6.81413 4.77167 6.8783 4.375 6.94713M5.56733 6.75463C6.91382 6.55107 8.26727 6.39658 9.625 6.29146M18.375 6.29146V5.2228C18.375 3.84613 17.3133 2.69813 15.9367 2.65496C14.6459 2.61371 13.3541 2.61371 12.0633 2.65496C10.6867 2.69813 9.625 3.8473 9.625 5.2228V6.29146M18.375 6.29146C15.4627 6.06639 12.5373 6.06639 9.625 6.29146" stroke="black" stroke-opacity="0.6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                   </svg>
                   </div>
                </div>

             </div>

            





            












          </div>


          <div className="flex justify-between items-center w-full lg:pt-[30px] pt-5">
             <h1 className="text-secondaryColor md:text-[24px] text-[16px] font-Poppins font-semibold">Payment History (08)</h1>

              <button className="md:px-6 px-2 md:py-3 py-2 bg-primaryColor rounded-md flex justify-center items-center gap-2 text-white md:text-[18px] text-[14px] font-Poppins font-medium leading-6">
              <FiDownload className="size-6" />
              Download All
              </button>
         </div>


          <div className="lg:mt-[30px] mt-5 relative w-full rounded-[10px] border-[1px] border-borderColor  lg:overflow-y-auto overflow-x-auto min-h-[590px]">
          <table className="w-[100%] text-left font-Poppins">
            <thead className=" bg-[#F6F6F6] 2xl:text-[18px] 2mid75:text-[16px] 2large:text-[16px] lg:text-[14px]  2makbook:text-[10px] text-[14px] text-[#555] font-Noto-Sans-Bengali font-normal ">
              <tr>
                <th scope="col" className="2xl:px-6 2xl:py-3 px-3 py-2">
                Payment Invoice
                </th>
                <th scope="col" className="2xl:px-6 2xl:py-3 px-3 py-2">
                Package Plan
                </th>
                <th scope="col" className="2xl:px-6 2xl:py-3 px-3 py-2">
                Amount
                </th>
                <th scope="col" className="2xl:px-6 2xl:py-3 px-3 py-2">
                Date
                </th> 

                <th scope="col" className="2xl:px-6 2xl:py-3 px-3 py-2">
                Status
                </th>

               

                <th scope="col" className="2xl:px-6 2xl:py-3 px-3 py-2">
                
                </th>

                
              </tr>
            </thead>
               <tbody className="bg-white w-[100%]">
              
                    <tr className="bg-white border-b border-dashed">
                    <th
                        scope="row"
                        className="2xl:px-6 2xl:py-3 px-3 py-2 font-Poppins font-medium text-[#353535] 2xl:text-[18px] 2mid75:text-[16px] 2large:text-[16px] lg:text-[14px] 2makbook:text-[10px] text-[14px]"
                      >
                        {/* <Link to={`/admin/order-details/${order._id}`}> */}
                          #TF09374989382
                        {/* </Link> */}
                      </th>

                      <th
                        scope="row"
                        className="2xl:px-6 2xl:py-3 px-3 py-2 font-Poppins font-medium text-[#353535] 2xl:text-[18px] 2mid75:text-[16px] 2large:text-[16px] lg:text-[14px] 2makbook:text-[10px] text-[14px]"
                      >
                        <Link to="/admin/order-details">
                         Silver
                        </Link>
                      </th>
                      <th
                        scope="row"
                        className="2xl:px-6 2xl:py-3 px-3 py-2 font-Poppins font-medium text-secondaryColor 2xl:text-[18px] 2mid75:text-[16px] 2large:text-[16px] lg:text-[14px]  2makbook:text-[10px] text-[14px]  "
                      >
                        <Link
                          to="/admin/order-details"
                          className="block overflow-hidden text-ellipsis"
                        >
                          $350.00
                        </Link>
                      </th>
                      <th
                        scope="row"
                        className="2xl:px-6 2xl:py-3 px-3 py-2 font-Poppins font-normal text-secondaryColor whitespace-nowrap 2xl:text-[18px] 2large:text-[16px] lg:text-[14px] 2mid75:text-[16px] 2makbook:text-[10px] text-[14px]"
                      >
                        24 May, 2024
                      </th>
                      <th
                        scope="row"
                        className="2xl:px-6 2xl:py-3 px-3 py-2 font-Poppins font-normal text-secondaryColor whitespace-nowrap 2xl:text-[18px] 2large:text-[16px] lg:text-[14px] 2mid75:text-[16px] 2makbook:text-[10px] text-[14px] flex items-center gap-2"
                      >
                        <p className="bg-[#F17098] w-[10px] h-[10px] rounded-full"></p>
                        <p>Pending</p>
                      </th>

                      


                       <th
                        scope="row"
                        className="2xl:px-6 2xl:py-3 px-3 py-2 font-Poppins font-normal text-primaryColor whitespace-nowrap 2xl:text-[18px] 2large:text-[16px] lg:text-[14px] 2mid75:text-[16px] 2makbook:text-[10px] text-[14px]"
                      >
                         <div className="flex items-center gap-2">
                         <FiDownload className="cursor-pointer size-6"/>
                          Download
                         </div>
                      </th>
                     
              
                     
                     
              
                    

                     
                    </tr>  <tr className="bg-white border-b border-dashed">
                    <th
                        scope="row"
                        className="2xl:px-6 2xl:py-3 px-3 py-2 font-Poppins font-medium text-[#353535] 2xl:text-[18px] 2mid75:text-[16px] 2large:text-[16px] lg:text-[14px] 2makbook:text-[10px] text-[14px]"
                      >
                        <Link to="/admin/order-details">
                          #TF09374989382
                        </Link>
                      </th>

                      <th
                        scope="row"
                        className="2xl:px-6 2xl:py-3 px-3 py-2 font-Poppins font-medium text-[#353535] 2xl:text-[18px] 2mid75:text-[16px] 2large:text-[16px] lg:text-[14px] 2makbook:text-[10px] text-[14px]"
                      >
                        <Link to="/admin/order-details">
                         Silver
                        </Link>
                      </th>
                      <th
                        scope="row"
                        className="2xl:px-6 2xl:py-3 px-3 py-2 font-Poppins font-medium text-secondaryColor 2xl:text-[18px] 2mid75:text-[16px] 2large:text-[16px] lg:text-[14px]  2makbook:text-[10px] text-[14px]  "
                      >
                        <Link
                          to="/admin/order-details"
                          className="block overflow-hidden text-ellipsis"
                        >
                          $350.00
                        </Link>
                      </th>
                      <th
                        scope="row"
                        className="2xl:px-6 2xl:py-3 px-3 py-2 font-Poppins font-normal text-secondaryColor whitespace-nowrap 2xl:text-[18px] 2large:text-[16px] lg:text-[14px] 2mid75:text-[16px] 2makbook:text-[10px] text-[14px]"
                      >
                        24 May, 2024
                      </th>
                      <th
                        scope="row"
                        className="2xl:px-6 2xl:py-3 px-3 py-2 font-Poppins font-normal text-secondaryColor whitespace-nowrap 2xl:text-[18px] 2large:text-[16px] lg:text-[14px] 2mid75:text-[16px] 2makbook:text-[10px] text-[14px] flex items-center gap-2"
                      >
                        <p className="bg-[#2BC8A2] w-[10px] h-[10px] rounded-full"></p>
                        <p>Paid</p>
                      </th>

                     
                     
              
                     <th
                        scope="row"
                        className="2xl:px-6 2xl:py-3 px-3 py-2 font-Poppins font-normal text-primaryColor whitespace-nowrap 2xl:text-[18px] 2large:text-[16px] lg:text-[14px] 2mid75:text-[16px] 2makbook:text-[10px] text-[14px]"
                      >
                         <div className="flex items-center gap-2">
                         <FiDownload className="cursor-pointer size-6"/>
                          Download
                         </div>
                      </th>
                     
              
                    

                     
                    </tr>
              
               
            </tbody>
          </table>
          </div>





        
        </div>
  )
}

export default PaymentDetails