import { useParams } from "react-router-dom";
import { TIndividualOrder } from "../../../redux/api/individualOrderApi";
import Loader from "../../../components/Loader/Loader";
import { useGetCompanyOrderQuery } from "../../../redux/api/companyOrderApi";
import IndustryOrderDetails from "./IndustryOrderDetails";

const IndustryOrderDetailsBeforeLoading = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetCompanyOrderQuery(id);

  if (isLoading) {
    return <Loader />;
  }

  const singleOrder = data?.data as TIndividualOrder;

  return (
    <>
      <IndustryOrderDetails singleOrder={singleOrder as TIndividualOrder} />
    </>
  );
};
export default IndustryOrderDetailsBeforeLoading;
