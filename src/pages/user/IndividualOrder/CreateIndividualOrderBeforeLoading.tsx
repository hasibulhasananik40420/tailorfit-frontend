import Loader from "../../../components/Loader/Loader";
import { useGetIndividualLastOrderQuery } from "../../../redux/api/individualOrderApi";
import { useGetMeasurementsQuery } from "../../../redux/api/measurementApi";
import { useGetSettingDataQuery } from "../../../redux/api/settingApi";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import { useAppSelector } from "../../../redux/features/hooks";
import CreateIndividualOrder from "./CreateIndividualOrder";

const CreateIndividualOrderBeforeLoading = () => {
  const currentData = useAppSelector(selectCurrentUser);
  const { data: settingData, isLoading } = useGetSettingDataQuery(
    currentData?.id,
    {
      skip: !currentData?.id,
    }
  );

  // get measurements
  const { data: measurementsData, isLoading: measurementsDataLoading } =
    useGetMeasurementsQuery(currentData?.id);


    const { data: orderID, isLoading: orderLoading } =
    useGetIndividualLastOrderQuery(currentData?.id);
    

  if (isLoading || measurementsDataLoading || orderLoading) {
    return <Loader />;
  }

  console.log(orderID)

  return (
    <>
      <CreateIndividualOrder
        settingData={settingData?.data}
        measurementsData={measurementsData}
        admin={currentData?.id}
        orderID={orderID?.data}
      />
    </>
  );
};
export default CreateIndividualOrderBeforeLoading;
