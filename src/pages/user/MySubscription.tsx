import { Link } from "react-router-dom"
import boxIcon from "../../assets/box.png";
import flashIcon from "../../assets/flash.svg";
import { useState } from "react";
import { Switch } from "@headlessui/react";


const MySubscription = () => {
    const [enabled, setEnabled] = useState(true);

  return (
    <div className="2xl:pt-[50px] lg:pt-[30px] pt-5 flex flex-col gap-[15px]">

        <div className="w-[100%] bg-white rounded-[10px] 2xl:p-[30px] lg:p-5 md:p-5 p-4" style={{boxShadow:'0px 0px 25px 0px rgba(22, 22, 22, 0.03)'}}>

         <div className="lg:flex lg:justify-between lg:items-center">
            
            {/* part 1 */}
             <div>
                <h3 className="text-secondaryColor 2xl:text-[18px] lg:text-[16px] md:text-[18px] text-[14px] font-Noto-Sans-Bengali font-semibold">কারেন্ট প্লান</h3>

                 <div className="flex items-center gap-[15px] mt-[15px]">
                 <svg xmlns="http://www.w3.org/2000/svg" width="30" height="24" viewBox="0 0 30 24" fill="none">
               <path d="M2.81641 18.2715L3.44797 21.1591C3.80826 22.8049 5.33435 23.9997 7.07728 23.9997H22.9208C24.6638 23.9997 26.1899 22.8049 26.5501 21.1591L27.1816 18.2715H2.81641Z" fill="#333333"/>
                 <path d="M28.9189 3.2823C28.0926 2.7735 27.052 2.81244 26.2674 3.3803L21.5416 6.7995C21.3454 6.94179 21.1061 6.99415 20.8655 6.94717C20.6248 6.90018 20.4245 6.76191 20.3021 6.55786L17.0121 1.11557C16.5905 0.416145 15.8379 0 14.9991 0C14.1603 0 13.4076 0.417485 12.9862 1.11557L9.69614 6.55786C9.57232 6.76191 9.372 6.90018 9.13274 6.94717C8.89208 6.99549 8.65279 6.9418 8.45667 6.80084L3.73083 3.3803C2.94763 2.8138 1.90706 2.77621 1.07934 3.28365C0.253017 3.79244 -0.150407 4.71872 0.051305 5.64501L2.50247 16.8423H27.497L29.9482 5.64501C30.1513 4.71872 29.7465 3.79244 28.9202 3.28365L28.9189 3.2823Z" fill="#333333"/>
                   </svg>

                    <h2 className="text-secondaryColor md:text-[24px] text-[18px] font-Poppins font-medium">Standard</h2>

                     <Link to={'#'} className="text-primaryColor 2xl:text-[18px] lg:text-[16px] md:text-[18px] text-[14px] font-medium underline">
                     প্লান চেঞ্জ করুন
                     </Link>

                 </div>

                 <p className="mt-[13px] text-[#555] 2xl:text-[18px] lg:text-[16px] md:text-[18px] text-[14px] font-Noto-Sans-Bengali font-normal">1 year</p>

                  <p className="mt-[8px] text-[#555] 2xl:text-[18px] lg:text-[16px] md:text-[18px] text-[14px] font-Noto-Sans-Bengali font-normal">TrxID: AzywryUKI9g119qGQ</p>
                  
             </div>

             {/* part 2 */}

             <div className="md:flex items-center 2xl:gap-[88px] md:gap-[30px] mt-4 lg:mt-0 2xl:mt-0">
             <div className="flex items-center gap-2">
             <Switch checked={enabled}
            onChange={setEnabled}
            className="group relative flex h-7 w-[60px] cursor-pointer rounded-full bg-switchColor pt-[4px] pl-[2px] transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-8 data-[focus]:outline-white data-[checked]:bg-[#34C759]"
         >
            <span
              aria-hidden="true"
              className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-[35px]"
           />
            </Switch>

                <h2 className="text-secondaryColor 2xl:text-[18px] lg:text-[16px] md:text-[18px]  text-[14px] font-Poppins font-medium">Auto-renewal off</h2>
              </div>

               <div className="mt-4 lg:mt-0 2xl:mt-0">
                 <h1 className="text-switchColor 2xl:text-[18px] lg:text-[16px] md:text-[18px] text-[14px] font-Poppins font-normal">Expiration date</h1> 
                 <h1 className="text-secondaryColor 2xl:text-[18px] lg:text-[16px] md:text-[18px] text-[14px] font-Poppins font-medium">24 May, 2024</h1>
               </div>
               
                <div className="mt-4 lg:mt-0 2xl:mt-0">
                 <h1 className="text-switchColor 2xl:text-[18px] lg:text-[16px] md:text-[18px] text-[14px] font-Poppins font-normal">Renewal price</h1> 
                 <h1 className="text-secondaryColor 2xl:text-[18px] lg:text-[16px] md:text-[18px] text-[14px] font-Poppins font-medium">$120.00</h1>
               </div>

                



             </div>


                {/* part 3 */}

                 <div className="mt-4 lg:mt-0 2xl:mt-0">
                    <h2 className="text-primaryColor 2xl:text-[18px] lg:text-[16px] md:text-[18px] text-[14px] font-Poppins font-medium">Pause subscription</h2>
                 </div>
              

         </div>

        </div>



        <div className="w-[100%] bg-white rounded-[10px] 2xl:p-[30px] lg:p-5 md:p-5 p-4" style={{boxShadow:'0px 0px 25px 0px rgba(22, 22, 22, 0.03)'}}>

          <div className="lg:flex lg:justify-between lg:items-center">
            
            {/* part 1 */}
             <div>
                <h3 className="text-secondaryColor 2xl:text-[18px] lg:text-[16px] md:text-[18px] text-[14px] font-Noto-Sans-Bengali font-semibold">পূর্ববর্তী প্লান</h3>

                 <div className="flex items-center gap-[15px] mt-[15px]">
                  <img src={boxIcon} alt="" />

                    <h2 className="text-secondaryColor md:text-[24px] text-[18px] font-Poppins font-medium">Silver</h2>

                     {/* <Link to={'#'} className="text-primaryColor 2xl:text-[18px] lg:text-[16px] md:text-[18px] text-[14px] font-medium underline">
                     প্লান চেঞ্জ করুন
                     </Link> */}

                 </div>

                 <p className="mt-[13px] text-[#555] 2xl:text-[18px] lg:text-[16px] md:text-[18px] text-[14px] font-Noto-Sans-Bengali font-normal">1 year</p>

                  <p className="mt-[8px] text-[#555] 2xl:text-[18px] lg:text-[16px] md:text-[18px] text-[14px] font-Noto-Sans-Bengali font-normal">TrxID: AzywryUKI9g119qGQ</p>
                  
             </div>

             {/* part 2 */}

             <div className="md:flex items-center 2xl:gap-[88px] md:gap-[30px] mt-4 lg:mt-0 2xl:mt-0">
             <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
               <path d="M16.0234 9.34745H21.0154L17.8344 6.16445C16.8103 5.14032 15.5346 4.40385 14.1356 4.02906C12.7366 3.65427 11.2636 3.65438 9.86464 4.02937C8.4657 4.40437 7.19014 5.14104 6.16617 6.16532C5.14221 7.1896 4.40594 8.4654 4.03138 9.86445M2.98537 19.6435V14.6515M2.98537 14.6515H7.97738M2.98537 14.6515L6.16537 17.8345C7.18949 18.8586 8.46517 19.5951 9.86416 19.9698C11.2632 20.3446 12.7362 20.3445 14.1351 19.9695C15.534 19.5945 16.8096 18.8579 17.8336 17.8336C18.8575 16.8093 19.5938 15.5335 19.9684 14.1345M21.0154 4.35545V9.34545" stroke="#F00C89" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
               </svg>

                <h2 className="text-secondaryColor 2xl:text-[18px] lg:text-[16px] md:text-[18px]  text-[14px] font-Poppins font-medium">Auto-renewal off</h2>
              </div>

               <div className="mt-4 lg:mt-0 2xl:mt-0">
                 <h1 className="text-switchColor 2xl:text-[18px] lg:text-[16px] md:text-[18px] text-[14px] font-Poppins font-normal">Expiration date</h1> 
                 <h1 className="text-secondaryColor 2xl:text-[18px] lg:text-[16px] md:text-[18px] text-[14px] font-Poppins font-medium">24 May, 2024</h1>
               </div>
               
                <div className="mt-4 lg:mt-0 2xl:mt-0">
                 <h1 className="text-switchColor 2xl:text-[18px] lg:text-[16px] md:text-[18px] text-[14px] font-Poppins font-normal">Renewal price</h1> 
                 <h1 className="text-secondaryColor 2xl:text-[18px] lg:text-[16px] md:text-[18px] text-[14px] font-Poppins font-medium">$120.00</h1>
               </div>

                



             </div>


                {/* part 3 */}

                 <div className="mt-4 lg:mt-0 2xl:mt-0">
                    <h2 className="text-primaryColor 2xl:text-[18px] lg:text-[16px] md:text-[18px] text-[14px] font-Poppins font-medium">Renew now</h2>
                 </div>
              

         </div>

        </div>


         <div className="w-[100%] bg-white rounded-[10px] 2xl:p-[30px] lg:p-5 md:p-5 p-4" style={{boxShadow:'0px 0px 25px 0px rgba(22, 22, 22, 0.03)'}}>

          <div className="lg:flex lg:justify-between lg:items-center">
            
            {/* part 1 */}
             <div>
                <h3 className="text-secondaryColor 2xl:text-[18px] lg:text-[16px] md:text-[18px] text-[14px] font-Noto-Sans-Bengali font-semibold">পূর্ববর্তী প্লান</h3>

                 <div className="flex items-center gap-[15px] mt-[15px]">
                 <img src={flashIcon} alt="" />

                    <h2 className="text-secondaryColor md:text-[24px] text-[18px] font-Poppins font-medium">Gold</h2>

                     {/* <Link to={'#'} className="text-primaryColor 2xl:text-[18px] lg:text-[16px] md:text-[18px] text-[14px] font-medium underline">
                     প্লান চেঞ্জ করুন
                     </Link> */}

                 </div>

                 <p className="mt-[13px] text-[#555] 2xl:text-[18px] lg:text-[16px] md:text-[18px] text-[14px] font-Noto-Sans-Bengali font-normal">1 year</p>

                  <p className="mt-[8px] text-[#555] 2xl:text-[18px] lg:text-[16px] md:text-[18px] text-[14px] font-Noto-Sans-Bengali font-normal">TrxID: AzywryUKI9g119qGQ</p>
                  
             </div>

             {/* part 2 */}

             <div className="md:flex items-center 2xl:gap-[88px] md:gap-[30px] mt-4 lg:mt-0 2xl:mt-0">
             <div className="flex items-center gap-2">
             
             <Switch checked={enabled}
            onChange={setEnabled}
            className="group relative flex h-7 w-[60px] cursor-pointer rounded-full bg-switchColor pt-[4px] pl-[2px] transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-8 data-[focus]:outline-white data-[checked]:bg-[#34C759]"
         >
            <span
              aria-hidden="true"
              className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-[35px]"
           />
            </Switch>

                <h2 className="text-secondaryColor 2xl:text-[18px] lg:text-[16px] md:text-[18px]  text-[14px] font-Poppins font-medium">Auto-renewal off</h2>
              </div>

               <div className="mt-4 lg:mt-0 2xl:mt-0">
                 <h1 className="text-switchColor 2xl:text-[18px] lg:text-[16px] md:text-[18px] text-[14px] font-Poppins font-normal">Expiration date</h1> 
                 <h1 className="text-secondaryColor 2xl:text-[18px] lg:text-[16px] md:text-[18px] text-[14px] font-Poppins font-medium">24 May, 2024</h1>
               </div>
               
                <div className="mt-4 lg:mt-0 2xl:mt-0">
                 <h1 className="text-switchColor 2xl:text-[18px] lg:text-[16px] md:text-[18px] text-[14px] font-Poppins font-normal">Renewal price</h1> 
                 <h1 className="text-secondaryColor 2xl:text-[18px] lg:text-[16px] md:text-[18px] text-[14px] font-Poppins font-medium">$120.00</h1>
               </div>

                



             </div>


                {/* part 3 */}

                 <div className="mt-4 lg:mt-0 2xl:mt-0">
                    <h2 className="text-primaryColor 2xl:text-[18px] lg:text-[16px] md:text-[18px] text-[14px] font-Poppins font-medium">Renew now</h2>
                 </div>
              

         </div>

        </div>










        
    </div>
  )
}

export default MySubscription