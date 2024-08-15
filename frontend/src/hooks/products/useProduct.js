import { useQuery } from "@tanstack/react-query";
import { GetProduct } from "../../services/apiProducts";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

function useProduct() {
  const { search } = useLocation();
  console.log(search);

  const { data: productData, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => GetProduct(search),
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });

  return { productData, isLoading };
}

export default useProduct;
