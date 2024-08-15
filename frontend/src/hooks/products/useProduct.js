import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GetProduct } from "../../services/apiProducts";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

function useProduct() {
  const queryClient = useQueryClient();
  const { search } = useLocation();

  const { data: productData, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => GetProduct(search),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["products", data]);
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });

  return { productData, isLoading };
}

export default useProduct;
