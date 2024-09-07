import Loader from "../../../components/Loader/Loader";
import { useGetCompanyLastOrderQuery } from "../../../redux/api/companyOrderApi";
import { useGetMeasurementsQuery } from "../../../redux/api/measurementApi";
import { useGetSettingDataQuery } from "../../../redux/api/settingApi";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import { useAppSelector } from "../../../redux/features/hooks";
import CreateIndustryOrder from "./CreateIndustryOrder";

const CreateIndustryOrderOrderBeforeLoading = () => {
  
  const currentData = useAppSelector(selectCurrentUser);
  const { data: orderID, isLoading: orderLoading } =
    useGetCompanyLastOrderQuery(currentData?.id);


  const { data: settingData, isLoading } = useGetSettingDataQuery(
    currentData?.id,
    {
      skip: !currentData?.id,
    }
  );

  const { data: measurementsData, isLoading: measurementsDataLoading } =
    useGetMeasurementsQuery(currentData?.id);


  if (isLoading || measurementsDataLoading || orderLoading) {
    return <Loader />;
  }


  return (
    <>
      <CreateIndustryOrder
        settingData={settingData?.data}
        measurementsData={measurementsData}
        admin={currentData?.id}
        orderID={orderID?.data}
      />
    </>
  );
};
export default CreateIndustryOrderOrderBeforeLoading;
