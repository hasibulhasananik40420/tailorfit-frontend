import { useParams } from "react-router-dom";
import {
  TIndividualOrder,
} from "../../../redux/api/individualOrderApi";
// import CompanyNewOrderEditModel from "./CompanyNewOrderEditModel";
import Loader from "../../../components/Loader/Loader";
import IndustryOrderEdit from "./IndustryOrderEdit";
import { useGetCompanyOrderQuery } from "../../../redux/api/companyOrderApi";


const IndustryOrderEditBeforeLoading = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetCompanyOrderQuery(id);

  if (isLoading) {
    return <Loader />;
  }

  const singleOrder = data?.data as TIndividualOrder;

  return (
    <>
      <IndustryOrderEdit singleOrder={singleOrder as TIndividualOrder} />
    </>
  );
};
export default IndustryOrderEditBeforeLoading;
