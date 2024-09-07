import question from "../../../assets/question.png";

const DashboardFooter = () => {
  return (
    <div className="">
        <div className="bg-transparent rounded-[6px] pl-[15px] flex items-center gap-[15px]">
          <img className="w-6 h-6" src={question} alt="question icon" />
          <h1 className="text-dashInAcColor 2xl:text-[18px] lg:text-[14px] font-medium font-Poppins leading-normal">
          Help and Support
          </h1>
        </div>
        <p className="text-dashInAcColor 2xl:text-[18px] lg:text-[14px] text-[12px] font-normal font-Poppins leading-normal 2xl:mt-[30px] lg:mt-[15px] pl-[15px]">
        Tailrofit | © {new Date().getFullYear()} All Rights Reserved.
        </p>
      </div>
  )
}

export default DashboardFooter