import { useParams } from "react-router-dom";
import { TIndividualOrder } from "../../../redux/api/individualOrderApi";
// import CompanyNewOrderEditModel from "./CompanyNewOrderEditModel";
import Loader from "../../../components/Loader/Loader";
import IndustryOrderEdit from "./IndustryOrderEdit";
import { useGetCompanyOrderQuery } from "../../../redux/api/companyOrderApi";
import { useGetSettingDataQuery } from "../../../redux/api/settingApi";
import { useAppSelector } from "../../../redux/features/hooks";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";

const IndustryOrderEditBeforeLoading = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetCompanyOrderQuery(id);

  const currentData = useAppSelector(selectCurrentUser);

  const { data: settingData, isLoading: SIsLoading } = useGetSettingDataQuery(
    currentData?.id,
    {
      skip: !currentData?.id,
    }
  );

  if (isLoading || SIsLoading) {
    return <Loader />;
  }

  const singleOrder = data?.data as TIndividualOrder;

  return (
    <>
      <IndustryOrderEdit
        singleOrder={singleOrder as TIndividualOrder}
        settingData={settingData?.data}
      />
    </>
  );
};
export default IndustryOrderEditBeforeLoading;
