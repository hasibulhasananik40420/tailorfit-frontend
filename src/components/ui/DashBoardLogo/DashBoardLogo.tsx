import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import { useAppSelector } from "../../../redux/features/hooks";

const DashBoardLogo = () => {
  const user = useAppSelector(selectCurrentUser);
  return (
    <div className="flex items-center gap-[20px]">
      <div className="2xl:w-[60px] 2xl:h-[60px] w-[50px] h-[50px] rounded-[10px]  flex justify-center items-center bg-btn-hover">
        {user?.profile ? (
          
          <img
            src={user?.profile}
            alt="User Profile"
            className="2xl:w-[60px] 2xl:h-[60px] lg:w-[50px] lg:h-[50px] w-[50px] h-[50px] rounded-[10px] flex justify-center items-center cursor-pointer bg-white"
            style={{
              boxShadow: "0px 0px 25px rgba(25, 93, 142, 0.05)",
            }}
          />
        ) : (
          <span className=" flex justify-center items-center">
            <h1 className="text-white text-[24px] font-semibold font-Poppins">
              {" "}
              {user?.companyName?.slice(0, 1).toUpperCase()}
            </h1>
          </span>
        )}
      </div>
      <div className="whitespace-nowrap">
        <h1 className="text-white 2xl:text-[20px] lg:text-[18px] text-[14px] font-semibold font-Poppins lg:max-w-[150px] max-w-[100px] block overflow-hidden text-ellipsis">
          {user?.companyName}
        </h1>
      </div>
    </div>
  );
};

export default DashBoardLogo;
