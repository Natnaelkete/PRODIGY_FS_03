import { useQuery } from "@tanstack/react-query";
import { GetProduct } from "../../services/apiProducts";
import { toast } from "react-toastify";

function useProduct() {
  const { data: productData, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => GetProduct(),
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });

  return { productData, isLoading };
}

export default useProduct;
