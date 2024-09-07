/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react"
import MySubscription from "./MySubscription"
import SubscriptionPlan from "./SubscriptionPlan"
import PaymentDetails from "./PaymentDetails"
import { IoIosArrowDown } from "react-icons/io"






const SubscriptionPage = () => {
  const [mySubscriptionPlan, setMySubscriptionPlan] = useState(true)
  const [mySubscription, setmySubscription] = useState(false)
  const [paymentDetails, setPaymentDetails] = useState(false)
  const [active , setActive] = useState(false)


  //  for mobile
  // const [activeSection, setActiveSection] = useState(null);

  // const handleSectionClick = (section) => {
  //   setActiveSection(activeSection === section ? null : section);
  // };

  const [activeSection, setActiveSection] = useState(null);

  const handleSectionClick = (section:any) => {
    // Only update the active section if a different section is clicked
    if (activeSection !== section) {
      setActiveSection(section);
    }
  };


  const handleSubscriptionPlan = ()=>{
    setMySubscriptionPlan(true)
    setmySubscription(false)
    setPaymentDetails(false)
     setActive(!active)
 }




  const handleMySubscription = ()=>{
    setMySubscriptionPlan(false)
    setmySubscription(true)
    setPaymentDetails(false)
     setActive(!active)
 }


 
  const handlePaymentDetails = ()=>{
    setMySubscriptionPlan(false)
    setmySubscription(false)
    setPaymentDetails(true)
     setActive(!active)
 }


 







  return (
     <div>
      <div className="lg:block hidden">
        <div >
        <div className="flex items-center gap-[50px] border-b-[1px] border-b-bgBorderColor "> 

<div onClick={handleSubscriptionPlan} className={`${mySubscriptionPlan ? 'border-b-primaryColor border-b-2  text-primaryColor bg-transparent' :' text-secondaryColor'} pb-[15px] bg-transparent cursor-pointer group`}>
  <h2 className=" md:text-[18px] text-[14px] font-Poppins font-medium">Subscription Plan</h2>
</div>

 <div onClick={handleMySubscription} className={`${mySubscription ? 'border-b-primaryColor border-b-2  text-primaryColor bg-transparen' :'text-secondaryColor'} pb-[15px] bg-transparent cursor-pointer group`}>
  <h2 className="md:text-[18px] text-[14px] font-Poppins font-medium">My Subscription</h2>
</div>

   <div onClick={handlePaymentDetails} className={`${paymentDetails ? 'border-b-primaryColor border-b-2  text-primaryColor bg-transparen' :'text-secondaryColor'} pb-[15px] bg-transparent cursor-pointer group`}>
  <h2 className=" md:text-[18px] text-[14px] font-Poppins font-medium">Payment Details</h2>
</div>


 



</div>
        </div>


         


        <div className="w-[100%]">
                {mySubscriptionPlan && <SubscriptionPlan/>}
                {mySubscription && <MySubscription/>}
                {paymentDetails && <PaymentDetails/>}
            </div>
    </div>





     {/* for mobile  */}

       

      <div className="lg:hidden block min-h-[600px] pt-[30px]">
      <div className="flex flex-col gap-4 ">
      {/* Subscription Plan Section */}
      <div
        onClick={() => handleSectionClick('subscriptionPlan')}
        className={`cursor-pointer`}
      >
        <div className={`flex justify-between items-center ${activeSection === 'subscriptionPlan' ? 'text-primaryColor border-b-[1px] pb-4 border-b-[#f00c89]' : 'border-b-[1px] pb-4'}`}>
          <h2 className="text-[18px] font-Poppins font-medium">Subscription Plan</h2>
          <IoIosArrowDown className="size-6" />
        </div>
        {activeSection === 'subscriptionPlan' && (
          <div className="mt-4">
            <SubscriptionPlan />
          </div>
        )}
      </div>

      {/* My Subscription Section */}
      <div
        onClick={() => handleSectionClick('mySubscription')}
        className={`cursor-pointer`}
      >
        <div className={`flex justify-between items-center ${activeSection === 'mySubscription' ? 'text-primaryColor border-b-[#f00c89] border-b-[1px] pb-4 ' : 'border-b-[1px] pb-4 text-secondaryColor'}`}>
          <h2 className="text-[18px] font-Poppins font-medium">My Subscription</h2>
          <IoIosArrowDown className="size-6" />
        </div>
        {activeSection === 'mySubscription' && (
          <div className="mt-4">
            <MySubscription />
          </div>
        )}
      </div>

      {/* Payment Details Section */}
      <div
        onClick={() => handleSectionClick('paymentDetails')}
        className={`cursor-pointer `}
      >
        <div className={`flex justify-between items-center ${activeSection === 'paymentDetails' ? 'text-primaryColor border-b-[1px] pb-4 border-b-[#f00c89]' : 'border-b-[1px] pb-4 text-secondaryColor'}`}>
          <h2 className="text-[18px] font-Poppins font-medium">Payment Details</h2>
          <IoIosArrowDown className="size-6" />
        </div>
        {activeSection === 'paymentDetails' && (
          <div className="mt-4">
            <PaymentDetails />
          </div>
        )}
      </div>
    </div>
      </div>






     </div>
  )
}

export default SubscriptionPage
