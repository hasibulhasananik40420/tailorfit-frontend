import { useParams } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
import { useGetMeasurementsQuery } from "../../../redux/api/measurementApi";
import { useGetSettingDataQuery } from "../../../redux/api/settingApi";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import { useAppSelector } from "../../../redux/features/hooks";
import CreateIndividualOrderWithCustomer from "./CreateIndividualOrderWithCustomer";
import {
  TIndividualOrder,
  useGetIndividualLastOrderQuery,
  useGetIndividualOrderQuery,
} from "../../../redux/api/individualOrderApi";

const CreateIndividualOrderBeforeLoader = () => {
  const { id } = useParams();

  const currentData = useAppSelector(selectCurrentUser);

  const { data: settingData, isLoading } = useGetSettingDataQuery(
    currentData?.id,
    {
      skip: !currentData?.id,
    }
  );

  const { data: singleOrderData, isLoading: singleOrderLoading } =
    useGetIndividualOrderQuery(id);

  const singleOrder = singleOrderData?.data as TIndividualOrder;

  // get measurements
  const { data: orderID, isLoading: orderLoading } =
    useGetIndividualLastOrderQuery(currentData?.id);
  const { data: measurementsData, isLoading: measurementsDataLoading } =
    useGetMeasurementsQuery(currentData?.id);

  if (
    isLoading ||
    measurementsDataLoading ||
    singleOrderLoading ||
    orderLoading
  ) {
    return <Loader />;
  }


  return (
    <>
      <CreateIndividualOrderWithCustomer
        settingData={settingData?.data}
        measurementsData={measurementsData}
        admin={currentData?.id}
        singleOrder={singleOrder}
        orderID={orderID?.data}
      />
    </>
  );
};
export default CreateIndividualOrderBeforeLoader;
