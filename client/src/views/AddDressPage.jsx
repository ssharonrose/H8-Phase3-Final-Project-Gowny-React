import AddEditDressForm from "../components/AddEditDressForm";
import { useParams } from "react-router-dom";

const AddDressPage = () => {
  const { StoreId } = useParams();
  console.log(StoreId, "AddDressPage");
  return <AddEditDressForm StoreId={StoreId} />;
};

export default AddDressPage;
