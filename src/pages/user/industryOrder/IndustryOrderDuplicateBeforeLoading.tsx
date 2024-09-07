/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import {
  TIndividualOrder,
} from "../../../redux/api/individualOrderApi";
import Loader from "../../../components/Loader/Loader";
import { useGetCompanyLastOrderQuery, useGetCompanyOrderQuery } from "../../../redux/api/companyOrderApi";
import IndustryOrderDuplicate from "./IndustryOrderDuplicate";
import { useAppSelector } from "../../../redux/features/hooks";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import { useGetSettingDataQuery } from "../../../redux/api/settingApi";

const IndustryOrderDuplicateBeforeLoading = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetCompanyOrderQuery(id);

  const currentData = useAppSelector(selectCurrentUser);
  const { data: orderID, isLoading: orderLoading } =
    useGetCompanyLastOrderQuery(currentData?.id);

    
  const { data: settingData, isLoading: SIsLoading } = useGetSettingDataQuery(
    currentData?.id,
    {
      skip: !currentData?.id,
    }
  );

  if (isLoading || orderLoading || SIsLoading) {
    return <Loader />;
  }

  const singleOrder = data?.data as TIndividualOrder;

  return (
    <>
      <IndustryOrderDuplicate singleOrder={singleOrder as TIndividualOrder} orderID={orderID?.data} settingData={settingData?.data as any} />
    </>
  );
};
export default IndustryOrderDuplicateBeforeLoading;
