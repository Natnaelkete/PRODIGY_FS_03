import { useQuery } from "@tanstack/react-query";
// import { fetchProducts } from "../../services/apiProducts";
import { getProduct } from "../../../../backend/controllers/productController";

function useGetFilteredProduct() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProduct(),
  });

  return { isLoading, data, error };
}

export default useGetFilteredProduct;
