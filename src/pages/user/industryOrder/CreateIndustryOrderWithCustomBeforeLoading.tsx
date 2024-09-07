import { useParams } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
import { useGetMeasurementsQuery } from "../../../redux/api/measurementApi";
import { useGetSettingDataQuery } from "../../../redux/api/settingApi";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import { useAppSelector } from "../../../redux/features/hooks";
import { useGetCompanyLastOrderQuery, useGetCompanyOrderQuery } from "../../../redux/api/companyOrderApi";
import CreateIndustryOrderWithCustom from "./CreateIndustryOrderWithCustom";


const CreateIndustryOrderWithCustomBeforeLoading = () => {
  const { id } = useParams();
  const currentData = useAppSelector(selectCurrentUser);
  const { data: settingData, isLoading } = useGetSettingDataQuery(
    currentData?.id,
    {
      skip: !currentData?.id,
    }
  );

  const { data : companyData, isLoading : CompanyOderIsLoading } = useGetCompanyOrderQuery(id);

  
  // get measurements
  const { data: measurementsData, isLoading: measurementsDataLoading } =
    useGetMeasurementsQuery(currentData?.id);


    const { data: orderID, isLoading: orderLoading } =
    useGetCompanyLastOrderQuery(currentData?.id);

  if (isLoading || measurementsDataLoading || CompanyOderIsLoading || orderLoading) {
    return <Loader />;
  }

  return (
    <>
      <CreateIndustryOrderWithCustom
        settingData={settingData?.data}
        measurementsData={measurementsData}
        admin={currentData?.id}
        companyData={companyData?.data}
        orderID={orderID?.data}
      />
    </>
  );
};
export default CreateIndustryOrderWithCustomBeforeLoading;
