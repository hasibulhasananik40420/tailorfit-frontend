import { useParams } from "react-router-dom";
import {
  TIndividualOrder,
  useGetIndividualOrderQuery,
} from "../../../redux/api/individualOrderApi";
// import CompanyNewOrderEditModel from "./CompanyNewOrderEditModel";
import Loader from "../../../components/Loader/Loader";
import IndividualOrderEdit from "./IndividualOrderEdit";

const IndividualOrderEditBeforeLoading = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetIndividualOrderQuery(id);

  if (isLoading) {
    return <Loader />;
  }

  const singleOrder = data?.data as TIndividualOrder;

  return (
    <>
      <IndividualOrderEdit singleOrder={singleOrder as TIndividualOrder} />
    </>
  );
};
export default IndividualOrderEditBeforeLoading;
