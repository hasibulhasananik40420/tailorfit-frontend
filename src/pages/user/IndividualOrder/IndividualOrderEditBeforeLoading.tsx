/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import {
  TIndividualOrder,
  useGetIndividualOrderQuery,
} from "../../../redux/api/individualOrderApi";
// import CompanyNewOrderEditModel from "./CompanyNewOrderEditModel";
import Loader from "../../../components/Loader/Loader";
import IndividualOrderEdit from "./IndividualOrderEdit";
import { useAppSelector } from "../../../redux/features/hooks";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import { useGetSettingDataQuery } from "../../../redux/api/settingApi";

const IndividualOrderEditBeforeLoading = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetIndividualOrderQuery(id);

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
      <IndividualOrderEdit
        singleOrder={singleOrder as TIndividualOrder}
        settingData={settingData?.data as any}
      />
    </>
  );
};
export default IndividualOrderEditBeforeLoading;
