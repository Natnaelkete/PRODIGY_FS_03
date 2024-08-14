import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../../services/apiProducts";
import { toast } from "react-toastify";

function useGetProductByIds(id) {
  const { data: product, isLoading } = useQuery({
    queryKey: ["products", id],
    queryFn: () => getProductById(id),
    onError: (err) => toast.err(err.response.data.message),
    enabled: !!id,
  });

  return { product, isLoading };
}

export default useGetProductByIds;
