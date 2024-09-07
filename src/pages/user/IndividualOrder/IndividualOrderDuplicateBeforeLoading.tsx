/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import {
  TIndividualOrder,
  useGetIndividualLastOrderQuery,
  useGetIndividualOrderQuery,
} from "../../../redux/api/individualOrderApi";
import Loader from "../../../components/Loader/Loader";
import IndividualOrderDuplicate from "./IndividualOrderDuplicate";
import { useAppSelector } from "../../../redux/features/hooks";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import { useGetSettingDataQuery } from "../../../redux/api/settingApi";

const IndividualOrderDuplicateBeforeLoading = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetIndividualOrderQuery(id);
  const currentData = useAppSelector(selectCurrentUser);

  const { data: orderID, isLoading: orderLoading } =
    useGetIndividualLastOrderQuery(currentData?.id);

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
      <IndividualOrderDuplicate
        singleOrder={singleOrder as TIndividualOrder}
        settingData={settingData?.data as any}
        orderID={orderID?.data}
      />
    </>
  );
};
export default IndividualOrderDuplicateBeforeLoading;
