import { useParams } from "react-router-dom";
import {
  TIndividualOrder,
  useGetIndividualOrderQuery,
} from "../../../redux/api/individualOrderApi";
import Loader from "../../../components/Loader/Loader";
import IndividualOrderDetails from "./IndividualOrderDetails";


const IndividualOrderDetailsBeforeLoading = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetIndividualOrderQuery(id);

  if (isLoading) {
    return <Loader />;
  }

  const singleOrder = data?.data as TIndividualOrder;

  

  return (
    <>
      <IndividualOrderDetails singleOrder={singleOrder as TIndividualOrder} />
    </>
  );
};
export default IndividualOrderDetailsBeforeLoading;
